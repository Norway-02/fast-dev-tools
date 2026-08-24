'use client';

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CopyButton } from '@/components/tools/CopyButton';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { convertTimestamp } from '@/lib/tools/timestamp';
import { Clock, Play, Pause } from 'lucide-react';

export default function UnixTimestampPage() {
  const tool = getToolBySlug('unix-timestamp')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [unitHint, setUnitHint] = useState<'auto' | 'sec' | 'ms'>('auto');
  const [nowSec, setNowSec] = useState<number>(() => Math.floor(Date.now() / 1000));
  const [isLive, setIsLive] = useState<boolean>(true);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setNowSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive]);

  const res = convertTimestamp(input, unitHint);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Enter a Unix timestamp (seconds or milliseconds) or an ISO 8601 date string.',
        'View the converted date breakdown in UTC, Local timezone, ISO format, and relative time.',
        'Use the live current epoch ticker to copy current timestamps.',
      ]}
      useCases={[
        'Converting database epoch timestamps into human-readable date/time.',
        'Debugging token expiration timestamps (`exp`, `iat`).',
      ]}
    >
      <div className="space-y-6">
        {/* Current Live Ticker Card */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Current Unix Epoch:</span>
            <span className="text-emerald-400 font-bold text-base px-2 py-0.5 bg-slate-950 rounded border border-slate-800">
              {nowSec}
            </span>
            <span className="text-slate-500">sec</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1"
            >
              {isLive ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span>{isLive ? 'Pause Ticker' : 'Resume Ticker'}</span>
            </button>
            <button
              onClick={() => setInput(nowSec.toString())}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded"
            >
              Use Current Time
            </button>
          </div>
        </div>

        {/* Input & Unit Hint Bar */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
          <label className="block text-slate-200 font-semibold">Enter Timestamp or Date String:</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 1700000000 or 2023-11-14T22:13:20Z"
              className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500 text-sm font-mono"
            />
            <div className="flex items-center gap-2">
              {(['auto', 'sec', 'ms'] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => setUnitHint(unit)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase ${
                    unitHint === unit ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Results Grid */}
        {res.isValid ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="text-slate-400 font-semibold">Unix Seconds</div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-emerald-400 text-sm font-bold">
                <span>{res.seconds}</span>
                <CopyButton text={String(res.seconds)} />
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="text-slate-400 font-semibold">Unix Milliseconds</div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-emerald-400 text-sm font-bold">
                <span>{res.milliseconds}</span>
                <CopyButton text={String(res.milliseconds)} />
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="text-slate-400 font-semibold">ISO 8601 String (UTC)</div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-indigo-300">
                <span className="truncate">{res.isoString}</span>
                <CopyButton text={res.isoString || ''} />
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="text-slate-400 font-semibold">UTC Date & Time</div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
                <span className="truncate">{res.utcString}</span>
                <CopyButton text={res.utcString || ''} />
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 md:col-span-2">
              <div className="text-slate-400 font-semibold">Relative Time</div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-amber-400 font-semibold">
                {res.relativeTime}
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
