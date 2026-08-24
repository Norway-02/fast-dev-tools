/**
 * Encoding & Decoding tools for Base64 (UTF-8 safe), URL, and HTML.
 */

// --- Base64 UTF-8 Encoding & Decoding ---

/**
 * Encodes text to Base64 with full UTF-8 Unicode support.
 */
export function encodeBase64(input: string): { result: string; error: string | null } {
  if (!input) return { result: '', error: null };
  try {
    const bytes = new TextEncoder().encode(input);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return { result: btoa(binary), error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: `Base64 Encoding Error: ${msg}` };
  }
}

/**
 * Decodes Base64 string to text with full UTF-8 Unicode support.
 */
export function decodeBase64(input: string): { result: string; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { result: '', error: null };
  try {
    const binary = atob(trimmed);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return { result: decoded, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: `Invalid Base64 format or UTF-8 sequence: ${msg}` };
  }
}

// --- URL Encoder & Decoder ---

export type UrlEncodeMode = 'component' | 'full';

/**
 * Encodes URL strings.
 * 'component' encodes characters including reserved ones (e.g. for query parameters).
 * 'full' preserves URL structure characters like http://, ?, &, =.
 */
export function encodeUrl(input: string, mode: UrlEncodeMode = 'component'): { result: string; error: string | null } {
  if (!input) return { result: '', error: null };
  try {
    const result = mode === 'component' ? encodeURIComponent(input) : encodeURI(input);
    return { result, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: `URL Encoding Error: ${msg}` };
  }
}

/**
 * Decodes URL strings.
 */
export function decodeUrl(input: string, mode: UrlEncodeMode = 'component'): { result: string; error: string | null } {
  if (!input) return { result: '', error: null };
  try {
    const result = mode === 'component' ? decodeURIComponent(input) : decodeURI(input);
    return { result, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: '', error: `URL Decoding Error (malformed % sequence): ${msg}` };
  }
}

// --- HTML Encoder & Decoder ---

const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Encodes HTML special characters to HTML entities safely.
 */
export function encodeHtml(input: string): { result: string; error: string | null } {
  if (!input) return { result: '', error: null };
  const result = input.replace(/[&<>"'/`=]/g, (char) => HTML_ENTITY_MAP[char] || char);
  return { result, error: null };
}

/**
 * Decodes HTML entities safely without using innerHTML / DOM injection.
 */
export function decodeHtml(input: string): { result: string; error: string | null } {
  if (!input) return { result: '', error: null };

  const entityRegex = /&(?:#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g;

  const namedEntities: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    copy: '©',
    reg: '®',
    trade: '™',
    euro: '€',
    pound: '£',
    yen: '¥',
    cent: '¢',
  };

  const result = input.replace(entityRegex, (match) => {
    if (match.startsWith('&#x') || match.startsWith('&#X')) {
      const hex = match.slice(3, -1);
      const code = parseInt(hex, 16);
      return !isNaN(code) ? String.fromCodePoint(code) : match;
    }
    if (match.startsWith('&#')) {
      const dec = match.slice(2, -1);
      const code = parseInt(dec, 10);
      return !isNaN(code) ? String.fromCodePoint(code) : match;
    }
    const name = match.slice(1, -1);
    if (namedEntities[name]) {
      return namedEntities[name];
    }
    return match;
  });

  return { result, error: null };
}
