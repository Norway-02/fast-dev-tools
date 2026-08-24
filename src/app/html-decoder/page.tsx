'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { decodeHtml } from '@/lib/tools/encoding';

export default function HtmlDecoderPage() {
  const tool = getToolBySlug('html-decoder')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = decodeHtml(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste HTML entity references (&amp;, &lt;, &gt;, &quot;, &#x2F;).',
        'Entities are decoded using pure text mapping without innerHTML or DOM script execution.',
        'Copy or download the plain text output.',
      ]}
      useCases={[
        'Unescaping HTML entities extracted from XML or database content.',
        'Reading human-readable text from HTML entity encoded feeds.',
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Encoded HTML Entity Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
          />

          <OutputViewer
            label="Decoded Plain Text Output"
            value={res.result}
            filename="decoded-html.txt"
          />
        </div>

        {res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
