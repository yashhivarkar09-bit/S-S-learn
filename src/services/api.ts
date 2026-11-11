import {
  StudentProfile,
  SkillCategory,
  ExchangeRequest,
  LearningSession,
  CreditTransaction,
  Review,
  MatchRecommendation,
  CommunityPost,
  PostComment,
  ModerationReport,
  SkillRoadmap,
  PlatformStats
} from '../types/index.ts';

// Initial categories
export const FALLBACK_CATEGORIES: SkillCategory[] = [
  { id: 'cat-prog', name: 'Programming & Development', slug: 'programming-development', description: 'Python, JavaScript, React, C++, Mobile Apps, Algorithms', icon: 'Code', mentorCount: 14 },
  { id: 'cat-data', name: 'Data Science & AI', slug: 'data-science-ai', description: 'Machine Learning, Pandas, SQL, Data Visualization, Deep Learning', icon: 'Database', mentorCount: 9 },
  { id: 'cat-design', name: 'Graphic Design & UI/UX', slug: 'graphic-design-ui-ux', description: 'Figma, Adobe Illustrator, Branding, Design Systems, Wireframing', icon: 'Palette', mentorCount: 12 },
  { id: 'cat-video', name: 'Video Editing & Animation', slug: 'video-editing-animation', description: 'Premiere Pro, After Effects, DaVinci Resolve, Motion Design', icon: 'Video', mentorCount: 8 },
  { id: 'cat-mkt', name: 'Digital Marketing & Growth', slug: 'digital-marketing', description: 'SEO, Content Strategy, Social Media Marketing, Analytics', icon: 'TrendingUp', mentorCount: 7 },
  { id: 'cat-speech', name: 'Communication & Public Speaking', slug: 'communication-speaking', description: 'Interview Prep, Presentation Skills, Debate, Storytelling', icon: 'Mic', mentorCount: 11 },
  { id: 'cat-biz', name: 'Business & Entrepreneurship', slug: 'business-entrepreneurship', description: 'Startup Pitching, Business Models, Case Competitions, Finance', icon: 'Briefcase', mentorCount: 6 },
  { id: 'cat-excel', name: 'Excel & Data Analytics', slug: 'excel-data-analytics', description: 'Advanced Formulas, Pivot Tables, PowerBI, Financial Modeling', icon: 'FileSpreadsheet', mentorCount: 10 },
  { id: 'cat-photo', name: 'Photography & Lighting', slug: 'photography', description: 'DSLR Fundamentals, Portrait Lighting, Lightroom Color Grading', icon: 'Camera', mentorCount: 5 },
  { id: 'cat-acad', name: 'Academic Subjects & STEM', slug: 'academic-subjects', description: 'Calculus, Organic Chemistry, Linear Algebra, Physics', icon: 'BookOpen', mentorCount: 13 },
];

