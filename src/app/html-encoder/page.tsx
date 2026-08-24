'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { encodeHtml } from '@/lib/tools/encoding';

export default function HtmlEncoderPage() {
  const tool = getToolBySlug('html-encoder')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = encodeHtml(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste HTML markup, text, or source code.',
        'Special characters (&, <, >, ", \', /) are converted to HTML entity references.',
        'Copy or download the safe encoded HTML string.',
      ]}
      useCases={[
        'Escaping user input before inserting into web pages to prevent XSS vulnerability.',
        'Displaying raw HTML code snippets inside code tags on websites.',
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Raw HTML / Code Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
          />

          <OutputViewer
            label="Encoded HTML Entity Output"
            value={res.result}
            filename="encoded-html.txt"
          />
        </div>

        {res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
