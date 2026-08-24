'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { decodeBase64 } from '@/lib/tools/encoding';

export default function Base64DecoderPage() {
  const tool = getToolBySlug('base64-decoder')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = decodeBase64(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste a Base64 encoded string into the input editor.',
        'The decoder parses atob bytes and converts UTF-8 sequences safely using TextDecoder.',
        'View or copy the decoded plain text.',
      ]}
      useCases={[
        'Decoding Basic Auth headers (username:password).',
        'Inspecting encoded payload data in HTTP requests or logs.',
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Base64 Input String"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
          />

          <OutputViewer
            label="Decoded Plain Text Output"
            value={res.result}
            filename="decoded.txt"
          />
        </div>

        {res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
