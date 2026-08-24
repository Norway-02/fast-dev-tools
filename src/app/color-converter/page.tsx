'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CopyButton } from '@/components/tools/CopyButton';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { convertColor } from '@/lib/tools/color';


export default function ColorConverterPage() {
  const tool = getToolBySlug('color-converter')!;
  const [input, setInput] = useState(tool.sampleInput);

  const res = convertColor(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Enter any color value in HEX (#fff or #ffffff), RGB(a), or HSL(a) format.',
        'View live color swatch preview and instant conversions across HEX, RGB, HSL, and CMYK.',
        'Copy CSS declarations directly into your stylesheet.',
      ]}
      useCases={[
        'Converting HEX color codes to RGB or HSL for CSS variable opacity modifiers.',
        'Converting web RGB colors to CMYK values for print design workflows.',
      ]}
    >
      <div className="space-y-6">
        {/* Color Input */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
          <label className="block font-bold text-slate-200">Enter Color Code (HEX, RGB, HSL):</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. #3b82f6 or rgb(59, 130, 246)"
              className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-sm font-semibold focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Color Preview & Converted Results */}
        {res.isValid && res.values ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* Visual Color Preview Card */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center space-y-4">
              <div
                className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-slate-800 transition-all"
                style={{ backgroundColor: res.values.formatted.rgba }}
              />
              <div className="text-center space-y-1">
                <span className="font-extrabold text-slate-100 text-sm">{res.values.formatted.hex}</span>
                <p className="text-[11px] text-slate-400">{res.values.formatted.rgba}</p>
              </div>
            </div>

            {/* Converted Values Grid */}
            <div className="md:col-span-2 space-y-3">
              {/* HEX */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">HEX Format</span>
                  <span className="text-indigo-400 font-bold text-sm">{res.values.formatted.hex}</span>
                </div>
                <CopyButton text={res.values.formatted.hex} />
              </div>

              {/* RGB / RGBA */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">RGB / RGBA Format</span>
                  <span className="text-emerald-400 font-bold text-sm">{res.values.formatted.rgba}</span>
                </div>
                <CopyButton text={res.values.formatted.rgba} />
              </div>

              {/* HSL / HSLA */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">HSL / HSLA Format</span>
                  <span className="text-cyan-400 font-bold text-sm">{res.values.formatted.hsla}</span>
                </div>
                <CopyButton text={res.values.formatted.hsla} />
              </div>

              {/* CMYK */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">CMYK Format (Print)</span>
                  <span className="text-amber-400 font-bold text-sm">{res.values.formatted.cmyk}</span>
                </div>
                <CopyButton text={res.values.formatted.cmyk} />
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
