import { describe, it, expect } from 'vitest';
import { convertTimestamp } from '@/lib/tools/timestamp';

describe('Unix Timestamp Converter', () => {
  it('converts seconds timestamp to ISO & UTC strings', () => {
    const secInput = '1700000000';
    const res = convertTimestamp(secInput, 'sec');
    expect(res.isValid).toBe(true);
    expect(res.seconds).toBe(1700000000);
    expect(res.milliseconds).toBe(1700000000000);
    expect(res.isoString).toBe('2023-11-14T22:13:20.000Z');
  });

  it('converts milliseconds timestamp', () => {
    const msInput = '1700000000000';
    const res = convertTimestamp(msInput, 'ms');
    expect(res.isValid).toBe(true);
    expect(res.seconds).toBe(1700000000);
    expect(res.milliseconds).toBe(1700000000000);
  });

  it('handles invalid timestamp string', () => {
    const invalid = 'abc-xyz-invalid';
    const res = convertTimestamp(invalid);
    expect(res.isValid).toBe(false);
    expect(res.error).not.toBeNull();
  });
});
