import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { scrollToSection } from '../../utils/scroll';
import { Logo } from '../common/Logo';

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

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* ── Brand ── */}
        <Link to="/" className="flex items-center group">
          <Logo size="sm" />
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
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-lime text-on-primary font-black text-xs tracking-wider uppercase shadow-glow hover:bg-primary-lime-dim transition-all cursor-pointer"
            >
              <span>DASHBOARD</span>
              <ArrowRight size={14} strokeWidth={2.8} />
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 rounded-full text-on-surface-variant hover:text-white hover:bg-surface-container font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-lime text-on-primary font-black text-xs tracking-wider uppercase shadow-glow hover:bg-primary-lime-dim transition-all cursor-pointer"
              >
                <span>REGISTER</span>
                <ArrowRight size={14} strokeWidth={2.8} />
              </button>
            </>
          )}
        </div>

        {/* ── Mobile Toggle ── */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-white cursor-pointer"
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
              className="block w-full text-left py-2 text-sm text-on-surface-variant hover:text-white cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-surface-high">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full py-2.5 rounded-full bg-primary-lime text-on-primary font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>GO TO DASHBOARD</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="flex-1 py-2.5 rounded-full bg-surface-low border border-outline-card text-white font-bold text-xs uppercase tracking-wider text-center hover:bg-surface-container transition-colors cursor-pointer"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                  className="flex-1 py-2.5 rounded-full bg-primary-lime text-on-primary font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-glow cursor-pointer"
                >
                  <span>REGISTER</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
