'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getToolBySlug, ToolMetadata } from '@/lib/constants/tools-list';
import { History, ArrowRight } from 'lucide-react';

const RECENT_KEY = 'devpocket_recent_tools';
const MAX_RECENT = 5;

export function recordRecentTool(slug: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    let list: string[] = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(list)) list = [];

    // Store ONLY tool slug/identifier
    list = [slug, ...list.filter((s) => s !== slug)].slice(0, MAX_RECENT);

    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    // Fail silently if localStorage is restricted
  }
}

export function RecentTools() {
  const [recentTools, setRecentTools] = useState<ToolMetadata[]>([]);

  useEffect(() => {
    let active = true;

    const loadRecent = async () => {
      try {
        const raw = localStorage.getItem(RECENT_KEY);
        if (!raw) return;

        const list: string[] = JSON.parse(raw);
        if (Array.isArray(list)) {
          const tools = list
            .map((slug) => getToolBySlug(slug))
            .filter((t): t is ToolMetadata => Boolean(t));
          if (active) {
            setRecentTools(tools);
          }
        }
      } catch {
        if (active) {
          setRecentTools([]);
        }
      }
    };

    loadRecent();

    return () => {
      active = false;
    };
  }, []);

  if (recentTools.length === 0) return null;

  return (
    <div className="p-4 bg-[#0C111B] border border-[#1E293B] rounded-2xl space-y-3 shadow-lg">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
        <History className="w-4 h-4 text-[#34D399]" />
        <span>Recently Used Tools</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {recentTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="px-3 py-1.5 bg-[#101B2B] hover:bg-[#162338] border border-slate-800 hover:border-[#34D399]/40 rounded-xl text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-all"
          >
            <span>{tool.title}</span>
            <ArrowRight className="w-3 h-3 text-[#34D399]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
