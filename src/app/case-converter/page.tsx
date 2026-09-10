'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { convertCase, TextCaseStyle } from '@/lib/tools/text';
import { recordRecentTool } from '@/components/tools/RecentTools';

const CASE_OPTIONS: { id: TextCaseStyle; label: string; sample: string }[] = [
  { id: 'camelCase', label: 'camelCase', sample: 'devPocketTools' },
  { id: 'PascalCase', label: 'PascalCase', sample: 'DevPocketTools' },
  { id: 'snake_case', label: 'snake_case', sample: 'dev_pocket_tools' },
  { id: 'kebab-case', label: 'kebab-case', sample: 'dev-pocket-tools' },
  { id: 'CONSTANT_CASE', label: 'CONSTANT_CASE', sample: 'DEV_POCKET_TOOLS' },
  { id: 'Title Case', label: 'Title Case', sample: 'Dev Pocket Tools' },
  { id: 'lowercase', label: 'lowercase', sample: 'dev pocket tools' },
  { id: 'UPPERCASE', label: 'UPPERCASE', sample: 'DEV POCKET TOOLS' },
];

export default function CaseConverterPage() {
  const tool = getToolBySlug('case-converter')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [style, setStyle] = useState<TextCaseStyle>('camelCase');

  React.useEffect(() => {
    recordRecentTool('case-converter');
  }, []);

  const converted = convertCase(input, style);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Type or paste text into the input editor.',
        'Click your desired target case style (camelCase, snake_case, CONSTANT_CASE, etc.).',
        'Copy or download the converted text string.',
      ]}
      useCases={[
        'Converting database column names to camelCase for TypeScript interfaces.',
        'Formatting environment variables to CONSTANT_CASE.',
        'Normalizing URL slugs to kebab-case.',
      ]}
    >
      <div className="space-y-4">
        {/* Style Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-900 border border-slate-800 rounded-xl">
          {CASE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setStyle(opt.id)}
              className={`p-2.5 rounded-lg border text-xs font-mono text-left transition-all ${
                style === opt.id
                  ? 'bg-purple-600 border-purple-500 text-white font-bold shadow-md'
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <div className="font-bold">{opt.label}</div>
              <div className="text-[10px] opacity-75 truncate">{opt.sample}</div>
            </button>
          ))}
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Raw Text Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            onSubmit={() => {}}
            submitLabel="Convert"
          />

          <OutputViewer
            label={`Converted Output (${style})`}
            value={converted}
            filename={`converted-${style}.txt`}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
