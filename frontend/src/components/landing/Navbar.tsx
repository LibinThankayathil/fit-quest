import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { scrollToSection } from '../../utils/scroll';

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'Unified System', id: 'unified-system' },
  { label: 'Global Arena', id: 'global-arena' },
] as const;

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  const ctaLabel = user ? 'DASHBOARD' : 'LOGIN';
  const ctaRoute = user ? '/dashboard' : '/login';

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* ── Brand ── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-surface-container border border-outline-medium flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform">
            <Zap className="text-primary-lime fill-primary-lime" size={18} />
          </div>
          <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-white group-hover:text-primary-lime transition-colors">
            Fit<span className="text-primary-lime">Quest</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => navigate(ctaRoute)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-lime text-on-primary font-black text-xs tracking-wider uppercase shadow-glow hover:bg-primary-lime-dim transition-all cursor-pointer"
          >
            <span>{ctaLabel}</span>
            <ArrowRight size={14} strokeWidth={2.8} />
          </button>
        </div>

        {/* ── Mobile Toggle ── */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-white"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-card border-b border-surface-high px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 text-sm text-on-surface-variant hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-surface-high">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(ctaRoute);
              }}
              className="w-full py-2.5 rounded-full bg-primary-lime text-on-primary font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{user ? 'GO TO DASHBOARD' : ctaLabel}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
