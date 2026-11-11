import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Send, Calendar, Clock, MapPin, ShieldCheck, ArrowRightLeft } from 'lucide-react';

export const SendRequestModal: React.FC = () => {
  const {
    currentUser,
    requestModalStudent,
    setRequestModalStudent,
    setNotification,
    setActiveTab
  } = useApp();

  const [skillWanted, setSkillWanted] = useState('');
  const [skillOffered, setSkillOffered] = useState('');
  const [proposedDate, setProposedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [proposedTime, setProposedTime] = useState('14:00');
  const [format, setFormat] = useState<'online' | 'offline'>('offline');
  const [locationOrLink, setLocationOrLink] = useState('Campus Library 3rd Floor Collaboration Hub');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!requestModalStudent || !currentUser) return null;

  // Set default skills if not already selected
  const availableToLearn = requestModalStudent.offeredSkills;
  const availableToOffer = currentUser.offeredSkills;

  const currentSkillWanted = skillWanted || (availableToLearn[0]?.skillName || 'General Mentorship');
  const currentSkillOffered = skillOffered || (availableToOffer[0]?.skillName || 'Reciprocal Learning');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: requestModalStudent.id,
          receiverName: requestModalStudent.name,
          receiverAvatar: requestModalStudent.avatarUrl,
          receiverDepartment: requestModalStudent.department,
          skillWantedName: currentSkillWanted,
          skillOfferedName: currentSkillOffered,
          proposedDate,
          proposedTime,
          durationMinutes: 60,
          format,
          locationOrLink: format === 'offline' ? locationOrLink : 'https://meet.google.com/s2s-session',
          note
        })
      });

      const data = await res.json();
      if (data.success) {
        setNotification({
          message: `Swap proposal sent to ${requestModalStudent.name}! You can track it in Sessions & Swaps.`,
          type: 'success'
        });
        setRequestModalStudent(null);
        setActiveTab('sessions');
      } else {
        setNotification({ message: data.error || 'Failed to send proposal', type: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'Network error sending request', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl text-left max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={requestModalStudent.avatarUrl}
              alt={requestModalStudent.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Propose Skill Swap to {requestModalStudent.name}
              </h3>
              <p className="text-xs text-slate-500">
                {requestModalStudent.college} · {requestModalStudent.department}
              </p>
            </div>
          </div>
          <button
            onClick={() => setRequestModalStudent(null)}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Safety Callout */}
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Campus peer exchanges are 100% free. No monetary payment is ever required.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Skill Swap Pair */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Skill You Want to Learn from {requestModalStudent.name}:
              </label>
              <select
                value={currentSkillWanted}
                onChange={e => setSkillWanted(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {availableToLearn.map(s => (
                  <option key={s.id} value={s.skillName}>
                    {s.skillName} ({s.level})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <span className="p-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500">
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Skill You Will Teach in Return:
              </label>
              <select
                value={currentSkillOffered}
                onChange={e => setSkillOffered(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {availableToOffer.map(s => (
                  <option key={s.id} value={s.skillName}>
                    {s.skillName} ({s.level})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Proposed Date
              </label>
              <input
                type="date"
                required
                value={proposedDate}
                onChange={e => setProposedDate(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
              </input>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Proposed Time
              </label>
              <input
                type="time"
                required
                value={proposedTime}
                onChange={e => setProposedTime(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Session Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormat('offline');
                  setLocationOrLink('Campus Library 3rd Floor Collaboration Hub');
                }}
                className={`py-2 rounded-lg font-bold border transition-colors ${
                  format === 'offline'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500'
                }`}
              >
                Campus Public Location
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormat('online');
                  setLocationOrLink('https://meet.google.com/s2s-session');
                }}
                className={`py-2 rounded-lg font-bold border transition-colors ${
                  format === 'online'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500'
                }`}
              >
                Online Video (Meet/Zoom)
              </button>
            </div>
          </div>

          {format === 'offline' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Safe Campus Public Spot
              </label>
              <input
                type="text"
                placeholder="e.g. University Library Group Study Room 204"
                value={locationOrLink}
                onChange={e => setLocationOrLink(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Introductory Message for {requestModalStudent.name}
            </label>
            <textarea
              rows={2}
              placeholder="Explain what specific topics you want to tackle and how you will structure your return session..."
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setRequestModalStudent(null)}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Swap Proposal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
