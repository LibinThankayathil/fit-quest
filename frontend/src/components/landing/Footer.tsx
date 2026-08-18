import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2 } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-lowest border-t border-surface-low py-10 text-on-surface-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-surface-low">
          {/* Brand & Slogan */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <Link to="/" className="inline-block">
              <Logo size="sm" />
            </Link>
            <span className="hidden sm:inline-block text-surface-high">•</span>
            <p className="text-xs sm:text-sm text-on-surface-label max-w-sm leading-relaxed">
              Elite-level tracking for those who demand more from every drop of sweat.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { label: 'Global Site', icon: <Globe size={15} /> },
              { label: 'Share Link', icon: <Share2 size={15} /> },
            ].map((social) => (
              <button
                key={social.label}
                type="button"
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-surface-low border border-outline-card flex items-center justify-center text-on-surface-label hover:text-primary-lime hover:border-primary-lime/40 transition-colors cursor-pointer"
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-xs text-on-surface-dim flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} FitQuest Inc. All rights reserved.
          </div>
          <div className="text-on-surface-label font-medium">
            Turn your fitness into a quest.
          </div>
        </div>
      </div>
    </footer>
  );
};
