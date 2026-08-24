/**
 * Regex Tester with Worker Isolation & Catastrophic Backtracking Protection.
 */

export interface RegexMatchGroup {
  name: string | number;
  value: string;
}

export interface RegexMatch {
  index: number;
  length: number;
  matchText: string;
  groups: RegexMatchGroup[];
}

export interface RegexTestResult {
  isValid: boolean;
  error: string | null;
  matchCount: number;
  matches: RegexMatch[];
  isGlobal: boolean;
  executionTimeMs: number;
  warning: string | null;
  timedOut?: boolean;
}

const MAX_PATTERN_LENGTH = 500;
const MAX_TEST_STRING_LENGTH = 100000;
const MAX_MATCHES_LIMIT = 2000;
const WORKER_TIMEOUT_MS = 300;

/**
 * Synchronous regex tester with iteration safety guards.
 * Used for direct computations and Node/Vitest environments.
 */
export function testRegex(pattern: string, flags: string, testString: string): RegexTestResult {
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

  if (!pattern) {
    return {
      isValid: true,
      error: null,
      matchCount: 0,
      matches: [],
      isGlobal: flags.includes('g'),
      executionTimeMs: 0,
      warning: null,
    };
  }

  if (pattern.length > MAX_PATTERN_LENGTH) {
    return {
      isValid: false,
      error: `Regex pattern exceeds maximum allowed length of ${MAX_PATTERN_LENGTH} characters to prevent catastrophic backtracking.`,
      matchCount: 0,
      matches: [],
      isGlobal: false,
      executionTimeMs: 0,
      warning: null,
    };
  }

  if (testString.length > MAX_TEST_STRING_LENGTH) {
    return {
      isValid: false,
      error: `Test string exceeds maximum length of ${MAX_TEST_STRING_LENGTH} characters.`,
      matchCount: 0,
      matches: [],
      isGlobal: false,
      executionTimeMs: 0,
      warning: null,
    };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isValid: false,
      error: `Invalid Regular Expression syntax: ${msg}`,
      matchCount: 0,
      matches: [],
      isGlobal: flags.includes('g'),
      executionTimeMs: 0,
      warning: null,
    };
  }

  const isGlobal = flags.includes('g');
  const matches: RegexMatch[] = [];
  let warning: string | null = null;
  let timedOut = false;

  try {
    if (!isGlobal) {
      const match = regex.exec(testString);
      if (match && match.index !== undefined) {
        const groups: RegexMatchGroup[] = [];
        for (let i = 1; i < match.length; i++) {
          groups.push({ name: i, value: match[i] ?? '' });
        }
        if (match.groups) {
          for (const [name, val] of Object.entries(match.groups)) {
            groups.push({ name, value: val ?? '' });
          }
        }
        matches.push({
          index: match.index,
          length: match[0].length,
          matchText: match[0],
          groups,
        });
      }
    } else {
      let match: RegExpExecArray | null;
      let count = 0;
      const stepStartTime = Date.now();

      while ((match = regex.exec(testString)) !== null) {
        count++;
        if (count > MAX_MATCHES_LIMIT) {
          warning = `Matched count exceeded limit of ${MAX_MATCHES_LIMIT}. Output truncated.`;
          break;
        }

        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        const groups: RegexMatchGroup[] = [];
        for (let i = 1; i < match.length; i++) {
          groups.push({ name: i, value: match[i] ?? '' });
        }

        if (match.groups) {
          for (const [name, val] of Object.entries(match.groups)) {
            groups.push({ name, value: val ?? '' });
          }
        }

        matches.push({
          index: match.index,
          length: match[0].length,
          matchText: match[0],
          groups,
        });

        if (Date.now() - stepStartTime > WORKER_TIMEOUT_MS) {
          warning = `Execution timed out (${WORKER_TIMEOUT_MS}ms) to prevent UI freezing due to potential catastrophic backtracking.`;
          timedOut = true;
          break;
        }
      }
    }

    const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const executionTimeMs = parseFloat((endTime - startTime).toFixed(2));

    return {
      isValid: true,
      error: timedOut ? warning : null,
      matchCount: matches.length,
      matches,
      isGlobal,
      executionTimeMs,
      warning,
      timedOut,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isValid: false,
      error: `Execution error: ${msg}`,
      matchCount: 0,
      matches: [],
      isGlobal,
      executionTimeMs: 0,
      warning: null,
    };
  }
}

