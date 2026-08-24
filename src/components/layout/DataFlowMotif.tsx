'use client';

import React from 'react';

export function DataFlowMotif() {
  const steps = [
    { label: 'Input', color: 'bg-emerald-400', glow: 'shadow-[0_0_8px_rgba(52,211,153,0.6)]' },
    { label: 'Process', color: 'bg-sky-400', glow: 'shadow-[0_0_8px_rgba(56,189,248,0.6)]' },
    { label: 'Validate', color: 'bg-violet-400', glow: 'shadow-[0_0_8px_rgba(139,92,246,0.6)]' },
    { label: 'Result', color: 'bg-emerald-400', glow: 'shadow-[0_0_8px_rgba(52,211,153,0.6)]' },
  ];

  return (
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0C111B]/90 border border-[#1E293B] font-mono text-[11px] text-slate-400 shadow-md">
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${step.color} ${step.glow}`} />
            <span className="text-slate-300 font-semibold">{step.label}</span>
          </div>

          {idx < steps.length - 1 && (
            <div className="w-6 h-[1px] bg-gradient-to-r from-slate-700 via-emerald-500/40 to-slate-700 relative">
              <div className="absolute -top-[1px] left-0 w-1.5 h-[3px] bg-emerald-400/80 rounded-full animate-ping opacity-75" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
