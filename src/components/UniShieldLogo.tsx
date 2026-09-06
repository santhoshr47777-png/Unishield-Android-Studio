import React, { useState } from 'react';

interface UniShieldLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
}

export const UniShieldLogo: React.FC<UniShieldLogoProps> = ({
  className = '',
  size = 'md',
  showGlow = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // Size mappings
  const dimensionMap = {
    sm: { container: 'w-7 h-7', icon: 20 },
    md: { container: 'w-9 h-9', icon: 26 },
    lg: { container: 'w-11 h-11', icon: 32 },
    xl: { container: 'w-16 h-16', icon: 48 },
  };

  const currentSize = dimensionMap[size] || dimensionMap.md;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-lg bg-gradient-to-br from-[#131b2b] via-[#0d131f] to-[#080d16] border border-[#00e5ff]/40 ${
        showGlow ? 'shadow-[0_0_14px_rgba(0,229,255,0.3)]' : ''
      } ${currentSize.container} ${className}`}
      id="unishield-brand-emblem"
    >
      {/* Corner cyber ticks for military/tactical aesthetic */}
      <span className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-[#00e5ff]/70 pointer-events-none" />
      <span className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-[#00e5ff]/70 pointer-events-none" />
      <span className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-[#00e5ff]/70 pointer-events-none" />
      <span className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-[#00e5ff]/70 pointer-events-none" />

      {/* Crisp, high-definition SVG Tactical Cyber Shield */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_0_6px_rgba(0,229,255,0.6)]"
      >
        <defs>
          <linearGradient id="shieldBorderGrad" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c3f5ff" />
            <stop offset="40%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0055ff" />
          </linearGradient>

          <linearGradient id="shieldBodyGrad" x1="18" y1="4" x2="18" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#0044aa" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020814" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="corePulseGrad" x1="13" y1="12" x2="23" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0052cc" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="18" cy="18" r="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Center Glow */}
        <circle cx="18" cy="17" r="9" fill="url(#centerGlow)" />

        {/* Outer Shield Shell */}
        <path
          d="M18 3.5L7 7.8V17.2C7 24.1 11.6 30.4 18 32.5C24.4 30.4 29 24.1 29 17.2V7.8L18 3.5Z"
          fill="url(#shieldBodyGrad)"
          stroke="url(#shieldBorderGrad)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* Inner Tactical Chamfers */}
        <path
          d="M18 6.5L10 10V17C10 22.3 13.4 27.2 18 29C22.6 27.2 26 22.3 26 17V10L18 6.5Z"
          fill="none"
          stroke="#00e5ff"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="2 1.5"
        />

        {/* Neural Node Connections / AI Matrix Lines */}
        <line x1="18" y1="11" x2="18" y2="15" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="19" x2="18" y2="17" stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="22" y1="19" x2="18" y2="17" stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="18" y1="19" x2="18" y2="24" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" />

        {/* AI Core Emblem - Central Diamond & Spark */}
        <polygon
          points="18,13.5 22,17 18,20.5 14,17"
          fill="url(#corePulseGrad)"
          stroke="#c3f5ff"
          strokeWidth="0.8"
        />

        {/* Center Photon Core */}
        <circle cx="18" cy="17" r="1.5" fill="#ffffff" />

        {/* Top/Bottom Micro Nodes */}
        <circle cx="18" cy="10.5" r="1" fill="#00e5ff" />
        <circle cx="13" cy="19.5" r="1" fill="#00e5ff" />
        <circle cx="23" cy="19.5" r="1" fill="#00e5ff" />
        <circle cx="18" cy="24.5" r="1" fill="#00e5ff" />
      </svg>
    </div>
  );
};
