import { describe, it, expect } from 'vitest';
import { evaluateJsonPath } from '@/lib/tools/json-path';

describe('JSONPath Evaluation Engine', () => {
  const sampleJson = JSON.stringify({
    store: {
      book: [
        { title: 'Book A', price: 10 },
        { title: 'Book B', price: 20 },
      ],
      owner: 'Alice',
    },
  });

  it('evaluates root property access ($)', () => {
    const res = evaluateJsonPath(sampleJson, '$');
    expect(res.isValid).toBe(true);
    expect(res.matchCount).toBe(1);
    expect(res.matches[0].path).toBe('$');
  });

  it('evaluates nested property access ($.store.owner)', () => {
    const res = evaluateJsonPath(sampleJson, '$.store.owner');
    expect(res.isValid).toBe(true);
    expect(res.matchCount).toBe(1);
    expect(res.matches[0].value).toBe('Alice');
  });

  it('evaluates array indexing ($.store.book[0].title)', () => {
    const res = evaluateJsonPath(sampleJson, '$.store.book[0].title');
    expect(res.isValid).toBe(true);
    expect(res.matchCount).toBe(1);
    expect(res.matches[0].value).toBe('Book A');
  });

  it('evaluates wildcards ($.store.book[*].title)', () => {
    const res = evaluateJsonPath(sampleJson, '$.store.book[*].title');
    expect(res.isValid).toBe(true);
    expect(res.matchCount).toBe(2);
    expect(res.matches[0].value).toBe('Book A');
    expect(res.matches[1].value).toBe('Book B');
  });

  it('returns clean error for invalid JSON or expression without $', () => {
    const resBadJson = evaluateJsonPath('{ invalid }', '$.store');
    expect(resBadJson.isValid).toBe(false);
    expect(resBadJson.error).toContain('Invalid JSON');

    const resNoDollar = evaluateJsonPath(sampleJson, 'store.owner');
    expect(resNoDollar.isValid).toBe(false);
    expect(resNoDollar.error).toContain('must start with "$"');
  });
});
