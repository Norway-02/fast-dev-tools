'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { JsonTreeView } from '@/components/tools/JsonTreeView';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { decodeJwt } from '@/lib/tools/jwt';
import { ShieldAlert, Clock } from 'lucide-react';

export default function JwtDecoderPage() {
  const tool = getToolBySlug('jwt-decoder')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = decodeJwt(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste a JSON Web Token (encoded as header.payload.signature) into the editor.',
        'The tool decodes Base64URL header and payload parts locally in your browser.',
        'Inspect claim fields (subject, issuer, issued at, expiration time).',
      ]}
      useCases={[
        'Debugging OAuth2 / OpenID Connect access tokens and ID tokens.',
        'Inspecting custom claim attributes during backend API development.',
      ]}
    >
      <div className="space-y-6">
        {/* Prominent Security Notice */}
        <div className="p-4 bg-amber-950/40 border border-amber-900/60 rounded-xl flex items-start gap-3 text-xs font-mono text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-sm text-amber-300">Security Disclaimer</span>
            <p className="text-amber-200/90 leading-relaxed">{res.securityNotice}</p>
          </div>
        </div>

        {/* Input Area */}
        <CodeEditor
          label="Encoded JWT Token Input"
          value={input}
          onChange={setInput}
          onClear={() => setInput('')}
          onSample={() => setInput(tool.sampleInput)}
          placeholder="Paste JWT string here (e.g. eyJhbGci...)"
          minHeight="h-36"
        />

        {/* Decoding Results */}
        {res.isValid ? (
          <div className="space-y-6">
            {/* Header & Token Summary */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-4">
                <span>Algorithm: <strong className="text-indigo-400">{res.algorithm || 'Unknown'}</strong></span>
                <span>Type: <strong className="text-indigo-400">{res.type || 'JWT'}</strong></span>
              </div>

              {res.isExpired !== null && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-bold ${
                    res.isExpired
                      ? 'bg-rose-950/60 text-rose-300 border-rose-800'
                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{res.isExpired ? 'TOKEN EXPIRED' : 'TOKEN ACTIVE'}</span>
                </div>
              )}
            </div>

            {/* Claims Breakdown Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Header JSON */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  JOSE Header
                </h3>
                {res.header && <JsonTreeView data={res.header} />}
              </div>

              {/* Payload Claims JSON */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Payload Claims
                </h3>
                {res.payload && <JsonTreeView data={res.payload} />}
              </div>
            </div>

            {/* Signature Component */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-semibold">Raw Signature Component:</div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-rose-400 break-all">
                {res.signature}
              </div>
            </div>
          </div>
        ) : (
          <ValidationError error={res.error} />
        )}
      </div>
    </ToolLayout>
  );
}
