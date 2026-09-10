// --- Word & Text Analytics ---
export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
}

export function analyzeText(text: string): TextStats {
  if (!text) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      lines: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  const lines = text.split(/\r\n|\r|\n/).length;

  // Words matching Unicode letters and numbers
  const wordsArray = text.trim().match(/[\p{L}\p{N}_]+/gu) || [];
  const words = wordsArray.length;

  // Sentences matching punctuation terminators (. ! ?)
  const sentencesArray = text.match(/[^.!?]+[.!?]+/g) || [];
  const sentences = sentencesArray.length || (words > 0 ? 1 : 0);

  // Paragraphs matching blank lines
  const paragraphsArray = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphs = paragraphsArray.length || (words > 0 ? 1 : 0);

  // Estimated reading speed: 200 words/min, speaking: 130 words/min
  const readingTimeMinutes = Math.ceil(words / 200);
  const speakingTimeMinutes = Math.ceil(words / 130);

  return {
    words,
    characters,
    charactersNoSpaces,
    lines,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
  };
}

// --- Case Conversions ---
export type TextCaseStyle =
  | 'lowercase'
  | 'UPPERCASE'
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case'
  | 'CONSTANT_CASE'
  | 'Title Case';

export function convertCase(text: string, style: TextCaseStyle): string {
  if (!text) return '';

  const words = text.match(/[\p{L}\p{N}]+/gu) || [];
  if (words.length === 0) return text;

  switch (style) {
    case 'lowercase':
      return text.toLowerCase();
    case 'UPPERCASE':
      return text.toUpperCase();
    case 'camelCase':
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join('');
    case 'PascalCase':
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
    case 'snake_case':
      return words.map((w) => w.toLowerCase()).join('_');
    case 'kebab-case':
      return words.map((w) => w.toLowerCase()).join('-');
    case 'CONSTANT_CASE':
      return words.map((w) => w.toUpperCase()).join('_');
    case 'Title Case':
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
    default:
      return text;
  }
}

// --- Remove Duplicate Lines ---
export interface DuplicateOptions {
  caseSensitive?: boolean;
  trimWhitespace?: boolean;
}

export function removeDuplicateLines(text: string, options: DuplicateOptions = {}): string {
  const lines = text.split(/\r\n|\r|\n/);
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    let key = options.trimWhitespace ? line.trim() : line;
    if (!options.caseSensitive) {
      key = key.toLowerCase();
    }

    if (!seen.has(key)) {
      seen.add(key);
      result.push(line);
    }
  }

  return result.join('\n');
}

// --- Sort Lines ---
export type LineSortMode = 'alphabetical' | 'reverse' | 'numerical' | 'length';

export function sortLines(text: string, mode: LineSortMode, caseSensitive = false): string {
  const lines = text.split(/\r\n|\r|\n/);

  lines.sort((a, b) => {
    if (mode === 'length') {
      return a.length - b.length;
    }

    if (mode === 'numerical') {
      const numA = parseFloat(a.replace(/[^0-9.-]/g, '')) || 0;
      const numB = parseFloat(b.replace(/[^0-9.-]/g, '')) || 0;
      return numA - numB;
    }

    const valA = caseSensitive ? a : a.toLowerCase();
    const valB = caseSensitive ? b : b.toLowerCase();

    if (mode === 'reverse') {
      return valB.localeCompare(valA);
    }

    return valA.localeCompare(valB);
  });

  return lines.join('\n');
}

// --- Text Diff ---
export interface TextDiffLine {
  kind: 'added' | 'removed' | 'unchanged';
  value: string;
}

export function computeTextDiff(textA: string, textB: string, maxLinesLimit = 2000): TextDiffLine[] {
  const linesA = textA.split(/\r\n|\r|\n/);
  const linesB = textB.split(/\r\n|\r|\n/);

  if (linesA.length > maxLinesLimit || linesB.length > maxLinesLimit) {
    throw new Error(`Input exceeds maximum safety limit of ${maxLinesLimit} lines to prevent browser freeze.`);
  }

  const matrix: number[][] = Array(linesA.length + 1)
    .fill(0)
    .map(() => Array(linesB.length + 1).fill(0));

  for (let i = 1; i <= linesA.length; i++) {
    for (let j = 1; j <= linesB.length; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  let i = linesA.length;
  let j = linesB.length;
  const result: TextDiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      result.unshift({ kind: 'unchanged', value: linesA[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
      result.unshift({ kind: 'added', value: linesB[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || matrix[i][j - 1] < matrix[i - 1][j])) {
      result.unshift({ kind: 'removed', value: linesA[i - 1] });
      i--;
    }
  }

  return result;
}
