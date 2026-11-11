import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  OfferedSkill,
  WantedSkill,
  AvailabilitySlot,
  SkillLevel,
  DayOfWeek,
  TimeSlot
} from '../types/index.ts';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  BookOpen,
  Calendar,
  Sparkles,
  Sliders
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const {
    currentUser,
    categories,
    onboardingOpen,
    setOnboardingOpen,
    refreshUser,
    setNotification
  } = useApp();

  const [step, setStep] = useState(1);

  // Step 1: Personal Info
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [college, setCollege] = useState(currentUser?.college || 'Pacific Tech Institute');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science');
  const [yearOfStudy, setYearOfStudy] = useState(currentUser?.yearOfStudy || '2nd Year (Sophomore)');

  // Step 2: Skills Offered
  const [offeredSkills, setOfferedSkills] = useState<OfferedSkill[]>(
    currentUser?.offeredSkills || [
      { id: 'off-new-1', userId: currentUser?.id || '', categoryId: 'cat-prog', skillName: 'Python Scripting', level: 'Intermediate', description: 'Can teach scripting, basic automation, and API integrations.' }
    ]
  );
  const [newOffName, setNewOffName] = useState('');
  const [newOffCategory, setNewOffCategory] = useState('cat-prog');
  const [newOffLevel, setNewOffLevel] = useState<SkillLevel>('Intermediate');
  const [newOffDesc, setNewOffDesc] = useState('');

  // Step 3: Skills Wanted
  const [wantedSkills, setWantedSkills] = useState<WantedSkill[]>(
    currentUser?.wantedSkills || [
      { id: 'wan-new-1', userId: currentUser?.id || '', categoryId: 'cat-design', skillName: 'UI/UX Design in Figma', currentLevel: 'Beginner', learningGoal: 'Learn component design and wireframing for web apps.' }
    ]
  );
  const [newWanName, setNewWanName] = useState('');
  const [newWanCategory, setNewWanCategory] = useState('cat-design');
  const [newWanLevel, setNewWanLevel] = useState<SkillLevel>('Beginner');
  const [newWanGoal, setNewWanGoal] = useState('');

  // Step 4: Availability
  const [availability, setAvailability] = useState<AvailabilitySlot[]>(
    currentUser?.availability || [
      { id: 'av-new-1', userId: currentUser?.id || '', dayOfWeek: 'Saturday', timeSlot: 'Afternoon', format: 'both' },
      { id: 'av-new-2', userId: currentUser?.id || '', dayOfWeek: 'Wednesday', timeSlot: 'Evening', format: 'online' }
    ]
  );

  // Step 5: Preferences
  const [duration, setDuration] = useState<number>(currentUser?.preferences?.preferredDurationMinutes || 60);
  const [style, setStyle] = useState<'hands-on' | 'conceptual' | 'project-based' | 'casual'>(currentUser?.preferences?.preferredStyle || 'hands-on');
  const [partnerNotes, setPartnerNotes] = useState(currentUser?.preferences?.partnerNotes || '');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!onboardingOpen || !currentUser) return null;

  const handleAddOffered = () => {
    if (!newOffName.trim()) return;
    setOfferedSkills(prev => [
      ...prev,
      {
        id: `off-${Date.now()}`,
        userId: currentUser.id,
        categoryId: newOffCategory,
        skillName: newOffName,
        level: newOffLevel,
        description: newOffDesc
      }
    ]);
    setNewOffName('');
    setNewOffDesc('');
  };

  const handleRemoveOffered = (id: string) => {
    setOfferedSkills(prev => prev.filter(s => s.id !== id));
  };

  const handleAddWanted = () => {
    if (!newWanName.trim()) return;
    setWantedSkills(prev => [
      ...prev,
      {
        id: `wan-${Date.now()}`,
        userId: currentUser.id,
        categoryId: newWanCategory,
        skillName: newWanName,
        currentLevel: newWanLevel,
        learningGoal: newWanGoal
      }
    ]);
    setNewWanName('');
    setNewWanGoal('');
  };

  const handleRemoveWanted = (id: string) => {
    setWantedSkills(prev => prev.filter(s => s.id !== id));
  };

  const handleSaveProfile = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/profile/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio,
          offeredSkills,
          wantedSkills,
          availability,
          preferences: {
            userId: currentUser.id,
            preferredDurationMinutes: duration,
            preferredStyle: style,
            partnerNotes
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: 'Profile & skills updated successfully!', type: 'success' });
        await refreshUser();
        setOnboardingOpen(false);
      }
    } catch (err) {
      setNotification({ message: 'Failed to save profile', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times: TimeSlot[] = ['Morning', 'Afternoon', 'Evening'];

  const toggleDaySlot = (day: DayOfWeek, slot: TimeSlot) => {
    const exists = availability.find(a => a.dayOfWeek === day && a.timeSlot === slot);
    if (exists) {
      setAvailability(prev => prev.filter(a => !(a.dayOfWeek === day && a.timeSlot === slot)));
    } else {
      setAvailability(prev => [
        ...prev,
        { id: `av-${Date.now()}-${day}-${slot}`, userId: currentUser.id, dayOfWeek: day, timeSlot: slot, format: 'both' }
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl text-left max-h-[92vh] flex flex-col">
        {/* Header with Progress Steps */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Student Profile Setup & Skills Wizard
            </h3>
            <p className="text-xs text-slate-500">Step {step} of 5</p>
          </div>
          <button
            onClick={() => setOnboardingOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Step indicator breadcrumb */}
        <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <span className={step === 1 ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : ''}>1. Bio & Major</span>
          <span>→</span>
          <span className={step === 2 ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : ''}>2. Can Teach</span>
          <span>→</span>
          <span className={step === 3 ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : ''}>3. Want to Learn</span>
          <span>→</span>
          <span className={step === 4 ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : ''}>4. Availability</span>
          <span>→</span>
          <span className={step === 5 ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : ''}>5. Preferences</span>
        </div>

        {/* Body content based on step */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          {step === 1 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Personal & College Information</h4>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Introduction Bio
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell campus peers what you enjoy building, studying, and swapping..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Year of Study
                  </label>
                  <input
                    type="text"
                    value={yearOfStudy}
                    onChange={e => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Skills You Can Teach</h4>
              <p className="text-slate-500">List skills you have practical experience in and feel confident sharing with a peer.</p>

              {/* Existing offered skills */}
              <div className="space-y-2">
                {offeredSkills.map(s => (
                  <div key={s.id} className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{s.skillName} ({s.level})</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">{s.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveOffered(s.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add skill form */}
              <div className="p-3.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2.5 bg-slate-50 dark:bg-slate-800/40">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Add a Skill You Can Teach:</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Skill name (e.g. Git, React, Video Editing)"
                    value={newOffName}
                    onChange={e => setNewOffName(e.target.value)}
                    className="px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <select
                    value={newOffLevel}
                    onChange={e => setNewOffLevel(e.target.value as SkillLevel)}
                    className="px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Beginner">Beginner (Basic fluency)</option>
                    <option value="Intermediate">Intermediate (Project experience)</option>
                    <option value="Advanced">Advanced (High mastery)</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Short description of what you will cover in sessions"
                  value={newOffDesc}
                  onChange={e => setNewOffDesc(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
                <button
                  type="button"
                  onClick={handleAddOffered}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Offered Skill</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Skills You Want to Learn</h4>
              <p className="text-slate-500">What disciplines or tools are you eager to learn from other students?</p>

              {/* Existing wanted skills */}
              <div className="space-y-2">
                {wantedSkills.map(s => (
                  <div key={s.id} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{s.skillName} (Current: {s.currentLevel})</p>
                      <p className="text-[11px] text-slate-500">Goal: {s.learningGoal}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveWanted(s.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add wanted form */}
              <div className="p-3.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2.5 bg-slate-50 dark:bg-slate-800/40">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Add a Skill You Want to Learn:</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Skill name (e.g. Public Speaking, Data Science)"
                    value={newWanName}
                    onChange={e => setNewWanName(e.target.value)}
                    className="px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <select
                    value={newWanLevel}
                    onChange={e => setNewWanLevel(e.target.value as SkillLevel)}
                    className="px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Beginner">Beginner (Zero experience)</option>
                    <option value="Intermediate">Intermediate (Know some)</option>
                    <option value="Advanced">Advanced (Need expert polish)</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Your learning objective or what you want to build"
                  value={newWanGoal}
                  onChange={e => setNewWanGoal(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
                <button
                  type="button"
                  onClick={handleAddWanted}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Desired Skill</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Your Weekly Availability</h4>
              <p className="text-slate-500">Click time slots when you are typically free for a 1-on-1 skill exchange session.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border border-slate-200 dark:border-slate-800 rounded-lg">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 font-bold">
                      <th className="p-2 text-left">Day</th>
                      <th className="p-2">Morning</th>
                      <th className="p-2">Afternoon</th>
                      <th className="p-2">Evening</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {days.map(d => (
                      <tr key={d}>
                        <td className="p-2 text-left font-semibold">{d}</td>
                        {times.map(t => {
                          const active = availability.some(a => a.dayOfWeek === d && a.timeSlot === t);
                          return (
                            <td key={t} className="p-2">
                              <button
                                type="button"
                                onClick={() => toggleDaySlot(d, t)}
                                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                  active
                                    ? 'bg-emerald-600 text-white font-bold'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700'
                                }`}
                              >
                                {active ? 'Available' : '—'}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Session Preferences</h4>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Session Duration
                </label>
                <div className="flex gap-2">
                  {[30, 60, 90].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDuration(mins)}
                      className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                        duration === mins
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Learning Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['hands-on', 'project-based', 'conceptual', 'casual'] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`py-2 px-3 rounded-lg text-left font-bold border capitalize transition-colors ${
                        style === s
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {s.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Notes for Learning Partners (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. I prefer meeting in the library quiet rooms with my MacBook."
                  value={partnerNotes}
                  onChange={e => setPartnerNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-30"
          >
            Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(prev => Math.min(5, prev + 1))}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSaveProfile}
              className="px-5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
            >
              {isSubmitting ? 'Saving...' : 'Finish & Save Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
