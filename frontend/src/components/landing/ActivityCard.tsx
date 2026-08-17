import React from 'react';

export interface ActivityCardProps {
  /** Lucide icon element */
  icon: React.ReactNode;
  /** Card title (e.g., "Running") */
  title: string;
  /** Short description */
  description: string;
  /** Rate string (e.g., "150 Pts / Km") */
  rate: string;
  /** Tailwind bg class for the icon container (e.g., "bg-[#222718]") */
  iconBg: string;
  /** Tailwind border class for the icon container */
  iconBorder: string;
  /** Tailwind text-color class for the title on hover */
  hoverTitleColor: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  icon,
  title,
  description,
  rate,
  iconBg,
  iconBorder,
  hoverTitleColor,
}) => {
  return (
    <div className="bg-surface-card border border-outline-card hover:border-outline-strong rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] card-ambient-glow group">
      <div>
        <div
          className={`w-12 h-12 rounded-xl ${iconBg} ${iconBorder} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <h3
          className={`text-xl font-bold font-display text-white mb-2 ${hoverTitleColor} transition-colors`}
        >
          {title}
        </h3>
        <p className="text-sm text-on-surface-muted leading-relaxed mb-6">
          {description}
        </p>
      </div>
      <div className="pt-4 border-t border-outline-divider flex items-center justify-between text-xs font-semibold">
        <span className="text-on-surface-dim tracking-wider uppercase">
          BASE RATE
        </span>
        <span className="text-primary-lime font-black text-sm tracking-tight">
          {rate}
        </span>
      </div>
    </div>
  );
};