export const FALLBACK_STUDENTS: StudentProfile[] = [
  {
    id: 'user-alex',
    email: 'alex.rivera@campus.edu',
    name: 'Alex Rivera',
    college: 'Pacific Tech Institute',
    department: 'Computer Science',
    yearOfStudy: '3rd Year (Junior)',
    avatarUrl: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    bio: 'CS major passionate about backend systems, algorithms, and Python automation. Looking to learn Figma and presentation skills to pitch our startup project!',
    role: 'student',
    creditBalance: 120,
    isSuspended: false,
    onboardingCompleted: true,
    createdAt: '2026-09-12T10:00:00Z',
    averageRating: 4.9,
    totalReviews: 8,
    completedExchangesCount: 6,
    badges: ['badge-first', 'badge-mentor', 'badge-sharer'],
    offeredSkills: [
      { id: 'off-1', userId: 'user-alex', categoryId: 'cat-prog', skillName: 'Python Automation & Scripting', level: 'Advanced', description: 'Web scraping with BeautifulSoup/Playwright, data manipulation, automation scripts, and clean PEP8 coding.', portfolioUrl: 'https://github.com' },
      { id: 'off-2', userId: 'user-alex', categoryId: 'cat-prog', skillName: 'Git & GitHub Collaboration', level: 'Intermediate', description: 'Branching strategies, resolving merge conflicts, pull requests, and CI/CD basics.' },
      { id: 'off-3', userId: 'user-alex', categoryId: 'cat-prog', skillName: 'Data Structures in C++', level: 'Intermediate', description: 'Linked lists, trees, graphs, and Big-O algorithm analysis for technical interviews.' }
    ],
    wantedSkills: [
      { id: 'wan-1', userId: 'user-alex', categoryId: 'cat-design', skillName: 'UI/UX Design in Figma', currentLevel: 'Beginner', learningGoal: 'Learn auto-layout, design components, and clean mobile app wireframing.' },
      { id: 'wan-2', userId: 'user-alex', categoryId: 'cat-speech', skillName: 'Public Speaking & Demo Pitching', currentLevel: 'Beginner', learningGoal: 'Speak confidently during college project presentations and hackathons.' }
    ],
    availability: [
      { id: 'av-1', userId: 'user-alex', dayOfWeek: 'Saturday', timeSlot: 'Afternoon', format: 'both' },
      { id: 'av-2', userId: 'user-alex', dayOfWeek: 'Sunday', timeSlot: 'Morning', format: 'online' },
      { id: 'av-3', userId: 'user-alex', dayOfWeek: 'Wednesday', timeSlot: 'Evening', format: 'online' },
    ],
    preferences: {
      userId: 'user-alex',
      preferredDurationMinutes: 60,
      preferredStyle: 'hands-on',
      partnerNotes: 'I like interactive coding sessions where we build something live together.'
    }
  },
  {
    id: 'user-maya',
    email: 'maya.patel@campus.edu',
    name: 'Maya Patel',
    college: 'Pacific Tech Institute',
    department: 'Design & Digital Media',
    yearOfStudy: '2nd Year (Sophomore)',
    avatarUrl: '/src/assets/images/avatar_student_mentor1_1793214443296.jpg',
    bio: 'Design enthusiast creating intuitive mobile and web interfaces. Seeking to learn Python for data visualization and creative generative art.',
    role: 'student',
    creditBalance: 90,
    isSuspended: false,
    onboardingCompleted: true,
    createdAt: '2026-09-15T14:30:00Z',
    averageRating: 5.0,
    totalReviews: 6,
    completedExchangesCount: 5,
    badges: ['badge-first', 'badge-mentor', 'badge-learner'],
    offeredSkills: [
      { id: 'off-4', userId: 'user-maya', categoryId: 'cat-design', skillName: 'UI/UX Design in Figma', level: 'Advanced', description: 'Component variants, auto-layout, interactive prototypes, design tokens, and usability heuristics.', portfolioUrl: 'https://behance.net' },
      { id: 'off-5', userId: 'user-maya', categoryId: 'cat-video', skillName: 'Motion Graphics with After Effects', level: 'Intermediate', description: 'Logo reveals, typography animations, and micro-interactions for web/mobile apps.' }
    ],
    wantedSkills: [
      { id: 'wan-3', userId: 'user-maya', categoryId: 'cat-prog', skillName: 'Python Automation & Scripting', currentLevel: 'Beginner', learningGoal: 'Write scripts to automate file batch exports and manipulate CSV datasets.' },
      { id: 'wan-4', userId: 'user-maya', categoryId: 'cat-prog', skillName: 'Web Development Basics (HTML/CSS/JS)', currentLevel: 'Beginner', learningGoal: 'Understand how design translates into production CSS code.' }
    ],
    availability: [
      { id: 'av-4', userId: 'user-maya', dayOfWeek: 'Saturday', timeSlot: 'Afternoon', format: 'both' },
      { id: 'av-5', userId: 'user-maya', dayOfWeek: 'Tuesday', timeSlot: 'Evening', format: 'online' },
      { id: 'av-6', userId: 'user-maya', dayOfWeek: 'Thursday', timeSlot: 'Evening', format: 'online' },
    ],
    preferences: {
      userId: 'user-maya',
      preferredDurationMinutes: 60,
      preferredStyle: 'project-based',
      partnerNotes: 'Can meet in the campus library study rooms or Google Meet.'
    }
  },
  {
    id: 'user-marcus',
    email: 'marcus.chen@campus.edu',
    name: 'Marcus Chen',
    college: 'School of Business & Economics',
    department: 'Business Administration',
    yearOfStudy: '4th Year (Senior)',
    avatarUrl: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    bio: 'Finance senior and student consulting lead. I specialize in Excel financial modeling, valuation DCFs, and case competition public speaking.',
    role: 'student',
    creditBalance: 150,
    isSuspended: false,
    onboardingCompleted: true,
    createdAt: '2026-08-20T09:15:00Z',
    averageRating: 4.8,
    totalReviews: 9,
    completedExchangesCount: 8,
    badges: ['badge-first', 'badge-mentor', 'badge-sharer', 'badge-community'],
    offeredSkills: [
      { id: 'off-6', userId: 'user-marcus', categoryId: 'cat-excel', skillName: 'Excel Financial Modeling & Pivot Tables', level: 'Advanced', description: 'XLOOKUP, INDEX-MATCH, sensitivity matrices, dynamic charting, and investment model templates.' },
      { id: 'off-7', userId: 'user-marcus', categoryId: 'cat-speech', skillName: 'Public Speaking & Demo Pitching', level: 'Advanced', description: 'Hook delivery, slide economy, vocal modulation, and Q&A defense under pressure.' }
    ],
    wantedSkills: [
      { id: 'wan-5', userId: 'user-marcus', categoryId: 'cat-data', skillName: 'SQL & Database Queries', currentLevel: 'Beginner', learningGoal: 'Learn PostgreSQL querying to extract business analytics without IT assistance.' },
      { id: 'wan-6', userId: 'user-marcus', categoryId: 'cat-design', skillName: 'Graphic Design in Illustrator', currentLevel: 'Beginner', learningGoal: 'Design clean infographics and pitch deck assets.' }
    ],
    availability: [
      { id: 'av-7', userId: 'user-marcus', dayOfWeek: 'Friday', timeSlot: 'Afternoon', format: 'both' },
      { id: 'av-8', userId: 'user-marcus', dayOfWeek: 'Sunday', timeSlot: 'Afternoon', format: 'online' },
      { id: 'av-9', userId: 'user-marcus', dayOfWeek: 'Wednesday', timeSlot: 'Evening', format: 'online' },
    ],
    preferences: {
      userId: 'user-marcus',
      preferredDurationMinutes: 60,
      preferredStyle: 'conceptual'
    }
  },
  {
    id: 'user-sarah',
    email: 'sarah.jenkins@campus.edu',
    name: 'Sarah Jenkins',
    college: 'College of Arts & Sciences',
    department: 'Journalism & Communications',
    yearOfStudy: '3rd Year (Junior)',
    avatarUrl: '/src/assets/images/avatar_student_mentor1_1793214443296.jpg',
    bio: 'Editor for the university student paper. I teach storytelling, SEO copywriting, and digital marketing in exchange for video editing and audio mixing.',
    role: 'student',
    creditBalance: 60,
    isSuspended: false,
    onboardingCompleted: true,
    createdAt: '2026-10-01T11:00:00Z',
    averageRating: 4.9,
    totalReviews: 4,
    completedExchangesCount: 3,
    badges: ['badge-first', 'badge-learner'],
    offeredSkills: [
      { id: 'off-8', userId: 'user-sarah', categoryId: 'cat-mkt', skillName: 'SEO & Content Copywriting', level: 'Advanced', description: 'Keyword research, editorial hook structure, newsletter growth, and readability optimization.' },
      { id: 'off-9', userId: 'user-sarah', categoryId: 'cat-speech', skillName: 'Interviewing & Active Listening', level: 'Intermediate', description: 'Structuring journalistic interviews, asking insightful follow-ups, and audio transcription.' }
    ],
    wantedSkills: [
      { id: 'wan-7', userId: 'user-sarah', categoryId: 'cat-video', skillName: 'Premiere Pro Video Editing', currentLevel: 'Beginner', learningGoal: 'Cut short-form campus documentary reels and synchronize multi-track audio.' },
      { id: 'wan-8', userId: 'user-sarah', categoryId: 'cat-excel', skillName: 'Excel Financial Modeling & Pivot Tables', currentLevel: 'Beginner', learningGoal: 'Analyze survey data for investigative campus reporting.' }
    ],
    availability: [
      { id: 'av-10', userId: 'user-sarah', dayOfWeek: 'Monday', timeSlot: 'Evening', format: 'online' },
      { id: 'av-11', userId: 'user-sarah', dayOfWeek: 'Saturday', timeSlot: 'Morning', format: 'both' }
    ],
    preferences: {
      userId: 'user-sarah',
      preferredDurationMinutes: 60,
      preferredStyle: 'hands-on'
    }
  },
  {
    id: 'user-david',
    email: 'david.kim@campus.edu',
    name: 'David Kim',
    college: 'Pacific Tech Institute',
    department: 'Data Science & Applied Math',
    yearOfStudy: '1st Year (Freshman)',
    avatarUrl: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    bio: 'Mathematics enthusiast and competitive programmer. Happy to help peers master Calculus and Linear Algebra in exchange for web development guidance.',
    role: 'student',
    creditBalance: 60,
    isSuspended: false,
    onboardingCompleted: true,
    createdAt: '2026-10-05T08:20:00Z',
    averageRating: 4.7,
    totalReviews: 3,
    completedExchangesCount: 2,
    badges: ['badge-first'],
    offeredSkills: [
      { id: 'off-10', userId: 'user-david', categoryId: 'cat-acad', skillName: 'Calculus & Linear Algebra', level: 'Advanced', description: 'Multivariable calculus, matrix decompositions, eigenvalues, and mathematical proofs.' },
      { id: 'off-11', userId: 'user-david', categoryId: 'cat-data', skillName: 'SQL & Database Queries', level: 'Intermediate', description: 'Complex JOINs, window functions, aggregation, and query optimization.' }
    ],
    wantedSkills: [
      { id: 'wan-9', userId: 'user-david', categoryId: 'cat-prog', skillName: 'Python Automation & Scripting', currentLevel: 'Intermediate', learningGoal: 'Build full-stack web dashboards for math visualizers.' }
    ],
    availability: [
      { id: 'av-12', userId: 'user-david', dayOfWeek: 'Sunday', timeSlot: 'Morning', format: 'online' },
      { id: 'av-13', userId: 'user-david', dayOfWeek: 'Wednesday', timeSlot: 'Evening', format: 'online' }
    ],
    preferences: {
      userId: 'user-david',
      preferredDurationMinutes: 60,
      preferredStyle: 'conceptual'
    }
  },
  {
    id: 'user-admin',
    email: 'faculty.admin@campus.edu',
    name: 'Prof. Eleanor Vance',
    college: 'Campus Center for Peer Learning',
    department: 'Academic Affairs & Mentorship',
    yearOfStudy: 'Staff / Faculty Lead',
    avatarUrl: '/src/assets/images/avatar_student_mentor1_1793214443296.jpg',
    bio: 'Faculty advisor for S2S learn. Managing student safety, community guidelines, and academic collaboration programs across all departments.',
    role: 'admin',
    creditBalance: 500,
    isSuspended: false,
    onboardingCompleted: true,
    createdAt: '2026-08-01T00:00:00Z',
    averageRating: 5.0,
    totalReviews: 14,
    completedExchangesCount: 20,
    badges: ['badge-first', 'badge-mentor', 'badge-community'],
    offeredSkills: [],
    wantedSkills: [],
    availability: [],
    preferences: {
      userId: 'user-admin',
      preferredDurationMinutes: 60,
      preferredStyle: 'conceptual'
    }
  }
];

