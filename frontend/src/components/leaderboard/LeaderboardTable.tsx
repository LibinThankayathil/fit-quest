import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Bike,
  Dumbbell,
  Waves,
  Footprints,
  Flame,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { LeaderboardEntry } from '../../types/leaderboard';

interface LeaderboardTableProps {
  athletes: LeaderboardEntry[];
  currentUserId?: string;
}

const getActivityIcon = (sport?: string) => {
  switch (sport) {
    case 'RUNNING':
      return <TrendingUp size={15} className="text-[#c3f400]" />;
    case 'CYCLING':
      return <Bike size={15} className="text-[#4ae183]" />;
    case 'SWIMMING':
      return <Waves size={15} className="text-[#22d3ee]" />;
    case 'GYM':
      return <Dumbbell size={15} className="text-[#f8d8ff]" />;
    case 'WALKING':
    case 'DAILY_STEPS':
      return <Footprints size={15} className="text-[#fb923c]" />;
    default:
      return <Flame size={15} className="text-[#c3f400]" />;
  }
};

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  athletes,
  currentUserId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleAthletes = isExpanded ? athletes : athletes.slice(0, 10);

  if (athletes.length === 0) {
    return (
      <div className="rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] p-12 text-center text-[#8e9379]">
        No athletes found for this timeframe.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[#2a2a2a] text-[11px] font-bold text-[#8e9379] uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6 w-16 text-center">Rank</th>
              <th className="py-3.5 px-4 sm:px-6">User</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Points</th>
              <th className="py-3.5 px-4 sm:px-6 text-center">Change</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Recent Activity</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#262626]">
            {visibleAthletes.map((athlete) => {
              const isCurrent =
                athlete.isCurrentUser || (currentUserId && athlete.userId === currentUserId);

              return (
                <tr
                  key={athlete.userId}
                  className={`transition-colors duration-150 ${
                    isCurrent
                      ? 'bg-[#22290d]/60 border-l-4 border-l-[#c3f400] hover:bg-[#22290d]/80'
                      : 'hover:bg-[#201f1f]/50'
                  }`}
                >
                  {/* Rank */}
                  <td className="py-4 px-4 sm:px-6 text-center">
                    <span
                      className={`font-black font-display text-sm sm:text-base ${
                        isCurrent ? 'text-[#c3f400]' : 'text-white'
                      }`}
                    >
                      {athlete.rank}
                    </span>
                  </td>

                  {/* User Profile Info */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full bg-[#201f1f] flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCurrent
                            ? 'border-2 border-[#c3f400] text-[#c3f400]'
                            : 'border border-[#3a3a3a] text-white'
                        }`}
                      >
                        {athlete.firstName[0]}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-sm font-bold truncate ${
                            isCurrent ? 'text-white' : 'text-[#e5e2e1]'
                          }`}
                        >
                          {athlete.displayName || athlete.firstName}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-extrabold text-[#c3f400] uppercase tracking-wider">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <span
                      className={`font-black font-display text-sm sm:text-base ${
                        isCurrent ? 'text-[#c3f400]' : 'text-white'
                      }`}
                    >
                      {athlete.points.toLocaleString()}
                    </span>
                  </td>

                  {/* Change Indicator */}
                  <td className="py-4 px-4 sm:px-6 text-center">
                    {athlete.change > 0 ? (
                      <div className="inline-flex items-center gap-0.5 text-xs font-bold text-[#4ae183]">
                        <TrendingUp size={13} />
                        <span>{athlete.change}</span>
                      </div>
                    ) : athlete.change < 0 ? (
                      <div className="inline-flex items-center gap-0.5 text-xs font-bold text-red-400">
                        <TrendingDown size={13} />
                        <span>{Math.abs(athlete.change)}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center text-xs font-bold text-[#8e9379]">
                        <Minus size={13} />
                        <Minus size={13} className="-ml-1" />
                      </div>
                    )}
                  </td>

                  {/* Recent Activity Badge */}
                  <td className="py-4 px-4 sm:px-6 text-right">
                    {athlete.recentActivity ? (
                      <div className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-[#c4c9ac]">
                        {getActivityIcon(athlete.recentActivity.sport)}
                        <span>{athlete.recentActivity.label}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8e9379]">--</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Expand / Collapse Footer Button */}
      {athletes.length > 10 && (
        <div className="p-3 bg-[#191919] border-t border-[#262626] text-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8e9379] hover:text-white transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-[#222222]"
          >
            <span>{isExpanded ? 'Show Less' : 'Load More'}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      )}
    </div>
  );
};
