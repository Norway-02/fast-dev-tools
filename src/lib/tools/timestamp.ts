/**
 * Unix Timestamp Converter
 */

export interface TimestampInfo {
  isValid: boolean;
  error: string | null;
  seconds: number | null;
  milliseconds: number | null;
  isoString: string | null;
  utcString: string | null;
  localString: string | null;
  relativeTime: string | null;
  dateParts?: {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    dayOfWeek: string;
  };
}

/**
 * Converts a raw timestamp input (seconds or milliseconds) or ISO date string to full date breakdown.
 */
export function convertTimestamp(input: string, unitHint: 'auto' | 'sec' | 'ms' = 'auto'): TimestampInfo {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Input is empty.',
      seconds: null,
      milliseconds: null,
      isoString: null,
      utcString: null,
      localString: null,
      relativeTime: null,
    };
  }

  let date: Date;
  let ms: number;

  if (/^-?\d+$/.test(trimmed)) {
    const num = parseInt(trimmed, 10);
    if (unitHint === 'sec' || (unitHint === 'auto' && Math.abs(num) < 1e11)) {
      ms = num * 1000;
    } else {
      ms = num;
    }
    date = new Date(ms);
  } else {
    // Try parsing as ISO / Date string
    date = new Date(trimmed);
    ms = date.getTime();
  }

  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      error: 'Invalid timestamp or date format. Enter a numeric Unix timestamp or ISO date string.',
      seconds: null,
      milliseconds: null,
      isoString: null,
      utcString: null,
      localString: null,
      relativeTime: null,
    };
  }

  const seconds = Math.floor(ms / 1000);
  const milliseconds = ms;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return {
    isValid: true,
    error: null,
    seconds,
    milliseconds,
    isoString: date.toISOString(),
    utcString: date.toUTCString(),
    localString: date.toString(),
    relativeTime: getRelativeTime(ms),
    dateParts: {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
      dayOfWeek: daysOfWeek[date.getUTCDay()],
    },
  };
}

/**
 * Converts human readable components (Y, M, D, H, M, S) in UTC or Local time to TimestampInfo.
 */
export function convertDateParts(
  parts: { year: number; month: number; day: number; hours: number; minutes: number; seconds: number },
  isUtc = true
): TimestampInfo {
  const { year, month, day, hours, minutes, seconds } = parts;
  let date: Date;

  if (isUtc) {
    date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
  } else {
    date = new Date(year, month - 1, day, hours, minutes, seconds);
  }

  return convertTimestamp(date.getTime().toString(), 'ms');
}

/**
 * Returns relative human readable time e.g. "5 minutes ago", "in 3 days".
 */
export function getRelativeTime(ms: number): string {
  const now = Date.now();
  const diffSec = Math.floor((now - ms) / 1000);

  if (Math.abs(diffSec) < 5) return 'just now';

  const absSec = Math.abs(diffSec);
  const isPast = diffSec > 0;

  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];

  for (const [secondsInUnit, label] of intervals) {
    const count = Math.floor(absSec / secondsInUnit);
    if (count >= 1) {
      const plural = count === 1 ? '' : 's';
      return isPast ? `${count} ${label}${plural} ago` : `in ${count} ${label}${plural}`;
    }
  }

  return 'just now';
}