export const FALLBACK_REQUESTS: ExchangeRequest[] = [
  {
    id: 'req-1',
    senderId: 'user-alex',
    senderName: 'Alex Rivera',
    senderAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    senderDepartment: 'Computer Science',
    receiverId: 'user-maya',
    receiverName: 'Maya Patel',
    receiverAvatar: '/src/assets/images/avatar_student_mentor1_1793214443296.jpg',
    receiverDepartment: 'Design & Digital Media',
    skillOfferedName: 'Python Automation & Scripting',
    skillWantedName: 'UI/UX Design in Figma',
    proposedDate: '2026-11-01',
    proposedTime: '14:00',
    durationMinutes: 60,
    format: 'offline',
    locationOrLink: 'Library 3rd Floor Collaboration Hub (Room 304)',
    note: 'Hey Maya! I saw you want to learn Python scripting for CSV batch tasks. I can teach you step-by-step in exchange for a hands-on Figma auto-layout session!',
    status: 'accepted',
    createdAt: '2026-10-25T16:00:00Z',
    updatedAt: '2026-10-26T09:30:00Z'
  },
  {
    id: 'req-2',
    senderId: 'user-sarah',
    senderName: 'Sarah Jenkins',
    senderAvatar: '/src/assets/images/avatar_student_mentor1_1793214443296.jpg',
    senderDepartment: 'Journalism & Communications',
    receiverId: 'user-marcus',
    receiverName: 'Marcus Chen',
    receiverAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    receiverDepartment: 'Business Administration',
    skillOfferedName: 'SEO & Content Copywriting',
    skillWantedName: 'Excel Financial Modeling & Pivot Tables',
    proposedDate: '2026-11-03',
    proposedTime: '17:30',
    durationMinutes: 60,
    format: 'online',
    locationOrLink: 'https://meet.google.com/s2s-marcus-sarah',
    note: 'Hi Marcus! Working on an investigative story on student tuition models and need help structuring pivot tables. Can help polish your case competition slide copy in return.',
    status: 'pending',
    createdAt: '2026-10-27T10:15:00Z',
    updatedAt: '2026-10-27T10:15:00Z'
  }
];

