import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Trophy, Flame, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { scrollToSection } from '../../utils/scroll';
import heroAthleteImg from '../../assets/hero-athlete.jpg';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-cyber-grid bg-cyber-radial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── Left Copy ── */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Season Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-low border border-surface-high text-[11px] font-bold tracking-widest text-on-surface-variant uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-lime animate-pulse" />
              <span>SEASON 4 NOW LIVE</span>
            </div>

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
                onClick={() => scrollToSection('global-arena')}
                className="px-7 py-3.5 rounded-full bg-surface-low hover:bg-outline-divider text-white border border-outline-card hover:border-outline-hover font-bold text-sm tracking-tight inline-flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <span>View Leaderboard</span>
                <Trophy size={16} className="text-on-surface-variant" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3.5 pt-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                {[
                  { color: 'text-primary-lime', bg: 'bg-surface-high' },
                  { color: 'text-emerald-400', bg: 'bg-outline-medium' },
                  { color: 'text-teal-300', bg: 'bg-surface-bright' },
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className={`inline-flex h-8 w-8 rounded-full ring-2 ring-surface items-center justify-center text-xs font-bold ${avatar.bg} ${avatar.color}`}
                  >
                    <User size={14} />
                  </div>
                ))}
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wide text-on-surface-muted uppercase">
                <span className="text-primary-lime font-black mr-1">142,384</span>{' '}
                ATHLETES ACTIVE TODAY
              </div>
            </div>
          </div>

          {/* ── Right Hero Visual ── */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] rounded-3xl p-2 bg-gradient-to-b from-surface-high/60 via-surface-low/80 to-surface border border-outline-medium/80 shadow-elevation-deep backdrop-blur-sm overflow-hidden group">
              {/* Tech UI Header */}
              <div className="px-4 py-2.5 border-b border-surface-high flex items-center justify-between text-[11px] font-mono text-on-surface-label bg-surface-inset/90">
                <div className="flex gap-4">
                  <span className="text-primary-lime font-bold cursor-pointer">
                    Telemetry
                  </span>
                  <span className="hover:text-white cursor-pointer">Biometrics</span>
                  <span className="hover:text-white cursor-pointer">Sensors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-lime animate-ping" />
                  <span className="text-[10px] text-primary-lime">SYNCED</span>
                </div>
              </div>

              {/* Athlete Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-surface-void">
                <img
                  src={heroAthleteImg}
                  alt="FitQuest Futuristic Cybernetic Athlete"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Corner Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary-lime" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary-lime" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary-lime" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary-lime" />

                {/* Streak HUD Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-4 sm:bottom-4 bg-surface-card/90 border border-outline-medium backdrop-blur-md rounded-2xl p-3.5 sm:px-5 sm:py-3.5 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                  <div className="w-11 h-11 rounded-xl bg-surface-container border border-primary-lime/40 flex items-center justify-center text-primary-lime shadow-glow-sm shrink-0">
                    <Flame size={22} className="fill-primary-lime/20" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-on-surface-label">
                      CURRENT STREAK
                    </div>
                    <div className="text-2xl font-black font-display text-white tracking-tight leading-none mt-0.5">
                      42{' '}
                      <span className="text-primary-lime text-lg font-bold">Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
