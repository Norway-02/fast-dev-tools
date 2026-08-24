import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl, encodeHtml, decodeHtml } from '@/lib/tools/encoding';

describe('Encoding & Decoding Tools — Security & Strictness Test Suite', () => {
  describe('Base64 UTF-8 Strictness (Item 8)', () => {
    it('encodes and decodes full UTF-8 Unicode, international characters & emojis', () => {
      const original = 'Hello 🚀 World! こんにちは 🌟 €100';
      const encoded = encodeBase64(original);
      expect(encoded.error).toBeNull();

      const decoded = decodeBase64(encoded.result);
      expect(decoded.error).toBeNull();
      expect(decoded.result).toBe(original);
    });

    it('rejects malformed Base64 character strings', () => {
      const res = decodeBase64('!!!InvalidBase64Chrs!!!');
      expect(res.error).not.toBeNull();
    });

    it('rejects invalid Base64 padding / length', () => {
      const res = decodeBase64('SGVsbG8==='); // Invalid triple padding
      expect(res.error).not.toBeNull();
    });
  });

  describe('HTML Entity Encoder & Decoder XSS Safety (Item 6)', () => {
    it('escapes dangerous HTML script tags and handlers into safe entity codes', () => {
      const xssPayloads = [
        '<script>alert(1)</script>',
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(1)>',
        '<a href="javascript:alert(1)">test</a>',
      ];

      for (const payload of xssPayloads) {
        const encoded = encodeHtml(payload);
        expect(encoded.result).not.toContain('<script>');
        expect(encoded.result).not.toContain('<img');
        expect(encoded.result).not.toContain('<svg');
        expect(encoded.result).not.toContain('<a');
        expect(encoded.result).toContain('&lt;');
      }
    });

    it('decodes HTML entities safely without DOM script execution', () => {
      const encodedStr = '&lt;script&gt;alert(1)&lt;/script&gt;';
      const decoded = decodeHtml(encodedStr);
      expect(decoded.result).toBe('<script>alert(1)</script>');
      // Verification: Decoded result is pure plain text string, never evaluated in DOM
    });
  });

  describe('URL Encoder & Decoder', () => {
    it('encodes component vs full URL mode', () => {
      const url = 'https://example.com/search?query=hello world & test';
      expect(encodeUrl(url, 'component').result).toContain('%2F%2F');
      expect(encodeUrl(url, 'full').result).toBe('https://example.com/search?query=hello%20world%20&%20test');
    });

    it('handles malformed percent sequences gracefully during decoding', () => {
      const res = decodeUrl('https://example.com/test%2'); // Truncated percent sequence
      expect(res.error).not.toBeNull();
    });
  });
});
