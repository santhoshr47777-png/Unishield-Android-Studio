import React from 'react';
import { ScreenTab } from '../types';

interface NavigationProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  alertCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  alertCount = 7,
}) => {
  const tabs = [
    { id: 'overview' as ScreenTab, label: 'OVERVIEW', icon: 'shield' },
    { id: 'alerts' as ScreenTab, label: 'ALERTS', icon: 'warning', badge: alertCount },
    { id: 'analysis' as ScreenTab, label: 'ANALYSIS', icon: 'radar' },
    { id: 'telemetry' as ScreenTab, label: 'TELEMETRY', icon: 'query_stats' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-[#0a0e17]/90 backdrop-blur-xl border-t border-[#31353f]/60 shadow-[0_-4px_24px_rgba(0,0,0,0.7)]"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] flex-1 transition-all duration-150 relative ${
                isActive
                  ? 'text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] scale-105'
                  : 'text-[#bac9cc] hover:text-[#dfe2ef]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">
                  {tab.icon}
                </span>
                {tab.badge ? (
                  <span className="absolute -top-1 -right-2.5 min-w-[16px] h-[16px] px-1 bg-[#93000a] text-[#ffe7e6] font-data-token text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,51,75,0.7)] border border-[#ffb4ab]/40">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="font-label-caps text-[10px] mt-1 uppercase font-semibold tracking-wider">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-[#00e5ff] rounded-full shadow-[0_0_6px_#00e5ff]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
