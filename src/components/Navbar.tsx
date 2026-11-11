import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import {
  Sun,
  Moon,
  Sparkles,
  Coins,
  Menu,
  X,
  ChevronDown,
  UserCheck,
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    switchAccount,
    setAuthModalOpen,
    setAuthModalMode,
    setOnboardingOpen
  } = useApp();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const demoAccounts = [
    { id: 'user-alex', name: 'Alex Rivera', role: 'CS · Python / C++', credits: 120 },
    { id: 'user-maya', name: 'Maya Patel', role: 'Design · Figma / Motion', credits: 90 },
    { id: 'user-marcus', name: 'Marcus Chen', role: 'Business · Excel / Pitch', credits: 150 },
    { id: 'user-sarah', name: 'Sarah Jenkins', role: 'Comm · SEO / Writing', credits: 60 },
    { id: 'user-david', name: 'David Kim', role: 'Data Sci · Math / SQL', credits: 60 },
    { id: 'user-admin', name: 'Prof. Vance (Admin)', role: 'Campus Faculty Admin', credits: 500 }
  ];

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#14213D] dark:bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-emerald-400 dark:text-[#14213D]">S</span>
              <span className="text-white text-xs">2</span>
              <span className="text-emerald-400 dark:text-[#14213D]">S</span>
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                S2S learn
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium text-emerald-600 dark:text-emerald-400 ml-2 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50">
                Peer Exchange
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => handleNavClick('explore')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'explore'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Explore Skills
          </button>

          <button
            onClick={() => handleNavClick('matches')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'matches'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Smart Matches</span>
            <span className="inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded">
              Rule-Based
            </span>
          </button>

          <button
            onClick={() => handleNavClick('sessions')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'sessions'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sessions & Swaps
          </button>

          <button
            onClick={() => handleNavClick('roadmaps')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'roadmaps'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Roadmaps
          </button>

          <button
            onClick={() => handleNavClick('community')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'community'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Community
          </button>

          <button
            onClick={() => handleNavClick('admin')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1 ${
              activeTab === 'admin'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Admin</span>
          </button>
        </nav>

        {/* Zone 3: Right Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2.5">
              {/* Credit Balance Indicator */}
              <div
                onClick={() => handleNavClick('dashboard')}
                className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold"
                title="Skill Credits (1 hr taught = +60 credits)"
              >
                <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-mono tabular-nums">{currentUser.creditBalance}</span>
                <span className="font-normal text-slate-500 dark:text-slate-400 text-[11px]">cr</span>
              </div>

              {/* Quick Test Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-600"
                    referrerPolicy="no-referrer"
                  />
                  <span className="max-w-[90px] sm:max-w-[120px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {accountDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-[#1E293B] shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 text-xs"
                    onMouseLeave={() => setAccountDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-700/60">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.department} · {currentUser.yearOfStudy}</p>
                      <div className="mt-1.5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Credit Balance:</span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{currentUser.creditBalance} credits</span>
                      </div>
                    </div>

                    <div className="px-3.5 pt-2 pb-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Switch Demo Student (Test Exchanges)
                    </div>
                    {demoAccounts.map(acc => (
                      <button
                        key={acc.id}
                        onClick={() => {
                          switchAccount(acc.id);
                          setAccountDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-1.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                          acc.id === currentUser.id ? 'bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-medium' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="font-medium truncate">{acc.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{acc.role}</p>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 shrink-0">{acc.credits} cr</span>
                      </button>
                    ))}

                    <div className="border-t border-slate-100 dark:border-slate-700/60 mt-1 pt-1 px-2">
                      <button
                        onClick={() => {
                          setOnboardingOpen(true);
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                      >
                        Edit Profile & Skills
                      </button>
                      <button
                        onClick={() => {
                          handleNavClick('dashboard');
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                      >
                        My Student Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dashboard Direct Button */}
              <button
                onClick={() => handleNavClick('dashboard')}
                className="hidden md:inline-flex px-3.5 py-2 text-xs font-semibold text-white bg-[#14213D] dark:bg-emerald-600 rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
              >
                Dashboard
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setAuthModalOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'landing' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('explore')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'explore' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Explore Skills
          </button>
          <button
            onClick={() => handleNavClick('matches')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'matches' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Smart Matches
          </button>
          <button
            onClick={() => handleNavClick('sessions')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'sessions' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Sessions & Swaps
          </button>
          <button
            onClick={() => handleNavClick('roadmaps')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'roadmaps' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Skill Roadmaps
          </button>
          <button
            onClick={() => handleNavClick('community')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'community' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'admin' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            Admin Console
          </button>
          {currentUser && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-center mt-3 py-2.5 rounded-lg text-sm font-semibold bg-[#14213D] dark:bg-emerald-600 text-white"
            >
              Go to Dashboard ({currentUser.creditBalance} cr)
            </button>
          )}
        </div>
      )}
    </header>
  );
};
