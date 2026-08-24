'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CopyButton } from '@/components/tools/CopyButton';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { parseCronExpression, COMMON_CRON_PRESETS, buildCronExpression, CronState } from '@/lib/tools/cron';
import { Calendar, Clock, Globe } from 'lucide-react';

export default function CronGeneratorPage() {
  const tool = getToolBySlug('cron-generator')!;

  const [cronState, setCronState] = useState<CronState>({
    minute: '0',
    hour: '9',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '1',
  });

  const [rawExpr, setRawExpr] = useState<string>('0 9 * * 1');
  const [activeTab, setActiveTab] = useState<'presets' | 'builder' | 'manual'>('presets');

  const exprToParse = activeTab === 'builder' ? buildCronExpression(cronState) : rawExpr;
  const res = parseCronExpression(exprToParse);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Choose a common preset or construct custom fields (minute, hour, day, month, weekday).',
        'View the generated 5-field cron expression and instant plain English explanation.',
        'Copy the expression for your crontab, GitHub Actions, or cloud scheduler.',
      ]}
      useCases={[
        'Creating crontab schedules for automated Linux backups.',
        'Configuring scheduled jobs in Cloud Composer, Vercel Cron, or AWS EventBridge.',
      ]}
    >
      <div className="space-y-6">
        {/* Dialect & Timezone Notice */}
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Clock className="w-4 h-4" />
            <span>{res.dialectNotice}</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{res.timezoneNotice}</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 font-mono text-xs">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all ${
              activeTab === 'presets'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Common Presets
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all ${
              activeTab === 'builder'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Visual Field Builder
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all ${
              activeTab === 'manual'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Manual Expression
          </button>
        </div>

        {/* Tab 1: Presets */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {COMMON_CRON_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setRawExpr(preset.expression)}
                className={`p-3 bg-slate-900 border rounded-xl text-left space-y-1 transition-all ${
                  rawExpr === preset.expression
                    ? 'border-indigo-500 bg-indigo-950/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-mono font-bold text-indigo-300 text-xs">{preset.expression}</div>
                <div className="text-[11px] text-slate-400">{preset.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Tab 2: Visual Builder */}
        {activeTab === 'builder' && (
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Minute (0-59)</label>
              <input
                type="text"
                value={cronState.minute}
                onChange={(e) => setCronState({ ...cronState, minute: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Hour (0-23)</label>
              <input
                type="text"
                value={cronState.hour}
                onChange={(e) => setCronState({ ...cronState, hour: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Day of Month (1-31)</label>
              <input
                type="text"
                value={cronState.dayOfMonth}
                onChange={(e) => setCronState({ ...cronState, dayOfMonth: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Month (1-12)</label>
              <input
                type="text"
                value={cronState.month}
                onChange={(e) => setCronState({ ...cronState, month: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Day of Week (0-6)</label>
              <input
                type="text"
                value={cronState.dayOfWeek}
                onChange={(e) => setCronState({ ...cronState, dayOfWeek: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Manual Input */}
        {activeTab === 'manual' && (
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
            <label className="block font-bold text-slate-200">Cron Expression (5 Fields):</label>
            <input
              type="text"
              value={rawExpr}
              onChange={(e) => setRawExpr(e.target.value)}
              placeholder="e.g. 0 9 * * 1"
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-indigo-300 text-sm font-bold"
            />
          </div>
        )}

        {/* Generated Result Card */}
        {res.isValid ? (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold">Generated Cron Expression:</span>
                <div className="text-2xl font-extrabold text-emerald-400 tracking-wider">
                  {res.expression}
                </div>
              </div>
              <CopyButton text={res.expression} className="px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white" />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
              <div className="text-indigo-400 font-semibold text-xs flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Plain English Description</span>
              </div>
              <div className="text-slate-100 text-sm font-medium leading-relaxed">
                “{res.humanDescription}”
              </div>
            </div>
          </div>
        ) : (
          <ValidationError error={res.error} />
        )}
      </div>
    </ToolLayout>
  );
}