export const FALLBACK_SESSIONS: LearningSession[] = [
  {
    id: 'sess-1',
    requestId: 'req-1',
    mentorId: 'user-alex',
    mentorName: 'Alex Rivera',
    learnerId: 'user-maya',
    learnerName: 'Maya Patel',
    skillTaught: 'Python Automation & Scripting',
    skillLearned: 'UI/UX Design in Figma',
    sessionDate: '2026-11-01',
    sessionTime: '14:00',
    durationMinutes: 60,
    format: 'offline',
    locationOrLink: 'Library 3rd Floor Collaboration Hub (Room 304)',
    learningObjectives: [
      'Install Python & VSCode on macOS/Windows',
      'Learn basic variables, lists, and loops',
      'Automate reading and renaming image files in a folder'
    ],
    status: 'scheduled',
    mentorConfirmed: false,
    learnerConfirmed: false,
    createdAt: '2026-10-26T09:30:00Z'
  },
  {
    id: 'sess-completed-1',
    requestId: 'req-prior',
    mentorId: 'user-marcus',
    mentorName: 'Marcus Chen',
    learnerId: 'user-alex',
    learnerName: 'Alex Rivera',
    skillTaught: 'Public Speaking & Demo Pitching',
    sessionDate: '2026-10-20',
    sessionTime: '16:00',
    durationMinutes: 60,
    format: 'online',
    locationOrLink: 'https://meet.google.com/s2s-alex-marcus',
    learningObjectives: [
      'Structuring technical talk in 3 key takeaways',
      'Handling aggressive Q&A from judges',
      'Vocal modulation pacing'
    ],
    status: 'completed',
    mentorConfirmed: true,
    learnerConfirmed: true,
    createdAt: '2026-10-18T10:00:00Z'
  }
];

