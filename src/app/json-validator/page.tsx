'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { validateJson } from '@/lib/tools/json';
import { CheckCircle, XCircle } from 'lucide-react';

export default function JsonValidatorPage() {
  const tool = getToolBySlug('json-validator')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = validateJson(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your JSON payload into the validation input editor.',
        'The validator parses the input using strict ECMA-404 rules.',
        'View instant validation status, parse metrics, or line/column syntax error locations.',
      ]}
      useCases={[
        'Validating API requests before sending them in production.',
        'Locating missing quotes, trailing commas, or bracket mismatch errors in config files.',
        'Inspecting structural depth and key counts of unknown payloads.',
      ]}
    >
      <div className="space-y-4">
        {/* Status Indicator Card */}
        {input.trim() && (
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 font-mono text-xs ${
              res.isValid
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}
          >
            {res.isValid ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <div className="flex-1 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-sm">
                {res.isValid ? 'Valid JSON Syntax' : 'Invalid JSON Syntax'}
              </span>
              {res.isValid && res.stats && (
                <div className="flex items-center gap-4 text-emerald-400/90 text-[11px]">
                  <span>Keys: {res.stats.keysCount}</span>
                  <span>Max Depth: {res.stats.depth}</span>
                  <span>Size: {res.stats.sizeBytes} B</span>
                </div>
              )}
            </div>
          </div>
        )}

        <CodeEditor
          label="JSON Input String"
          value={input}
          onChange={setInput}
          onClear={() => setInput('')}
          onSample={() => setInput(tool.sampleInput)}
          errorLine={res.line}
          minHeight="h-80"
        />

        {!res.isValid && res.error && (
          <ValidationError error={res.error} line={res.line} column={res.column} />
        )}
      </div>
    </ToolLayout>
  );
}
