import React from 'react';
import {
  Footprints,
  Dumbbell,
  Bike,
  ArrowLeftRight,
  CheckCircle2,
} from 'lucide-react';

/* ─── Conversion Row Data ─── */
interface ConversionRow {
  icon: React.ReactNode;
  label: string;
  xp: string;
  progress: number; // 0–100
  gradientClass: string;
  iconBg: string;
}

const CONVERSIONS: ConversionRow[] = [
  {
    icon: <Footprints size={14} />,
    label: '5km Run',
    xp: '+750 XP',
    progress: 85,
    gradientClass: 'from-emerald-400 to-primary-lime',
    iconBg: 'bg-[#242918] text-primary-lime',
  },
  {
    icon: <Dumbbell size={14} />,
    label: '1 Hr Weightlifting',
    xp: '+250 XP',
    progress: 45,
    gradientClass: 'from-emerald-500 to-primary-lime',
    iconBg: 'bg-[#20271f] text-emerald-400',
  },
  {
    icon: <Bike size={14} />,
    label: '20km Cycle',
    xp: '+800 XP',
    progress: 92,
    gradientClass: 'from-purple-400 via-pink-400 to-primary-lime',
    iconBg: 'bg-[#291e30] text-purple-300',
  },
];

/* ─── Feature Bullet Data ─── */
interface FeatureBullet {
  title: string;
  description: string;
}

const FEATURES: FeatureBullet[] = [
  {
    title: 'Level Up Dynamics',
    description:
      'Accumulate XP to unlock higher tiers, exclusive badges, and premium app aesthetics.',
  },
  {
    title: 'Algorithmically Fair',
    description:
      'Built alongside sports scientists to ensure a 1-hour intense swim feels mathematically equal to a hard 10k run on the leaderboard.',
  },
];

export const UnifiedSystem: React.FC = () => {
  return (
    <section
      id="unified-system"
      className="py-20 md:py-28 bg-surface border-t border-surface-low relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ── Left: Conversion Widget ── */}
          <div className="lg:col-span-6">
            <div className="bg-surface-card border border-surface-high rounded-3xl p-6 sm:p-8 shadow-elevation relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-lime/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-outline-divider">
                <h3 className="text-lg font-bold font-display text-white">
                  Unified Points Conversion
                </h3>
                <div className="w-8 h-8 rounded-lg bg-outline-dim border border-outline-medium flex items-center justify-center text-primary-lime">
                  <ArrowLeftRight size={16} />
                </div>
              </div>

              {/* Conversion Rows */}
              <div className="space-y-6 pt-6">
                {CONVERSIONS.map((row) => (
                  <div key={row.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full ${row.iconBg} flex items-center justify-center`}
                        >
                          {row.icon}
                        </div>
                        <span className="font-medium text-white">{row.label}</span>
                      </div>
                      <span className="font-extrabold text-primary-lime text-sm">
                        {row.xp}
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2.5 bg-outline-divider rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full bg-gradient-to-r ${row.gradientClass} rounded-full shadow-[0_0_10px_rgba(195,244,0,0.5)] transition-all duration-1000`}
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Copy & Features ── */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-primary-lime">
              THE ARCHITECTURE OF EFFORT
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              ONE CURRENCY. <br />
              INFINITE PATHS.
            </h2>

            <p className="text-base text-on-surface-muted leading-relaxed">
              Say goodbye to fragmented tracking. Our Unified Points System
              distills complex biomechanical effort across all sports into a
              single, undeniable metric:{' '}
              <strong className="text-white font-semibold">
                FitQuest XP (Experience Points)
              </strong>
              .
            </p>

            {/* Feature Bullets */}
            <div className="space-y-5 pt-2">
              {FEATURES.map((feat) => (
                <div key={feat.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#222818] border border-[#3f4b1e] flex items-center justify-center text-primary-lime shrink-0 mt-0.5 shadow-glow-sm">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-display mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-sm text-on-surface-muted leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
