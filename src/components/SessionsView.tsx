import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  ExchangeRequest,
  LearningSession
} from '../types/index.ts';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRightLeft,
  Star,
  Users,
  ShieldCheck,
  Send
} from 'lucide-react';

export const SessionsView: React.FC = () => {
  const {
    currentUser,
    setReviewModalSession,
    setNotification,
    refreshUser,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'sessions' | 'requests'>('sessions');
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [requests, setRequests] = useState<{ sent: ExchangeRequest[]; received: ExchangeRequest[] }>({ sent: [], received: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [sessRes, reqsRes] = await Promise.all([
        fetch('/api/sessions').then(r => r.json()),
        fetch('/api/requests').then(r => r.json())
      ]);
      if (sessRes.success) setSessions(sessRes.sessions || []);
      if (reqsRes.success) setRequests({ sent: reqsRes.sent || [], received: reqsRes.received || [] });
    } catch (err) {
      console.error('Error fetching sessions/requests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleConfirmCompletion = async (session: LearningSession) => {
    setActionLoadingId(session.id);
    try {
      const res = await fetch(`/api/sessions/${session.id}/confirm`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: data.message, type: 'success' });
        await loadData();
        await refreshUser();
        if (data.completedNow) {
          setReviewModalSession(data.session);
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

  const handleRequestStatus = async (requestId: string, status: 'accepted' | 'rejected' | 'cancelled') => {
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
          message: status === 'accepted' ? 'Skill swap request accepted! Learning session created.' : `Request marked as ${status}`,
          type: 'success'
        });
        await loadData();
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

  const scheduledSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Learning Sessions & Exchange Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your peer teaching schedule, verify completed sessions, and review exchange proposals.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveSubTab('sessions')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'sessions'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Learning Sessions ({sessions.length})
          </button>
          <button
            onClick={() => setActiveSubTab('requests')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'requests'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Swap Proposals ({requests.received.length + requests.sent.length})
          </button>
        </div>
      </div>

      {/* Safety Banner */}
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div>
          <span className="font-bold">Campus Meeting Safety Policy:</span> For offline skill swaps, students are encouraged to meet in university public areas like the Library Study Cubicles, Campus Center Lounge, or open department labs. Never share personal home addresses.
        </div>
      </div>

      {/* View Content */}
      {activeSubTab === 'sessions' ? (
        <div className="space-y-8">
          {/* Scheduled Sessions */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Active Scheduled Sessions ({scheduledSessions.length})</span>
            </h2>

            {scheduledSessions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                <p>No active scheduled sessions right now.</p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="mt-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Explore student mentors to book an exchange
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scheduledSessions.map(sess => {
                  const isMentor = sess.mentorId === currentUser?.id;
                  const myConfirmed = isMentor ? sess.mentorConfirmed : sess.learnerConfirmed;
                  const partnerConfirmed = isMentor ? sess.learnerConfirmed : sess.mentorConfirmed;
                  const partnerName = isMentor ? sess.learnerName : sess.mentorName;

                  return (
                    <div
                      key={sess.id}
                      className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {isMentor ? 'You are Teaching' : 'You are Learning'}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                            {sess.skillTaught}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Peer Partner: <span className="font-semibold text-slate-800 dark:text-slate-200">{partnerName}</span>
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
                          {sess.format}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{sess.sessionDate} at {sess.sessionTime} ({sess.durationMinutes} minutes)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-800 dark:text-slate-200">{sess.locationOrLink}</span>
                        </div>
                      </div>

                      {/* Learning Objectives Checklist */}
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Session Learning Objectives:
                        </p>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {sess.learningObjectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Dual-Party Confirmation Logic (Section 9 Requirement) */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400 text-[11px]">Your confirmation:</span>
                            {myConfirmed ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                                <CheckCircle className="w-3 h-3" /> Confirmed
                              </span>
                            ) : (
                              <span className="text-amber-600 font-medium text-[11px]">Pending confirmation</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400 text-[11px]">Partner confirmation:</span>
                            {partnerConfirmed ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                                <CheckCircle className="w-3 h-3" /> Confirmed
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Waiting for partner</span>
                            )}
                          </div>
                        </div>

                        {!myConfirmed && (
                          <button
                            disabled={actionLoadingId === sess.id}
                            onClick={() => handleConfirmCompletion(sess)}
                            className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Mark Session Completed
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed Sessions History */}
          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Completed Sessions History ({completedSessions.length})</span>
            </h2>

            {completedSessions.length === 0 ? (
              <p className="text-xs text-slate-400">No completed sessions recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {completedSessions.map(sess => (
                  <div
                    key={sess.id}
                    className="p-4 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{sess.skillTaught}</span>
                        <span className="text-emerald-600 font-medium text-[11px]">Verified Completed</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">
                        Taught by {sess.mentorName} to {sess.learnerName} on {sess.sessionDate} ({sess.durationMinutes} mins)
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setReviewModalSession(sess)}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span>Leave Review</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Swap Proposals Tab (Incoming & Outgoing) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Received Requests */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
              <span>Incoming Proposals ({requests.received.length})</span>
            </h2>

            {requests.received.length === 0 ? (
              <div className="p-6 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-400 text-center">
                No incoming swap proposals yet.
              </div>
            ) : (
              <div className="space-y-3">
                {requests.received.map(req => (
                  <div
                    key={req.id}
                    className="p-5 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={req.senderAvatar}
                          alt={req.senderName}
                          className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{req.senderName}</p>
                          <p className="text-[11px] text-slate-500">{req.senderDepartment}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        req.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                        req.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 space-y-1">
                      <p className="text-slate-600 dark:text-slate-300">
                        Wants to learn: <span className="font-bold text-emerald-600">{req.skillWantedName}</span>
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        Offers in return: <span className="font-bold text-slate-800 dark:text-slate-200">{req.skillOfferedName}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>Proposed: {req.proposedDate} at {req.proposedTime}</span>
                      <span className="capitalize">{req.format}</span>
                    </div>

                    {req.status === 'pending' && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                        <button
                          disabled={actionLoadingId === req.id}
                          onClick={() => handleRequestStatus(req.id, 'accepted')}
                          className="flex-1 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
                        >
                          Accept
                        </button>
                        <button
                          disabled={actionLoadingId === req.id}
                          onClick={() => handleRequestStatus(req.id, 'rejected')}
                          className="flex-1 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sent Requests */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Sent Proposals ({requests.sent.length})</span>
            </h2>

            {requests.sent.length === 0 ? (
              <div className="p-6 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-400 text-center">
                You haven't sent any swap proposals yet.
              </div>
            ) : (
              <div className="space-y-3">
                {requests.sent.map(req => (
                  <div
                    key={req.id}
                    className="p-5 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={req.receiverAvatar}
                          alt={req.receiverName}
                          className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">To: {req.receiverName}</p>
                          <p className="text-[11px] text-slate-500">{req.receiverDepartment}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        req.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                        req.status === 'cancelled' ? 'bg-slate-100 text-slate-600' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300">
                      You proposed to learn <span className="font-bold text-emerald-600">{req.skillWantedName}</span> in exchange for teaching <span className="font-bold text-slate-800 dark:text-slate-200">{req.skillOfferedName}</span>.
                    </p>

                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>{req.proposedDate} at {req.proposedTime}</span>
                      {req.status === 'pending' && (
                        <button
                          disabled={actionLoadingId === req.id}
                          onClick={() => handleRequestStatus(req.id, 'cancelled')}
                          className="text-rose-600 hover:underline font-semibold"
                        >
                          Cancel Proposal
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
