import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../hooks/useActivities';
import { useLeaderboard } from '../hooks/useLeaderboard';
import {
  calculateTotalPoints,
  calculateStreak,
} from '../utils/dashboardAnalytics';
import {
  calculateAthleteLevel,
  calculateDivisionTier,
  formatPointsCompact,
  calculateFavoriteSport,
  calculateTrophyStatus,
} from '../utils/profileAnalytics';
import {
  MapPin,
  TrendingUp,
  Bike,
  Dumbbell,
  Waves,
  Footprints,
  Flame,
  Star,
  Award,
} from 'lucide-react';
import type { Sport } from '../types/activity';
import athleteAvatar from '../assets/hero-athlete.jpg';

const getSportIcon = (sport?: Sport, size = 20) => {
  switch (sport) {
    case 'RUNNING':
      return <TrendingUp size={size} className="text-[#c3f400]" />;
    case 'CYCLING':
      return <Bike size={size} className="text-[#4ae183]" />;
    case 'SWIMMING':
      return <Waves size={size} className="text-[#22d3ee]" />;
    case 'GYM':
      return <Dumbbell size={size} className="text-[#f8d8ff]" />;
    case 'WALKING':
    case 'DAILY_STEPS':
      return <Footprints size={size} className="text-[#fb923c]" />;
    default:
      return <TrendingUp size={size} className="text-[#c3f400]" />;
  }
};

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { data: activities = [], isLoading: activitiesLoading } = useActivities();
  const { data: leaderboardData, isLoading: leaderboardLoading } = useLeaderboard('all_time');

  // Compute dynamic stats
  const totalPoints = useMemo(() => calculateTotalPoints(activities), [activities]);
  const streak = useMemo(() => calculateStreak(activities), [activities]);
  const level = useMemo(() => calculateAthleteLevel(totalPoints), [totalPoints]);
  const divisionTier = useMemo(() => calculateDivisionTier(totalPoints), [totalPoints]);
  const favoriteSport = useMemo(() => calculateFavoriteSport(activities), [activities]);

  const userRank = useMemo(() => {
    if (!leaderboardData?.leaderboard || !user?.id) return null;
    const entry = leaderboardData.leaderboard.find((item) => item.userId === user.id);
    return entry ? entry.rank : null;
  }, [leaderboardData, user?.id]);

  const trophies = useMemo(
    () => calculateTrophyStatus(activities, totalPoints, streak, userRank),
    [activities, totalPoints, streak, userRank]
  );

  if (activitiesLoading || leaderboardLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-48 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 h-72 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
          <div className="lg:col-span-8 h-72 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. Top Profile Header Banner */}
      <div className="rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] p-6 sm:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-xl">
        {/* Left: Avatar & Identity */}
        <div className="flex items-center gap-5">
          {/* Avatar Container with LVL Badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#333333] bg-[#201f1f] shadow-lg">
              <img
                src={athleteAvatar}
                alt="Athlete Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dynamic Level Badge at bottom center */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#201f1f] border border-[#333333] shadow-md">
              <span className="text-[11px] font-black text-[#c3f400] tracking-wider uppercase font-display">
                LVL {level}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-1.5 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display truncate">
              {user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Athlete'}
            </h1>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#8e9379]">
              <MapPin size={14} className="text-[#8e9379]" />
              <span>{divisionTier}, Global</span>
            </div>
          </div>
        </div>

        {/* Right: 4 Dynamic Metric Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Stat 1: Total Points */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col justify-between min-w-[100px]">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#8e9379] uppercase tracking-wider">
              TOTAL POINTS
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#c3f400] font-display mt-1">
              {formatPointsCompact(totalPoints)}
            </span>
          </div>

          {/* Stat 2: Current Rank */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col justify-between min-w-[100px]">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#8e9379] uppercase tracking-wider">
              CURRENT RANK
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
              {userRank ? `#${userRank}` : 'Unranked'}
            </span>
          </div>

          {/* Stat 3: Activities Count */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col justify-between min-w-[100px]">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#8e9379] uppercase tracking-wider">
              ACTIVITIES
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
              {activities.length}
            </span>
          </div>

          {/* Stat 4: Active Streak */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col justify-between min-w-[100px]">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#4ae183] uppercase tracking-wider">
              ACTIVE STREAK
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-display mt-1 flex items-baseline gap-1">
              <span>{streak}</span>
              <span className="text-xs font-semibold text-[#8e9379]">days</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Favorite Activity + Trophy Cabinet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Favorite Activity Card */}
        <div className="lg:col-span-4 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] p-6 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between z-10">
            <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
              Favorite Activity
            </h3>
            {favoriteSport && (
              <div className="w-8 h-8 rounded-full bg-[#2a3800] border border-[#3c4d00] flex items-center justify-center shrink-0">
                {getSportIcon(favoriteSport.sport, 16)}
              </div>
            )}
          </div>

          {/* Center Info */}
          {favoriteSport ? (
            <div className="flex flex-col items-center text-center space-y-3 z-10 my-auto">
              <div className="w-16 h-16 rounded-full bg-[#201f1f] flex items-center justify-center text-[#c3f400]">
                {getSportIcon(favoriteSport.sport, 36)}
              </div>
              <h4 className="text-2xl font-black text-white font-display tracking-tight">
                {favoriteSport.label}
              </h4>
              <p className="text-xs text-[#8e9379] max-w-[220px]">
                Your primary mode of moving. {favoriteSport.percentage}% of all logged activities.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-2 z-10 my-auto py-6">
              <Footprints size={36} className="text-[#8e9379]" />
              <h4 className="text-lg font-bold text-white font-display">No Activities Yet</h4>
              <p className="text-xs text-[#8e9379] max-w-[200px]">
                Log your first workout to uncover your favorite sport.
              </p>
            </div>
          )}

          {/* Footer Metric */}
          <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs z-10">
            <span className="font-bold text-[#8e9379] uppercase tracking-wider">
              {favoriteSport ? favoriteSport.metricLabel : 'LIFETIME DISTANCE'}
            </span>
            <span className="font-black text-white font-display text-sm">
              {favoriteSport ? favoriteSport.metricValue : '0 km'}
            </span>
          </div>
        </div>

        {/* Trophy Cabinet Card */}
        <div className="lg:col-span-8 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] p-6 flex flex-col justify-between space-y-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
              Trophy Cabinet
            </h3>
          </div>

          {/* 4 Trophy Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-auto">
            {/* Trophy 1: First Activity */}
            <div className="p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-[#1c1b1b] border border-[#333333] flex items-center justify-center">
                <Footprints size={20} className="text-[#c4c9ac]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block truncate">
                  {trophies[0]?.title}
                </span>
                <span className="text-[11px] text-[#8e9379] block mt-0.5">
                  {trophies[0]?.subtitle}
                </span>
              </div>
            </div>

            {/* Trophy 2: 7 Day Streak */}
            <div className="p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-[#0a3520] border border-[#14532d] flex items-center justify-center">
                <Flame size={20} className="text-[#4ae183]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block truncate">
                  {trophies[1]?.title}
                </span>
                <span
                  className={`text-[11px] font-semibold block mt-0.5 ${
                    trophies[1]?.isUnlocked ? 'text-[#4ae183]' : 'text-[#8e9379]'
                  }`}
                >
                  {trophies[1]?.subtitle}
                </span>
              </div>
            </div>

            {/* Trophy 3: Top 10 */}
            <div className="p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a3800] border border-[#3c4d00] flex items-center justify-center">
                <Award size={20} className="text-[#c3f400]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block truncate">
                  {trophies[2]?.title}
                </span>
                <span className="text-[11px] text-[#8e9379] block mt-0.5">
                  {trophies[2]?.subtitle}
                </span>
              </div>
            </div>

            {/* Trophy 4: 1K Points */}
            <div className="p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-[#2a2233] border border-[#4a3b59] flex items-center justify-center">
                <Star size={20} className="text-[#f8d8ff]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block truncate">
                  {trophies[3]?.title}
                </span>
                <span className="text-[11px] text-[#8e9379] block mt-0.5">
                  {trophies[3]?.subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
