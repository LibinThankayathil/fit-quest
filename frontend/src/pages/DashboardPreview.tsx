import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, LogOut, Flame, Trophy, Activity, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

export const DashboardPreview: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);
      await logout();
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[#2a2a2a] bg-[#1c1b1b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#201f1f] border border-[#333333] flex items-center justify-center shadow-[0_0_15px_rgba(195,244,0,0.2)]">
              <Dumbbell className="text-[#c3f400] rotate-[-45deg]" size={20} />
            </div>
            <span className="text-xl font-extrabold font-display tracking-tight text-white">
              FitQuest
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-white">
                {user ? `${user.firstName} ${user.lastName}` : 'Athlete'}
              </span>
              <span className="text-xs text-[#9fa38c]">
                {user?.email || 'athlete@fitquest.com'}
              </span>
            </div>
            <Button
              variant="secondary"
              fullWidth={false}
              onClick={handleLogout}
              isLoading={isLoggingOut}
              className="py-2 px-3.5 text-xs sm:text-sm flex items-center gap-2"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {/* Welcome Banner */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#1c1b1b] via-[#201f1f] to-[#1a2205] border border-[#2a2a2a] p-6 sm:p-8 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c3f400]/10 border border-[#c3f400]/20 text-[#c3f400] text-xs font-bold uppercase tracking-wider mb-4">
                <Zap size={14} />
                <span>Authentication Successful</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-2">
                Welcome to the Squad, {user?.firstName || 'Athlete'}!
              </h1>
              <p className="text-sm sm:text-base text-[#9fa38c]">
                Your FitQuest account is active. Log in and registration pipelines are fully operational.
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Flame size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8e9379] uppercase tracking-wider">Streak</div>
                <div className="text-2xl font-black text-white font-display">1 Day</div>
              </div>
            </div>

            <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#c3f400]/10 border border-[#c3f400]/20 text-[#c3f400] flex items-center justify-center shrink-0">
                <Activity size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8e9379] uppercase tracking-wider">Status</div>
                <div className="text-2xl font-black text-[#c3f400] font-display">Active</div>
              </div>
            </div>

            <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Trophy size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8e9379] uppercase tracking-wider">Rank</div>
                <div className="text-2xl font-black text-white font-display">Novice</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
