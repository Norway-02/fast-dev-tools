'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { decodeUrl, UrlEncodeMode } from '@/lib/tools/encoding';

export default function UrlDecoderPage() {
  const tool = getToolBySlug('url-decoder')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [mode, setMode] = useState<UrlEncodeMode>('component');

  const res = decodeUrl(input, mode);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your percent-encoded URL or query string.',
        'Choose Component or Full URL mode.',
        'View decoded text with %20 replaced by spaces and encoded sequences restored.',
      ]}
      useCases={[
        'Decoding obfuscated or encoded tracking URLs.',
        'Inspecting complex query parameter strings from API access logs.',
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <span className="font-semibold text-slate-200">Decoding Scope Mode:</span>
          <button
            onClick={() => setMode('component')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'component'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            URI Component
          </button>
          <button
            onClick={() => setMode('full')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'full'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Full URL
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Percent-Encoded URL Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
          />

          <OutputViewer
            label="Decoded Human-Readable Output"
            value={res.result}
            filename="url-decoded.txt"
          />
        </div>

        {res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
