/**
 * UUID Generator and RFC 4122 Validator.
 */

export interface UuidOptions {
  count?: number;
  uppercase?: boolean;
  hyphens?: boolean;
}

export function generateUuids(options: UuidOptions = {}): string[] {
  const count = Math.min(Math.max(options.count || 1, 1), 100);
  const uppercase = options.uppercase ?? false;
  const hyphens = options.hyphens ?? true;

  const uuids: string[] = [];

  for (let i = 0; i < count; i++) {
    let id: string;
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      id = crypto.randomUUID();
    } else {
      const getRandomValues = (arr: Uint8Array) => {
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
          return crypto.getRandomValues(arr);
        }
        for (let j = 0; j < arr.length; j++) arr[j] = Math.floor(Math.random() * 256);
        return arr;
      };
      const bytes = getRandomValues(new Uint8Array(16));
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10xx
      id = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
      id = `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
    }

    if (!hyphens) {
      id = id.replace(/-/g, '');
    }

    if (uppercase) {
      id = id.toUpperCase();
    }

    uuids.push(id);
  }

  return uuids;
}

export interface UuidValidationResult {
  isValidSyntax: boolean;
  isValidRfc4122: boolean;
  version: string | null;
  variant: string | null;
  format: 'standard' | 'hyphenless' | 'invalid';
  error: string | null;
}

const UUID_HYPHENATED_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const UUID_HYPHENLESS_REGEX = /^[0-9a-fA-F]{32}$/;
const NIL_UUID = '00000000-0000-0000-0000-000000000000';

/**
 * Validates UUID syntax, RFC 4122 variant bits, and version nibble.
 * Supports 36-character hyphenated (8-4-4-4-12) and 32-character hyphenless hex strings.
 */
export function validateUuid(input: string): UuidValidationResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValidSyntax: false,
      isValidRfc4122: false,
      version: null,
      variant: null,
      format: 'invalid',
      error: 'Input is empty.',
    };
  }

  if (trimmed === NIL_UUID) {
    return {
      isValidSyntax: true,
      isValidRfc4122: true,
      version: 'Nil UUID (All Zeroes)',
      variant: 'N/A',
      format: 'standard',
      error: null,
    };
  }

  const isHyphenated = UUID_HYPHENATED_REGEX.test(trimmed);
  const isHyphenless = UUID_HYPHENLESS_REGEX.test(trimmed);

  if (!isHyphenated && !isHyphenless) {
    return {
      isValidSyntax: false,
      isValidRfc4122: false,
      version: null,
      variant: null,
      format: 'invalid',
      error: 'Invalid syntax. Must be 36 characters with hyphens (8-4-4-4-12) or 32 hexadecimal characters.',
    };
  }

  // Extract version char and variant char
  const cleanHex = trimmed.replace(/-/g, '');
  const verNibble = cleanHex[12];
  const varNibble = parseInt(cleanHex[16], 16);

  // Variant identification
  let variant = 'Unknown Variant';
  let isVariantRfc4122 = false;

  if ((varNibble & 0x8) === 0x0) {
    variant = 'NCS Backward Compatibility (0xxx)';
  } else if ((varNibble & 0xc) === 0x8) {
    variant = 'RFC 4122 / DCE 1.1 (10xx)';
    isVariantRfc4122 = true;
  } else if ((varNibble & 0xe) === 0xc) {
    variant = 'Microsoft COM / GUID (110x)';
  } else if ((varNibble & 0xe) === 0xe) {
    variant = 'Reserved for future definition (111x)';
  }

  // Version identification
  const versionNames: Record<string, string> = {
    '1': 'v1 (Date-time & MAC node ID)',
    '2': 'v2 (DCE Security environment)',
    '3': 'v3 (MD5 namespace hash)',
    '4': 'v4 (Randomly generated)',
    '5': 'v5 (SHA-1 namespace hash)',
  };

  const version = versionNames[verNibble] || `Non-standard Version (${verNibble})`;

  return {
    isValidSyntax: true,
    isValidRfc4122: isVariantRfc4122 && ['1', '2', '3', '4', '5'].includes(verNibble),
    version,
    variant,
    format: isHyphenated ? 'standard' : 'hyphenless',
    error: null,
  };
}
