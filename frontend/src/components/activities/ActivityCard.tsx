import React from 'react';
import {
  Footprints,
  Bike,
  Waves,
  Dumbbell,
  Flame,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import type { Activity, Sport } from '../../types/activity';
import { SPORT_LABELS } from '../../utils/scoring';

interface ActivityCardProps {
  activity: Activity;
  onDelete?: (activity: Activity) => void;
  isDeleting?: boolean;
}

const getSportIcon = (sport: Sport) => {
  switch (sport) {
    case 'RUNNING':
      return {
        icon: TrendingUp,
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      };
    case 'WALKING':
      return {
        icon: Footprints,
        bg: 'bg-lime-500/10 text-[#c3f400] border-lime-500/20',
      };
    case 'CYCLING':
      return {
        icon: Bike,
        bg: 'bg-green-500/10 text-green-400 border-green-500/20',
      };
    case 'SWIMMING':
      return {
        icon: Waves,
        bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      };
    case 'GYM':
      return {
        icon: Dumbbell,
        bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      };
    case 'DAILY_STEPS':
      return {
        icon: Flame,
        bg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      };
    default:
      return {
        icon: Footprints,
        bg: 'bg-[#2a2a2a] text-white border-[#393939]',
      };
  }
};

const formatActivityTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  if (isToday) {
    return `Today, ${timeStr}`;
  }
  if (isYesterday) {
    return `Yesterday, ${timeStr}`;
  }

  const dayName = date.toLocaleDateString([], { weekday: 'short' });
  return `${dayName}, ${timeStr}`;
};

const formatValueDisplay = (activity: Activity) => {
  if (activity.unit === 'KM') {
    return `${Number(activity.value).toFixed(1)} km`;
  }
  if (activity.unit === 'MINUTES') {
    return `${Math.round(activity.value)} min`;
  }
  if (activity.unit === 'STEPS') {
    return `${Number(activity.value).toLocaleString()} steps`;
  }
  return `${activity.value}`;
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onDelete,
  isDeleting = false,
}) => {
  const config = getSportIcon(activity.sport);
  const Icon = config.icon;
  const timeFormatted = formatActivityTime(activity.recordedAt || activity.createdAt);
  const sportLabel = SPORT_LABELS[activity.sport] || activity.sport;

  return (
    <div className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-200 shadow-xs">
      {/* Left: Icon & Info */}
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${config.bg} shadow-inner`}
        >
          <Icon size={22} />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate font-display">
            {sportLabel}
          </h3>
          <p className="text-xs sm:text-sm text-[#9fa38c] truncate flex items-center gap-1.5 mt-0.5">
            <span>{timeFormatted}</span>
          </p>
        </div>
      </div>

      {/* Right: Metric & Points */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <div className="text-base sm:text-lg font-extrabold text-white font-display">
            {formatValueDisplay(activity)}
          </div>
          <div className="text-xs sm:text-sm font-black text-[#c3f400] font-display tracking-tight">
            + {activity.points.toLocaleString()} PTS
          </div>
        </div>

        {/* Delete button (permanently visible) */}
        {onDelete && (
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onDelete(activity)}
            title="Delete activity"
            aria-label="Delete activity"
            className="p-2 rounded-xl bg-[#201f1f] text-[#8e9379] hover:text-red-400 hover:bg-red-500/10 border border-[#2a2a2a] hover:border-red-500/30 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
