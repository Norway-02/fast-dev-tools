/**
 * Web Crypto API Hash Generator (SHA-256, SHA-384, SHA-512, SHA-1).
 */

export type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512' | 'SHA-1';

export interface HashResult {
  algorithm: HashAlgorithm;
  hex: string;
  hexUpper: string;
  base64: string;
  warning?: string;
}

export interface AllHashesResult {
  sha256: HashResult;
  sha384: HashResult;
  sha512: HashResult;
  sha1: HashResult;
}

/**
 * Computes hash for input string using Web Crypto API.
 */
export async function computeHash(input: string, algorithm: HashAlgorithm): Promise<HashResult> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    const base64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

    const warning = algorithm === 'SHA-1' ? '⚠️ SHA-1 is cryptographically broken and deprecated for security sensitive applications.' : undefined;

    return {
      algorithm,
      hex,
      hexUpper: hex.toUpperCase(),
      base64,
      warning,
    };
  }

  throw new Error('Web Crypto API (crypto.subtle) is not available in this environment.');
}

/**
 * Computes all supported hashes (SHA-256, SHA-384, SHA-512, SHA-1) simultaneously.
 */
export async function computeAllHashes(input: string): Promise<AllHashesResult> {
  const [sha256, sha384, sha512, sha1] = await Promise.all([
    computeHash(input, 'SHA-256'),
    computeHash(input, 'SHA-384'),
    computeHash(input, 'SHA-512'),
    computeHash(input, 'SHA-1'),
  ]);

  return { sha256, sha384, sha512, sha1 };
}
