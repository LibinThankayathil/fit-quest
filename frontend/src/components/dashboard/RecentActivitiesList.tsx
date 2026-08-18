import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, TrendingUp, Bike, Dumbbell, Footprints, Waves, Flame } from 'lucide-react';
import type { Activity, Sport } from '../../types/activity';
import { SPORT_LABELS } from '../../utils/scoring';

interface RecentActivitiesListProps {
  activities: Activity[];
}

const getSportIconConfig = (sport: Sport) => {
  switch (sport) {
    case 'RUNNING':
      return {
        icon: TrendingUp,
        bg: 'bg-[#2a3800] text-[#c3f400]',
      };
    case 'CYCLING':
      return {
        icon: Bike,
        bg: 'bg-[#0a3520] text-[#4ae183]',
      };
    case 'GYM':
      return {
        icon: Dumbbell,
        bg: 'bg-[#2a2a2a] text-[#e5e2e1]',
      };
    case 'WALKING':
      return {
        icon: Footprints,
        bg: 'bg-[#2a3800] text-[#c3f400]',
      };
    case 'SWIMMING':
      return {
        icon: Waves,
        bg: 'bg-[#002f38] text-[#22d3ee]',
      };
    case 'DAILY_STEPS':
      return {
        icon: Flame,
        bg: 'bg-[#3b1d0a] text-[#fb923c]',
      };
    default:
      return {
        icon: Footprints,
        bg: 'bg-[#2a2a2a] text-[#e5e2e1]',
      };
  }
};

const formatMetricDisplay = (activity: Activity) => {
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

export const RecentActivitiesList: React.FC<RecentActivitiesListProps> = ({ activities }) => {
  const navigate = useNavigate();

  // If no user activities, provide sample entries matching mockup for preview
  const displayActivities = activities.length > 0
    ? activities.slice(0, 3)
    : [
        { id: '1', sport: 'RUNNING' as Sport, unit: 'KM' as const, value: 5.4, points: 540, recordedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
        { id: '2', sport: 'CYCLING' as Sport, unit: 'KM' as const, value: 12.0, points: 300, recordedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
        { id: '3', sport: 'GYM' as Sport, unit: 'MINUTES' as const, value: 45, points: 225, recordedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
      ];

  return (
    <div className="p-6 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] shadow-xs flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
          Recent Activities
        </h3>
        <button
          type="button"
          onClick={() => navigate('/activities')}
          className="text-xs font-semibold text-[#c3f400] hover:text-[#abd600] transition-colors cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {displayActivities.map((act) => {
          const config = getSportIconConfig(act.sport);
          const Icon = config.icon;
          const label = SPORT_LABELS[act.sport] || act.sport;

          return (
            <div
              key={act.id}
              onClick={() => navigate('/activities')}
              className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-200 cursor-pointer"
            >
              {/* Left: Icon & Info */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}
                >
                  <Icon size={20} />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white font-display truncate group-hover:text-[#c3f400] transition-colors">
                    {label}
                  </span>
                  <span className="text-xs text-[#8e9379] truncate">
                    {formatMetricDisplay(act)}
                  </span>
                </div>
              </div>

              {/* Right: Points & Chevron */}
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-[#c3f400] font-display">
                  +{act.points} pts
                </span>
                <ChevronRight
                  size={16}
                  className="text-[#8e9379] group-hover:text-white group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
