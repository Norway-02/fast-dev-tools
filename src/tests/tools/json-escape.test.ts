import { describe, it, expect } from 'vitest';
import { escapeJsonString, unescapeJsonString } from '@/lib/tools/json-escape';

describe('JSON String Escape & Unescape Engine', () => {
  it('escapes special control characters, quotes, and newlines', () => {
    const raw = 'Hello "World"\nNext line\tTabbed\\Backslash';
    const escaped = escapeJsonString(raw);

    expect(escaped.isValid).toBe(true);
    expect(escaped.result).toContain('Hello \\"World\\"');
    expect(escaped.result).toContain('\\nNext line');
    expect(escaped.result).toContain('\\tTabbed\\\\Backslash');
  });

  it('unescapes escaped strings correctly (round-trip test)', () => {
    const raw = 'Special string: "quotes", \n multiline, \t tab';
    const escaped = escapeJsonString(raw).result;
    const unescaped = unescapeJsonString(escaped).result;

    expect(unescaped).toBe(raw);
  });
});
