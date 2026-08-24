'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { generateUuids } from '@/lib/tools/uuid';
import { RefreshCw } from 'lucide-react';

export default function UuidGeneratorPage() {
  const tool = getToolBySlug('uuid-generator')!;
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const uuids = generateUuids({ count, uppercase, hyphens });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const outputText = React.useMemo(() => uuids.join('\n'), [uuids, count, uppercase, hyphens, refreshSeed]);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Select the quantity of UUIDs to generate (1 to 100).',
        'Configure format toggles (uppercase vs lowercase, hyphens included or omitted).',
        'Click Generate New UUIDs to refresh using Web Crypto API random bytes.',
      ]}
      useCases={[
        'Generating primary keys for database seed scripts.',
        'Creating mock request IDs or correlation tokens for API testing.',
      ]}
    >
      <div className="space-y-4">
        {/* Controls Toolbar */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 font-mono text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">Quantity:</span>
                <select
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value={1}>1 UUID</option>
                  <option value={5}>5 UUIDs</option>
                  <option value={10}>10 UUIDs</option>
                  <option value={25}>25 UUIDs</option>
                  <option value={50}>50 UUIDs</option>
                  <option value={100}>100 UUIDs</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Uppercase</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Include Hyphens</span>
              </label>
            </div>

            <button
              onClick={() => setRefreshSeed((prev) => prev + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-indigo-600/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate New UUIDs</span>
            </button>
          </div>
        </div>

        <OutputViewer
          label={`Generated v4 UUIDs (${uuids.length})`}
          value={outputText}
          filename="uuids.txt"
          minHeight="h-80"
        />
      </div>
    </ToolLayout>
  );
}
