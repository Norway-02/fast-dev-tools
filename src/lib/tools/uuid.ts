/**
 * Cryptographically Secure UUID Generator & RFC 4122 / RFC 9562 Validator.
 */

export interface UuidOptions {
  version?: 'v4' | 'v7';
  count?: number;
  uppercase?: boolean;
  hyphens?: boolean;
}

/**
 * Generates UUID v4 or v7 (time-ordered).
 * Supports quantity from 1 to 1000.
 */
export function generateUuids(options: UuidOptions = {}): string[] {
  const count = Math.min(Math.max(options.count || 1, 1), 1000);
  const version = options.version || 'v4';
  const uppercase = options.uppercase ?? false;
  const hyphens = options.hyphens ?? true;

  const uuids: string[] = [];

  for (let i = 0; i < count; i++) {
    let id: string;

    if (version === 'v7') {
      id = generateUuidV7();
    } else {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        id = crypto.randomUUID();
      } else {
        id = generateUuidV4Fallback();
      }
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

function generateUuidV7(): string {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let j = 0; j < 16; j++) bytes[j] = Math.floor(Math.random() * 256);
  }

  const nowMs = Date.now();

  // 48-bit Unix timestamp in ms
  bytes[0] = Math.floor(nowMs / 0x100000000) & 0xff;
  bytes[1] = Math.floor(nowMs / 0x1000000) & 0xff;
  bytes[2] = Math.floor(nowMs / 0x10000) & 0xff;
  bytes[3] = Math.floor(nowMs / 0x100) & 0xff;
  bytes[4] = Math.floor(nowMs) & 0xff;
  bytes[5] = (nowMs % 1) * 256 & 0xff;

  // Version 7 (0b0111)
  bytes[6] = (bytes[6] & 0x0f) | 0x70;

  // Variant 10xx (RFC 4122 / 9562)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateUuidV4Fallback(): string {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let j = 0; j < 16; j++) bytes[j] = Math.floor(Math.random() * 256);
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10xx

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
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

  const cleanHex = trimmed.replace(/-/g, '');
  const verNibble = cleanHex[12];
  const varNibble = parseInt(cleanHex[16], 16);

  let variant = 'Unknown Variant';
  let isVariantRfc4122 = false;

  if ((varNibble & 0x8) === 0x0) {
    variant = 'NCS Backward Compatibility (0xxx)';
  } else if ((varNibble & 0xc) === 0x8) {
    variant = 'RFC 4122 / RFC 9562 (10xx)';
    isVariantRfc4122 = true;
  } else if ((varNibble & 0xe) === 0xc) {
    variant = 'Microsoft COM / GUID (110x)';
  } else if ((varNibble & 0xe) === 0xe) {
    variant = 'Reserved for future definition (111x)';
  }

  const versionNames: Record<string, string> = {
    '1': 'v1 (Date-time & MAC node ID)',
    '2': 'v2 (DCE Security environment)',
    '3': 'v3 (MD5 namespace hash)',
    '4': 'v4 (Randomly generated)',
    '5': 'v5 (SHA-1 namespace hash)',
    '7': 'v7 (Unix Epoch time-ordered)',
  };

  const version = versionNames[verNibble] || `Non-standard Version (${verNibble})`;

  return {
    isValidSyntax: true,
    isValidRfc4122: isVariantRfc4122 && ['1', '2', '3', '4', '5', '7'].includes(verNibble),
    version,
    variant,
    format: isHyphenated ? 'standard' : 'hyphenless',
    error: null,
  };
}
