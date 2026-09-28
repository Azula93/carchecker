import React from 'react';

interface EscaneAppLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const EscaneAppLogo: React.FC<EscaneAppLogoProps> = ({
  className = '',
  theme = 'light',
  size = 'md',
  showTagline = false,
}) => {
  const isDark = theme === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10 sm:w-11 sm:h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Badge */}
      <div
        className={`${iconSizes[size]} rounded-xl flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-105 shadow-xs shrink-0 ${
          isDark
            ? 'bg-[#123B5D] border border-white/15'
            : 'bg-[#123B5D] border border-[#123B5D]'
        }`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          {/* Outer Scanner Reticle Corners */}
          <path
            d="M6 11V8C6 6.89543 6.89543 6 8 6H11"
            stroke="#8BCF3F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M21 6H24C25.1046 6 26 6.89543 26 8V11"
            stroke="#8BCF3F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M26 21V24C26 25.1046 25.1046 26 24 26H21"
            stroke="#8BCF3F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M11 26H8C6.89543 26 6 25.1046 6 24V21"
            stroke="#8BCF3F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Central Diagnostic Lens / E-Scan Dot */}
          <circle cx="16" cy="16" r="3.5" fill="#8BCF3F" />
          <path
            d="M12 16H13M19 16H20"
            stroke="#8BCF3F"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-tight ${textSizes[size]} ${
            isDark ? 'text-white' : 'text-[#123B5D]'
          }`}
          style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
        >
          Escane<span className="text-[#8BCF3F]">App</span>
        </span>
        {showTagline && (
          <span
            className={`text-[10px] sm:text-[11px] font-medium tracking-normal mt-0.5 ${
              isDark ? 'text-slate-300' : 'text-[#66727D]'
            }`}
          >
            Escanea antes de comprar.
          </span>
        )}
      </div>
    </div>
  );
};
