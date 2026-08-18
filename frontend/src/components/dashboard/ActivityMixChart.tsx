import React from 'react';
import type { ActivityMixItem } from '../../utils/dashboardAnalytics';

interface ActivityMixChartProps {
  items: ActivityMixItem[];
  totalActivitiesCount?: number;
}

export const ActivityMixChart: React.FC<ActivityMixChartProps> = ({
  items,
  totalActivitiesCount = 0,
}) => {
  // SVG Donut metrics
  const radius = 68;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="p-6 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] shadow-xs flex flex-col justify-between space-y-6">
      {/* Header */}
      <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
        Your Activity Mix
      </h3>

      {/* Donut Chart Container */}
      <div className="relative flex items-center justify-center my-1">
        <svg
          width="170"
          height="170"
          viewBox="0 0 170 170"
          className="rotate-[-90deg] overflow-visible"
        >
          {/* Background Track */}
          <circle
            cx="85"
            cy="85"
            r={radius}
            fill="transparent"
            stroke="#262626"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {items.map((item, idx) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += item.percentage;

            return (
              <circle
                key={idx}
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            );
          })}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-black text-white font-display tracking-tight">
            {totalActivitiesCount > 0 ? `${items[0]?.percentage || 100}%` : '100%'}
          </span>
          <span className="text-[11px] font-semibold text-[#8e9379] uppercase tracking-wider">
            {totalActivitiesCount > 0 ? items[0]?.label || 'Effort' : 'Effort'}
          </span>
        </div>
      </div>

      {/* Legend List (2 columns matching design) */}
      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-2">
        {items.slice(0, 4).map((item) => (
          <div key={item.sport} className="flex items-center gap-2 text-xs font-medium text-[#c4c9ac]">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate">
              {item.label} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
