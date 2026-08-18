import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../hooks/useActivities';
import {
  calculateTotalPoints,
  calculateWeeklyStats,
  calculateStreak,
  calculate7DayPoints,
  calculateActivityMix,
  calculateQuestProgress,
} from '../utils/dashboardAnalytics';
import { StatCard } from '../components/dashboard/StatCard';
import { PointsOverTimeChart } from '../components/dashboard/PointsOverTimeChart';
import { ActivityMixChart } from '../components/dashboard/ActivityMixChart';
import { RecentActivitiesList } from '../components/dashboard/RecentActivitiesList';
import { QuestCard } from '../components/dashboard/QuestCard';
import { Star, Zap, Award, Flame } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { data: activities = [], isLoading } = useActivities();

  // Compute live analytics
  const totalPoints = useMemo(() => calculateTotalPoints(activities), [activities]);
  const weeklyStats = useMemo(() => calculateWeeklyStats(activities), [activities]);
  const streak = useMemo(() => calculateStreak(activities), [activities]);
  const sevenDayPoints = useMemo(() => calculate7DayPoints(activities), [activities]);
  const activityMix = useMemo(() => calculateActivityMix(activities), [activities]);
  const quest = useMemo(
    () => calculateQuestProgress(weeklyStats.countThisWeek),
    [weeklyStats.countThisWeek]
  );

  const displayTotalPoints = totalPoints;
  const displayActivitiesCount = activities.length;
  const displayWeeklyCount = weeklyStats.countThisWeek;
  const displayStreak = streak;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="w-64 h-8 bg-[#201f1f] rounded-lg" />
          <div className="w-48 h-4 bg-[#1c1b1b] rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-72 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
          <div className="lg:col-span-4 h-72 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Greeting Header matching mockup */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display flex items-center gap-2">
          <span>Hey, {user?.firstName || 'Athlete'}!</span>
          <span className="inline-block animate-wave">👋</span>
        </h1>
        <p className="text-sm sm:text-base text-[#9fa38c]">
          Ready to continue your quest?
        </p>
      </div>

      {/* Top Row: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          icon={Star}
          iconColor="text-[#c3f400]"
          label="TOTAL POINTS"
          value={displayTotalPoints.toLocaleString()}
          subValue={
            weeklyStats.percentageChange > 0
              ? `↗ +${weeklyStats.percentageChange}% this week`
              : weeklyStats.percentageChange < 0
              ? `↘ ${weeklyStats.percentageChange}% this week`
              : '0% this week'
          }
          isPositiveTrend={weeklyStats.percentageChange >= 0}
        />

        <StatCard
          icon={Zap}
          iconColor="text-[#c3f400]"
          label="ACTIVITIES"
          value={displayActivitiesCount}
          subValue={`${displayWeeklyCount} this week`}
        />

        <StatCard
          icon={Award}
          iconColor="text-[#c3f400]"
          label="CURRENT RANK"
          value={activities.length > 0 ? '#8' : '--'}
          subValue={activities.length > 0 ? '↑ 3 positions' : 'Unranked'}
          isPositiveTrend={activities.length > 0}
        />

        <StatCard
          icon={Flame}
          iconColor="text-[#fb923c]"
          label="CURRENT STREAK"
          value={`${displayStreak} ${displayStreak === 1 ? 'day' : 'days'}`}
        />
      </div>

      {/* Middle Row: Points Over Time + Activity Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Points Over Time (7-Day Area Chart) */}
        <div className="lg:col-span-8 flex">
          <div className="w-full">
            <PointsOverTimeChart data={sevenDayPoints} />
          </div>
        </div>

        {/* Activity Mix (Donut Chart) */}
        <div className="lg:col-span-4 flex">
          <div className="w-full">
            <ActivityMixChart
              items={activityMix}
              totalActivitiesCount={activities.length}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activities + Your Quest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Recent Activities Feed */}
        <RecentActivitiesList activities={activities} />

        {/* Quest Module */}
        <QuestCard
          progressPercentage={quest.progressPercentage}
          remainingCount={quest.remainingCount}
          bonusPoints={500}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
