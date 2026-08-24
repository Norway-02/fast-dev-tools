/**
 * JSON utility functions for formatting, validation, minification, viewer tree conversion, and CSV conversion.
 */

export interface JsonValidationResult {
  isValid: boolean;
  error: string | null;
  line: number | null;
  column: number | null;
  formattedText?: string;
  stats?: {
    sizeBytes: number;
    keysCount: number;
    depth: number;
  };
}

/**
 * Validates JSON and calculates line/column numbers if an error occurs.
 */
export function validateJson(input: string): JsonValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Input is empty.',
      line: null,
      column: null,
    };
  }

  try {
    const parsed = JSON.parse(trimmed);
    const stats = calculateJsonStats(parsed);
    return {
      isValid: true,
      error: null,
      line: null,
      column: null,
      stats,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const { line, column } = extractLineAndColumnFromJsonError(errorMessage, trimmed);

    return {
      isValid: false,
      error: errorMessage,
      line,
      column,
    };
  }
}

/**
 * Extracts line and column number from standard V8 / JS JSON.parse error messages.
 */
export function extractLineAndColumnFromJsonError(
  errorMessage: string,
  input: string
): { line: number | null; column: number | null } {
  // Check common patterns: "at line X column Y" or "at position Z"
  const lineColMatch = errorMessage.match(/line (\d+) column (\d+)/i);
  if (lineColMatch) {
    return {
      line: parseInt(lineColMatch[1], 10),
      column: parseInt(lineColMatch[2], 10),
    };
  }

  const posMatch = errorMessage.match(/position (\d+)/i);
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10);
    let line = 1;
    let col = 1;
    for (let i = 0; i < Math.min(pos, input.length); i++) {
      if (input[i] === '\n') {
        line++;
        col = 1;
      } else {
        col++;
      }
    }
    return { line, column: col };
  }

  return { line: null, column: null };
}

/**
 * Formats JSON string with configurable indent (spaces or tab).
 */
export function formatJson(input: string, indent: '2' | '4' | 'tab' = '2'): { result: string; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { result: '', error: 'Input is empty.' };

  try {
    const parsed = JSON.parse(trimmed);
    const space = indent === 'tab' ? '\t' : parseInt(indent, 10);
    return { result: JSON.stringify(parsed, null, space), error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: msg };
  }
}

/**
 * Minifies JSON string by removing all unnecessary whitespace while preserving string contents.
 */
export function minifyJson(input: string): { result: string; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { result: '', error: 'Input is empty.' };

  try {
    const parsed = JSON.parse(trimmed);
    return { result: JSON.stringify(parsed), error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: msg };
  }
}

/**
 * Calculates structural statistics for JSON data.
 */

export function calculateJsonStats(data: unknown): { sizeBytes: number; keysCount: number; depth: number } {
  const jsonStr = JSON.stringify(data);
  const sizeBytes = new TextEncoder().encode(jsonStr).length;

  let keysCount = 0;
  let maxDepth = 0;

  function traverse(val: unknown, currentDepth: number) {
    if (currentDepth > maxDepth) maxDepth = currentDepth;

    if (Array.isArray(val)) {
      for (const item of val) {
        traverse(item, currentDepth + 1);
      }
    } else if (val !== null && typeof val === 'object') {
      const keys = Object.keys(val as Record<string, unknown>);
      keysCount += keys.length;
      for (const key of keys) {
        traverse((val as Record<string, unknown>)[key], currentDepth + 1);
      }
    }
  }

  traverse(data, 1);
  return { sizeBytes, keysCount, depth: maxDepth };
}

/**
 * JSON to CSV Converter
 * Transforms JSON arrays or objects into valid RFC 4180 CSV with quotes/escaping.
 */
export function jsonToCsv(input: string): { result: string; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { result: '', error: 'Input is empty.' };

  try {
    let parsed = JSON.parse(trimmed);

    // If single object, wrap in array
    if (!Array.isArray(parsed)) {
      if (typeof parsed === 'object' && parsed !== null) {
        parsed = [parsed];
      } else {
        return { result: '', error: 'JSON input must be an array of objects or a single object.' };
      }
    }

    if (parsed.length === 0) {
      return { result: '', error: 'JSON array is empty.' };
    }

    // Collect headers from all objects
    const headersSet = new Set<string>();
    for (const row of parsed) {
      if (typeof row === 'object' && row !== null && !Array.isArray(row)) {
        Object.keys(row).forEach((k) => headersSet.add(k));
      }
    }

    const headers = Array.from(headersSet);
    if (headers.length === 0) {
      return { result: '', error: 'JSON items contain no object keys to build CSV columns.' };
    }

    const csvLines: string[] = [];

    // Header line
    csvLines.push(headers.map(escapeCsvField).join(','));

    // Data rows
    for (const row of parsed) {
      const line = headers.map((header) => {
        const val = row && typeof row === 'object' ? (row as Record<string, unknown>)[header] : undefined;
        return escapeCsvField(val);
      });
      csvLines.push(line.join(','));
    }

    return { result: csvLines.join('\n'), error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: `Invalid JSON: ${msg}` };
  }
}

function escapeCsvField(val: unknown): string {
  if (val === undefined || val === null) return '""';
  let str: string;
  if (typeof val === 'object') {
    str = JSON.stringify(val);
  } else {
    str = String(val);
  }

  // RFC 4180 CSV escaping: if value contains comma, double-quote, or newline, wrap in quotes and double quotes inside.
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
