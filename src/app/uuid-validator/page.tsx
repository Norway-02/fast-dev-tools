'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { validateUuid } from '@/lib/tools/uuid';
import { CheckCircle, XCircle } from 'lucide-react';

export default function UuidValidatorPage() {
  const tool = getToolBySlug('uuid-validator')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = validateUuid(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste a 36-character hyphenated UUID or 32-character hyphenless hex string into the editor.',
        'The validator inspects structural syntax, variant bits (RFC 4122 / DCE 1.1), and version nibbles.',
        'Inspect structural validity, version classification (v1-v5), and variant compliance.',
      ]}
      useCases={[
        'Verifying whether database keys are structurally valid UUID v4 tokens.',
        'Checking variant compliance for RFC 4122 interoperability.',
      ]}
    >
      <div className="space-y-4">
        {input.trim() && (
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 font-mono text-xs ${
              res.isValidSyntax
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}
          >
            {res.isValidSyntax ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <div className="flex-1 space-y-1">
              <div className="font-bold text-sm flex items-center justify-between">
                <span>{res.isValidSyntax ? 'Valid Structural Syntax' : 'Invalid UUID Format'}</span>
                {res.isValidRfc4122 && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                    RFC 4122 Compliant
                  </span>
                )}
              </div>
              {res.isValidSyntax && (
                <div className="flex flex-wrap gap-4 text-emerald-400/90 text-[11px] pt-1">
                  <span>Version: <strong>{res.version}</strong></span>
                  <span>Variant: <strong>{res.variant}</strong></span>
                  <span>Format: <strong>{res.format}</strong></span>
                </div>
              )}
            </div>
          </div>
        )}

        <CodeEditor
          label="UUID Input String"
          value={input}
          onChange={setInput}
          onClear={() => setInput('')}
          onSample={() => setInput(tool.sampleInput)}
          minHeight="h-32"
        />

        {!res.isValidSyntax && res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
