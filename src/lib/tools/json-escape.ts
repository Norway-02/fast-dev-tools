export interface JsonEscapeResult {
  result: string;
  isValid: boolean;
  error?: string;
}

export function escapeJsonString(input: string): JsonEscapeResult {
  try {
    const escaped = JSON.stringify(input);
    // Remove outer double quotes returned by stringify
    return {
      result: escaped.slice(1, -1),
      isValid: true,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      result: input,
      isValid: false,
      error: `Failed to escape string: ${msg}`,
    };
  }
}

export function unescapeJsonString(input: string): JsonEscapeResult {
  try {
    // Wrap in quotes to decode via JSON.parse
    const unescaped = JSON.parse(`"${input.replace(/"/g, '\\"')}"`);
    return {
      result: typeof unescaped === 'string' ? unescaped : String(unescaped),
      isValid: true,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // Fallback manual unescaping for standard control sequences
    try {
      const fallback = input
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\b/g, '\b')
        .replace(/\\f/g, '\f');
      return {
        result: fallback,
        isValid: true,
      };
    } catch {
      return {
        result: input,
        isValid: false,
        error: `Malformed escape sequence: ${msg}`,
      };
    }
  }
}
