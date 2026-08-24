'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { minifyJson, validateJson } from '@/lib/tools/json';

export default function JsonMinifierPage() {
  const tool = getToolBySlug('json-minifier')!;
  const [input, setInput] = useState(tool.sampleInput);

  const minified = minifyJson(input);
  const validation = validateJson(input);

  const originalBytes = new TextEncoder().encode(input).length;
  const minifiedBytes = new TextEncoder().encode(minified.result).length;
  const savingsPercent =
    originalBytes > 0 && minifiedBytes > 0
      ? Math.max(0, parseFloat((((originalBytes - minifiedBytes) / originalBytes) * 100).toFixed(1))).toFixed(1)
      : '0';

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your formatted or multiline JSON text into the input editor.',
        'The minifier strips out unnecessary whitespace, newlines, and tabs.',
        'Copy or download the dense minified JSON output single line.',
      ]}
      useCases={[
        'Compressing JSON payloads for network API transmission bandwidth reduction.',
        'Storing compact JSON configurations in environment variables or databases.',
      ]}
    >
      <div className="space-y-4">
        {/* Compression Stats Badge */}
        {validation.isValid && minified.result && (
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Original: {originalBytes} B</span>
            <span>Minified: {minifiedBytes} B</span>
            <span className="text-emerald-400 font-bold">Saved {savingsPercent}% space</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="JSON Input String"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            errorLine={validation.line}
          />

          <OutputViewer
            label="Minified JSON Output"
            value={minified.result}
            filename="minified.json"
            mimeType="application/json"
          />
        </div>

        {!validation.isValid && validation.error && (
          <ValidationError error={validation.error} line={validation.line} column={validation.column} />
        )}
      </div>
    </ToolLayout>
  );
}
