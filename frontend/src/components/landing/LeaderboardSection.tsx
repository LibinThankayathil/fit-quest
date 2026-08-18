import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footprints, Bike, Sparkles, Zap, User, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ─── Leaderboard Row Data ─── */
interface LeaderboardRow {
  rank: number | string;
  name: string;
  disciplineIcon: React.ReactNode;
  discipline: string;
  xp: string;
  /** Style variant for the rank number */
  rankColor: string;
  /** Style variant for the XP number */
  xpColor: string;
  /** If true, renders as the highlighted "You" row */
  isCurrentUser?: boolean;
}

const LEADERBOARD: LeaderboardRow[] = [
  {
    rank: 1,
    name: 'Alex Mercer',
    disciplineIcon: <Footprints size={14} className="text-primary-lime" />,
    discipline: 'Running',
    xp: '142,500',
    rankColor: 'text-primary-lime',
    xpColor: 'text-primary-lime',
  },
  {
    rank: 2,
    name: 'Sarah Jenkins',
    disciplineIcon: <Bike size={14} className="text-purple-300" />,
    discipline: 'Cycling',
    xp: '138,200',
    rankColor: 'text-zinc-400',
    xpColor: 'text-white',
  },
  {
    rank: 342,
    name: 'You (Join Now!)',
    disciplineIcon: <Sparkles size={14} className="text-primary-lime" />,
    discipline: 'Mixed',
    xp: '12,400',
    rankColor: 'text-white',
    xpColor: 'text-white',
    isCurrentUser: true,
  },
];

export const LeaderboardSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section
      id="global-arena"
      className="py-20 md:py-28 bg-surface-alt border-t border-surface-low relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-primary-lime">
            GLOBAL COMPETITION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white">
            WHERE DO YOU <span className="text-primary-lime">RANK?</span>
          </h2>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-surface-card border border-surface-high rounded-3xl p-4 sm:p-8 shadow-elevation overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider text-on-surface-dim pb-4 border-b border-outline-divider px-4">
            <div className="col-span-2 sm:col-span-1">RANK</div>
            <div className="col-span-5 sm:col-span-5">ATHLETE</div>
            <div className="col-span-3 sm:col-span-3">TOP DISCIPLINE</div>
            <div className="col-span-2 sm:col-span-3 text-right">SEASON XP</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-outline-dim">
            {LEADERBOARD.map((row) =>
              row.isCurrentUser ? (
                /* ── Highlighted "You" Row ── */
                <div
                  key={row.name}
                  className="grid grid-cols-12 items-center py-4 px-4 my-2 bg-[#1b2208]/80 border-2 border-primary-lime rounded-xl shadow-[0_0_20px_rgba(195,244,0,0.15)] relative overflow-hidden"
                >
                  <div
                    className={`col-span-2 sm:col-span-1 font-black font-display text-xl ${row.rankColor}`}
                  >
                    {row.rank}
                  </div>
                  <div className="col-span-5 sm:col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#222d05] border border-primary-lime flex items-center justify-center text-xs font-black text-primary-lime shrink-0">
                      B
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base">
                        {row.name}
                      </div>
                      <span className="text-[10px] text-primary-lime font-bold tracking-wider uppercase block">
                        CURRENT PROJECTION
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-3 flex items-center gap-2 text-xs sm:text-sm text-on-surface-muted">
                    {row.disciplineIcon}
                    <span>{row.discipline}</span>
                  </div>
                  <div
                    className={`col-span-2 sm:col-span-3 text-right font-black font-display ${row.xpColor} text-sm sm:text-base`}
                  >
                    {row.xp}
                  </div>
                </div>
              ) : (
                /* ── Standard Row ── */
                <div
                  key={row.name}
                  className="grid grid-cols-12 items-center py-4 px-4 hover:bg-surface-container transition-colors rounded-xl"
                >
                  <div
                    className={`col-span-2 sm:col-span-1 font-black font-display text-xl ${row.rankColor}`}
                  >
                    {row.rank}
                  </div>
                  <div className="col-span-5 sm:col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-xs font-bold text-white shrink-0">
                      <User size={15} />
                    </div>
                    <span className="font-bold text-white text-sm sm:text-base">
                      {row.name}
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-3 flex items-center gap-2 text-xs sm:text-sm text-on-surface-muted">
                    {row.disciplineIcon}
                    <span>{row.discipline}</span>
                  </div>
                  <div
                    className={`col-span-2 sm:col-span-3 text-right font-black font-display ${row.xpColor} text-sm sm:text-base`}
                  >
                    {row.xp}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            onClick={() => navigate('/leaderboard')}
            className="px-8 py-4 rounded-full bg-surface-low hover:bg-outline-divider text-white border border-outline-card hover:border-outline-hover font-bold text-base tracking-tight inline-flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <span>View Full Leaderboard</span>
            <Trophy size={18} className="text-primary-lime" />
          </button>

          <button
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="px-10 py-4 rounded-full bg-primary-lime hover:bg-primary-lime-dim text-on-primary font-black text-base sm:text-lg tracking-tight uppercase shadow-glow-xl hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-3"
          >
            <span>CLAIM YOUR RANK</span>
            <Zap size={20} className="fill-on-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};
