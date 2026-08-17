import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flame, Trophy, Activity, Zap, ArrowRight } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';

export const DashboardPreview: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: activities } = useActivities();

  const totalPoints = activities?.reduce((sum, act) => sum + act.points, 0) || 0;
  const activityCount = activities?.length || 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#1c1b1b] via-[#201f1f] to-[#1a2205] border border-[#2a2a2a] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c3f400]/10 border border-[#c3f400]/20 text-[#c3f400] text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={14} />
            <span>Ready for Action</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-2">
            Welcome back, {user?.firstName || 'Athlete'}!
          </h1>
          <p className="text-sm sm:text-base text-[#9fa38c]">
            Track your workouts, earn points, and climb the leaderboard.
          </p>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Flame size={24} />
          </div>
          <div>
            <div className="text-xs font-bold text-[#8e9379] uppercase tracking-wider">Total Points</div>
            <div className="text-2xl font-black text-white font-display">
              {totalPoints.toLocaleString()} PTS
            </div>
          </div>
        </div>

        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c3f400]/10 border border-[#c3f400]/20 text-[#c3f400] flex items-center justify-center shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-xs font-bold text-[#8e9379] uppercase tracking-wider">Activities Logged</div>
            <div className="text-2xl font-black text-[#c3f400] font-display">{activityCount}</div>
          </div>
        </div>

        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-xs font-bold text-[#8e9379] uppercase tracking-wider">Rank Tier</div>
            <div className="text-2xl font-black text-white font-display">Elite 42</div>
          </div>
        </div>
      </div>

      {/* Quick Action Card to Activities */}
      <div className="p-6 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white font-display">Activity Tracking</h3>
          <p className="text-xs sm:text-sm text-[#9fa38c] mt-0.5">
            Log your workouts, runs, rides, and swims to earn FitQuest points.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/activities')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c3f400] text-[#161e00] font-bold text-sm hover:bg-[#abd600] transition-colors cursor-pointer shrink-0"
        >
          <span>Go to Activities</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
