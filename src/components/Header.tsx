import React from 'react';
import { ASSETS } from '../data/mockData';
import { UniShieldLogo } from './UniShieldLogo';

interface HeaderProps {
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-[#0a0e17]/90 backdrop-blur-xl border-b border-[#31353f]/60 shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
      <div className="h-16 px-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Brand Logo & Status */}
        <div className="flex items-center gap-3">
          <UniShieldLogo size="md" showGlow={true} />
          <div className="flex flex-col select-none">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-[18px] text-[#dfe2ef] tracking-tight hover:text-[#00e5ff] transition-colors">
                UniShield
              </span>
              <span className="font-data-token text-[11px] font-bold text-[#00e5ff] bg-[#00e5ff]/15 px-1.5 py-0.5 rounded border border-[#00e5ff]/30 tracking-wider">
                AI
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
              </span>
              <span className="font-label-caps text-[9px] text-[#00e5ff] uppercase tracking-wider font-semibold">
                SYSTEM ARMED
              </span>
              <span className="text-[#31353f]">•</span>
              <span className="font-data-token text-[9px] text-[#bac9cc]">
                v2.4
              </span>
            </div>
          </div>
        </div>

        {/* Right: Telemetry feed & Profile avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-label-caps text-[9px] text-[#bac9cc] uppercase tracking-widest">
              API FEED
            </span>
            <span className="font-data-token text-[11px] text-[#00e5ff] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></span>
              ACTIVE
            </span>
          </div>

          <button
            onClick={onProfileClick}
            aria-label="SOC Analyst Profile"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-0.5 rounded-full border border-[#00e5ff]/40 hover:border-[#00e5ff] active:scale-95 transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)] group"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover group-hover:ring-2 group-hover:ring-[#00e5ff] transition-all"
              src={ASSETS.analystAvatar}
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
