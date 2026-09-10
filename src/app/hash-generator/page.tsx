'use client';

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { CopyButton } from '@/components/tools/CopyButton';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { computeAllHashes, AllHashesResult } from '@/lib/tools/hash';
import { recordRecentTool } from '@/components/tools/RecentTools';
import { AlertTriangle, Upload, File } from 'lucide-react';

export default function HashGeneratorPage() {
  const tool = getToolBySlug('hash-generator')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<AllHashesResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    recordRecentTool('hash-generator');
  }, []);

  useEffect(() => {
    let active = true;

    const processHashes = async () => {
      if (file) {
        try {
          const buffer = await file.arrayBuffer();
          const sha256Buf = await crypto.subtle.digest('SHA-256', buffer);
          const sha384Buf = await crypto.subtle.digest('SHA-384', buffer);
          const sha512Buf = await crypto.subtle.digest('SHA-512', buffer);
          const sha1Buf = await crypto.subtle.digest('SHA-1', buffer);

          const toHex = (buf: ArrayBuffer) =>
            Array.from(new Uint8Array(buf))
              .map((b) => b.toString(16).padStart(2, '0'))
              .join('');

          if (active) {
            setHashes({
              sha256: { algorithm: 'SHA-256', hex: toHex(sha256Buf), hexUpper: toHex(sha256Buf).toUpperCase(), base64: '' },
              sha384: { algorithm: 'SHA-384', hex: toHex(sha384Buf), hexUpper: toHex(sha384Buf).toUpperCase(), base64: '' },
              sha512: { algorithm: 'SHA-512', hex: toHex(sha512Buf), hexUpper: toHex(sha512Buf).toUpperCase(), base64: '' },
              sha1: { algorithm: 'SHA-1', hex: toHex(sha1Buf), hexUpper: toHex(sha1Buf).toUpperCase(), base64: '', warning: 'SHA-1 is deprecated' },
            });
            setError(null);
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          if (active) setError(`File hashing error: ${msg}`);
        }
        return;
      }

      if (!input) {
        if (active) setHashes(null);
        return;
      }

      try {
        const res = await computeAllHashes(input);
        if (active) {
          setHashes(res);
          setError(null);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (active) {
          setError(msg);
          setHashes(null);
        }
      }
    };

    processHashes();

    return () => {
      active = false;
    };
  }, [input, file]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Type/paste text string OR drag-and-drop a local file for checksum hashing.',
        'The Web Crypto API (`crypto.subtle.digest`) computes SHA-256, SHA-384, SHA-512, and SHA-1 hashes locally.',
        'Copy Hex digests with one click. Files process 100% locally and are never uploaded.',
      ]}
      useCases={[
        'Verifying local file checksums against published release digests.',
        'Computing SHA-256 hashes for API authentication headers.',
        'Generating cache key identifiers for build artifacts.',
      ]}
    >
      <div className="space-y-6">
        {/* File Drop & Upload Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="p-6 bg-[#0C111B] border-2 border-dashed border-[#1E293B] hover:border-[#34D399]/50 rounded-2xl text-center space-y-3 transition-all"
        >
          <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#34D399]">
            <Upload className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-slate-200">
              Drag & Drop a local file here to compute cryptographic checksums
            </p>
            <p className="text-[11px] text-slate-500 font-sans">
              100% In-Browser Execution. File data is processed in memory and never uploaded.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#101B2B] hover:bg-[#162338] border border-slate-800 rounded-xl text-xs font-mono text-[#34D399] cursor-pointer">
            <File className="w-3.5 h-3.5" /> Select Local File
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </label>

          {file && (
            <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
              <span>Active File: {file.name} ({Math.round(file.size / 1024)} KB)</span>
              <button
                onClick={() => setFile(null)}
                className="text-rose-400 underline hover:text-rose-300 text-[11px]"
              >
                Clear File
              </button>
            </div>
          )}
        </div>

        {/* Input Text String */}
        {!file && (
          <CodeEditor
            label="Or Input Text String"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            minHeight="h-28"
          />
        )}

        {error && <ValidationError error={error} />}

        {hashes && (
          <div className="space-y-4 font-mono text-xs">
            {/* SHA-256 */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#34D399] text-sm">SHA-256</span>
                <span className="text-slate-500">256-bit digest</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-emerald-300 break-all">
                <span>{hashes.sha256.hex}</span>
                <CopyButton text={hashes.sha256.hex} />
              </div>
            </div>

            {/* SHA-384 */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#38BDF8] text-sm">SHA-384</span>
                <span className="text-slate-500">384-bit digest</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-sky-300 break-all">
                <span>{hashes.sha384.hex}</span>
                <CopyButton text={hashes.sha384.hex} />
              </div>
            </div>

            {/* SHA-512 */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 text-sm">SHA-512</span>
                <span className="text-slate-500">512-bit digest</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-purple-300 break-all">
                <span>{hashes.sha512.hex}</span>
                <CopyButton text={hashes.sha512.hex} />
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
                <span>{hashes.sha1.hex}</span>
                <CopyButton text={hashes.sha1.hex} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
