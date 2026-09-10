'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { analyzeText } from '@/lib/tools/text';
import { recordRecentTool } from '@/components/tools/RecentTools';

export default function WordCounterPage() {
  const tool = getToolBySlug('word-counter')!;
  const [input, setInput] = useState(tool.sampleInput);

  React.useEffect(() => {
    recordRecentTool('word-counter');
  }, []);

  const stats = analyzeText(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Type or paste text into the editor input.',
        'Word, character, sentence, line, and reading time stats update in real-time.',
        'Uses Unicode word boundary algorithms for accurate international text counting.',
      ]}
      useCases={[
        'Checking character and word limits for SEO metadata, blogs, and posts.',
        'Analyzing paragraph counts and speech duration for documentation.',
        'Verifying text length before submitting forms or documentation.',
      ]}
    >
      <div className="space-y-6">
        {/* Real-time Stats Grid Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <StatBox label="Words" value={stats.words} color="text-[#34D399]" />
          <StatBox label="Characters" value={stats.characters} color="text-[#38BDF8]" />
          <StatBox label="Chars (No Spaces)" value={stats.charactersNoSpaces} color="text-slate-200" />
          <StatBox label="Lines" value={stats.lines} color="text-purple-400" />
          <StatBox label="Sentences" value={stats.sentences} color="text-amber-400" />
          <StatBox label="Reading Time" value={`~${stats.readingTimeMinutes} min`} color="text-emerald-400" />
        </div>

        {/* Text Input Editor */}
        <CodeEditor
          label="Text Input"
          value={input}
          onChange={setInput}
          onClear={() => setInput('')}
          onSample={() => setInput(tool.sampleInput)}
          onSubmit={() => {}}
          submitLabel="Analyze"
        />
      </div>
    </ToolLayout>
  );
}

function StatBox({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="p-4 bg-[#0C111B] border border-[#1E293B] rounded-xl text-center space-y-1 shadow-md">
      <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold">{label}</div>
      <div className={`text-xl font-extrabold font-mono ${color}`}>{value}</div>
    </div>
  );
}
