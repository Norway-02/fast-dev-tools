import { describe, it, expect } from 'vitest';
import { compareJson } from '@/lib/tools/json-diff';

describe('JSON Diff Comparison Engine', () => {
  it('detects added, removed, and changed properties in nested objects', () => {
    const jsonA = JSON.stringify({
      name: 'John',
      age: 30,
      role: 'admin',
      address: { city: 'NYC', zip: '10001' },
    });

    const jsonB = JSON.stringify({
      name: 'Alex',
      age: 30,
      email: 'alex@example.com',
      address: { city: 'NYC', zip: '10002' },
    });

    const result = compareJson(jsonA, jsonB);

    expect(result.isValid).toBe(true);
    expect(result.summary.changed).toBe(2); // name, address.zip
    expect(result.summary.added).toBe(1); // email
    expect(result.summary.removed).toBe(1); // role
    expect(result.summary.unchanged).toBe(2); // age, address.city

    const nameChange = result.changes.find((c) => c.path === 'name');
    expect(nameChange?.kind).toBe('changed');
    expect(nameChange?.oldValue).toBe('John');
    expect(nameChange?.newValue).toBe('Alex');

    const emailChange = result.changes.find((c) => c.path === 'email');
    expect(emailChange?.kind).toBe('added');
    expect(emailChange?.newValue).toBe('alex@example.com');
  });

  it('handles array elements comparison correctly', () => {
    const jsonA = JSON.stringify([1, 2, 3]);
    const jsonB = JSON.stringify([1, 4, 3, 5]);

    const result = compareJson(jsonA, jsonB);

    expect(result.isValid).toBe(true);
    expect(result.summary.unchanged).toBe(2); // [0] = 1, [2] = 3
    expect(result.summary.changed).toBe(1); // [1] = 2 -> 4
    expect(result.summary.added).toBe(1); // [3] = 5
  });

  it('handles invalid JSON input gracefully with clear error indicator', () => {
    const result = compareJson('{ name: "bad" }', '{ "name": "good" }');
    expect(result.isValid).toBe(false);
    expect(result.errorSide).toBe('A');
    expect(result.error).toContain('JSON A syntax error');
  });
});
