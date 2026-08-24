import { describe, it, expect } from 'vitest';
import { generateUuids, validateUuid } from '@/lib/tools/uuid';

describe('UUID Tools — Comprehensive Audit Test Suite (Item 3)', () => {
  describe('UUID Generator', () => {
    it('generates single and bulk v4 UUIDs', () => {
      const uuids = generateUuids({ count: 5, uppercase: true, hyphens: true });
      expect(uuids).toHaveLength(5);
      expect(validateUuid(uuids[0]).isValidSyntax).toBe(true);
      expect(validateUuid(uuids[0]).isValidRfc4122).toBe(true);
    });

    it('generates hyphenless UUIDs when requested', () => {
      const uuids = generateUuids({ count: 1, hyphens: false });
      expect(uuids[0]).toHaveLength(32);
      expect(validateUuid(uuids[0]).format).toBe('hyphenless');
    });
  });

  describe('UUID Validator Version & Variant Analysis', () => {
    it('validates UUID v1 (Date-time)', () => {
      const res = validateUuid('6c84fb90-12c4-11e1-840d-7b25c5ee775a');
      expect(res.isValidSyntax).toBe(true);
      expect(res.isValidRfc4122).toBe(true);
      expect(res.version).toContain('v1');
      expect(res.variant).toContain('RFC 4122');
    });

    it('validates UUID v3 (MD5 hash)', () => {
      const res = validateUuid('6fa459ea-ee8a-3ca4-894e-db77e160355e');
      expect(res.isValidSyntax).toBe(true);
      expect(res.version).toContain('v3');
    });

    it('validates UUID v4 (Random)', () => {
      const res = validateUuid('f47ac10b-58cc-4372-a567-0e02b2c3d479');
      expect(res.isValidSyntax).toBe(true);
      expect(res.version).toContain('v4');
    });

    it('validates UUID v5 (SHA-1 hash)', () => {
      const res = validateUuid('886313e1-3b8a-5372-9b90-0c9aee199e5d');
      expect(res.isValidSyntax).toBe(true);
      expect(res.version).toContain('v5');
    });

    it('validates 32-character hyphenless hex strings', () => {
      const res = validateUuid('f47ac10b58cc4372a5670e02b2c3d479');
      expect(res.isValidSyntax).toBe(true);
      expect(res.format).toBe('hyphenless');
    });

    it('identifies non-standard or malformed variant bits', () => {
      // Variant nibble is 'c' (110x => Microsoft COM)
      const res = validateUuid('f47ac10b-58cc-4372-c567-0e02b2c3d479');
      expect(res.isValidSyntax).toBe(true);
      expect(res.variant).toContain('Microsoft COM');
      expect(res.isValidRfc4122).toBe(false);
    });

    it('rejects invalid hex characters', () => {
      const res = validateUuid('f47ac10b-58cc-4372-z567-0e02b2c3d479');
      expect(res.isValidSyntax).toBe(false);
    });

    it('rejects incorrect string lengths', () => {
      const res = validateUuid('f47ac10b-58cc-4372');
      expect(res.isValidSyntax).toBe(false);
    });
  });
});
