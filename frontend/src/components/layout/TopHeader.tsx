import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

interface TopHeaderProps {
  onToggleMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleMobileMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'FQ';

  const userFullName = user
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : 'Athlete';

  return (
    <header className="h-16 border-b border-[#222222] bg-[#131313]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
      {/* Left side: Hamburger button on mobile only when user is logged in, plus brand logo */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label="Open Navigation Menu"
              className="p-2 rounded-lg bg-[#201f1f] text-[#9fa38c] hover:text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <Logo size="sm" />
          </div>
        ) : (
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
        )}
      </div>

      {/* Spacer for desktop layout since sidebar is fixed when logged in */}
      {user && <div className="hidden lg:block" />}

      {/* Right side controls */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {user ? (
          <div
            className="flex items-center gap-3 pl-2 group cursor-pointer"
            title={userFullName}
            onClick={() => navigate('/profile')}
          >
            <div className="w-9 h-9 rounded-full bg-[#2a2a2a] border border-[#444933] overflow-hidden flex items-center justify-center text-xs font-bold text-white shadow-xs relative shrink-0">
              <span className="z-10">{userInitials}</span>
              {/* Ambient avatar ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c3f400]/20 to-transparent opacity-60" />
            </div>
            <span className="text-sm font-semibold text-white group-hover:text-[#c3f400] transition-colors">
              {userFullName}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#9fa38c] hover:text-white hover:bg-[#201f1f] transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#c3f400] text-[#161e00] hover:bg-[#abd600] transition-colors shadow-xs"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
