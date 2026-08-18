import React from 'react';
import { Star } from 'lucide-react';
import type { LeaderboardEntry } from '../../types/leaderboard';

interface LeaderboardPodiumProps {
  topAthletes: LeaderboardEntry[];
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ topAthletes }) => {
  const rank1 = topAthletes[0];
  const rank2 = topAthletes[1];
  const rank3 = topAthletes[2];

  if (!rank1) return null;

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6 pt-8 pb-4 max-w-2xl mx-auto">
      {/* 2nd Place (Left) */}
      {rank2 && (
        <div className="flex-1 flex flex-col items-center animate-fadeIn order-1">
          {/* Avatar with #2 Badge */}
          <div className="relative mb-3 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#201f1f] border-2 border-[#4ae183] flex items-center justify-center overflow-hidden shadow-lg">
              <span className="text-xl sm:text-2xl font-black text-white font-display">
                {rank2.firstName[0]}
              </span>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#4ae183] text-[#0a3520] font-black text-xs flex items-center justify-center shadow-md border-2 border-[#131313]">
              2
            </div>
          </div>

          {/* Pedestal Box */}
          <div className="w-full h-36 sm:h-40 rounded-2xl bg-gradient-to-b from-[#1c1b1b] to-[#161616] border border-[#4ae183]/30 p-4 flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:-translate-y-1">
            <span className="text-base sm:text-lg font-bold text-white font-display truncate max-w-full">
              {rank2.firstName}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[#4ae183] font-display mt-1">
              {rank2.points.toLocaleString()} pts
            </span>
          </div>
        </div>
      )}

      {/* 1st Place (Center - Elevated & Highlighted) */}
      <div className="flex-1 flex flex-col items-center animate-fadeIn order-2 z-10">
        {/* Avatar with Top Star & #1 Badge */}
        <div className="relative mb-3 group">
          {/* Top Golden Star Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center shadow-[0_0_12px_rgba(195,244,0,0.8)] z-10">
            <Star size={13} fill="#161e00" strokeWidth={0} />
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#201f1f] border-2 border-[#c3f400] flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(195,244,0,0.35)]">
            <span className="text-2xl sm:text-3xl font-black text-[#c3f400] font-display">
              {rank1.firstName[0]}
            </span>
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#c3f400] text-[#161e00] font-black text-sm flex items-center justify-center shadow-lg border-2 border-[#131313]">
            1
          </div>
        </div>

        {/* Pedestal Box */}
        <div className="w-full h-44 sm:h-48 rounded-2xl bg-gradient-to-b from-[#242813] via-[#1c1b1b] to-[#161616] border border-[#c3f400]/50 p-4 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-1">
          <span className="text-lg sm:text-xl font-extrabold text-white font-display truncate max-w-full">
            {rank1.firstName}
          </span>
          <span className="text-sm sm:text-base font-black text-[#c3f400] font-display mt-1">
            {rank1.points.toLocaleString()} pts
          </span>
        </div>
      </div>

      {/* 3rd Place (Right) */}
      {rank3 && (
        <div className="flex-1 flex flex-col items-center animate-fadeIn order-3">
          {/* Avatar with #3 Badge */}
          <div className="relative mb-3 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#201f1f] border-2 border-[#8e9379] flex items-center justify-center overflow-hidden shadow-lg">
              <span className="text-xl sm:text-2xl font-black text-white font-display">
                {rank3.firstName[0]}
              </span>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#201f1f] text-[#c4c9ac] font-bold text-xs flex items-center justify-center shadow-md border-2 border-[#8e9379]">
              3
            </div>
          </div>

          {/* Pedestal Box */}
          <div className="w-full h-32 sm:h-36 rounded-2xl bg-gradient-to-b from-[#1c1b1b] to-[#161616] border border-[#2a2a2a] p-4 flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:-translate-y-1">
            <span className="text-base sm:text-lg font-bold text-white font-display truncate max-w-full">
              {rank3.firstName}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#c4c9ac] font-display mt-1">
              {rank3.points.toLocaleString()} pts
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
