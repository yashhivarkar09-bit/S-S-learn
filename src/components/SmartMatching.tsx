import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { MatchRecommendation } from '../types/index.ts';
import {
  Sparkles,
  ArrowRightLeft,
  Calendar,
  CheckCircle2,
  Send,
  HelpCircle,
  Users,
  ShieldCheck,
  Star
} from 'lucide-react';

export const SmartMatching: React.FC = () => {
  const { currentUser, setRequestModalStudent, setActiveTab } = useApp();
  const [matches, setMatches] = useState<MatchRecommendation[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'reciprocal' | 'oneway'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/matches');
        const data = await res.json();
        if (data.success && data.matches) {
          setMatches(data.matches);
        }
      } catch (err) {
        console.error('Failed to fetch matches:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, [currentUser]);

  const filteredMatches = matches.filter(m => {
    if (filterType === 'reciprocal') return m.isReciprocal;
    if (filterType === 'oneway') return !m.isReciprocal;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Title & Algorithm Transparency Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Rule-Based Scoring Formula</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Smart Skill Matching Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Every peer recommendation is calculated deterministically with transparent score weights.
            </p>
          </div>

          {/* Formula pill cluster */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">50%</span> Skill Swap
            </div>
            <span>+</span>
            <div>
              <span className="font-bold text-blue-600 dark:text-blue-400">30%</span> Availability
            </div>
            <span>+</span>
            <div>
              <span className="font-bold text-purple-600 dark:text-purple-400">20%</span> Experience Level
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#14213D] dark:bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Potential Matches ({matches.length})
          </button>
          <button
            onClick={() => setFilterType('reciprocal')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterType === 'reciprocal'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Direct Reciprocal Swaps ({matches.filter(m => m.isReciprocal).length})</span>
          </button>
          <button
            onClick={() => setFilterType('oneway')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterType === 'oneway'
                ? 'bg-[#14213D] dark:bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            One-Way Mentorship Opportunities
          </button>
        </div>
      </div>

      {/* Match Cards List */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-500">
          Calculating complementary skill combinations...
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <Users className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No matches found for this filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching to all matches or add more skills to your profile to expand your compatibility circle.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredMatches.map(match => (
            <div
              key={match.student.id}
              className={`p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border shadow-sm transition-all text-left ${
                match.isReciprocal
                  ? 'border-emerald-300 dark:border-emerald-800/80 ring-1 ring-emerald-500/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left Profile & Reason */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-4">
                    <img
                      src={match.student.avatarUrl}
                      alt={match.student.name}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {match.student.name}
                        </h3>
                        {match.isReciprocal ? (
                          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ArrowRightLeft className="w-3 h-3" />
                            <span>Direct 2-Way Reciprocal Match</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            One-Way Teaching Match
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {match.student.college} · {match.student.department} · {match.student.yearOfStudy}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation Explanation */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-1.5">Why recommended:</span>
                    {match.reason}
                  </div>

                  {/* Reciprocal Skills Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
                        They Teach What You Want:
                      </span>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {match.complementarySkills.theyTeachYou.join(', ') || match.student.offeredSkills.map(s => s.skillName).join(', ')}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        You Teach What They Want:
                      </span>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {match.complementarySkills.youTeachThem.join(', ') || currentUser?.offeredSkills.map(s => s.skillName).join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Scheduling overlap */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Shared days: {match.overlappingDays.join(', ') || 'Flexible scheduling'}</span>
                    </span>
                    <span>·</span>
                    <span>Format: {match.compatibleFormats.join(' & ') || 'Online or In-Person'}</span>
                  </div>
                </div>

                {/* Right: Score Breakdown Box (3 cols) */}
                <div className="w-full lg:w-72 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Match Score</span>
                    <span className="text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {match.matchScore}%
                    </span>
                  </div>

                  {/* 3 Component Bars */}
                  <div className="space-y-2.5 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-1">
                        <span>Skill Compatibility (50%)</span>
                        <span className="font-mono font-bold tabular-nums">{match.scoreBreakdown.skillCompatibility}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${match.scoreBreakdown.skillCompatibility}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-1">
                        <span>Availability (30%)</span>
                        <span className="font-mono font-bold tabular-nums">{match.scoreBreakdown.availabilityCompatibility}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${match.scoreBreakdown.availabilityCompatibility}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-1">
                        <span>Learning Level (20%)</span>
                        <span className="font-mono font-bold tabular-nums">{match.scoreBreakdown.learningLevelCompatibility}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${match.scoreBreakdown.learningLevelCompatibility}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setRequestModalStudent(match.student)}
                    className="w-full py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Swap Proposal</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
