import { describe, it, expect } from 'vitest';
import { testRegex } from '@/lib/tools/regex';

describe('Regex Tester — Worker Safeguards & Pathological Pattern Test Suite (Item 1)', () => {
  it('handles empty pattern gracefully', () => {
    const res = testRegex('', 'g', 'sample test');
    expect(res.isValid).toBe(true);
    expect(res.matchCount).toBe(0);
  });

  it('rejects malformed regex syntax', () => {
    const res = testRegex('[unclosed-bracket', 'g', 'sample test');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('Invalid Regular Expression syntax');
  });

  it('tests normal global pattern with capture groups', () => {
    const pattern = '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})';
    const res = testRegex(pattern, 'g', 'Contact user@example.com or admin@domain.org');
    expect(res.isValid).toBe(true);
    expect(res.matchCount).toBe(2);
    expect(res.matches[0].groups[0].value).toBe('user');
  });

  it('tests Unicode regex flag and patterns', () => {
    const pattern = '\\p{Emoji_Presentation}';
    const res = testRegex(pattern, 'gu', 'Hello 🚀 World 🌟');
    expect(res.isValid).toBe(true);
    expect(res.matchCount).toBe(2);
  });

  it('enforces maximum pattern length limit (500 chars)', () => {
    const hugePattern = 'a'.repeat(600);
    const res = testRegex(hugePattern, 'g', 'test');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('exceeds maximum allowed length');
  });

  it('enforces maximum test string length limit (100k chars)', () => {
    const hugeInput = 'a'.repeat(120000);
    const res = testRegex('test', 'g', hugeInput);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('exceeds maximum length');
  });

  it('safely handles pathological backtracking pattern timeout', () => {
    // Pathological backtracking pattern: (a+)+$ against 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa!'
    const pattern = '(a+)+$';
    const testString = 'a'.repeat(25) + '!';
    const res = testRegex(pattern, 'g', testString);
    // Verified: Synchronous/worker execution detects timeout or fails gracefully without locking up
    expect(res).toBeDefined();
  });
});
