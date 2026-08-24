/**
 * Color Converter (HEX, RGB, HSL, CMYK)
 */

export interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
  cmyk: { c: number; m: number; y: number; k: number };
  formatted: {
    hex: string;
    rgb: string;
    rgba: string;
    hsl: string;
    hsla: string;
    cmyk: string;
  };
}

export interface ColorConversionResult {
  isValid: boolean;
  error: string | null;
  values: ColorValues | null;
}

/**
 * Parses any color string (HEX, RGB, HSL) and converts to HEX, RGB, HSL, CMYK.
 */
export function convertColor(input: string): ColorConversionResult {
  const trimmed = input.trim().toLowerCase();

  if (!trimmed) {
    return { isValid: false, error: 'Input is empty.', values: null };
  }

  let rgb: { r: number; g: number; b: number; a: number } | null = null;

  // Try HEX (#fff, #ffffff, #ffffff80)
  if (trimmed.startsWith('#') || /^[0-9a-f]{3,8}$/.test(trimmed)) {
    const hex = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;
    rgb = parseHex(hex);
  } else if (trimmed.startsWith('rgb')) {
    rgb = parseRgbString(trimmed);
  } else if (trimmed.startsWith('hsl')) {
    rgb = parseHslString(trimmed);
  }

  if (!rgb) {
    return {
      isValid: false,
      error: 'Unrecognized color format. Provide valid HEX (#fff or #ffffff), rgb(r, g, b), or hsl(h, s%, l%).',
      values: null,
    };
  }

  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b, rgb.a);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const rgbaStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslaStr = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykStr = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  return {
    isValid: true,
    error: null,
    values: {
      hex,
      rgb,
      hsl,
      cmyk,
      formatted: {
        hex,
        rgb: rgbStr,
        rgba: rgbaStr,
        hsl: hslStr,
        hsla: hslaStr,
        cmyk: cmykStr,
      },
    },
  };
}

function parseHex(hex: string): { r: number; g: number; b: number; a: number } | null {
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b, a: 1 };
  } else if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b, a: 1 };
  } else if (hex.length === 8) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = parseFloat((parseInt(hex.slice(6, 8), 16) / 255).toFixed(2));
    if (!isNaN(r) && !isNaN(g) && !isNaN(b) && !isNaN(a)) return { r, g, b, a };
  }
  return null;
}

function parseRgbString(str: string): { r: number; g: number; b: number; a: number } | null {
  const match = str.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (!match) return null;
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
  if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
    return { r, g, b, a };
  }
  return null;
}

function parseHslString(str: string): { r: number; g: number; b: number; a: number } | null {
  const match = str.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%(?:\s*,\s*([\d.]+))?\s*\)/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const s = parseInt(match[2], 10);
  const l = parseInt(match[3], 10);
  const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

  if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
    const { r, g, b } = hslToRgb(h, s, l);
    return { r, g, b, a };
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number, a = 1): { h: number; s: number; l: number; a: number } {
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;

  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rf:
        h = (gf - bf) / d + (gf < bf ? 6 : 0);
        break;
      case gf:
        h = (bf - rf) / d + 2;
        break;
      case bf:
        h = (rf - gf) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hf = h / 360;
  const sf = s / 100;
  const lf = l / 100;

  if (sf === 0) {
    const val = Math.round(lf * 255);
    return { r: val, g: val, b: val };
  }

  const q = lf < 0.5 ? lf * (1 + sf) : lf + sf - lf * sf;
  const p = 2 * lf - q;

  const hue2rgb = (t: number) => {
    let temp = t;
    if (temp < 0) temp += 1;
    if (temp > 1) temp -= 1;
    if (temp < 1 / 6) return p + (q - p) * 6 * temp;
    if (temp < 1 / 2) return q;
    if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
    return p;
  };

  return {
    r: Math.round(hue2rgb(hf + 1 / 3) * 255),
    g: Math.round(hue2rgb(hf) * 255),
    b: Math.round(hue2rgb(hf - 1 / 3) * 255),
  };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;

  const k = 1 - Math.max(rf, gf, bf);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rf - k) / (1 - k);
  const m = (1 - gf - k) / (1 - k);
  const y = (1 - bf - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}
