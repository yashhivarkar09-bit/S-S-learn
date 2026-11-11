import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Code,
  Database,
  Palette,
  Video,
  TrendingUp,
  Mic,
  Briefcase,
  FileSpreadsheet,
  Camera,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Users,
  Calendar,
  Award,
  Sparkles,
  ArrowRightLeft,
  GraduationCap,
  ShieldCheck,
  Star
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    currentUser,
    categories,
    allStudents,
    setActiveTab,
    setAuthModalOpen,
    setAuthModalMode,
    setRequestModalStudent
  } = useApp();

  const categoryIcons: Record<string, React.ReactNode> = {
    'cat-prog': <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    'cat-data': <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    'cat-design': <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    'cat-video': <Video className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    'cat-mkt': <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    'cat-speech': <Mic className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    'cat-biz': <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    'cat-excel': <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    'cat-photo': <Camera className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
    'cat-acad': <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
  };

  const featuredMentors = allStudents.filter(s => s.role === 'student').slice(0, 3);

  const handleStart = () => {
    if (currentUser) {
      setActiveTab('matches');
    } else {
      setAuthModalMode('register');
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (Copy) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Tuition · 100% Student-to-Student Exchange</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] text-balance">
                Your Skills Have Value. <br />
                <span className="text-emerald-600 dark:text-emerald-400">Exchange Them.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Learn something new without spending money. Share what you know, connect with talented students, and grow together through meaningful skill exchanges.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleStart}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Start Swapping Skills</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Skills Catalog</span>
                </button>
              </div>

              {/* 3 Key Benefits */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">100% Free for Students</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">No subscription fees or paywalls.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Learn from Your Peers</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Hands-on collegiate coaching.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Teach, Learn & Grow</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Build portfolio projects together.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Hero Visual) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 aspect-[16/10] sm:aspect-[4/3] lg:aspect-square">
                <img
                  src="/src/assets/images/s2s_hero_students_1793214442872.jpg"
                  alt="College students learning and exchanging skills in campus library"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Cross-Campus Skill Swap</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    "I taught Python data automation and learned Figma interactive prototyping in return."
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Alex (CS Junior) ↔ Maya (Design Sophomore)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 Visually Distinct Steps) */}
      <section className="py-20 bg-slate-50 dark:bg-[#0B132B]/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Structured Peer Collaboration
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              How S2S learn Works
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Four simple steps from listing your existing skills to completing verified peer sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Create Your Profile
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Add skills you can teach with your experience level, and specify the skills you are eager to learn along with your availability.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Discover Matches
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Our transparent matching algorithm finds student peers with complementary teaching interests and compatible schedules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Exchange Skills
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Send a swap proposal, pick safe campus library rooms or online links, and learn hands-on from one another.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 flex items-center justify-center font-display font-bold text-sm">
                04
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Grow Together
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Confirm session completions with two-party verification, earn skill credits, exchange feedback, and unlock badges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Skill Categories */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Skills Catalog
              </h2>
              <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                Popular Skill Categories
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start md:self-auto cursor-pointer"
            >
              <span>View all registered categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => setActiveTab('explore')}
                className="p-5 rounded-xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    {categoryIcons[cat.id] || <Code className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Available Mentors</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {cat.mentorCount} students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Student Mentors */}
      <section className="py-20 bg-slate-50 dark:bg-[#0B132B]/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Verified Peers
              </h2>
              <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                Featured Student Mentors
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Actual registered students actively accepting skill swap requests this semester.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start md:self-auto cursor-pointer"
            >
              <span>Explore all mentors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMentors.map(student => (
              <div
                key={student.id}
                className="rounded-2xl bg-white dark:bg-[#14213D]/40 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all text-left"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white truncate">
                          {student.name}
                        </h4>
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
                          {student.completedExchangesCount} swaps completed
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {student.bio}
                  </p>

                  {/* Skills Offered */}
                  <div className="space-y-1.5 mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Can Teach:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {student.offeredSkills.map(skill => (
                        <span
                          key={skill.id}
                          className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-md"
                        >
                          {skill.skillName} ({skill.level})
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
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        setAuthModalMode('login');
                        setAuthModalOpen(true);
                      } else {
                        setRequestModalStudent(student);
                      }
                    }}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    Request Swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why S2S learn? */}
      <section className="py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              The Peer Advantage
            </h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Why S2S learn?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Traditional courses cost money and lack 1-on-1 practical feedback. Peer exchange solves both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Free Peer-to-Peer Learning
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No expensive tutoring fees or subscription tiers. Your knowledge and time are your currency.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Practical, Project-Based Knowledge
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Learn how tools are really used in university hackathons, student clubs, and industry internships.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Cross-Department Collaboration
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Computer science students trade skills with design majors, journalism writers, and business students.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Flexible Online & Offline Sessions
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Meet in person at safe campus public spaces (library study rooms) or jump on Google Meet.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Develop Real Teaching Experience
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Explaining what you know deepens your own mastery and builds communication skills for job interviews.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                A Safe, Supportive Community
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Verified student profiles, mutual rating criteria, community moderation, and faculty guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase Strip */}
      <section className="py-16 bg-slate-50 dark:bg-[#0B132B]/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[4/3]">
              <img
                src="/src/assets/images/community_learning_group_1793214443723.jpg"
                alt="Student community study group"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-7 space-y-4 text-left">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                Connect with Fellow Campus Creators
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Join discussion threads, request study buddies for midterms, share open-source project cheat sheets, and find hackathon teammates across different university departments.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('community')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Join Community Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 lg:py-24 bg-[#14213D] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
            Your Next Skill Is One Connection Away.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join the community, share your knowledge, and discover what you can learn from others without spending a dollar.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="px-8 py-4 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              Join S2S learn for Free
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className="px-8 py-4 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all cursor-pointer"
            >
              See Smart Matching Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
