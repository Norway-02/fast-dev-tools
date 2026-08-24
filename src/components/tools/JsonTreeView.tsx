'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export interface JsonTreeNodeProps {
  data: unknown;
  name?: string;
  isLast?: boolean;
  defaultExpanded?: boolean;
  depth?: number;
}

const MAX_TREE_DEPTH = 15;
const MAX_ARRAY_ITEMS_DISPLAY = 100;

export function JsonTreeNode({ data, name, isLast = true, defaultExpanded = true, depth = 0 }: JsonTreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded && depth < 4);
  const [showAllItems, setShowAllItems] = useState(false);

  if (depth > MAX_TREE_DEPTH) {
    return (
      <div className="font-mono text-xs py-0.5 text-amber-400 italic">
        [Maximum Tree Depth Reached ({MAX_TREE_DEPTH})]
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="font-mono text-xs py-0.5 flex items-center gap-1">
        {name && <span className="text-indigo-300 font-semibold">{name}:</span>}
        <span className="text-slate-500 font-bold">null</span>
        {!isLast && <span className="text-slate-600">,</span>}
      </div>
    );
  }

  if (typeof data === 'boolean') {
    return (
      <div className="font-mono text-xs py-0.5 flex items-center gap-1">
        {name && <span className="text-indigo-300 font-semibold">{name}:</span>}
        <span className="text-amber-400 font-bold">{data ? 'true' : 'false'}</span>
        {!isLast && <span className="text-slate-600">,</span>}
      </div>
    );
  }

  if (typeof data === 'number') {
    return (
      <div className="font-mono text-xs py-0.5 flex items-center gap-1">
        {name && <span className="text-indigo-300 font-semibold">{name}:</span>}
        <span className="text-cyan-400 font-bold">{data}</span>
        {!isLast && <span className="text-slate-600">,</span>}
      </div>
    );
  }

  if (typeof data === 'string') {
    return (
      <div className="font-mono text-xs py-0.5 flex items-start gap-1 break-all">
        {name && <span className="text-indigo-300 font-semibold shrink-0">{name}:</span>}
        <span className="text-emerald-400">&quot;{data}&quot;</span>
        {!isLast && <span className="text-slate-600 shrink-0">,</span>}
      </div>
    );
  }

  if (Array.isArray(data)) {
    const isEmpty = data.length === 0;
    const itemsToRender = showAllItems ? data : data.slice(0, MAX_ARRAY_ITEMS_DISPLAY);
    const hasMore = data.length > MAX_ARRAY_ITEMS_DISPLAY && !showAllItems;

    return (
      <div className="font-mono text-xs py-0.5">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-800/40 rounded px-1 -ml-1 transition-colors" onClick={() => !isEmpty && setExpanded(!expanded)}>
          {!isEmpty && (
            <span className="text-slate-400">
              {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
          )}
          {name && <span className="text-indigo-300 font-semibold">{name}:</span>}
          <span className="text-slate-400">[</span>
          {!expanded && !isEmpty && <span className="text-slate-500 text-[10px] px-1 bg-slate-800 rounded">...{data.length} items</span>}
          {isEmpty && <span className="text-slate-400">]</span>}
          {!isLast && !expanded && <span className="text-slate-600">,</span>}
        </div>

        {expanded && !isEmpty && (
          <div className="pl-4 border-l border-slate-800 ml-1.5 my-0.5">
            {itemsToRender.map((item, idx) => (
              <JsonTreeNode key={idx} data={item} isLast={idx === itemsToRender.length - 1 && !hasMore} defaultExpanded={defaultExpanded} depth={depth + 1} />
            ))}
            {hasMore && (
              <button
                onClick={() => setShowAllItems(true)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold my-1 block"
              >
                + Show all {data.length} items
              </button>
            )}
          </div>
        )}

        {expanded && !isEmpty && (
          <div className="flex items-center gap-1 text-slate-400">
            <span>]</span>
            {!isLast && <span className="text-slate-600">,</span>}
          </div>
        )}
      </div>
    );
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data as Record<string, unknown>);
    const isEmpty = keys.length === 0;

    return (
      <div className="font-mono text-xs py-0.5">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-800/40 rounded px-1 -ml-1 transition-colors" onClick={() => !isEmpty && setExpanded(!expanded)}>
          {!isEmpty && (
            <span className="text-slate-400">
              {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
          )}
          {name && <span className="text-indigo-300 font-semibold">{name}:</span>}
          <span className="text-slate-400">&#123;</span>
          {!expanded && !isEmpty && <span className="text-slate-500 text-[10px] px-1 bg-slate-800 rounded">...{keys.length} keys</span>}
          {isEmpty && <span className="text-slate-400">&#125;</span>}
          {!isLast && !expanded && <span className="text-slate-600">,</span>}
        </div>

        {expanded && !isEmpty && (
          <div className="pl-4 border-l border-slate-800 ml-1.5 my-0.5">
            {keys.map((key, idx) => (
              <JsonTreeNode
                key={key}
                name={key}
                data={(data as Record<string, unknown>)[key]}
                isLast={idx === keys.length - 1}
                defaultExpanded={defaultExpanded}
                depth={depth + 1}
              />
            ))}
          </div>
        )}

        {expanded && !isEmpty && (
          <div className="flex items-center gap-1 text-slate-400">
            <span>&#125;</span>
            {!isLast && <span className="text-slate-600">,</span>}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export function JsonTreeView({ data }: { data: unknown }) {
  const [expandAll, setExpandAll] = useState(true);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-950/80 border-b border-slate-800">
        <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
          <span>JSON Tree Explorer</span>
          <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
            Max Depth {MAX_TREE_DEPTH} • Virtual Windowing Active
          </span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpandAll(true)}
            className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandAll(false)}
            className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-950/90 overflow-x-auto min-h-[18rem] max-h-[36rem]">
        <JsonTreeNode data={data} defaultExpanded={expandAll} key={String(expandAll)} />
      </div>
    </div>
  );
}
