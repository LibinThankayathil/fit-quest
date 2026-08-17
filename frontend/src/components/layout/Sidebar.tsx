import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Dumbbell,
  Trophy,
  User,
  Settings,
  LogOut,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  onOpenLogModal?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenLogModal,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { label: 'Activities', path: '/activities', icon: Dumbbell },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#131313] border-r border-[#222222] flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div className="flex flex-col space-y-8">
          {/* Logo / Brand */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-tight font-display">
              FitQuest
            </h1>
            <p className="text-xs font-semibold text-[#8e9379] tracking-wider uppercase mt-0.5">
              Elite Level 42
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#201f1f] text-white shadow-xs'
                      : 'text-[#9fa38c] hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  {/* Active Indicator Bar on left */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#c3f400] rounded-r-full" />
                  )}

                  <Icon
                    size={20}
                    className={`shrink-0 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#c3f400]'
                        : 'text-[#9fa38c] group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & Secondary Nav */}
        <div className="flex flex-col space-y-4 pt-6 border-t border-[#222222]">
          {/* "+ Log Activity" Lime Pill Button */}
          <button
            type="button"
            onClick={() => {
              if (onOpenLogModal) {
                onOpenLogModal();
              }
              if (onCloseMobile) {
                onCloseMobile();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#c3f400] hover:bg-[#abd600] active:scale-[0.98] text-[#161e00] font-bold text-sm shadow-[0_0_20px_rgba(195,244,0,0.25)] hover:shadow-[0_0_25px_rgba(195,244,0,0.4)] transition-all duration-200 cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Log Activity</span>
          </button>

          {/* Settings & Logout */}
          <div className="flex flex-col space-y-1 pt-2">
            <NavLink
              to="/settings"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#201f1f] text-white'
                    : 'text-[#9fa38c] hover:text-white hover:bg-[#1a1a1a]'
                }`
              }
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#9fa38c] hover:text-red-400 hover:bg-[#1a1a1a] transition-colors cursor-pointer w-full text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
