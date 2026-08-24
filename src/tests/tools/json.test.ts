import { describe, it, expect } from 'vitest';
import { validateJson, formatJson, minifyJson, jsonToCsv } from '@/lib/tools/json';

describe('JSON Tools — Comprehensive Audit Test Suite', () => {
  describe('JSON Validator & Error Line Extraction', () => {
    it('validates happy path JSON', () => {
      const res = validateJson('{"name":"Alice","age":30,"roles":["admin","dev"]}');
      expect(res.isValid).toBe(true);
      expect(res.stats?.keysCount).toBe(3);
      expect(res.stats?.depth).toBe(3);
    });

    it('handles empty input gracefully', () => {
      const res = validateJson('   ');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Input is empty.');
    });

    it('detects line 1 failure', () => {
      const res = validateJson('{ invalid_json }');
      expect(res.isValid).toBe(false);
      expect(res.error).not.toBeNull();
    });

    it('detects multiline nested object failure', () => {
      const json = '{\n  "user": {\n    "name": "Bob",\n    "age": ,\n  }\n}';
      const res = validateJson(json);
      expect(res.isValid).toBe(false);
      expect(res.error).not.toBeNull();
    });

    it('detects malformed trailing comma in array', () => {
      const json = '[\n  "item1",\n  "item2",\n]';
      const res = validateJson(json);
      expect(res.isValid).toBe(false);
    });

    it('detects truncated JSON string', () => {
      const json = '{"title": "Truncated';
      const res = validateJson(json);
      expect(res.isValid).toBe(false);
    });

    it('handles escaped strings and Unicode characters', () => {
      const json = '{"emoji": "🚀", "escaped": "Line1\\nLine2 \\"quoted\\""}';
      const res = validateJson(json);
      expect(res.isValid).toBe(true);
    });
  });

  describe('JSON Formatter & Minifier', () => {
    it('formats JSON with 2-spaces, 4-spaces, and tabs', () => {
      const input = '{"a":1,"b":2}';
      expect(formatJson(input, '2').result).toContain('  "a": 1');
      expect(formatJson(input, '4').result).toContain('    "a": 1');
      expect(formatJson(input, 'tab').result).toContain('\t"a": 1');
    });

    it('minifies multiline JSON stripping whitespace without corrupting internal spaces', () => {
      const input = '{\n  "message": "hello   world  with   spaces"\n}';
      const minified = minifyJson(input);
      expect(minified.result).toBe('{"message":"hello   world  with   spaces"}');
    });
  });

  describe('JSON to CSV Converter', () => {
    it('converts array of objects with escaped quotes, commas, and newlines', () => {
      const input = JSON.stringify([
        { id: 1, name: 'Smith, John', bio: 'Line 1\nLine 2' },
        { id: 2, name: 'Jane "Developer" Doe', bio: 'Normal' },
      ]);
      const res = jsonToCsv(input);
      expect(res.error).toBeNull();
      expect(res.result).toContain('"Smith, John"');
      expect(res.result).toContain('"Jane ""Developer"" Doe"');
    });

    it('rejects primitive JSON or non-object arrays', () => {
      expect(jsonToCsv('[1, 2, 3]').error).toContain('no object keys');
      expect(jsonToCsv('"string"').error).toContain('must be an array');
    });
  });
});