export const FALLBACK_CREDITS: CreditTransaction[] = [
  {
    id: 'tx-1',
    userId: 'user-alex',
    type: 'bonus',
    amount: 60,
    description: 'Welcome onboard student learning bonus',
    timestamp: '2026-09-12T10:05:00Z',
    balanceAfter: 60
  },
  {
    id: 'tx-2',
    userId: 'user-alex',
    type: 'earned',
    amount: 60,
    description: 'Taught Python Data Structures to junior peer (60 mins)',
    timestamp: '2026-09-28T18:00:00Z',
    balanceAfter: 120
  }
];

// Helper to safely execute JSON fetch with fallback
async function safeFetch<T>(url: string, options?: RequestInit, fallback?: T): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      if (fallback !== undefined) return fallback;
      throw new Error(`HTTP error ${res.status}`);
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      return data;
    }
    if (fallback !== undefined) return fallback;
    throw new Error('Response is not JSON');
  } catch (err) {
    if (fallback !== undefined) return fallback;
    throw err;
  }
}

// Client-side rule-based matching calculation (50% Skill, 30% Availability, 20% Level)
export function computeClientMatches(currentUser: StudentProfile, allStudents: StudentProfile[]): MatchRecommendation[] {
  const recommendations: MatchRecommendation[] = [];
  const peers = allStudents.filter(s => s.id !== currentUser.id && !s.isSuspended && s.role === 'student');

  for (const student of peers) {
    const myOffered = currentUser.offeredSkills || [];
    const myWanted = currentUser.wantedSkills || [];
    const theirOffered = student.offeredSkills || [];
    const theirWanted = student.wantedSkills || [];

    const theyTeachIWant = theirOffered.filter(off =>
      myWanted.some(wan =>
        wan.skillName.toLowerCase().includes(off.skillName.toLowerCase()) ||
        off.skillName.toLowerCase().includes(wan.skillName.toLowerCase()) ||
        wan.categoryId === off.categoryId
      )
    );

    const iTeachTheyWant = myOffered.filter(off =>
      theirWanted.some(wan =>
        wan.skillName.toLowerCase().includes(off.skillName.toLowerCase()) ||
        off.skillName.toLowerCase().includes(wan.skillName.toLowerCase()) ||
        wan.categoryId === off.categoryId
      )
    );

    const isReciprocal = theyTeachIWant.length > 0 && iTeachTheyWant.length > 0;
    let skillScore = 0;
    if (isReciprocal) skillScore = 100;
    else if (theyTeachIWant.length > 0) skillScore = 65;
    else if (iTeachTheyWant.length > 0) skillScore = 55;
    else skillScore = 20;

    const myAvail = currentUser.availability || [];
    const theirAvail = student.availability || [];
    const myDays = myAvail.map(a => a.dayOfWeek);
    const theirDays = theirAvail.map(a => a.dayOfWeek);
    const overlappingDays = Array.from(new Set(myDays.filter(d => theirDays.includes(d))));

    let exactSlotOverlapCount = 0;
    myAvail.forEach(mySlot => {
      theirAvail.forEach(theirSlot => {
        if (mySlot.dayOfWeek === theirSlot.dayOfWeek && mySlot.timeSlot === theirSlot.timeSlot) {
          exactSlotOverlapCount++;
        }
      });
    });

    const formats: string[] = [];
    const hasOnline = myAvail.some(a => a.format === 'online' || a.format === 'both') &&
                      theirAvail.some(a => a.format === 'online' || a.format === 'both');
    const hasOffline = myAvail.some(a => a.format === 'offline' || a.format === 'both') &&
                       theirAvail.some(a => a.format === 'offline' || a.format === 'both');
    if (hasOnline) formats.push('Online');
    if (hasOffline) formats.push('Campus In-Person');

    let availabilityScore = 30;
    if (exactSlotOverlapCount >= 2 && formats.length > 0) availabilityScore = 100;
    else if (exactSlotOverlapCount === 1 && formats.length > 0) availabilityScore = 80;
    else if (overlappingDays.length > 0) availabilityScore = 60;

    let levelScore = 70;
    if (theyTeachIWant.length > 0) {
      const mentorSkill = theyTeachIWant[0];
      const myW = myWanted.find(w => w.skillName.toLowerCase().includes(mentorSkill.skillName.toLowerCase()));
      if (myW) {
        if (mentorSkill.level === 'Advanced' && (myW.currentLevel === 'Beginner' || myW.currentLevel === 'Intermediate')) {
          levelScore = 100;
        } else if (mentorSkill.level === 'Intermediate' && myW.currentLevel === 'Beginner') {
          levelScore = 90;
        } else if (mentorSkill.level === myW.currentLevel) {
          levelScore = 80;
        }
      }
    }

    const totalScore = Math.round(0.50 * skillScore + 0.30 * availabilityScore + 0.20 * levelScore);

    let reason = '';
    if (isReciprocal) {
      const theirOffer = theyTeachIWant[0].skillName;
      const myOffer = iTeachTheyWant[0].skillName;
      const dayStr = overlappingDays.length > 0 ? overlappingDays.join(' and ') : 'flexible weekdays';
      reason = `Direct reciprocal swap: They teach ${theirOffer}, want to learn your ${myOffer}, and both share availability on ${dayStr}.`;
    } else if (theyTeachIWant.length > 0) {
      reason = `Complimentary match: Offers ${theyTeachIWant[0].skillName} matching your learning goals. Compatible for ${formats.join(' & ') || 'flexible'} sessions.`;
    } else if (iTeachTheyWant.length > 0) {
      reason = `Teaching match: Looking to learn ${iTeachTheyWant[0].skillName} which you offer at an experienced level.`;
    } else {
      reason = `Peer collaboration match based on shared department (${student.department}) and schedule alignment.`;
    }

    recommendations.push({
      student,
      matchScore: totalScore,
      scoreBreakdown: {
        skillCompatibility: skillScore,
        availabilityCompatibility: availabilityScore,
        learningLevelCompatibility: levelScore
      },
      isReciprocal,
      complementarySkills: {
        theyTeachYou: theyTeachIWant.map(s => s.skillName),
        youTeachThem: iTeachTheyWant.map(s => s.skillName)
      },
      reason,
      overlappingDays,
      compatibleFormats: formats
    });
  }

  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}

