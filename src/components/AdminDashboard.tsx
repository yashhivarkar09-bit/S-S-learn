import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { PlatformStats, StudentProfile, ModerationReport } from '../types/index.ts';
import {
  ShieldCheck,
  Users,
  ArrowRightLeft,
  Coins,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  XCircle,
  BarChart3,
  UserCheck,
  UserX,
  FileText
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser, switchAccount, setNotification } = useApp();

  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [users, setUsers] = useState<StudentProfile[]>([]);
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'users' | 'moderation'>('analytics');
  const [isLoading, setIsLoading] = useState(true);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, usersRes, reportsRes] = await Promise.all([
        fetch('/api/admin/stats').then(r => r.json()),
        fetch('/api/admin/users').then(r => r.json()),
        fetch('/api/admin/reports').then(r => r.json())
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (usersRes.success) setUsers(usersRes.users || []);
      if (reportsRes.success) setReports(reportsRes.reports || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [currentUser]);

  const handleToggleSuspend = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/toggle-suspend`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setNotification({
          message: data.message,
          type: data.isSuspended ? 'error' : 'success'
        });
        await loadAdminData();
      }
    } catch (err) {
      setNotification({ message: 'Error toggling user suspension', type: 'error' });
    }
  };

  const handleResolveReport = async (reportId: string, status: 'resolved' | 'dismissed') => {
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: `Report marked as ${status}`, type: 'success' });
        await loadAdminData();
      }
    } catch (err) {
      setNotification({ message: 'Error updating report', type: 'error' });
    }
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-[11px] font-bold text-purple-800 dark:text-purple-300 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Faculty & Academic Lead Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Administrator Console & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time platform statistics, supply-demand skill analytics, student accounts, and moderation queue.
          </p>
        </div>

        {!isAdmin ? (
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-3 rounded-xl text-xs text-amber-900 dark:text-amber-200">
            <span>You are viewing in review mode.</span>
            <button
              onClick={() => switchAccount('user-admin')}
              className="px-3 py-1 font-bold rounded bg-amber-600 text-white hover:bg-amber-500 cursor-pointer"
            >
              Switch to Admin Account
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticated as Faculty Admin</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeAdminTab === 'analytics'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Platform Analytics & Demand
        </button>
        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeAdminTab === 'users'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Registered Students ({users.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('moderation')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeAdminTab === 'moderation'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <span>Moderation Queue</span>
          {reports.filter(r => r.status === 'pending').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>
      </div>

      {/* Tab 1: Platform Analytics & Supply/Demand */}
      {activeAdminTab === 'analytics' && stats && (
        <div className="space-y-8">
          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Total Registered Students</span>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                {stats.totalRegisteredStudents}
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">100% Verified Campus Accounts</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Completed Exchanges</span>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                {stats.completedExchanges}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-mono tabular-nums">{stats.totalHoursTaught} hours taught</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Match Success Rate</span>
              <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                {stats.matchSuccessRate}%
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Proposal accept rate</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Circulating Skill Credits</span>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                {stats.circulatingCredits} <span className="text-xs font-normal">cr</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Non-monetary balance ledger</p>
            </div>
          </div>

          {/* Supply & Demand Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Offered */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Most Offered Skills (Supply)</span>
                <span className="text-xs font-normal text-slate-400">Mentors ready to teach</span>
              </h3>
              <div className="space-y-3">
                {stats.topOfferedSkills.map(item => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{item.skill}</span>
                      <span className="font-mono tabular-nums text-slate-500">{item.count} mentors</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.count * 25}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Wanted */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Most Requested Skills (Demand)</span>
                <span className="text-xs font-normal text-slate-400">Students seeking mentors</span>
              </h3>
              <div className="space-y-3">
                {stats.topWantedSkills.map(item => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{item.skill}</span>
                      <span className="font-mono tabular-nums text-slate-500">{item.count} students</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.count * 25}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* High Demand Low Supply Gap Analysis (Section 15 requirement) */}
          <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-4">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 text-sm font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Skill Deficit Alert: High Student Demand with Few Active Mentors</span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              The platform identifies these skills where campus student demand significantly outpaces available mentors. S2S learn encourages departmental recruitment for these topics:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.highDemandLowSupplySkills.length === 0 ? (
                <p className="text-xs text-amber-800/80">Skill supply and demand are currently well-balanced across departments.</p>
              ) : (
                stats.highDemandLowSupplySkills.map(item => (
                  <div key={item.skill} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 space-y-1 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{item.skill}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{item.wantedCount} want to learn</span>
                      <span className="text-rose-600 font-bold">{item.offeredCount} teaching</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.2 rounded mt-1">
                      Deficit Gap: +{item.gap} students
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Directory */}
      {activeAdminTab === 'users' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Registered Student Accounts Directory
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] font-bold uppercase text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                <tr>
                  <th className="py-2">Student</th>
                  <th className="py-2">Department & Year</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Credits</th>
                  <th className="py-2">Rating</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 flex items-center gap-2.5">
                      <img
                        src={u.avatarUrl}
                        alt={u.name}
                        className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-[10px] text-slate-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">
                      {u.department} · {u.yearOfStudy}
                    </td>
                    <td className="py-3">
                      <span className="capitalize font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {u.creditBalance} cr
                    </td>
                    <td className="py-3 font-mono tabular-nums">
                      {u.averageRating} ★ ({u.totalReviews})
                    </td>
                    <td className="py-3">
                      {u.isSuspended ? (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded">
                          Suspended
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleToggleSuspend(u.id)}
                        className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                          u.isSuspended
                            ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                            : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                        }`}
                      >
                        {u.isSuspended ? 'Restore Account' : 'Suspend Account'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Moderation Queue */}
      {activeAdminTab === 'moderation' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Moderation Queue & Safety Reports
          </h3>

          {reports.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p>All clean! Zero reported items pending faculty moderation.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map(rep => (
                <div
                  key={rep.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                        {rep.itemType}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{rep.reason}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Status: {rep.status}</span>
                    </div>
                    {rep.details && <p className="text-slate-600 dark:text-slate-300 italic">"{rep.details}"</p>}
                    <p className="text-[10px] text-slate-400">
                      Reported by {rep.reporterName} on {new Date(rep.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {rep.status === 'pending' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleResolveReport(rep.id, 'resolved')}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                      >
                        Enforce & Resolve
                      </button>
                      <button
                        onClick={() => handleResolveReport(rep.id, 'dismissed')}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
