import cronstrue from 'cronstrue';

/**
 * Cron Expression Generator & Explainer
 * Dialect: Standard 5-field cron (minute hour day-of-month month day-of-week)
 */

export interface CronState {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export interface CronParseResult {
  expression: string;
  isValid: boolean;
  humanDescription: string;
  error: string | null;
  dialectNotice: string;
  timezoneNotice: string;
}

const DIALECT_NOTICE = 'Dialect: Standard 5-field Unix cron syntax (minute hour day-of-month month day-of-week).';
const TIMEZONE_NOTICE = 'Note: Cron expressions do not store timezones. Execution depends on your server or system clock setting (typically UTC).';

/**
 * Combines 5 cron fields into a 5-part expression string.
 */
export function buildCronExpression(state: CronState): string {
  const m = state.minute.trim() || '*';
  const h = state.hour.trim() || '*';
  const dom = state.dayOfMonth.trim() || '*';
  const mon = state.month.trim() || '*';
  const dow = state.dayOfWeek.trim() || '*';

  return `${m} ${h} ${dom} ${mon} ${dow}`;
}

/**
 * Validates and converts a 5-field cron expression into human-readable text using cronstrue.
 */
export function parseCronExpression(expression: string): CronParseResult {
  const trimmed = expression.trim();
  if (!trimmed) {
    return {
      expression: '',
      isValid: false,
      humanDescription: '',
      error: 'Cron expression is empty.',
      dialectNotice: DIALECT_NOTICE,
      timezoneNotice: TIMEZONE_NOTICE,
    };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length !== 5) {
    return {
      expression: trimmed,
      isValid: false,
      humanDescription: '',
      error: `Expected 5 fields separated by spaces (minute hour dom month dow). Got ${parts.length} fields.`,
      dialectNotice: DIALECT_NOTICE,
      timezoneNotice: TIMEZONE_NOTICE,
    };
  }

  try {
    const description = cronstrue.toString(trimmed, { use24HourTimeFormat: true });
    return {
      expression: trimmed,
      isValid: true,
      humanDescription: description,
      error: null,
      dialectNotice: DIALECT_NOTICE,
      timezoneNotice: TIMEZONE_NOTICE,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      expression: trimmed,
      isValid: false,
      humanDescription: '',
      error: `Invalid Cron expression: ${msg}`,
      dialectNotice: DIALECT_NOTICE,
      timezoneNotice: TIMEZONE_NOTICE,
    };
  }
}

export const COMMON_CRON_PRESETS = [
  { label: 'Every minute', expression: '* * * * *' },
  { label: 'Every 5 minutes', expression: '*/5 * * * *' },
  { label: 'Every 15 minutes', expression: '*/15 * * * *' },
  { label: 'Every hour at :00', expression: '0 * * * *' },
  { label: 'Every 2 hours', expression: '0 */2 * * *' },
  { label: 'Every day at midnight (00:00)', expression: '0 0 * * *' },
  { label: 'Every day at 9:00 AM', expression: '0 9 * * *' },
  { label: 'Every Monday at 9:00 AM', expression: '0 9 * * 1' },
  { label: '1st of every month at midnight', expression: '0 0 1 * *' },
];
