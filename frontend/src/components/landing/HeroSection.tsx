import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import screenImg from '../../assets/screen.png';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-cyber-grid bg-cyber-radial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── Left Copy ── */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
              TURN EVERY WORKOUT <br />
              INTO A{' '}
              <span className="text-primary-lime drop-shadow-[0_0_25px_rgba(195,244,0,0.35)]">
                QUEST.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-on-surface-muted leading-relaxed max-w-xl">
              Stop exercising in the void. FitQuest unifies all your activities—from
              daily steps to heavy lifts—into a single, gamified progression system. Earn
              points, climb the ranks, and become elite.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate(user ? '/dashboard' : '/register')}
                className="px-7 py-3.5 rounded-full bg-primary-lime hover:bg-primary-lime-dim text-on-primary font-black text-sm tracking-tight inline-flex items-center gap-2 shadow-glow-lg transition-all cursor-pointer group"
              >
                <span>Start Your Quest</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                type="button"
                onClick={() => navigate('/leaderboard')}
                className="px-7 py-3.5 rounded-full bg-surface-low hover:bg-outline-divider text-white border border-outline-card hover:border-outline-hover font-bold text-sm tracking-tight inline-flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <span>View Leaderboard</span>
                <Trophy size={16} className="text-on-surface-variant" />
              </button>
            </div>
          </div>

          {/* ── Right Hero Visual ── */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-surface-high/60 via-surface-low/80 to-surface border border-outline-medium/80 shadow-elevation-deep backdrop-blur-md overflow-hidden group">
              {/* Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-lime/15 via-emerald-500/10 to-transparent rounded-3xl blur-xl opacity-75 pointer-events-none" />

              {/* Screen Image Frame */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-surface-void border border-outline-divider/50 shadow-2xl">
                <img
                  src={screenImg}
                  alt="FitQuest App Preview"
                  className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
