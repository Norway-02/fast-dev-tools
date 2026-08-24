'use client';

import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Technical Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-[0.15]" />

      {/* Mint Soft Radial Glow */}
      <div
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] animate-glow-mint"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, rgba(6, 8, 13, 0) 70%)',
        }}
      />

      {/* Violet Soft Radial Glow */}
      <div
        className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full blur-[140px] animate-glow-violet"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(6, 8, 13, 0) 70%)',
        }}
      />
    </div>
  );
}
