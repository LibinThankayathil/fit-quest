import React from 'react';
import {
  Footprints,
  Activity,
  Bike,
  Waves,
  Dumbbell,
  Sparkles,
} from 'lucide-react';
import { ActivityCard, type ActivityCardProps } from './ActivityCard';

const ACTIVITIES: ActivityCardProps[] = [
  {
    icon: <Footprints size={22} />,
    title: 'Running',
    description:
      'Pace, elevation, and distance combine to award high-yield endurance points.',
    rate: '150 Pts / Km',
    iconBg: 'bg-[#222718]',
    iconBorder: 'border border-[#3f4a1e] text-primary-lime',
    hoverTitleColor: 'group-hover:text-primary-lime',
  },
  {
    icon: <Activity size={22} />,
    title: 'Walking',
    description:
      'Consistent, steady-state effort rewarded for volume and sustained heart rate zones.',
    rate: '50 Pts / Km',
    iconBg: 'bg-[#1d271c]',
    iconBorder: 'border border-[#2b422a] text-emerald-400',
    hoverTitleColor: 'group-hover:text-emerald-400',
  },
  {
    icon: <Bike size={22} />,
    title: 'Cycling',
    description:
      'Power output and cadence metrics normalized against running equivalent effort.',
    rate: '40 Pts / Km',
    iconBg: 'bg-[#281b2e]',
    iconBorder: 'border border-[#482855] text-purple-300',
    hoverTitleColor: 'group-hover:text-purple-300',
  },
  {
    icon: <Waves size={22} />,
    title: 'Swimming',
    description:
      'Intense full-body cardiovascular effort calculated by stroke style and distance.',
    rate: '300 Pts / Km',
    iconBg: 'bg-[#182827]',
    iconBorder: 'border border-[#204a47] text-teal-400',
    hoverTitleColor: 'group-hover:text-teal-400',
  },
  {
    icon: <Dumbbell size={22} />,
    title: 'Gym / Weights',
    description:
      'Heart rate zone duration and self-reported intensity define your strength score.',
    rate: '250 Pts / Hr',
    iconBg: 'bg-[#1d271c]',
    iconBorder: 'border border-[#2b422a] text-emerald-400',
    hoverTitleColor: 'group-hover:text-emerald-400',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Passive Steps',
    description:
      'Background activity tracking ensures your entire day contributes to your quest.',
    rate: '1 Pt / 100 Steps',
    iconBg: 'bg-[#222718]',
    iconBorder: 'border border-[#3f4a1e] text-primary-lime',
    hoverTitleColor: 'group-hover:text-primary-lime',
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section
      id="features"
      className="py-20 md:py-28 bg-surface-alt border-t border-surface-low relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white">
            EVERY MOVE <span className="text-primary-lime">COUNTS</span>
          </h2>
          <p className="text-sm sm:text-base text-on-surface-muted leading-relaxed">
            Our proprietary algorithm normalizes effort across 6 distinct activity
            types, ensuring fair competition regardless of your discipline.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </div>
    </section>
  );
};
