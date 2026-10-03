import React from 'react';
import Image from 'next/image';

interface EscaneAppLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'full' | 'horizontal' | 'icon' | 'vertical';
  alt?: string;
  priority?: boolean;
}

export const EscaneAppLogo: React.FC<EscaneAppLogoProps> = ({
  className = '',
  theme = 'light',
  size = 'md',
  showTagline = false,
  variant = 'full',
  alt = 'EscaneApp — Analiza, Compara, Decide',
  priority = false,
}) => {
  const isDark = theme === 'dark';

  let src = '/escaneapp-logo-horizontal.png';
  let width = 995;
  let height = 198;

  if (variant === 'icon') {
    src = isDark ? '/escaneapp-isotipo-white.png' : '/escaneapp-isotipo.png';
    width = 272;
    height = 182;
  } else if (variant === 'vertical') {
    src = isDark ? '/escaneapp-logo-vertical-white.png' : '/escaneapp-logo-vertical.png';
    width = 244;
    height = 152;
  } else if (showTagline || variant === 'full') {
    src = isDark ? '/escaneapp-logo-white.png' : '/escaneapp-logo-principal.png';
    width = 998;
    height = 201;
  } else {
    src = isDark ? '/escaneapp-logo-horizontal-white.png' : '/escaneapp-logo-horizontal.png';
    width = 995;
    height = 198;
  }

  // Dimension classes based on size
  const heightClasses = {
    sm: showTagline || variant === 'full' ? 'h-7 w-auto' : variant === 'vertical' ? 'h-10 w-auto' : variant === 'icon' ? 'h-7 w-auto' : 'h-6 w-auto',
    md: showTagline || variant === 'full' ? 'h-9 sm:h-10 w-auto' : variant === 'vertical' ? 'h-14 sm:h-16 w-auto' : variant === 'icon' ? 'h-8 sm:h-9 w-auto' : 'h-7 sm:h-8 w-auto',
    lg: showTagline || variant === 'full' ? 'h-11 sm:h-12 w-auto' : variant === 'vertical' ? 'h-18 sm:h-20 w-auto' : variant === 'icon' ? 'h-10 sm:h-11 w-auto' : 'h-9 sm:h-10 w-auto',
    xl: showTagline || variant === 'full' ? 'h-16 w-auto' : variant === 'vertical' ? 'h-24 w-auto' : variant === 'icon' ? 'h-14 w-auto' : 'h-12 w-auto',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`object-contain ${heightClasses[size]} transition-transform duration-200 group-hover:scale-[1.02]`}
      />
    </div>
  );
};
