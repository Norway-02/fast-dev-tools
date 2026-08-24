import { describe, it, expect } from 'vitest';
import { decodeJwt } from '@/lib/tools/jwt';

describe('JWT Decoder', () => {
  const sampleJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjIwMDAwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  it('decodes JWT header, payload claims, and security disclaimer', () => {
    const res = decodeJwt(sampleJwt);
    expect(res.isValid).toBe(true);
    expect(res.error).toBeNull();
    expect(res.header?.alg).toBe('HS256');
    expect(res.payload?.name).toBe('John Doe');
    expect(res.securityNotice).toContain('DOES NOT verify its signature');
  });

  it('detects token expiration state', () => {
    const expiredJwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjoxMDAwMDAwfQ.signature';
    const res = decodeJwt(expiredJwt);
    expect(res.isValid).toBe(true);
    expect(res.isExpired).toBe(true);
  });

  it('rejects invalid JWT structure or malformed base64', () => {
    const res1 = decodeJwt('invalid.token.onlytwoparts');
    expect(res1.isValid).toBe(false);
    expect(res1.error).not.toBeNull();

    const res2 = decodeJwt('not-a-jwt');
    expect(res2.isValid).toBe(false);
    expect(res2.error).toContain('Invalid JWT structure');
  });
});
