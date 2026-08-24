'use client';

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { CopyButton } from '@/components/tools/CopyButton';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { computeAllHashes, AllHashesResult } from '@/lib/tools/hash';
import { AlertTriangle } from 'lucide-react';

export default function HashGeneratorPage() {
  const tool = getToolBySlug('hash-generator')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [hashes, setHashes] = useState<AllHashesResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!input) {
      return;
    }

    computeAllHashes(input)
      .then((res) => {
        if (active) {
          setHashes(res);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : String(err));
          setHashes(null);
        }
      });

    return () => {
      active = false;
    };
  }, [input]);

  const activeHashes = input ? hashes : null;

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Type or paste your text input into the editor.',
        'The Web Crypto API (`crypto.subtle.digest`) computes SHA-256, SHA-384, SHA-512, and SHA-1 hashes locally.',
        'Copy Hex or Base64 digests with one click.',
      ]}
      useCases={[
        'Verifying file checksums or API message digests.',
        'Generating cryptographic keys or content hashes for cache validation.',
      ]}
    >
      <div className="space-y-6">
        <CodeEditor
          label="Input Text String"
          value={input}
          onChange={setInput}
          onClear={() => setInput('')}
          onSample={() => setInput(tool.sampleInput)}
          minHeight="h-36"
        />

        {error && <ValidationError error={error} />}

        {activeHashes && (
          <div className="space-y-4 font-mono text-xs">
            {/* SHA-256 */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-400 text-sm">SHA-256</span>
                <span className="text-slate-500">256-bit digest</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-emerald-300 break-all">
                <span>{activeHashes.sha256.hex}</span>
                <CopyButton text={activeHashes.sha256.hex} />
              </div>
            </div>

            {/* SHA-384 */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-400 text-sm">SHA-384</span>
                <span className="text-slate-500">384-bit digest</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-indigo-300 break-all">
                <span>{activeHashes.sha384.hex}</span>
                <CopyButton text={activeHashes.sha384.hex} />
              </div>
            </div>

            {/* SHA-512 */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-400 text-sm">SHA-512</span>
                <span className="text-slate-500">512-bit digest</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-cyan-300 break-all">
                <span>{activeHashes.sha512.hex}</span>
                <CopyButton text={activeHashes.sha512.hex} />
              </div>
            </div>

            {/* SHA-1 */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>SHA-1</span>
                </span>
                <span className="text-amber-400 text-[11px]">Cryptographically Deprecated</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 break-all">
                <span>{activeHashes.sha1.hex}</span>
                <CopyButton text={activeHashes.sha1.hex} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
