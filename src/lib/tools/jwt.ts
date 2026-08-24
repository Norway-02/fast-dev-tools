/**
 * JWT Decoder & Claim Inspector
 * NOTE: Decoding a JWT in the browser does NOT verify its signature.
 * Anyone can construct a JWT with arbitrary payload.
 */

export interface JwtDecodeResult {
  isValid: boolean;
  error: string | null;
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string | null;
  rawHeader: string | null;
  rawPayload: string | null;
  isExpired: boolean | null;
  expiresAt: string | null;
  issuedAt: string | null;
  notBefore: string | null;
  algorithm: string | null;
  type: string | null;
  securityNotice: string;
}

const SECURITY_NOTICE =
  '⚠️ Security Disclaimer: Decoding a JWT reveals its payload contents but DOES NOT verify its signature. Anyone can issue a forged JWT with arbitrary payload. Never trust unverified JWT claims for security decisions.';

/**
 * Safe Base64URL string decoder.
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

/**
 * Decodes JWT string into structured header, payload, signature, and expiration info.
 */
export function decodeJwt(input: string): JwtDecodeResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: 'Input is empty.',
      header: null,
      payload: null,
      signature: null,
      rawHeader: null,
      rawPayload: null,
      isExpired: null,
      expiresAt: null,
      issuedAt: null,
      notBefore: null,
      algorithm: null,
      type: null,
      securityNotice: SECURITY_NOTICE,
    };
  }

  const parts = trimmed.split('.');
  if (parts.length !== 3) {
    return {
      isValid: false,
      error: 'Invalid JWT structure. A valid JWT consists of 3 dot-separated Base64URL parts (header.payload.signature).',
      header: null,
      payload: null,
      signature: null,
      rawHeader: null,
      rawPayload: null,
      isExpired: null,
      expiresAt: null,
      issuedAt: null,
      notBefore: null,
      algorithm: null,
      type: null,
      securityNotice: SECURITY_NOTICE,
    };
  }

  try {
    const rawHeader = base64UrlDecode(parts[0]);
    const rawPayload = base64UrlDecode(parts[1]);
    const signature = parts[2];

    const header = JSON.parse(rawHeader);
    const payload = JSON.parse(rawPayload);

    // Inspect standard claims
    const nowSec = Math.floor(Date.now() / 1000);

    let isExpired: boolean | null = null;
    let expiresAt: string | null = null;
    let issuedAt: string | null = null;
    let notBefore: string | null = null;

    if (typeof payload.exp === 'number') {
      isExpired = payload.exp < nowSec;
      expiresAt = new Date(payload.exp * 1000).toUTCString();
    }

    if (typeof payload.iat === 'number') {
      issuedAt = new Date(payload.iat * 1000).toUTCString();
    }

    if (typeof payload.nbf === 'number') {
      notBefore = new Date(payload.nbf * 1000).toUTCString();
    }

    const algorithm = typeof header.alg === 'string' ? header.alg : null;
    const type = typeof header.typ === 'string' ? header.typ : null;

    return {
      isValid: true,
      error: null,
      header,
      payload,
      signature,
      rawHeader,
      rawPayload,
      isExpired,
      expiresAt,
      issuedAt,
      notBefore,
      algorithm,
      type,
      securityNotice: SECURITY_NOTICE,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isValid: false,
      error: `Failed to decode JWT parts: ${msg}`,
      header: null,
      payload: null,
      signature: null,
      rawHeader: null,
      rawPayload: null,
      isExpired: null,
      expiresAt: null,
      issuedAt: null,
      notBefore: null,
      algorithm: null,
      type: null,
      securityNotice: SECURITY_NOTICE,
    };
  }
}