/**
 * Executes regex in a dedicated isolated Web Worker with strict termination timeout.
 * Recreates the worker gracefully if terminated due to catastrophic backtracking.
 */
export function testRegexAsync(
  pattern: string,
  flags: string,
  testString: string
): Promise<RegexTestResult> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof Worker === 'undefined') {
      // Fallback for SSR or non-browser environments
      resolve(testRegex(pattern, flags, testString));
      return;
    }

    if (!pattern) {
      resolve({
        isValid: true,
        error: null,
        matchCount: 0,
        matches: [],
        isGlobal: flags.includes('g'),
        executionTimeMs: 0,
        warning: null,
      });
      return;
    }

    if (pattern.length > MAX_PATTERN_LENGTH) {
      resolve({
        isValid: false,
        error: `Regex pattern exceeds maximum allowed length of ${MAX_PATTERN_LENGTH} characters to prevent catastrophic backtracking.`,
        matchCount: 0,
        matches: [],
        isGlobal: false,
        executionTimeMs: 0,
        warning: null,
      });
      return;
    }

    if (testString.length > MAX_TEST_STRING_LENGTH) {
      resolve({
        isValid: false,
        error: `Test string exceeds maximum length of ${MAX_TEST_STRING_LENGTH} characters.`,
        matchCount: 0,
        matches: [],
        isGlobal: false,
        executionTimeMs: 0,
        warning: null,
      });
      return;
    }

    let worker: Worker;
    try {
      worker = new Worker('/workers/regex-worker.js');
    } catch {
      resolve(testRegex(pattern, flags, testString));
      return;
    }

    const startTime = performance.now();
    let isSettled = false;

    const timeoutTimer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        worker.terminate(); // Hard terminate the worker to release main thread
        resolve({
          isValid: false,
          error: `Execution timed out (${WORKER_TIMEOUT_MS}ms limit reached). Worker was terminated to prevent UI freezing from catastrophic backtracking.`,
          matchCount: 0,
          matches: [],
          isGlobal: flags.includes('g'),
          executionTimeMs: WORKER_TIMEOUT_MS,
          warning: 'Catastrophic backtracking pattern terminated.',
          timedOut: true,
        });
      }
    }, WORKER_TIMEOUT_MS);

    worker.onmessage = (e) => {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timeoutTimer);
      worker.terminate();

      const endTime = performance.now();
      const executionTimeMs = parseFloat((endTime - startTime).toFixed(2));

      if (e.data.status === 'success') {
        resolve({
          isValid: true,
          error: null,
          matchCount: e.data.matchCount,
          matches: e.data.matches,
          isGlobal: e.data.isGlobal,
          executionTimeMs,
          warning: e.data.warning,
        });
      } else {
        resolve({
          isValid: false,
          error: `Invalid Regular Expression syntax: ${e.data.error}`,
          matchCount: 0,
          matches: [],
          isGlobal: flags.includes('g'),
          executionTimeMs,
          warning: null,
        });
      }
    };

    worker.onerror = (err) => {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timeoutTimer);
      worker.terminate();
      resolve({
        isValid: false,
        error: `Regex Worker Error: ${err.message}`,
        matchCount: 0,
        matches: [],
        isGlobal: flags.includes('g'),
        executionTimeMs: 0,
        warning: null,
      });
    };

    worker.postMessage({
      pattern,
      flags,
      testString,
      maxMatches: MAX_MATCHES_LIMIT,
    });
  });
}
