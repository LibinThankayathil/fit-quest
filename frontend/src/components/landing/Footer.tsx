import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2 } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';
import { Logo } from '../common/Logo';

/* ─── Link Column Data ─── */
interface LinkColumn {
  heading: string;
  links: Array<{ label: string; href?: string; sectionId?: string }>;
}

const LINK_COLUMNS: LinkColumn[] = [
  {
    heading: 'PRODUCT',
    links: [
      { label: 'Download App', href: '#download' },
      { label: 'Unified Points System', sectionId: 'unified-system' },
      { label: 'Global Leaderboards', sectionId: 'global-arena' },
      { label: 'Hardware Integrations', href: '#hardware' },
    ],
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press Kit', href: '#press' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'LEGAL',
    links: [
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Data Ethics', href: '#ethics' },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-lowest border-t border-surface-low pt-16 pb-12 text-on-surface-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-surface-low">
          {/* ── Brand Column (spans 2) ── */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <Logo size="sm" />
            </Link>
            <p className="text-xs sm:text-sm text-on-surface-label max-w-sm leading-relaxed">
              Elite-level tracking for those who demand more from every drop of
              sweat.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { label: 'Global Site', icon: <Globe size={15} /> },
                { label: 'Share Link', icon: <Share2 size={15} /> },
              ].map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-surface-low border border-outline-card flex items-center justify-center text-on-surface-label hover:text-primary-lime hover:border-primary-lime/40 transition-colors"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── Link Columns ── */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading} className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                {col.heading}
              </div>
              <ul className="space-y-2 text-xs">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.sectionId ? (
                      <button
                        onClick={() => scrollToSection(link.sectionId!)}
                        className="hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 text-xs text-on-surface-dim flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} FitQuest Inc. All rights reserved.
            Turn your life into a game.
          </div>
        </div>
      </div>
    </footer>
  );
};
