import React from 'react';
import { Dumbbell } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      badge: 'w-9 h-9 rounded-xl',
      iconSize: 18,
      textSize: 'text-xl',
    },
    md: {
      badge: 'w-11 h-11 rounded-xl',
      iconSize: 22,
      textSize: 'text-2xl',
    },
    lg: {
      badge: 'w-16 h-16 rounded-2xl',
      iconSize: 30,
      textSize: 'text-4xl md:text-5xl',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Dumbbell Badge */}
      <div
        className={`${currentSize.badge} bg-[#201f1f]/90 border border-[#333333] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform hover:scale-105 shrink-0`}
      >
        <Dumbbell
          className="text-[#c3f400] rotate-[-45deg]"
          size={currentSize.iconSize}
          strokeWidth={2.4}
        />
      </div>

      {showText && (
        <span
          className={`${currentSize.textSize} font-black text-white tracking-tight font-display drop-shadow-md`}
        >
          FitQuest
        </span>
      )}
    </div>
  );
};
