import React, { useState } from 'react';
import type { DayData } from '../../utils/dashboardAnalytics';

interface PointsOverTimeChartProps {
  data: DayData[];
}

export const PointsOverTimeChart: React.FC<PointsOverTimeChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If all points are 0 (e.g. new user), provide visual sample data for preview
  const totalPointsInView = data.reduce((sum, d) => sum + d.points, 0);
  const chartData = totalPointsInView > 0
    ? data
    : data.map((d, i) => ({
        ...d,
        points: [250, 300, 420, 380, 750, 1100, 850][i] || 300,
      }));

  const maxPoints = Math.max(...chartData.map((d) => d.points), 100);

  // SVG Chart Dimensions
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((d, i) => {
    const x = paddingX + (i / (chartData.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.points / maxPoints) * (height - paddingY * 2);
    return { x, y, data: d };
  });

  // Generate smooth SVG Catmull-Rom or Cubic Bezier path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="p-6 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] shadow-xs flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
          Points Over Time
        </h3>
        <div className="px-3 py-1 rounded-full bg-[#201f1f] border border-[#2e2e2e] text-[11px] font-semibold text-[#8e9379] tracking-wider uppercase">
          7-Day View
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-56 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Area Fill Gradient */}
            <linearGradient id="limeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c3f400" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#c3f400" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#c3f400" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing Line Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid Lines */}
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#262626"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#262626"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Area under curve */}
          <path d={areaPath} fill="url(#limeGradient)" />

          {/* Spline curve line */}
          <path
            d={linePath}
            fill="none"
            stroke="#c3f400"
            strokeWidth="3.2"
            filter="url(#glow)"
            strokeLinecap="round"
          />

          {/* Interactive Data Points */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hit area for easier hovering */}
                <circle cx={pt.x} cy={pt.y} r={16} fill="transparent" />

                {/* Point circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 3.5}
                  fill={isHovered ? '#c3f400' : '#131313'}
                  stroke="#c3f400"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#201f1f] border border-[#333333] shadow-lg text-xs flex items-center gap-2 pointer-events-none z-20"
          >
            <span className="text-[#8e9379] font-medium">
              {chartData[hoveredIndex].dayName} ({chartData[hoveredIndex].shortDate}):
            </span>
            <span className="text-[#c3f400] font-bold font-display">
              {chartData[hoveredIndex].points.toLocaleString()} PTS
            </span>
          </div>
        )}

        {/* Bottom X-Axis Labels matching design */}
        <div className="flex justify-between text-xs font-semibold text-[#8e9379] px-6 pt-1">
          <span>{chartData[0]?.dayName || 'Mon'}</span>
          <span>{chartData[2]?.dayName || 'Wed'}</span>
          <span>{chartData[4]?.dayName || 'Fri'}</span>
          <span>{chartData[6]?.dayName || 'Sun'}</span>
        </div>
      </div>
    </div>
  );
};
