'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { validateJson } from '@/lib/tools/json';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function JsonValidatorPage() {
  const tool = getToolBySlug('json-validator')!;
  const [input, setInput] = useState(tool.sampleInput);

  const validation = validateJson(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your JSON string into the input editor.',
        'The validator parses the input and runs structural syntax verification.',
        'If invalid, precise line and column error indicators pinpoint the exact syntax error.',
      ]}
      useCases={[
        'Debugging broken API request bodies or response payloads.',
        'Finding unescaped quotes or trailing commas in configuration files.',
        'Verifying JSON structure before parsing in backend applications.',
      ]}
    >
      <div className="space-y-4">
        {/* Status Indicator Banner */}
        <div
          className={`p-3.5 border rounded-xl flex items-center justify-between text-xs font-mono font-medium ${
            validation.isValid
              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
              : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>
              {validation.isValid
                ? 'Valid JSON Syntax — No structural errors detected.'
                : 'Invalid JSON Syntax — Syntax errors detected below.'}
            </span>
          </div>

          {validation.isValid && validation.stats && (
            <div className="hidden sm:flex items-center gap-3 text-slate-400 text-[11px]">
              <span>Keys: {validation.stats.keysCount}</span>
              <span>•</span>
              <span>Max Depth: {validation.stats.depth}</span>
            </div>
          )}
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="JSON Input to Validate"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            onInvalidSample={() => setInput(tool.invalidSampleInput || '')}
            onSubmit={() => {}}
            submitLabel="Validate JSON"
            errorLine={validation.line}
          />

          <OutputViewer
            label="Validation Summary & Clean Payload"
            value={validation.isValid ? JSON.stringify(JSON.parse(input), null, 2) : 'Invalid JSON input. Fix errors to see formatted output.'}
            filename="validated.json"
            mimeType="application/json"
          />
        </div>

        {/* Inline Error Details */}
        {!validation.isValid && validation.error && (
          <ValidationError error={validation.error} line={validation.line} column={validation.column} />
        )}
      </div>
    </ToolLayout>
  );
}
