'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { formatJson, validateJson } from '@/lib/tools/json';

export default function JsonFormatterPage() {
  const tool = getToolBySlug('json-formatter')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [indent, setIndent] = useState<'2' | '4' | 'tab'>('2');

  const formatted = formatJson(input, indent);
  const validation = validateJson(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your raw, minified, or unformatted JSON string into the input editor.',
        'Choose your preferred indentation spacing (2 spaces, 4 spaces, or tab).',
        'Copy or download the formatted, beautified JSON output instantly.',
      ]}
      useCases={[
        'Beautifying minified API response payloads for debugging.',
        'Formatting JSON logs into readable multiline structures.',
        'Standardizing JSON formatting for code commits or config files.',
      ]}
    >
      <div className="space-y-4">
        {/* Indentation Selector Toolbar */}
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <span className="font-semibold text-slate-200">Indentation Spacing:</span>
          {(['2', '4', 'tab'] as const).map((space) => (
            <button
              key={space}
              onClick={() => setIndent(space)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                indent === space
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {space === 'tab' ? 'Tab' : `${space} Spaces`}
            </button>
          ))}
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Raw JSON Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            onInvalidSample={() => setInput(tool.invalidSampleInput || '')}
            onSubmit={() => {}}
            submitLabel="Format JSON"
            errorLine={validation.line}
          />

          <OutputViewer
            label="Formatted JSON Output"
            value={formatted.result}
            filename="formatted.json"
            mimeType="application/json"
          />
        </div>

        {/* Validation Errors */}
        {!validation.isValid && validation.error && (
          <ValidationError error={validation.error} line={validation.line} column={validation.column} />
        )}
      </div>
    </ToolLayout>
  );
}
