import YAML from 'yaml';

/**
 * Converts JSON string to YAML string.
 */
export function jsonToYaml(input: string): { result: string; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { result: '', error: 'Input is empty.' };

  try {
    const parsed = JSON.parse(trimmed);
    const doc = new YAML.Document(parsed);
    return { result: doc.toString(), error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: `Invalid JSON: ${msg}` };
  }
}

/**
 * Converts YAML string to formatted JSON string.
 */
export function yamlToJson(input: string, indent: '2' | '4' = '2'): { result: string; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { result: '', error: 'Input is empty.' };

  try {
    const parsed = YAML.parse(trimmed);
    if (parsed === undefined) {
      return { result: '', error: 'YAML input is empty or invalid.' };
    }
    const space = parseInt(indent, 10);
    return { result: JSON.stringify(parsed, null, space), error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: `YAML Parsing Error: ${msg}` };
  }
}