export const api = {
  async getMe(): Promise<{ success: boolean; user: StudentProfile }> {
    return safeFetch<{ success: boolean; user: StudentProfile }>(
      '/api/auth/me',
      undefined,
      { success: true, user: FALLBACK_STUDENTS[0] }
    );
  },

  async getMatches(currentUser: StudentProfile, allStudents: StudentProfile[]): Promise<{ success: boolean; matches: MatchRecommendation[] }> {
    return safeFetch<{ success: boolean; matches: MatchRecommendation[] }>(
      '/api/matches',
      undefined,
      { success: true, matches: computeClientMatches(currentUser, allStudents) }
    );
  },

  async getRequests(userId: string): Promise<{ success: boolean; sent: ExchangeRequest[]; received: ExchangeRequest[] }> {
    const sent = FALLBACK_REQUESTS.filter(r => r.senderId === userId);
    const received = FALLBACK_REQUESTS.filter(r => r.receiverId === userId);
    return safeFetch<{ success: boolean; sent: ExchangeRequest[]; received: ExchangeRequest[] }>(
      '/api/requests',
      undefined,
      { success: true, sent, received }
    );
  },

  async getSessions(userId: string): Promise<{ success: boolean; sessions: LearningSession[] }> {
    const sessions = FALLBACK_SESSIONS.filter(s => s.mentorId === userId || s.learnerId === userId);
    return safeFetch<{ success: boolean; sessions: LearningSession[] }>(
      '/api/sessions',
      undefined,
      { success: true, sessions }
    );
  },

  async getCredits(userId: string, currentBalance: number): Promise<{ success: boolean; balance: number; transactions: CreditTransaction[] }> {
    const transactions = FALLBACK_CREDITS.filter(t => t.userId === userId);
    return safeFetch<{ success: boolean; balance: number; transactions: CreditTransaction[] }>(
      '/api/credits',
      undefined,
      { success: true, balance: currentBalance, transactions }
    );
  },

  async getCategories(): Promise<{ success: boolean; categories: SkillCategory[] }> {
    return safeFetch<{ success: boolean; categories: SkillCategory[] }>(
      '/api/categories',
      undefined,
      { success: true, categories: FALLBACK_CATEGORIES }
    );
  },

  async getStudents(): Promise<{ success: boolean; students: StudentProfile[] }> {
    return safeFetch<{ success: boolean; students: StudentProfile[] }>(
      '/api/students',
      undefined,
      { success: true, students: FALLBACK_STUDENTS }
    );
  }
};
