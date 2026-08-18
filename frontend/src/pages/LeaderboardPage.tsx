import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardPodium } from '../components/leaderboard/LeaderboardPodium';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import type { LeaderboardTimeframe } from '../types/leaderboard';
import { Search } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('this_month');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useLeaderboard(timeframe);

  const leaderboardList = useMemo(() => data?.leaderboard || [], [data]);

  // Filter by search query if provided
  const filteredAthletes = useMemo(() => {
    if (!searchQuery.trim()) return leaderboardList;
    const q = searchQuery.toLowerCase();
    return leaderboardList.filter(
      (athlete) =>
        athlete.firstName.toLowerCase().includes(q) ||
        athlete.lastName.toLowerCase().includes(q) ||
        athlete.displayName.toLowerCase().includes(q)
    );
  }, [leaderboardList, searchQuery]);

  const topThree = useMemo(() => {
    if (searchQuery.trim()) return [];
    return filteredAthletes.slice(0, 3);
  }, [filteredAthletes, searchQuery]);

  const remainingAthletes = useMemo(() => {
    if (searchQuery.trim()) return filteredAthletes;
    return filteredAthletes.slice(3);
  }, [filteredAthletes, searchQuery]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Page Header + Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title and Subtitle */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Global Leaderboard
          </h1>
          <p className="text-sm sm:text-base text-[#9fa38c] mt-1">
            See how you stack up against the FitQuest community.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center p-1 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] self-start md:self-auto">
          <button
            type="button"
            onClick={() => setTimeframe('this_week')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              timeframe === 'this_week'
                ? 'bg-[#282828] text-white shadow-xs'
                : 'text-[#8e9379] hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('this_month')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              timeframe === 'this_month'
                ? 'bg-[#282828] text-white shadow-xs'
                : 'text-[#8e9379] hover:text-white'
            }`}
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('all_time')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              timeframe === 'all_time'
                ? 'bg-[#282828] text-white shadow-xs'
                : 'text-[#8e9379] hover:text-white'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Athlete Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e9379]" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search athletes..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] focus:border-[#c3f400] text-sm text-white placeholder-[#8e9379] outline-hidden transition-colors"
        />
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-56 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
          <div className="h-80 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
        </div>
      ) : (
        <>
          {/* Top 3 Podium (Shown when not searching) */}
          {topThree.length > 0 && <LeaderboardPodium topAthletes={topThree} />}

          {/* Leaderboard Table */}
          <div className="space-y-3">
            <LeaderboardTable
              athletes={remainingAthletes}
              currentUserId={user?.id}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
