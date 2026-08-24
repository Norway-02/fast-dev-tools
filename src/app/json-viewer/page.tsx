'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { JsonTreeView } from '@/components/tools/JsonTreeView';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { validateJson } from '@/lib/tools/json';

export default function JsonViewerPage() {
  const tool = getToolBySlug('json-viewer')!;
  const [input, setInput] = useState(tool.sampleInput);

  let parsedData: unknown = null;
  const validation = validateJson(input);
  if (validation.isValid) {
    try {
      parsedData = JSON.parse(input);
    } catch {
      // Handled by validation
    }
  }

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your JSON payload into the input editor.',
        'The interactive tree explorer renders object keys, arrays, and primitive data types.',
        'Click any node to expand or collapse branches, or use Expand/Collapse All.',
      ]}
      useCases={[
        'Exploring deeply nested API response objects.',
        'Inspecting complex data structures visually without parsing issues.',
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="JSON Source Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            errorLine={validation.line}
          />

          <div>
            {validation.isValid && parsedData !== null ? (
              <JsonTreeView data={parsedData} />
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-xs font-mono text-slate-500 min-h-[18rem] flex items-center justify-center">
                <span>Enter valid JSON input to render the interactive tree view.</span>
              </div>
            )}
          </div>
        </div>

        {!validation.isValid && validation.error && (
          <ValidationError error={validation.error} line={validation.line} column={validation.column} />
        )}
      </div>
    </ToolLayout>
  );
}
