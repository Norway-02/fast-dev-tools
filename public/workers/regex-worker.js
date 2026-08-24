/**
 * Web Worker for Safe Isolated Regex Execution.
 * Prevents catastrophic backtracking patterns from blocking the main UI thread.
 */

self.onmessage = function (e) {
  const { pattern, flags, testString, maxMatches = 2000 } = e.data;

  try {
    const regex = new RegExp(pattern, flags);
    const isGlobal = flags.includes('g');
    const matches = [];
    let warning = null;

    if (!isGlobal) {
      const match = regex.exec(testString);
      if (match && match.index !== undefined) {
        const groups = [];
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
      let match;
      let count = 0;
      while ((match = regex.exec(testString)) !== null) {
        count++;
        if (count > maxMatches) {
          warning = `Matched count exceeded limit of ${maxMatches}. Results truncated.`;
          break;
        }

        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        const groups = [];
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
    }

    self.postMessage({
      status: 'success',
      matchCount: matches.length,
      matches,
      isGlobal,
      warning,
    });
  } catch (err) {
    self.postMessage({
      status: 'error',
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
