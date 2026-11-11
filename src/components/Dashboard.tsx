import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import {
  StudentProfile,
  MatchRecommendation,
  ExchangeRequest,
  LearningSession,
  CreditTransaction
} from '../types/index.ts';
import {
  BookOpen,
  ArrowRightLeft,
  CheckCircle,
  Coins,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Award,
  ChevronRight,
  Send,
  AlertCircle,
  Star,
  Users
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    currentUser,
    allStudents,
    setActiveTab,
    setRequestModalStudent,
    setReviewModalSession,
    setNotification,
    refreshUser
  } = useApp();

  const [matches, setMatches] = useState<MatchRecommendation[]>([]);
  const [requests, setRequests] = useState<{ sent: ExchangeRequest[]; received: ExchangeRequest[] }>({ sent: [], received: [] });
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [creditsData, setCreditsData] = useState<{ balance: number; transactions: CreditTransaction[] }>({ balance: 0, transactions: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const loadDashboardData = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const [matchesRes, reqsRes, sessRes, credsRes] = await Promise.all([
        api.getMatches(currentUser, allStudents),
        api.getRequests(currentUser.id),
        api.getSessions(currentUser.id),
        api.getCredits(currentUser.id, currentUser.creditBalance)
      ]);

      if (matchesRes?.matches) setMatches(matchesRes.matches);
      if (reqsRes) setRequests({ sent: reqsRes.sent || [], received: reqsRes.received || [] });
      if (sessRes?.sessions) setSessions(sessRes.sessions);
      if (credsRes) setCreditsData({ balance: credsRes.balance ?? currentUser.creditBalance, transactions: credsRes.transactions || [] });
    } catch (err) {
      console.warn('Dashboard loaded with resilient state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Please Sign In</h2>
        <p className="text-sm text-slate-500 mt-2">Sign in to view your personalized student dashboard, skills, and matches.</p>
      </div>
    );
  }

  const handleRequestStatusChange = async (requestId: string, status: 'accepted' | 'rejected' | 'cancelled') => {
    setActionLoadingId(requestId);
    try {
      const res = await fetch(`/api/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setNotification({
          message: status === 'accepted' ? 'Skill swap request accepted! A learning session has been created.' : `Request ${status}`,
          type: 'success'
        });
        await loadDashboardData();
        await refreshUser();
      } else {
        setNotification({ message: data.error || 'Failed to update request', type: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'Network error updating request', type: 'error' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleConfirmSession = async (sessionId: string) => {
    setActionLoadingId(sessionId);
    try {
      const res = await fetch(`/api/sessions/${sessionId}/confirm`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: data.message, type: 'success' });
        await loadDashboardData();
        await refreshUser();

        // If completed now, prompt review
        if (data.completedNow) {
          const session = sessions.find(s => s.id === sessionId);
          if (session) {
            setReviewModalSession(session);
          }
        }
      } else {
        setNotification({ message: data.error || 'Failed to confirm session', type: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'Network error confirming session', type: 'error' });
    } finally {
      setActionLoadingId(null);
    }
  };

  const pendingReceived = requests.received.filter(r => r.status === 'pending');
  const activeSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                Welcome back, {currentUser.name}!
              </h1>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                Active Student
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentUser.college} · {currentUser.department} · {currentUser.yearOfStudy}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('explore')}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer"
          >
            Find New Skills
          </button>
          <button
            onClick={() => setActiveTab('roadmaps')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Study Roadmaps
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Skills Offered */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Skills Offered</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {currentUser.offeredSkills.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Ready to teach</p>
        </div>

        {/* Skills Wanted */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Skills Wanted</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {currentUser.wantedSkills.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Learning goals</p>
        </div>

        {/* Active Exchanges */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Active Swaps</span>
            <ArrowRightLeft className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {activeSessions.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Scheduled sessions</p>
        </div>

        {/* Completed Exchanges */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Completed</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {currentUser.completedExchangesCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Verified exchanges</p>
        </div>

        {/* Skill Credits */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 mb-2">
            <span className="text-xs font-semibold">Skill Credits</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-300 tabular-nums">
            {currentUser.creditBalance} <span className="text-xs font-normal">cr</span>
          </div>
          <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 mt-1">
            +60 cr per hr taught
          </p>
        </div>
      </div>

      {/* Pending Incoming Requests Alert Strip */}
      {pendingReceived.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 text-sm font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Incoming Skill Swap Requests ({pendingReceived.length})</span>
            </div>
            <span className="text-xs text-amber-700 dark:text-amber-300">Action required</span>
          </div>

          <div className="space-y-3">
            {pendingReceived.map(req => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={req.senderAvatar}
                    alt={req.senderName}
                    className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {req.senderName} ({req.senderDepartment})
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Wants to learn <span className="font-semibold text-emerald-600 dark:text-emerald-400">{req.skillWantedName}</span> in exchange for <span className="font-semibold text-slate-800 dark:text-slate-200">{req.skillOfferedName}</span>
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span>Proposed: {req.proposedDate} at {req.proposedTime}</span>
                      <span>·</span>
                      <span className="capitalize">{req.format}</span>
                    </div>
                    {req.note && (
                      <p className="text-[11px] text-slate-500 italic mt-1 bg-slate-50 dark:bg-slate-800 p-1.5 rounded">
                        "{req.note}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    disabled={actionLoadingId === req.id}
                    onClick={() => handleRequestStatusChange(req.id, 'accepted')}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50"
                  >
                    Accept Swap
                  </button>
                  <button
                    disabled={actionLoadingId === req.id}
                    onClick={() => handleRequestStatusChange(req.id, 'rejected')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main 2-Column Split: Matches & Scheduled Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recommended Matches (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Recommended Peer Matches</span>
                <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-mono">
                  50/30/20 Formula
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Matched based on reciprocal skills, overlapping availability, and learning level.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('matches')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {matches.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800">
              <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">No student matches calculated yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.slice(0, 3).map((match, idx) => (
                <div
                  key={match.student.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={match.student.avatarUrl}
                        alt={match.student.name}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                            {match.student.name}
                          </h3>
                          {match.isReciprocal && (
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.2 rounded">
                              Direct Reciprocal
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {match.student.department} · {match.student.yearOfStudy}
                        </p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 text-xs font-mono font-bold tabular-nums">
                        <span>{match.matchScore}%</span>
                        <span className="text-[10px] font-normal opacity-80">Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Honest Reason Box */}
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 mb-3 border border-slate-100 dark:border-slate-700/60">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{match.reason}</p>
                  </div>

                  {/* Skills summary */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="p-2 rounded bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">
                        They Can Teach You:
                      </span>
                      <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {match.complementarySkills.theyTeachYou.join(', ') || match.student.offeredSkills.map(s => s.skillName).slice(0, 1).join('')}
                      </p>
                    </div>

                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                        You Can Teach Them:
                      </span>
                      <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {match.complementarySkills.youTeachThem.join(', ') || currentUser.offeredSkills.map(s => s.skillName).slice(0, 1).join('')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-400">
                      Days: {match.overlappingDays.join(', ') || 'Flexible'}
                    </span>
                    <button
                      onClick={() => setRequestModalStudent(match.student)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Swap Proposal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Sessions & Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Upcoming Learning Sessions</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono tabular-nums">{activeSessions.length} scheduled</span>
            </div>

            {activeSessions.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p>No upcoming sessions scheduled.</p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="mt-3 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Send a proposal to start swapping skills
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeSessions.map(session => {
                  const isMentor = session.mentorId === currentUser.id;
                  const partnerName = isMentor ? session.learnerName : session.mentorName;
                  const myConfirmed = isMentor ? session.mentorConfirmed : session.learnerConfirmed;

                  return (
                    <div
                      key={session.id}
                      className="p-4 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {session.skillTaught}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Partner: {partnerName} ({isMentor ? 'You are teaching' : 'You are learning'})
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 capitalize">
                          {session.format}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{session.sessionDate} at {session.sessionTime} ({session.durationMinutes} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{session.locationOrLink}</span>
                        </div>
                      </div>

                      {/* Two-party confirmation status */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div className="text-[11px] text-slate-500">
                          {myConfirmed ? (
                            <span className="text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> You confirmed
                            </span>
                          ) : (
                            <span>Needs your confirmation after session</span>
                          )}
                        </div>

                        {!myConfirmed && (
                          <button
                            disabled={actionLoadingId === session.id}
                            onClick={() => handleConfirmSession(session.id)}
                            className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#14213D] dark:bg-emerald-600 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            Confirm Completed
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Earned Badges Showcase */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Verifiable Badges ({currentUser.badges.length})</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {currentUser.badges.map(badgeId => (
                <div
                  key={badgeId}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                    {badgeId.replace('badge-', '').replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Credit Transaction Ledger */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-600" />
                <span>Credit Ledger</span>
              </h3>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {currentUser.creditBalance} cr Balance
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {creditsData.transactions.length === 0 ? (
                <p className="text-xs text-slate-400">No transactions recorded yet.</p>
              ) : (
                creditsData.transactions.map(tx => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-slate-800 dark:text-slate-200 font-medium truncate">{tx.description}</p>
                      <p className="text-[10px] text-slate-400">{new Date(tx.timestamp).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-mono font-bold tabular-nums shrink-0 ${
                      tx.type === 'spent' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {tx.type === 'spent' ? `-${tx.amount}` : `+${tx.amount}`} cr
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
