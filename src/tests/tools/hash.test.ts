import { describe, it, expect } from 'vitest';
import { computeHash } from '@/lib/tools/hash';

describe('Hash Generator', () => {
  it('computes SHA-256 hash using Web Crypto API', async () => {
    const input = 'hello world';
    const res = await computeHash(input, 'SHA-256');
    expect(res.algorithm).toBe('SHA-256');
    expect(res.hex).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
  });

  it('computes SHA-1 hash with security warning', async () => {
    const input = 'hello world';
    const res = await computeHash(input, 'SHA-1');
    expect(res.hex).toBe('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
    expect(res.warning).toContain('cryptographically broken');
  });
});
