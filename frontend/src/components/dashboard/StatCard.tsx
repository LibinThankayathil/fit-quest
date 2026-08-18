import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  iconColor?: string;
  label: string;
  value: string | number;
  subValue?: string;
  isPositiveTrend?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  iconColor = 'text-[#c3f400]',
  label,
  value,
  subValue,
  isPositiveTrend,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-200 shadow-xs flex flex-col justify-between space-y-4">
      {/* Header with Icon and Label */}
      <div className="flex items-center gap-2">
        <Icon size={18} className={iconColor} />
        <span className="text-[11px] font-bold text-[#8e9379] tracking-wider uppercase">
          {label}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          {value}
        </div>

        {/* Subtitle / Trend */}
        {subValue && (
          <div
            className={`text-xs font-semibold tracking-tight ${
              isPositiveTrend
                ? 'text-[#4ae183]'
                : isPositiveTrend === false
                ? 'text-red-400'
                : 'text-[#8e9379]'
            }`}
          >
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
};
