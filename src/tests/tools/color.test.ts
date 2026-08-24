import { describe, it, expect } from 'vitest';
import { convertColor } from '@/lib/tools/color';

describe('Color Converter', () => {
  it('converts 6-digit HEX (#3b82f6) to RGB, HSL, and CMYK', () => {
    const res = convertColor('#3b82f6');
    expect(res.isValid).toBe(true);
    expect(res.values?.rgb).toEqual({ r: 59, g: 130, b: 246, a: 1 });
    expect(res.values?.formatted.hex).toBe('#3b82f6');
    expect(res.values?.formatted.cmyk).not.toBe('');
  });

  it('converts shorthand 3-digit HEX (#fff)', () => {
    const res = convertColor('#fff');
    expect(res.isValid).toBe(true);
    expect(res.values?.rgb).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(res.values?.formatted.hex).toBe('#ffffff');
  });

  it('converts rgb string input', () => {
    const res = convertColor('rgb(255, 0, 0)');
    expect(res.isValid).toBe(true);
    expect(res.values?.formatted.hex).toBe('#ff0000');
  });

  it('rejects invalid color string', () => {
    const res = convertColor('not-a-color');
    expect(res.isValid).toBe(false);
    expect(res.error).not.toBeNull();
  });
});
