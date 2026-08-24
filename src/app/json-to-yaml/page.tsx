'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { jsonToYaml } from '@/lib/tools/yaml';
import { validateJson } from '@/lib/tools/json';

export default function JsonToYamlPage() {
  const tool = getToolBySlug('json-to-yaml')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = jsonToYaml(input);
  const validation = validateJson(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your JSON data into the input editor.',
        'The converter translates JSON object/array structures to clean YAML format.',
        'Copy or download the generated YAML file.',
      ]}
      useCases={[
        'Converting JSON configurations to YAML for Docker, Kubernetes, or GitHub Actions.',
        'Exporting data structures to readable multiline YAML format.',
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="JSON Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            errorLine={validation.line}
          />

          <OutputViewer
            label="YAML Output"
            value={res.result}
            filename="config.yaml"
            mimeType="text/yaml"
          />
        </div>

        {res.error && <ValidationError error={res.error} line={validation.line} column={validation.column} />}
      </div>
    </ToolLayout>
  );
}
