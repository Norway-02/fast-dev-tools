'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { yamlToJson } from '@/lib/tools/yaml';

export default function YamlToJsonPage() {
  const tool = getToolBySlug('yaml-to-json')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [indent, setIndent] = useState<'2' | '4'>('2');

  const res = yamlToJson(input, indent);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your YAML document or configuration into the input editor.',
        'Choose 2-space or 4-space JSON formatting.',
        'Copy or download the converted JSON payload.',
      ]}
      useCases={[
        'Parsing Kubernetes YAML specs into JSON payloads.',
        'Converting YAML configuration files into JSON for REST APIs.',
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <span className="font-semibold text-slate-200">JSON Indentation:</span>
          {(['2', '4'] as const).map((space) => (
            <button
              key={space}
              onClick={() => setIndent(space)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                indent === space
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {space} Spaces
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="YAML Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
          />

          <OutputViewer
            label="JSON Output"
            value={res.result}
            filename="output.json"
            mimeType="application/json"
          />
        </div>

        {res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
