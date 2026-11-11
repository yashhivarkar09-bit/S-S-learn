import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { SkillRoadmap, RoadmapModule } from '../types/index.ts';
import {
  Compass,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
  Wand2
} from 'lucide-react';

export const RoadmapsView: React.FC = () => {
  const { setNotification, setActiveTab } = useApp();

  const [roadmaps, setRoadmaps] = useState<SkillRoadmap[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>('');
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // AI Modal generator state
  const [showAiModal, setShowAiModal] = useState(false);
  const [genSkill, setGenSkill] = useState('');
  const [genLevel, setGenLevel] = useState('Beginner');
  const [genGoal, setGenGoal] = useState('');
  const [genWeeks, setGenWeeks] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchRoadmaps = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/roadmaps');
      const data = await res.json();
      if (data.success && data.roadmaps) {
        setRoadmaps(data.roadmaps);
        if (data.roadmaps.length > 0 && !selectedRoadmapId) {
          setSelectedRoadmapId(data.roadmaps[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load roadmaps:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const selectedRoadmap = roadmaps.find(r => r.id === selectedRoadmapId) || roadmaps[0];

  const toggleTopicCheck = (topicKey: string) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicKey]: !prev[topicKey]
    }));
  };

  // Calculate progress for current roadmap
  const allTopicKeys = selectedRoadmap ? selectedRoadmap.modules.flatMap(m => m.topics.map((t, idx) => `${selectedRoadmap.id}-w${m.week}-t${idx}`)) : [];
  const completedCount = allTopicKeys.filter(k => completedTopics[k]).length;
  const progressPercent = allTopicKeys.length > 0 ? Math.round((completedCount / allTopicKeys.length) * 100) : 0;

  const handleGenerateCustomRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genSkill) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/roadmaps/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillName: genSkill,
          currentLevel: genLevel,
          learningGoal: genGoal,
          targetWeeks: Number(genWeeks)
        })
      });
      const data = await res.json();
      if (data.success && data.roadmap) {
        setRoadmaps(prev => [data.roadmap, ...prev]);
        setSelectedRoadmapId(data.roadmap.id);
        setShowAiModal(false);
        setGenSkill('');
        setGenGoal('');
        setNotification({
          message: data.roadmap.isAiGenerated
            ? 'Personalized AI learning roadmap generated successfully!'
            : 'Custom curriculum generated successfully!',
          type: 'success'
        });
      } else {
        setNotification({ message: data.error || 'Failed to generate roadmap', type: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'Network error generating roadmap', type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Collegiate Peer Curriculums</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Skill Learning Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Structured week-by-week learning guides with practical assignments designed for student pairs.
          </p>
        </div>

        <button
          onClick={() => setShowAiModal(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Wand2 className="w-4 h-4 text-emerald-400 dark:text-white" />
          <span>Generate Custom Roadmap</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-500">
          Loading learning roadmaps...
        </div>
      ) : !selectedRoadmap ? (
        <div className="p-8 text-center text-slate-500">No roadmaps available.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Roadmap Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Available Roadmaps ({roadmaps.length})
            </h2>

            <div className="space-y-2">
              {roadmaps.map(rm => {
                const isSelected = rm.id === selectedRoadmapId;
                return (
                  <div
                    key={rm.id}
                    onClick={() => setSelectedRoadmapId(rm.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 shadow-sm'
                        : 'bg-white dark:bg-[#14213D]/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {rm.skillName}
                      </span>
                      {rm.isAiGenerated && (
                        <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>AI Custom</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{rm.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-mono">
                      <span>{rm.durationWeeks} Weeks</span>
                      <span>·</span>
                      <span className="capitalize">{rm.targetLevel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Roadmap Detail & Progress (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Roadmap Overview Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    {selectedRoadmap.skillName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Target Level: {selectedRoadmap.targetLevel} · Duration: {selectedRoadmap.durationWeeks} Weeks
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full sm:w-48 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progress</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                {selectedRoadmap.description}
              </p>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
              {selectedRoadmap.modules.map(module => (
                <div
                  key={module.week}
                  className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 font-display">
                        W{module.week}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {module.title}
                        </h4>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Objective: {module.objective}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Core Topics Checklist */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Topics to Cover & Discuss with Peer Mentor:
                    </p>
                    <div className="space-y-1.5">
                      {module.topics.map((topic, tIdx) => {
                        const key = `${selectedRoadmap.id}-w${module.week}-t${tIdx}`;
                        const isChecked = !!completedTopics[key];
                        return (
                          <div
                            key={tIdx}
                            onClick={() => toggleTopicCheck(key)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors text-xs text-slate-700 dark:text-slate-200"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                            )}
                            <span className={isChecked ? 'line-through text-slate-400' : ''}>
                              {topic}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practice Activities & Mini-Project */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Hands-On Practice Activities:
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        {module.activities.map((act, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-emerald-500">·</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
                        Weekly Mini-Project:
                      </span>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {module.miniProject}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom swap CTA */}
            <div className="p-5 rounded-2xl bg-[#14213D] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold">Ready to practice this roadmap with a peer?</h4>
                <p className="text-xs text-slate-300">Find student mentors who offer {selectedRoadmap.skillName} right now.</p>
              </div>
              <button
                onClick={() => setActiveTab('explore')}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                Find {selectedRoadmap.skillName} Mentors
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Roadmap Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Generate Custom Skill Roadmap
                </h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Tell us what skill you want to learn, and our AI curriculum generator will structure a step-by-step roadmap for your exchange sessions.
            </p>

            <form onSubmit={handleGenerateCustomRoadmap} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flutter Mobile Apps, Blender 3D, Organic Chemistry"
                  value={genSkill}
                  onChange={e => setGenSkill(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Current Level
                  </label>
                  <select
                    value={genLevel}
                    onChange={e => setGenLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Beginner">Beginner (Zero prior knowledge)</option>
                    <option value="Intermediate">Intermediate (Know basics)</option>
                    <option value="Advanced">Advanced (Polishing mastery)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Timeline
                  </label>
                  <select
                    value={genWeeks}
                    onChange={e => setGenWeeks(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value={3}>3 Weeks (Sprint)</option>
                    <option value={4}>4 Weeks (Standard)</option>
                    <option value={6}>6 Weeks (Deep Dive)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Specific Learning Goal / Project
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., I want to build a functional cross-platform app for campus food delivery"
                  value={genGoal}
                  onChange={e => setGenGoal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating || !genSkill}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Create Roadmap</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
