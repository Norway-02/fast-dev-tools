'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { parseCronExpression } from '@/lib/tools/cron';
import { CalendarClock, Info, Sparkles } from 'lucide-react';

export default function CronGeneratorPage() {
  const tool = getToolBySlug('cron-generator')!;
  const [expression, setExpression] = useState(tool.sampleInput);
  const [userTimezone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
      return 'UTC';
    }
  });

  const parsed = parseCronExpression(expression);

  const presets = [
    { label: 'Every Minute', expr: '* * * * *' },
    { label: 'Every 5 Minutes', expr: '*/5 * * * *' },
    { label: 'Every Hour', expr: '0 * * * *' },
    { label: 'Every Day at Midnight', expr: '0 0 * * *' },
    { label: 'Every Monday at 9 AM', expr: '0 9 * * 1' },
    { label: '1st of Month at Midnight', expr: '0 0 1 * *' },
  ];

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Enter or select a 5-field Unix cron expression.',
        'The parser converts the expression into a plain English schedule description.',
        'Copy the verified expression for Linux crontab, AWS EventBridge, or GitHub Actions.',
      ]}
      useCases={[
        'Building crontab schedules for recurring background jobs.',
        'Configuring automated GitHub Actions workflow triggers.',
        'Explaining complex legacy cron schedules in plain text.',
      ]}
    >
      <div className="space-y-4">
        {/* Timezone Notice Banner */}
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong className="text-slate-200">Cron syntax does not define a universal timezone.</strong> Your scheduler determines which timezone is used.
            </span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800 text-[11px]">
            Browser Timezone: {userTimezone}
          </span>
        </div>

        {/* Quick Presets Bar */}
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Common Schedule Presets</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((preset) => (
              <button
                key={preset.expr}
                onClick={() => setExpression(preset.expr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                  expression === preset.expr
                    ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cron Expression Input & Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-indigo-400" />
                <span>Cron Expression (5 Fields)</span>
              </label>
              <button
                onClick={() => setExpression('')}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            </div>

            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g. 0 9 * * 1"
              className="w-full p-3 bg-slate-950 text-indigo-300 font-mono text-base tracking-wider rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg space-y-1 font-mono text-xs">
              <div className="text-slate-400 font-semibold">5-Field Syntax Breakdown:</div>
              <div className="grid grid-cols-5 text-center text-[11px] text-slate-400 pt-1">
                <div>Minute<br /><span className="text-indigo-400 font-bold">0-59</span></div>
                <div>Hour<br /><span className="text-indigo-400 font-bold">0-23</span></div>
                <div>Day (M)<br /><span className="text-indigo-400 font-bold">1-31</span></div>
                <div>Month<br /><span className="text-indigo-400 font-bold">1-12</span></div>
                <div>Day (W)<br /><span className="text-indigo-400 font-bold">0-6</span></div>
              </div>
            </div>
          </div>

          <OutputViewer
            label="Plain English Schedule Description"
            value={parsed.humanDescription || parsed.error || ''}
            filename="cron-schedule.txt"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
