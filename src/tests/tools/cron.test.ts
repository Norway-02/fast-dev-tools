import { describe, it, expect } from 'vitest';
import { parseCronExpression, buildCronExpression } from '@/lib/tools/cron';

describe('Cron Expression Generator', () => {
  it('parses valid 5-field cron expression to human description', () => {
    const expr = '0 9 * * 1';
    const res = parseCronExpression(expr);
    expect(res.isValid).toBe(true);
    expect(res.humanDescription).not.toBe('');
    expect(res.dialectNotice).toContain('Standard 5-field');
  });

  it('builds cron expression from field state', () => {
    const expr = buildCronExpression({
      minute: '*/15',
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
    });
    expect(expr).toBe('*/15 * * * *');
  });

  it('rejects expression with invalid field count', () => {
    const res = parseCronExpression('0 9 * *');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('Expected 5 fields');
  });
});
