import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { BookOpen, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="w-full bg-[#14213D] text-slate-300 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-[#14213D] flex items-center justify-center font-bold text-base">
                S2S
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                S2S learn
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              "Learn a Skill. Share a Skill. Grow Together."
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A student-to-student peer exchange platform empowering college learners to trade their real skills for free without paying monetary fees.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-2 rounded-lg max-w-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Campus Safety: We recommend meeting in campus library study rooms or student centers.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-emerald-400 transition-colors">
                  Explore Skills
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('matches')} className="hover:text-emerald-400 transition-colors">
                  Smart Matching Algorithm
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('roadmaps')} className="hover:text-emerald-400 transition-colors">
                  Skill Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('community')} className="hover:text-emerald-400 transition-colors">
                  Student Community
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-emerald-400 transition-colors">
                  Admin Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines & Safety */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Community & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">Verified College Profiles</span>
              </li>
              <li>
                <span className="text-slate-400">Campus Code of Conduct</span>
              </li>
              <li>
                <span className="text-slate-400">Peer Review Guidelines</span>
              </li>
              <li>
                <span className="text-slate-400">Zero-Toxicity Moderation</span>
              </li>
              <li>
                <span className="text-slate-400">Skill Credit Non-Monetary Ledger</span>
              </li>
            </ul>
          </div>

          {/* Legal / Institutional */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400">Student Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Academic Integrity Pledge</span>
              </li>
              <li>
                <span className="text-slate-400">Report Inappropriate Content</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 S2S learn. Peer-to-Peer College Skill Exchange Platform.</p>
          <div className="flex items-center gap-3">
            <span>Built for collaborative university students</span>
            <span>·</span>
            <span className="text-emerald-400">100% Free & Open Access</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
