'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { generateUuids } from '@/lib/tools/uuid';
import { recordRecentTool } from '@/components/tools/RecentTools';
import { RefreshCw } from 'lucide-react';

export default function UuidGeneratorPage() {
  const tool = getToolBySlug('uuid-generator')!;
  const [version, setVersion] = useState<'v4' | 'v7'>('v4');
  const [count, setCount] = useState<number>(10);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  React.useEffect(() => {
    recordRecentTool('uuid-generator');
  }, []);

  const uuids = generateUuids({ version, count, uppercase, hyphens });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const outputText = React.useMemo(() => uuids.join('\n'), [uuids, version, count, uppercase, hyphens, refreshSeed]);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Select UUID version: UUID v4 (random cryptographically secure) or UUID v7 (time-ordered).',
        'Choose quantity (up to 1,000 UUIDs) and format options (uppercase, hyphens).',
        'Click Generate New UUIDs to refresh using Web Crypto API random bytes.',
      ]}
      useCases={[
        'Generating time-ordered primary keys (UUID v7) for database records.',
        'Bulk generating mock UUID v4 identifiers for API test suites.',
        'Creating correlation IDs for distributed tracing.',
      ]}
    >
      <div className="space-y-4">
        {/* Controls Toolbar */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 font-mono text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">Version:</span>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value as 'v4' | 'v7')}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-[#34D399]"
                >
                  <option value="v4">UUID v4 (Random)</option>
                  <option value="v7">UUID v7 (Time-Ordered)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">Quantity:</span>
                <select
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-[#34D399]"
                >
                  <option value={1}>1 UUID</option>
                  <option value={5}>5 UUIDs</option>
                  <option value={10}>10 UUIDs</option>
                  <option value={25}>25 UUIDs</option>
                  <option value={50}>50 UUIDs</option>
                  <option value={100}>100 UUIDs</option>
                  <option value={500}>500 UUIDs</option>
                  <option value={1000}>1,000 UUIDs</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-[#34D399] focus:ring-[#34D399]"
                />
                <span>Uppercase</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-[#34D399] focus:ring-[#34D399]"
                />
                <span>Include Hyphens</span>
              </label>
            </div>

            <button
              onClick={() => setRefreshSeed((prev) => prev + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#34D399] hover:bg-emerald-400 text-[#04110A] font-bold rounded-lg transition-colors shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate New UUIDs</span>
            </button>
          </div>
        </div>

        <OutputViewer
          label={`Generated ${version.toUpperCase()} UUIDs (${uuids.length})`}
          value={outputText}
          filename={`uuids-${version}.txt`}
          minHeight="h-80"
        />
      </div>
    </ToolLayout>
  );
}
