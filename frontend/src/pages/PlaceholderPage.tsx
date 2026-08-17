import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-[#9fa38c]">{description}</p>
      </div>

      <div className="p-12 rounded-2xl bg-[#1c1b1b] border border-[#2a2a2a] text-center space-y-4 max-w-xl mx-auto mt-12">
        <div className="w-16 h-16 rounded-2xl bg-[#201f1f] border border-[#333333] flex items-center justify-center mx-auto text-[#c3f400] shadow-[0_0_20px_rgba(195,244,0,0.15)]">
          <Construction size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white font-display">Module Under Construction</h3>
          <p className="text-sm text-[#9fa38c]">
            The {title} interface is being calibrated. Check back soon for full squad stats and features!
          </p>
        </div>
      </div>
    </div>
  );
};
