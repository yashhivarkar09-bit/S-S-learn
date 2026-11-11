import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { X, Sparkles, User, Mail, Lock, Building2, GraduationCap, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    refreshUser,
    switchAccount,
    setNotification,
    setActiveTab
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('Pacific Tech Institute');
  const [department, setDepartment] = useState('Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState('2nd Year (Sophomore)');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const endpoint = authModalMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = authModalMode === 'login' ? { email } : { name, email, college, department, yearOfStudy };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setNotification({
          message: authModalMode === 'login' ? `Welcome back, ${data.user.name}!` : 'Account created! Welcome to S2S learn.',
          type: 'success'
        });
        await refreshUser();
        setAuthModalOpen(false);
        setActiveTab('dashboard');
      } else {
        setErrorMessage(data.error || 'Authentication error');
      }
    } catch (err) {
      setErrorMessage('Network connection error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = (userId: string) => {
    switchAccount(userId);
    setAuthModalOpen(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl text-left max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              {authModalMode === 'login' ? 'Sign In to S2S learn' : 'Join S2S learn for Free'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {authModalMode === 'login'
                ? 'Access your student dashboard, matches, and exchanges.'
                : 'Connect with fellow university peers to swap skills.'}
            </p>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {authModalMode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Smith"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              College Email (.edu) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@campus.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {authModalMode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  University / College Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pacific Tech Institute"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Department / Major
                  </label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Design & Digital Media">Design & Media</option>
                    <option value="Business Administration">Business / Finance</option>
                    <option value="Data Science & Applied Math">Data Science / Math</option>
                    <option value="Journalism & Communications">Communications</option>
                    <option value="Mechanical Engineering">Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Year of Study
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={e => setYearOfStudy(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                    <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                    <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                    <option value="4th Year (Senior)">4th Year (Senior)</option>
                    <option value="Graduate / Masters">Graduate / Masters</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading
              ? 'Processing...'
              : authModalMode === 'login'
              ? 'Sign In to Account'
              : 'Complete Student Registration'}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center text-xs text-slate-500 pt-1">
          {authModalMode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => setAuthModalMode('register')}
                className="font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Register free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setAuthModalMode('login')}
                className="font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Quick Demo Switcher Section (Great for evaluation) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Quick 1-Click Demo Profiles (Evaluation):
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('user-alex')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
            >
              <p className="font-bold text-slate-900 dark:text-white">Alex Rivera</p>
              <p className="text-[10px] text-slate-500 truncate">CS · Teaches Python</p>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('user-maya')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
            >
              <p className="font-bold text-slate-900 dark:text-white">Maya Patel</p>
              <p className="text-[10px] text-slate-500 truncate">Design · Teaches Figma</p>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('user-marcus')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
            >
              <p className="font-bold text-slate-900 dark:text-white">Marcus Chen</p>
              <p className="text-[10px] text-slate-500 truncate">Business · Teaches Excel</p>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('user-admin')}
              className="p-2 rounded-lg border border-purple-200 dark:border-purple-800/80 bg-purple-50/50 dark:bg-purple-950/20 text-left hover:bg-purple-100/50 transition-colors cursor-pointer"
            >
              <p className="font-bold text-purple-900 dark:text-purple-300">Prof. Vance</p>
              <p className="text-[10px] text-purple-700 dark:text-purple-400 truncate">Faculty Admin</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
