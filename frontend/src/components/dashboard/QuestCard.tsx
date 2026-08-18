import React from 'react';
import { Flag, Compass, Gift } from 'lucide-react';

interface QuestCardProps {
  progressPercentage?: number;
  remainingCount?: number;
  bonusPoints?: number;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  progressPercentage = 80,
  remainingCount = 3,
  bonusPoints = 500,
}) => {
  return (
    <div className="relative p-6 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] shadow-xs flex flex-col justify-between space-y-6 overflow-hidden">
      {/* Watermark Compass Icon in top right */}
      <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-[#201f1f]/50 flex items-center justify-center pointer-events-none opacity-40">
        <Compass size={56} className="text-[#8e9379]" />
      </div>

      {/* Header & Goal Subtitle */}
      <div className="space-y-1.5 z-10">
        <div className="flex items-center gap-2">
          <Flag size={18} className="text-[#c3f400]" />
          <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
            Your Quest
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#9fa38c]">
          {remainingCount > 0
            ? `Complete ${remainingCount} more ${remainingCount === 1 ? 'activity' : 'activities'} this week`
            : 'Weekly Quest Completed! Bonus unlocked!'}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2 z-10">
        <div className="flex justify-between text-xs font-bold text-[#e5e2e1]">
          <span className="text-[#8e9379]">Progress</span>
          <span className="text-white font-display">{progressPercentage}%</span>
        </div>

        {/* Dual-Track Gradient Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#201f1f] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#4ae183] to-[#c3f400] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(195,244,0,0.5)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Reward Callout Box */}
      <div className="p-4 rounded-xl bg-[#201f1f] border border-[#2a2a2a] flex items-center gap-3.5 z-10">
        <div className="w-10 h-10 rounded-xl bg-[#2a3800] border border-[#3c4d00] flex items-center justify-center shrink-0 text-[#c3f400]">
          <Gift size={20} />
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#8e9379] uppercase tracking-wider block">
            REWARD
          </span>
          <span className="text-sm sm:text-base font-extrabold text-[#c3f400] font-display">
            +{bonusPoints} Bonus Points
          </span>
        </div>
      </div>
    </div>
  );
};
