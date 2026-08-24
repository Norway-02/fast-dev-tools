'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { jsonToCsv, validateJson } from '@/lib/tools/json';

export default function JsonToCsvPage() {
  const tool = getToolBySlug('json-to-csv')!;
  const [input, setInput] = useState(tool.sampleInput);

  const csvRes = jsonToCsv(input);
  const validation = validateJson(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste a JSON array of objects or single object.',
        'The converter extracts unique property keys into RFC 4180 CSV columns.',
        'Download the generated CSV file for Excel or Google Sheets.',
      ]}
      useCases={[
        'Exporting database API responses to CSV spreadsheets.',
        'Converting JSON data dumps for statistical analysis.',
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="JSON Input (Array of Objects)"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            errorLine={validation.line}
          />

          <OutputViewer
            label="RFC 4180 CSV Output"
            value={csvRes.result}
            filename="export.csv"
            mimeType="text/csv"
          />
        </div>

        {csvRes.error && <ValidationError error={csvRes.error} line={validation.line} column={validation.column} />}
      </div>
    </ToolLayout>
  );
}
