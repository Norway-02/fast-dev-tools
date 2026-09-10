export type DiffKind = 'added' | 'removed' | 'changed' | 'unchanged';

export interface JsonDiffChange {
  path: string;
  kind: DiffKind;
  oldValue?: unknown;
  newValue?: unknown;
}

export interface JsonDiffResult {
  isValid: boolean;
  error?: string;
  errorSide?: 'A' | 'B';
  changes: JsonDiffChange[];
  summary: {
    added: number;
    removed: number;
    changed: number;
    unchanged: number;
  };
}

export function compareJson(jsonStrA: string, jsonStrB: string): JsonDiffResult {
  let valueA: unknown;
  let valueB: unknown;

  try {
    valueA = jsonStrA.trim() === '' ? undefined : JSON.parse(jsonStrA);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isValid: false,
      error: `JSON A syntax error: ${msg}`,
      errorSide: 'A',
      changes: [],
      summary: { added: 0, removed: 0, changed: 0, unchanged: 0 },
    };
  }

  try {
    valueB = jsonStrB.trim() === '' ? undefined : JSON.parse(jsonStrB);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isValid: false,
      error: `JSON B syntax error: ${msg}`,
      errorSide: 'B',
      changes: [],
      summary: { added: 0, removed: 0, changed: 0, unchanged: 0 },
    };
  }

  const changes: JsonDiffChange[] = [];

  function diffNodes(a: unknown, b: unknown, path: string) {
    if (a === b) {
      changes.push({ path: path || '$', kind: 'unchanged', oldValue: a, newValue: b });
      return;
    }

    const typeA = getTypeName(a);
    const typeB = getTypeName(b);

    if (typeA !== typeB) {
      changes.push({ path: path || '$', kind: 'changed', oldValue: a, newValue: b });
      return;
    }

    if (typeA === 'object' && a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
      const objA = a as Record<string, unknown>;
      const objB = b as Record<string, unknown>;
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);
      const allKeys = Array.from(new Set([...keysA, ...keysB]));

      for (const key of allKeys) {
        const nextPath = path ? `${path}.${key}` : key;
        const hasA = key in objA;
        const hasB = key in objB;

        if (hasA && !hasB) {
          changes.push({ path: nextPath, kind: 'removed', oldValue: objA[key] });
        } else if (!hasA && hasB) {
          changes.push({ path: nextPath, kind: 'added', newValue: objB[key] });
        } else {
          diffNodes(objA[key], objB[key], nextPath);
        }
      }
      return;
    }

    if (typeA === 'array' && Array.isArray(a) && Array.isArray(b)) {
      const maxLen = Math.max(a.length, b.length);
      for (let i = 0; i < maxLen; i++) {
        const nextPath = `${path || '$'}[${i}]`;
        const hasA = i < a.length;
        const hasB = i < b.length;

        if (hasA && !hasB) {
          changes.push({ path: nextPath, kind: 'removed', oldValue: a[i] });
        } else if (!hasA && hasB) {
          changes.push({ path: nextPath, kind: 'added', newValue: b[i] });
        } else {
          diffNodes(a[i], b[i], nextPath);
        }
      }
      return;
    }

    // Primitives that differ
    changes.push({ path: path || '$', kind: 'changed', oldValue: a, newValue: b });
  }

  diffNodes(valueA, valueB, '');

  const summary = {
    added: changes.filter((c) => c.kind === 'added').length,
    removed: changes.filter((c) => c.kind === 'removed').length,
    changed: changes.filter((c) => c.kind === 'changed').length,
    unchanged: changes.filter((c) => c.kind === 'unchanged').length,
  };

  return {
    isValid: true,
    changes,
    summary,
  };
}

function getTypeName(val: unknown): string {
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}
