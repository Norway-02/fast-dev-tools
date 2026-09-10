import { describe, it, expect } from 'vitest';
import {
  analyzeText,
  convertCase,
  removeDuplicateLines,
  sortLines,
  computeTextDiff,
} from '@/lib/tools/text';

describe('Text Utilities Engine', () => {
  it('analyzes text word count, characters, lines, and reading time', () => {
    const text = 'Hello world! This is a test sentence.\nSecond line here.';
    const stats = analyzeText(text);

    expect(stats.words).toBe(10);
    expect(stats.lines).toBe(2);
    expect(stats.characters).toBe(55);
    expect(stats.readingTimeMinutes).toBe(1);
  });

  it('converts case strings cleanly', () => {
    const input = 'hello world test';

    expect(convertCase(input, 'camelCase')).toBe('helloWorldTest');
    expect(convertCase(input, 'PascalCase')).toBe('HelloWorldTest');
    expect(convertCase(input, 'snake_case')).toBe('hello_world_test');
    expect(convertCase(input, 'kebab-case')).toBe('hello-world-test');
    expect(convertCase(input, 'CONSTANT_CASE')).toBe('HELLO_WORLD_TEST');
  });

  it('removes duplicate lines preserving original order', () => {
    const input = 'apple\nbanana\napple\ncherry\nbanana';
    const deduped = removeDuplicateLines(input, { caseSensitive: false });

    expect(deduped).toBe('apple\nbanana\ncherry');
  });

  it('sorts lines alphabetically and numerically', () => {
    const text = 'cherry\napple\nbanana';
    const sortedAlpha = sortLines(text, 'alphabetical');
    expect(sortedAlpha).toBe('apple\nbanana\ncherry');

    const numText = '100\n20\n5';
    const sortedNum = sortLines(numText, 'numerical');
    expect(sortedNum).toBe('5\n20\n100');
  });

  it('computes line-by-line text diff correctly', () => {
    const textA = 'line 1\nline 2\nline 3';
    const textB = 'line 1\nline 2 modified\nline 3\nline 4';

    const diff = computeTextDiff(textA, textB);

    expect(diff.some((d) => d.kind === 'removed' && d.value === 'line 2')).toBe(true);
    expect(diff.some((d) => d.kind === 'added' && d.value === 'line 2 modified')).toBe(true);
    expect(diff.some((d) => d.kind === 'added' && d.value === 'line 4')).toBe(true);
  });
});
