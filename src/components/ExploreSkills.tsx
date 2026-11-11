import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { StudentProfile } from '../types/index.ts';
import {
  Search,
  Filter,
  Star,
  BookOpen,
  Sparkles,
  MapPin,
  Calendar,
  Send,
  User,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

export const ExploreSkills: React.FC = () => {
  const {
    currentUser,
    categories,
    setRequestModalStudent,
    setAuthModalOpen,
    setAuthModalMode
  } = useApp();

  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'swaps' | 'name'>('rating');
  const [isLoading, setIsLoading] = useState(true);

  // Selected student for detail preview drawer/modal
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<StudentProfile | null>(null);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedLevel !== 'all') params.set('level', selectedLevel);
      if (selectedDepartment !== 'all') params.set('department', selectedDepartment);
      if (selectedFormat !== 'all') params.set('format', selectedFormat);

      const res = await fetch(`/api/students?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.students) {
        setStudents(data.students);
      }
    } catch (err) {
      console.error('Failed to search students:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, selectedCategory, selectedLevel, selectedDepartment, selectedFormat]);

  // Sorting
  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'rating') return b.averageRating - a.averageRating;
    if (sortBy === 'swaps') return b.completedExchangesCount - a.completedExchangesCount;
    return a.name.localeCompare(b.name);
  });

  // Extract distinct departments for filter dropdown
  const departments = Array.from(new Set(students.map(s => s.department)));

  const handleRequestClick = (student: StudentProfile) => {
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
    } else {
      setRequestModalStudent(student);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
          Explore Student Mentors & Skills
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Browse verified college students teaching real-world skills. Exchange your knowledge for free.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by skill name (e.g., Python, Figma, Excel, Public Speaking), student name, or major..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Category */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Skill Level
            </label>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Format */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Format
            </label>
            <select
              value={selectedFormat}
              onChange={e => setSelectedFormat(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Formats</option>
              <option value="online">Online (Meet/Zoom)</option>
              <option value="offline">Campus In-Person</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="rating">Top Rated</option>
              <option value="swaps">Most Exchanges</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing {sortedStudents.length} student mentors</span>
        <span>All profiles from real university registrations</span>
      </div>

      {/* Student Cards Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-500">
          Loading student profiles...
        </div>
      ) : sortedStudents.length === 0 ? (
        <div className="py-20 text-center p-8 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No students matched your search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your category or search term to discover more peer mentors across other departments.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedDepartment('all');
              setSelectedFormat('all');
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStudents.map(student => {
            const isSelf = currentUser?.id === student.id;

            return (
              <div
                key={student.id}
                className="rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:border-emerald-500/40"
              >
                <div>
                  {/* Top user bar */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                          {student.name}
                        </h3>
                        {isSelf && (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {student.department} · {student.yearOfStudy}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-mono tabular-nums">{student.averageRating}</span>
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500 text-[11px] font-mono tabular-nums">
                          {student.completedExchangesCount} swaps
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {student.bio || 'College student enthusiastic about peer-to-peer knowledge sharing.'}
                  </p>

                  {/* Skills Offered */}
                  <div className="space-y-1.5 mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>Skills Offered (Can Teach):</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {student.offeredSkills.map(skill => (
                        <span
                          key={skill.id}
                          className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-md"
                        >
                          {skill.skillName} · <span className="font-medium opacity-80">{skill.level}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Wanted */}
                  <div className="space-y-1.5 mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Wants to Learn:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {student.wantedSkills.map(skill => (
                        <span
                          key={skill.id}
                          className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                        >
                          {skill.skillName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability pill */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-4">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">
                      Available: {student.availability.map(a => `${a.dayOfWeek} (${a.timeSlot})`).join(', ') || 'Flexible scheduling'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedStudentDetail(student)}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    disabled={isSelf}
                    onClick={() => handleRequestClick(student)}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Request Swap</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 max-h-[90vh] overflow-y-auto text-left shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudentDetail.avatarUrl}
                  alt={selectedStudentDetail.name}
                  className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedStudentDetail.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedStudentDetail.college} · {selectedStudentDetail.department}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-mono tabular-nums">{selectedStudentDetail.averageRating}</span>
                    </span>
                    <span>({selectedStudentDetail.totalReviews} verified reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">About Student</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedStudentDetail.bio}
              </p>
            </div>

            {/* Offered Skills breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Skills Offered (Can Teach)</h4>
              {selectedStudentDetail.offeredSkills.map(off => (
                <div key={off.id} className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{off.skillName}</span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-normal">Level: {off.level}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{off.description}</p>
                </div>
              ))}
            </div>

            {/* Wanted Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Looking to Learn</h4>
              {selectedStudentDetail.wantedSkills.map(wan => (
                <div key={wan.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{wan.skillName}</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Goal: {wan.learningGoal}</p>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="space-y-1.5 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Availability</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudentDetail.availability.map(av => (
                  <span key={av.id} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                    {av.dayOfWeek} ({av.timeSlot}) · <span className="capitalize">{av.format}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedStudentDetail(null);
                  handleRequestClick(selectedStudentDetail);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Propose Exchange Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
