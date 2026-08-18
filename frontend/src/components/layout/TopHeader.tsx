import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

interface TopHeaderProps {
  onToggleMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleMobileMenu }) => {
  const { user } = useAuth();

  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'FQ';

  const userFullName = user
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : 'Athlete';

  return (
    <header className="h-16 border-b border-[#222222] bg-[#131313]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
      {/* Left side: Hamburger button on mobile */}
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

      {/* Spacer for desktop layout since sidebar is fixed */}
      <div className="hidden lg:block" />

      {/* Right side controls matching design */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {/* User Profile Avatar & Name */}
        <div
          className="flex items-center gap-3 pl-2 group cursor-pointer"
          title={userFullName}
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
      </div>
    </header>
  );
};
