'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { encodeBase64 } from '@/lib/tools/encoding';

export default function Base64EncoderPage() {
  const tool = getToolBySlug('base64-encoder')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = encodeBase64(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Enter plain text, source code, or UTF-8 Unicode characters.',
        'The encoder processes text using TextEncoder and btoa with full UTF-8 support.',
        'Copy or download the Base64 encoded string.',
      ]}
      useCases={[
        'Encoding authorization credentials for Basic Auth headers.',
        'Embedding small images or data URIs in HTML/CSS.',
        'Safely transmitting non-ASCII strings over binary-restricted channels.',
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Plain Text Input (UTF-8 Safe)"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
          />

          <OutputViewer
            label="Base64 Encoded Result"
            value={res.result}
            filename="encoded.txt"
          />
        </div>

        {res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
