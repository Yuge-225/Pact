'use client';

import { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A] p-4 overflow-hidden">
      <div className="relative w-[390px] h-[844px] bg-white rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.3)] overflow-hidden border-[6px] border-[#1A1A2E]">
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-black rounded-full z-30 pointer-events-none" />
        {/* Content */}
        <div className="h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black/15 rounded-full z-20 pointer-events-none" />
      </div>
    </div>
  );
}
