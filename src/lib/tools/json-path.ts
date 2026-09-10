export interface JsonPathMatch {
  path: string;
  value: unknown;
}

export interface JsonPathResult {
  isValid: boolean;
  error?: string;
  matches: JsonPathMatch[];
  matchCount: number;
}

export function evaluateJsonPath(jsonStr: string, expression: string): JsonPathResult {
  if (!jsonStr.trim()) {
    return { isValid: false, error: 'JSON input is empty', matches: [], matchCount: 0 };
  }
  if (!expression.trim()) {
    return { isValid: false, error: 'JSONPath expression is empty', matches: [], matchCount: 0 };
  }

  let data: unknown;
  try {
    data = JSON.parse(jsonStr);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { isValid: false, error: `Invalid JSON: ${msg}`, matches: [], matchCount: 0 };
  }

  const expr = expression.trim();
  if (!expr.startsWith('$')) {
    return {
      isValid: false,
      error: 'JSONPath expression must start with "$"',
      matches: [],
      matchCount: 0,
    };
  }

  const matches: JsonPathMatch[] = [];

  try {
    // Tokenize JSONPath safely without eval
    const pathSegments = parseJsonPathTokens(expr);
    evaluateSegments(data, pathSegments, '$', matches);

    return {
      isValid: true,
      matches,
      matchCount: matches.length,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isValid: false,
      error: `JSONPath evaluation error: ${msg}`,
      matches: [],
      matchCount: 0,
    };
  }
}

type PathSegment =
  | { type: 'property'; name: string }
  | { type: 'wildcard' }
  | { type: 'index'; index: number };

function parseJsonPathTokens(expr: string): PathSegment[] {
  const segments: PathSegment[] = [];
  // Strip leading '$'
  let rest = expr.slice(1);

  while (rest.length > 0) {
    if (rest.startsWith('.')) {
      rest = rest.slice(1);
      if (rest.startsWith('*')) {
        segments.push({ type: 'wildcard' });
        rest = rest.slice(1);
      } else {
        const match = rest.match(/^([a-zA-Z0-9_-]+)/);
        if (match) {
          segments.push({ type: 'property', name: match[1] });
          rest = rest.slice(match[1].length);
        } else {
          break;
        }
      }
    } else if (rest.startsWith('[')) {
      const closeIdx = rest.indexOf(']');
      if (closeIdx === -1) throw new Error('Unclosed bracket "["');
      const inside = rest.slice(1, closeIdx).trim();
      rest = rest.slice(closeIdx + 1);

      if (inside === '*') {
        segments.push({ type: 'wildcard' });
      } else if (/^\d+$/.test(inside)) {
        segments.push({ type: 'index', index: parseInt(inside, 10) });
      } else {
        // Strip quotes if present e.g. ['key']
        const propName = inside.replace(/^['"]|['"]$/g, '');
        segments.push({ type: 'property', name: propName });
      }
    } else {
      break;
    }
  }

  return segments;
}

function evaluateSegments(
  current: unknown,
  segments: PathSegment[],
  currentPath: string,
  matches: JsonPathMatch[]
) {
  if (segments.length === 0) {
    matches.push({ path: currentPath, value: current });
    return;
  }

  if (current === null || current === undefined) {
    return;
  }

  const [head, ...tail] = segments;

  if (head.type === 'property') {
    if (typeof current === 'object' && current !== null && head.name in current) {
      const obj = current as Record<string, unknown>;
      evaluateSegments(obj[head.name], tail, `${currentPath}.${head.name}`, matches);
    }
  } else if (head.type === 'index') {
    if (Array.isArray(current) && head.index >= 0 && head.index < current.length) {
      evaluateSegments(current[head.index], tail, `${currentPath}[${head.index}]`, matches);
    }
  } else if (head.type === 'wildcard') {
    if (Array.isArray(current)) {
      current.forEach((item, idx) => {
        evaluateSegments(item, tail, `${currentPath}[${idx}]`, matches);
      });
    } else if (typeof current === 'object' && current !== null) {
      const obj = current as Record<string, unknown>;
      Object.keys(obj).forEach((key) => {
        evaluateSegments(obj[key], tail, `${currentPath}.${key}`, matches);
      });
    }
  }
}
