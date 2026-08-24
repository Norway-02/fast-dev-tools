'use client';

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { testRegexAsync, RegexTestResult } from '@/lib/tools/regex';
import { AlertTriangle, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

export default function RegexTesterPage() {
  const tool = getToolBySlug('regex-tester')!;
  const [pattern, setPattern] = useState(tool.sampleInput);
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    'Contact support@fastdevtools.app or sales@example.com for assistance.'
  );
  const [res, setRes] = useState<RegexTestResult>({
    isValid: true,
    error: null,
    matchCount: 0,
    matches: [],
    isGlobal: true,
    executionTimeMs: 0,
    warning: null,
  });

  useEffect(() => {
    let active = true;
    testRegexAsync(pattern, flags, testString).then((result) => {
      if (active) setRes(result);
    });
    return () => {
      active = false;
    };
  }, [pattern, flags, testString]);

  const toggleFlag = (flagChar: string) => {
    if (flags.includes(flagChar)) {
      setFlags(flags.replace(flagChar, ''));
    } else {
      setFlags(flags + flagChar);
    }
  };

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Enter your Regular Expression pattern (without enclosing slashes).',
        'Toggle flags (g: global, i: ignore case, m: multiline, s: dotAll, u: unicode).',
        'Paste your test string. Regex runs in an isolated Web Worker with a 300ms termination guard.',
      ]}
      useCases={[
        'Testing email, phone, or URL validation expressions safely.',
        'Debugging search & replace expressions without freezing your browser on pathological patterns.',
      ]}
    >
      <div className="space-y-6">
        {/* Worker Safety Badge */}
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-xs text-slate-300">
          <span className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Web Worker Isolated Execution Active (300ms Hard Timeout)</span>
          </span>
          <span className="text-slate-500 text-[11px]">Zero Main-Thread Freeze</span>
        </div>

        {/* Pattern & Flags Inputs */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
          <div className="space-y-2">
            <label className="block font-bold text-slate-200">Regular Expression Pattern:</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
              <span className="text-slate-500 font-bold text-sm">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="([a-z]+)"
                className="flex-1 bg-transparent text-indigo-300 font-mono focus:outline-none text-sm font-semibold"
              />
              <span className="text-slate-500 font-bold text-sm">/{flags}</span>
            </div>
          </div>

          {/* Flag Toggle Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-400 mr-2">Flags:</span>
            {[
              { f: 'g', label: 'g (Global)' },
              { f: 'i', label: 'i (Ignore Case)' },
              { f: 'm', label: 'm (Multiline)' },
              { f: 's', label: 's (DotAll)' },
              { f: 'u', label: 'u (Unicode)' },
            ].map(({ f, label }) => (
              <button
                key={f}
                onClick={() => toggleFlag(f)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all ${
                  flags.includes(f)
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Warning Banner */}
        {res.warning && (
          <div className="p-3 bg-amber-950/40 border border-amber-900/60 rounded-xl flex items-center gap-2 text-xs font-mono text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{res.warning}</span>
          </div>
        )}

        {/* Matches Metrics Bar */}
        {res.isValid && (
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Matches Found: <strong className="text-emerald-400 text-sm">{res.matchCount}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Worker Execution Time: {res.executionTimeMs} ms</span>
            </div>
          </div>
        )}

        {/* Test String Input & Match Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Test String Input"
            value={testString}
            onChange={setTestString}
            onClear={() => setTestString('')}
            minHeight="h-72"
          />

          {/* Captured Matches Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-slate-200 flex items-center justify-between">
              <span>Matched Groups ({res.matches.length})</span>
            </h3>

            {res.matches.length > 0 ? (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {res.matches.map((m, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between text-indigo-400 font-bold">
                      <span>Match #{idx + 1}</span>
                      <span className="text-slate-500 text-[11px]">Index: {m.index} (Len: {m.length})</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded text-emerald-300 font-mono break-all font-semibold">
                      {m.matchText}
                    </div>

                    {m.groups.length > 0 && (
                      <div className="pt-1.5 border-t border-slate-800/80 space-y-1 text-[11px]">
                        <span className="text-slate-400 font-semibold">Capture Groups:</span>
                        {m.groups.map((g, gi) => (
                          <div key={gi} className="flex items-center gap-2 text-slate-300 pl-2">
                            <span className="text-slate-500">[{g.name}]:</span>
                            <span className="text-cyan-300 break-all">&quot;{g.value}&quot;</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">No matches found for the given expression and test string.</div>
            )}
          </div>
        </div>

        {!res.isValid && res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
