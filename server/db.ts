import fs from 'fs';
import path from 'path';
import {
  User,
  StudentProfile,
  SkillCategory,
  OfferedSkill,
  WantedSkill,
  AvailabilitySlot,
  ExchangeRequest,
  LearningSession,
  CreditTransaction,
  Review,
  Badge,
  CommunityPost,
  PostComment,
  ModerationReport,
  SkillRoadmap,
  MatchRecommendation,
  PlatformStats
} from '../src/types/index.ts';

// Categories
export const INITIAL_CATEGORIES: SkillCategory[] = [
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

export const INITIAL_BADGES: Badge[] = [
  { id: 'badge-first', name: 'First Skill Exchange', description: 'Successfully completed your first peer-to-peer skill swap', iconName: 'Award', category: 'milestone' },
  { id: 'badge-mentor', name: 'Helpful Mentor', description: 'Maintained a 4.8+ rating across at least 3 teaching sessions', iconName: 'Star', category: 'mentor' },
  { id: 'badge-learner', name: 'Active Learner', description: 'Completed 3+ learning sessions exploring new disciplines', iconName: 'Compass', category: 'learner' },
  { id: 'badge-sharer', name: 'Knowledge Sharer', description: 'Listed 3 or more distinct skills offered to fellow students', iconName: 'Share2', category: 'mentor' },
  { id: 'badge-community', name: 'Community Contributor', description: 'Actively contributed high-value answers and study guides in Community', iconName: 'HeartHandshake', category: 'community' },
];

// Seeded realistic students
export const SEED_USERS: StudentProfile[] = [
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

export const INITIAL_EXCHANGES: ExchangeRequest[] = [
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

export const INITIAL_SESSIONS: LearningSession[] = [
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

export const INITIAL_TRANSACTIONS: CreditTransaction[] = [
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
  },
  {
    id: 'tx-3',
    userId: 'user-marcus',
    type: 'earned',
    amount: 60,
    description: 'Taught Public Speaking Session to Alex Rivera',
    relatedSessionId: 'sess-completed-1',
    timestamp: '2026-10-20T17:05:00Z',
    balanceAfter: 150
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    sessionId: 'sess-completed-1',
    reviewerId: 'user-alex',
    reviewerName: 'Alex Rivera',
    reviewerAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    targetUserId: 'user-marcus',
    targetUserName: 'Marcus Chen',
    skillName: 'Public Speaking & Demo Pitching',
    teachingQuality: 5,
    communication: 5,
    punctuality: 5,
    overallRating: 5,
    comment: 'Marcus was incredible! He gave me actionable critique on my hackathon pitch and taught me how to pace my breathing. 100% recommend swapping skills with him.',
    isReported: false,
    createdAt: '2026-10-20T17:30:00Z'
  },
  {
    id: 'rev-2',
    sessionId: 'sess-prior-2',
    reviewerId: 'user-david',
    reviewerName: 'David Kim',
    reviewerAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    targetUserId: 'user-alex',
    targetUserName: 'Alex Rivera',
    skillName: 'Python Automation & Scripting',
    teachingQuality: 5,
    communication: 5,
    punctuality: 4,
    overallRating: 5,
    comment: 'Alex patiently walked through debugging errors and taught me how to use list comprehensions properly. Awesome mentor.',
    isReported: false,
    createdAt: '2026-09-29T11:00:00Z'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-maya',
    authorName: 'Maya Patel',
    authorAvatar: '/src/assets/images/avatar_student_mentor1_1793214443296.jpg',
    authorDepartment: 'Design & Digital Media',
    authorYear: '2nd Year',
    category: 'Graphic Design & UI/UX',
    postType: 'Project',
    title: 'Redesigned the campus shuttle app in Figma — Looking for feedback & a React swap!',
    content: 'Just finished a 12-screen Figma interactive prototype for the university bus tracking system with live occupancy tags and arrival alerts. Would love peer critique, and happy to teach Figma components in exchange for someone teaching me React state basics!',
    likes: 14,
    likedBy: ['user-alex', 'user-marcus'],
    commentCount: 3,
    isReported: false,
    createdAt: '2026-10-24T14:20:00Z'
  },
  {
    id: 'post-2',
    authorId: 'user-alex',
    authorName: 'Alex Rivera',
    authorAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    authorDepartment: 'Computer Science',
    authorYear: '3rd Year',
    category: 'Programming & Development',
    postType: 'Resource',
    title: 'Free Cheat Sheet: 10 Python Automation Scripts Every College Student Should Have',
    content: 'Put together a GitHub repo of 10 practical scripts: auto-sorting course download folders, converting lecture slide PDFs to markdown notes, and scraping campus lunch menus. Feel free to fork and DM me if you need help running them!',
    likes: 28,
    likedBy: ['user-maya', 'user-david', 'user-sarah'],
    commentCount: 5,
    isReported: false,
    createdAt: '2026-10-22T09:40:00Z'
  },
  {
    id: 'post-3',
    authorId: 'user-david',
    authorName: 'David Kim',
    authorAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    authorDepartment: 'Data Science',
    authorYear: '1st Year',
    category: 'Academic Subjects & STEM',
    postType: 'Mentor Request',
    title: 'Study partner wanted: Linear Algebra proofs & Eigenvalues practice',
    content: 'Preparing for the mid-term exam next Thursday. Looking for an engineering or CS student who wants to review matrix diagonalization and orthogonality. In exchange, I can teach you SQL queries or stats!',
    likes: 8,
    likedBy: ['user-alex'],
    commentCount: 2,
    isReported: false,
    createdAt: '2026-10-26T18:10:00Z'
  }
];

export const INITIAL_COMMENTS: PostComment[] = [
  {
    id: 'comm-1',
    postId: 'post-1',
    authorId: 'user-alex',
    authorName: 'Alex Rivera',
    authorAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    authorDepartment: 'Computer Science',
    content: 'This prototype looks super clean! The bus route cards have great contrast. I can definitely teach you React component state and props whenever you are ready.',
    createdAt: '2026-10-24T15:00:00Z'
  },
  {
    id: 'comm-2',
    postId: 'post-1',
    authorId: 'user-marcus',
    authorName: 'Marcus Chen',
    authorAvatar: '/src/assets/images/avatar_student_mentor2_1793214444432.jpg',
    authorDepartment: 'Business Administration',
    content: 'Love this. Have you considered showing this to the Campus Transit Committee? Would make a great case presentation.',
    createdAt: '2026-10-24T16:22:00Z'
  }
];

export const INITIAL_ROADMAPS: SkillRoadmap[] = [
  {
    id: 'road-python',
    skillName: 'Python for Beginners & Automation',
    targetLevel: 'Intermediate',
    durationWeeks: 4,
    description: 'Go from zero programming experience to building real scripts that automate file management, web data extraction, and data formatting.',
    modules: [
      {
        week: 1,
        title: 'Core Fundamentals & Environment',
        objective: 'Set up Python, understand variables, conditionals, loops, and write your first interactive program.',
        topics: ['Installing Python & VS Code', 'Variables, numbers, strings & booleans', 'If/Else conditionals and Boolean logic', 'While and For loops over sequences'],
        activities: ['Interactive command-line quiz', 'Calculate course GPA calculator'],
        miniProject: 'Build a text-based Student Expense Tracker that saves entries to a text file.'
      },
      {
        week: 2,
        title: 'Data Structures & Modular Functions',
        objective: 'Master Lists, Dictionaries, Sets, and clean reusable function design with type hints.',
        topics: ['Lists, slicing, and list comprehensions', 'Dictionaries as key-value databases', 'Defining functions, default arguments, return values', 'Imports and the standard library'],
        activities: ['Dictionary frequency counter for words in an essay', 'Grade statistics calculator (min, max, median)'],
        miniProject: 'Create a Campus Club Member Directory CLI with search and filter capabilities.'
      },
      {
        week: 3,
        title: 'File I/O, CSV & Automation Tasks',
        objective: 'Automate repetitive desktop tasks by reading, writing, sorting, and organizing local files.',
        topics: ['Reading and writing text & CSV files', 'Pathlib and os module directory operations', 'Handling try/except errors safely', 'Dates & timestamps with datetime'],
        activities: ['Script that scans Downloads folder and sorts files into PDF, Images, Code', 'CSV sales summary generator'],
        miniProject: 'Automated Course Syllabus Archive: downloads and renames weekly lecture files.'
      },
      {
        week: 4,
        title: 'Web Scraping & Real-World API Requests',
        objective: 'Fetch real data from the web and APIs to power autonomous notifications and summaries.',
        topics: ['HTTP requests with requests library', 'Parsing HTML with BeautifulSoup', 'Consuming JSON REST APIs', 'Scheduling scripts with cron/task scheduler'],
        activities: ['Fetch live weather data from Open-Meteo', 'Extract book titles from an academic reading list'],
        miniProject: 'Campus Event Alert Bot: Scrapes the university events page and saves upcoming hackathons into a clean Markdown table.'
      }
    ]
  },
  {
    id: 'road-figma',
    skillName: 'UI/UX Design with Figma',
    targetLevel: 'Intermediate',
    durationWeeks: 4,
    description: 'Master the industry-standard interface design tool, design systems, auto-layout, and clickable high-fidelity prototypes.',
    modules: [
      {
        week: 1,
        title: 'Design Foundations & Figma Workspace',
        objective: 'Navigate Figma comfortably, master vectors, frames, and typography hierarchy.',
        topics: ['Frames vs Groups', 'Vector networks and pen tool basics', 'Type scales, line heights, and font pairings', 'Color theory and contrast compliance (WCAG AA)'],
        activities: ['Recreate 3 popular mobile app headers', 'Build an accessible color palette tokens frame'],
        miniProject: 'Design a clean student profile card with avatar, skills, and bio.'
      },
      {
        week: 2,
        title: 'Auto-Layout & Responsive Components',
        objective: 'Learn auto-layout direction, padding, gap, hugging/filling, and master atomic reusable components.',
        topics: ['Auto-layout padding, gap, and distribution', 'Component creation & variants', 'Component properties (boolean, text, instance swap)', 'Nested responsive containers'],
        activities: ['Build a universal button system with 5 states (default, hover, focus, disabled, loading)', 'Build a responsive search bar'],
        miniProject: 'Create a responsive mobile navigation bar and course listing grid.'
      },
      {
        week: 3,
        title: 'Design Systems & Wireframing Flows',
        objective: 'Structure cohesive UI design systems and build user flows from low-fi wireframes to polished screens.',
        topics: ['Design tokens for spacing, elevation, and typography', 'Information architecture and user journey flows', 'Low-fidelity wireframing strategies', 'Grid systems (8pt grid, 12-column desktop grid)'],
        activities: ['Design system sticker sheet', 'Wireframe a 3-step checkout / booking flow'],
        miniProject: 'High-fidelity 3-screen mobile app: Discover, Details, and Booking confirmation.'
      },
      {
        week: 4,
        title: 'Interactive Prototyping & Usability Testing',
        objective: 'Bring screens to life with smart animations, overlays, and conduct peer usability testing.',
        topics: ['Figma interactions (On click, While hovering, Drag)', 'Smart Animate transitions & easing curves', 'Modal overlays, bottom sheets, and fixed headers', 'Sharing prototypes & collecting user feedback'],
        activities: ['Micro-interaction: like button animation with bounce', 'Drawer menu slide-in transition'],
        miniProject: 'A clickable, presentation-ready interactive prototype for a campus peer exchange app.'
      }
    ]
  },
  {
    id: 'road-public-speaking',
    skillName: 'Public Speaking & Presentation Skills',
    targetLevel: 'Intermediate',
    durationWeeks: 3,
    description: 'Transform anxiety into confident, commanding stage presence for class presentations, project pitches, and conference talks.',
    modules: [
      {
        week: 1,
        title: 'Speech Structure & Audience Hook',
        objective: 'Craft a compelling narrative structure with a strong hook, three key pillars, and memorable closing.',
        topics: ['The Rule of Three in persuasive speeches', 'Crafting provocative 30-second opening hooks', 'Storytelling frameworks (Hero’s journey / Problem-Solution-Vision)', 'Slide economy: killing bullet-point overload'],
        activities: ['Write 3 distinct hooks for the same topic', 'Outline a 5-minute lightning talk without slides'],
        miniProject: 'Deliver a 3-minute recorded talk introducing an impactful student initiative.'
      },
      {
        week: 2,
        title: 'Vocal Delivery, Body Language & Pacing',
        objective: 'Master pitch variation, deliberate pauses, eye contact, and eliminate filler words.',
        topics: ['Diaphragmatic breathing and posture', 'The power of the deliberate 2-second pause', 'Eliminating "um", "like", and "you know"', 'Using open hand gestures for emphasis'],
        activities: ['Read aloud a dramatic monologue using varying speeds', 'Record a 60-second video with zero filler words'],
        miniProject: 'Conduct a peer mock Q&A defense session handling 3 surprise challenges.'
      },
      {
        week: 3,
        title: 'Demo Day & Slide Pitch Mastery',
        objective: 'Deliver an engaging project demonstration with live technology, storytelling, and high confidence.',
        topics: ['Screen demo etiquette and focal transitions', 'Handling unexpected technical glitches gracefully', 'Engaging hybrid and in-person audiences', 'Call to Action formulation'],
        activities: ['Rehearse emergency backup plan for live software demo', 'Peer critique rubric evaluation'],
        miniProject: 'Deliver a full 7-minute capstone project presentation with slides.'
      }
    ]
  }
];

// In-Memory Database with optional disk save
class Database {
  private users: StudentProfile[] = [...SEED_USERS];
  private categories: SkillCategory[] = [...INITIAL_CATEGORIES];
  private badges: Badge[] = [...INITIAL_BADGES];
  private requests: ExchangeRequest[] = [...INITIAL_EXCHANGES];
  private sessions: LearningSession[] = [...INITIAL_SESSIONS];
  private transactions: CreditTransaction[] = [...INITIAL_TRANSACTIONS];
  private reviews: Review[] = [...INITIAL_REVIEWS];
  private posts: CommunityPost[] = [...INITIAL_COMMUNITY_POSTS];
  private comments: PostComment[] = [...INITIAL_COMMENTS];
  private reports: ModerationReport[] = [];
  private roadmaps: SkillRoadmap[] = [...INITIAL_ROADMAPS];
  private currentUserId: string = 'user-alex';

  constructor() {
    this.updateCategoryMentorCounts();
  }

  // Current session management
  getCurrentUser(): StudentProfile {
    const user = this.users.find(u => u.id === this.currentUserId);
    if (!user) return this.users[0];
    return user;
  }

  setCurrentUser(userId: string): StudentProfile | null {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.currentUserId = userId;
      return user;
    }
    return null;
  }

  // Users
  getUsers(): StudentProfile[] {
    return this.users.filter(u => !u.isSuspended);
  }

  getAllUsersIncludingSuspended(): StudentProfile[] {
    return this.users;
  }

  getUserById(id: string): StudentProfile | undefined {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): StudentProfile | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData: Partial<StudentProfile>): StudentProfile {
    const id = `user-${Date.now()}`;
    const newUser: StudentProfile = {
      id,
      email: userData.email || '',
      name: userData.name || '',
      college: userData.college || 'State University',
      department: userData.department || 'General Studies',
      yearOfStudy: userData.yearOfStudy || '1st Year',
      avatarUrl: userData.avatarUrl || '/src/assets/images/avatar_student_mentor1_1793214443296.jpg',
      bio: userData.bio || '',
      role: 'student',
      creditBalance: 60, // Welcome grant
      isSuspended: false,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      averageRating: 5.0,
      totalReviews: 0,
      completedExchangesCount: 0,
      badges: ['badge-first'],
      offeredSkills: [],
      wantedSkills: [],
      availability: [],
      preferences: {
        userId: id,
        preferredDurationMinutes: 60,
        preferredStyle: 'hands-on'
      }
    };
    this.users.push(newUser);
    this.currentUserId = newUser.id;

    // Record welcome credit
    this.transactions.push({
      id: `tx-${Date.now()}`,
      userId: id,
      type: 'bonus',
      amount: 60,
      description: 'Welcome onboard bonus credits',
      timestamp: new Date().toISOString(),
      balanceAfter: 60
    });

    return newUser;
  }

  updateUser(id: string, updates: Partial<StudentProfile>): StudentProfile | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updates };
    this.updateCategoryMentorCounts();
    return this.users[index];
  }

  toggleSuspendUser(userId: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;
    user.isSuspended = !user.isSuspended;
    return user.isSuspended;
  }

  // Categories
  getCategories(): SkillCategory[] {
    this.updateCategoryMentorCounts();
    return this.categories;
  }

  updateCategoryMentorCounts() {
    this.categories.forEach(cat => {
      const mentorsInCat = new Set<string>();
      this.users.forEach(u => {
        if (!u.isSuspended) {
          u.offeredSkills.forEach(skill => {
            if (skill.categoryId === cat.id || skill.categoryId === cat.slug) {
              mentorsInCat.add(u.id);
            }
          });
        }
      });
      cat.mentorCount = Math.max(mentorsInCat.size, 1);
    });
  }

  // Smart Matching Algorithm (Section 8 of prompt)
  // Match Score = 50% Skill Compatibility + 30% Availability Compatibility + 20% Learning-Level Compatibility
  calculateSmartMatches(userId: string): MatchRecommendation[] {
    const me = this.getUserById(userId);
    if (!me) return [];

    const recommendations: MatchRecommendation[] = [];

    const otherStudents = this.users.filter(u => u.id !== userId && !u.isSuspended && u.role === 'student');

    for (const student of otherStudents) {
      // 1. Skill Compatibility (0 - 100)
      // Check what they teach that I want:
      const theyTeachIWant = student.offeredSkills.filter(off =>
        me.wantedSkills.some(wan =>
          wan.skillName.toLowerCase().includes(off.skillName.toLowerCase()) ||
          off.skillName.toLowerCase().includes(wan.skillName.toLowerCase()) ||
          wan.categoryId === off.categoryId
        )
      );

      // Check what I teach that they want:
      const iTeachTheyWant = me.offeredSkills.filter(off =>
        student.wantedSkills.some(wan =>
          wan.skillName.toLowerCase().includes(off.skillName.toLowerCase()) ||
          off.skillName.toLowerCase().includes(wan.skillName.toLowerCase()) ||
          wan.categoryId === off.categoryId
        )
      );

      const isReciprocal = theyTeachIWant.length > 0 && iTeachTheyWant.length > 0;
      let skillScore = 0;
      if (isReciprocal) {
        skillScore = 100;
      } else if (theyTeachIWant.length > 0) {
        skillScore = 65; // High one-way match
      } else if (iTeachTheyWant.length > 0) {
        skillScore = 55; // Opportunity to teach
      } else {
        // Broad departmental or interest match
        skillScore = 20;
      }

      // 2. Availability Compatibility (0 - 100)
      const myDays = me.availability.map(a => a.dayOfWeek);
      const theirDays = student.availability.map(a => a.dayOfWeek);
      const overlappingDays = Array.from(new Set(myDays.filter(d => theirDays.includes(d))));

      // Check slot & format match
      let exactSlotOverlapCount = 0;
      me.availability.forEach(mySlot => {
        student.availability.forEach(theirSlot => {
          if (mySlot.dayOfWeek === theirSlot.dayOfWeek && mySlot.timeSlot === theirSlot.timeSlot) {
            exactSlotOverlapCount++;
          }
        });
      });

      const formats: string[] = [];
      const hasOnline = me.availability.some(a => a.format === 'online' || a.format === 'both') &&
                        student.availability.some(a => a.format === 'online' || a.format === 'both');
      const hasOffline = me.availability.some(a => a.format === 'offline' || a.format === 'both') &&
                         student.availability.some(a => a.format === 'offline' || a.format === 'both');
      if (hasOnline) formats.push('Online');
      if (hasOffline) formats.push('Campus In-Person');

      let availabilityScore = 0;
      if (exactSlotOverlapCount >= 2 && formats.length > 0) {
        availabilityScore = 100;
      } else if (exactSlotOverlapCount === 1 && formats.length > 0) {
        availabilityScore = 80;
      } else if (overlappingDays.length > 0) {
        availabilityScore = 60;
      } else {
        availabilityScore = 30; // Flexible scheduling
      }

      // 3. Learning-Level Compatibility (0 - 100)
      let levelScore = 70; // baseline good match
      if (theyTeachIWant.length > 0) {
        const mentorSkill = theyTeachIWant[0];
        const myWanted = me.wantedSkills.find(w => w.skillName.toLowerCase().includes(mentorSkill.skillName.toLowerCase()));
        if (myWanted) {
          if (mentorSkill.level === 'Advanced' && (myWanted.currentLevel === 'Beginner' || myWanted.currentLevel === 'Intermediate')) {
            levelScore = 100;
          } else if (mentorSkill.level === 'Intermediate' && myWanted.currentLevel === 'Beginner') {
            levelScore = 90;
          } else if (mentorSkill.level === myWanted.currentLevel) {
            levelScore = 80; // Peer study buddy
          }
        }
      }

      // Formula: 50% Skill + 30% Availability + 20% Level
      const totalScore = Math.round(0.50 * skillScore + 0.30 * availabilityScore + 0.20 * levelScore);

      // Generate honest human reason
      let reason = '';
      if (isReciprocal) {
        const theirOffer = theyTeachIWant[0].skillName;
        const myOffer = iTeachTheyWant[0].skillName;
        const dayStr = overlappingDays.length > 0 ? overlappingDays.join(' and ') : 'flexible weekdays';
        reason = `Direct reciprocal swap: They teach ${theirOffer}, want to learn your ${myOffer}, and both share availability on ${dayStr}.`;
      } else if (theyTeachIWant.length > 0) {
        const theirOffer = theyTeachIWant[0].skillName;
        reason = `Complimentary match: Offers ${theirOffer} matching your learning goals. Compatible for ${formats.join(' & ') || 'flexible'} sessions.`;
      } else if (iTeachTheyWant.length > 0) {
        const myOffer = iTeachTheyWant[0].skillName;
        reason = `Teaching match: Looking to learn ${myOffer} which you offer at an experienced level.`;
      } else {
        reason = `Peer collaboration match based on shared college department (${student.department}) and schedule alignment.`;
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

    // Sort descending by match score
    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  }

  // Requests
  getRequests(userId: string): { sent: ExchangeRequest[]; received: ExchangeRequest[] } {
    const sent = this.requests.filter(r => r.senderId === userId);
    const received = this.requests.filter(r => r.receiverId === userId);
    return { sent, received };
  }

  createRequest(data: Partial<ExchangeRequest>): ExchangeRequest {
    const newReq: ExchangeRequest = {
      id: `req-${Date.now()}`,
      senderId: data.senderId || this.currentUserId,
      senderName: data.senderName || '',
      senderAvatar: data.senderAvatar || '',
      senderDepartment: data.senderDepartment || '',
      receiverId: data.receiverId || '',
      receiverName: data.receiverName || '',
      receiverAvatar: data.receiverAvatar || '',
      receiverDepartment: data.receiverDepartment || '',
      skillOfferedName: data.skillOfferedName || '',
      skillWantedName: data.skillWantedName || '',
      proposedDate: data.proposedDate || new Date().toISOString().split('T')[0],
      proposedTime: data.proposedTime || '14:00',
      durationMinutes: data.durationMinutes || 60,
      format: data.format || 'online',
      locationOrLink: data.locationOrLink || 'To be shared upon confirmation',
      note: data.note || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.requests.unshift(newReq);
    return newReq;
  }

  updateRequestStatus(requestId: string, status: 'accepted' | 'rejected' | 'cancelled'): ExchangeRequest | null {
    const req = this.requests.find(r => r.id === requestId);
    if (!req) return null;
    req.status = status;
    req.updatedAt = new Date().toISOString();

    // If accepted, auto-create a LearningSession
    if (status === 'accepted') {
      const session: LearningSession = {
        id: `sess-${Date.now()}`,
        requestId: req.id,
        mentorId: req.receiverId,
        mentorName: req.receiverName,
        learnerId: req.senderId,
        learnerName: req.senderName,
        skillTaught: req.skillWantedName,
        skillLearned: req.skillOfferedName,
        sessionDate: req.proposedDate,
        sessionTime: req.proposedTime,
        durationMinutes: req.durationMinutes,
        format: req.format,
        locationOrLink: req.locationOrLink,
        learningObjectives: [
          `Introduction & baseline review of ${req.skillWantedName}`,
          `Interactive hands-on exercise with mentor guidance`,
          `Feedback, roadmap next steps & skill swap reciprocal plans`
        ],
        status: 'scheduled',
        mentorConfirmed: false,
        learnerConfirmed: false,
        createdAt: new Date().toISOString()
      };
      this.sessions.unshift(session);
    }
    return req;
  }

  // Sessions
  getSessions(userId: string): LearningSession[] {
    return this.sessions.filter(s => s.mentorId === userId || s.learnerId === userId);
  }

  confirmSessionCompletion(sessionId: string, userId: string): { session: LearningSession; completedNow: boolean } | null {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return null;

    if (session.mentorId === userId) {
      session.mentorConfirmed = true;
    }
    if (session.learnerId === userId) {
      session.learnerConfirmed = true;
    }

    let completedNow = false;
    // Release credits ONLY when BOTH participants have confirmed
    if (session.mentorConfirmed && session.learnerConfirmed && session.status !== 'completed') {
      session.status = 'completed';
      completedNow = true;

      // Mentor earns credits for teaching (e.g. 60 min = 60 credits)
      const mentor = this.getUserById(session.mentorId);
      if (mentor) {
        mentor.creditBalance += session.durationMinutes;
        mentor.completedExchangesCount += 1;
        this.transactions.unshift({
          id: `tx-${Date.now()}-m`,
          userId: mentor.id,
          type: 'earned',
          amount: session.durationMinutes,
          description: `Taught ${session.skillTaught} to ${session.learnerName} (${session.durationMinutes} mins)`,
          relatedSessionId: session.id,
          timestamp: new Date().toISOString(),
          balanceAfter: mentor.creditBalance
        });
      }

      // Learner spends credits for session
      const learner = this.getUserById(session.learnerId);
      if (learner) {
        learner.creditBalance = Math.max(0, learner.creditBalance - session.durationMinutes);
        learner.completedExchangesCount += 1;
        this.transactions.unshift({
          id: `tx-${Date.now()}-l`,
          userId: learner.id,
          type: 'spent',
          amount: session.durationMinutes,
          description: `Learned ${session.skillTaught} with mentor ${session.mentorName}`,
          relatedSessionId: session.id,
          timestamp: new Date().toISOString(),
          balanceAfter: learner.creditBalance
        });
      }
    }

    return { session, completedNow };
  }

  // Credits
  getCreditTransactions(userId: string): CreditTransaction[] {
    return this.transactions.filter(t => t.userId === userId);
  }

  // Reviews
  getReviewsForUser(userId: string): Review[] {
    return this.reviews.filter(r => r.targetUserId === userId && !r.isReported);
  }

  createReview(data: Partial<Review>): Review {
    const rev: Review = {
      id: `rev-${Date.now()}`,
      sessionId: data.sessionId || '',
      reviewerId: data.reviewerId || this.currentUserId,
      reviewerName: data.reviewerName || '',
      reviewerAvatar: data.reviewerAvatar || '',
      targetUserId: data.targetUserId || '',
      targetUserName: data.targetUserName || '',
      skillName: data.skillName || '',
      teachingQuality: data.teachingQuality || 5,
      communication: data.communication || 5,
      punctuality: data.punctuality || 5,
      overallRating: data.overallRating || 5,
      comment: data.comment || '',
      isReported: false,
      createdAt: new Date().toISOString()
    };
    this.reviews.unshift(rev);

    // Recalculate target user average rating
    const targetUserReviews = this.reviews.filter(r => r.targetUserId === rev.targetUserId && !r.isReported);
    const avg = targetUserReviews.reduce((sum, r) => sum + r.overallRating, 0) / targetUserReviews.length;
    const targetUser = this.getUserById(rev.targetUserId);
    if (targetUser) {
      targetUser.averageRating = Math.round(avg * 10) / 10;
      targetUser.totalReviews = targetUserReviews.length;
    }

    return rev;
  }

  reportItem(reporterId: string, itemType: 'post' | 'review' | 'user' | 'exchange', itemId: string, reason: string, details: string): ModerationReport {
    const report: ModerationReport = {
      id: `rep-${Date.now()}`,
      reporterId,
      reporterName: this.getUserById(reporterId)?.name || 'Student',
      itemType,
      itemId,
      itemSummary: `${itemType.toUpperCase()} #${itemId.slice(-6)} - ${reason}`,
      reason,
      details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.reports.unshift(report);

    if (itemType === 'post') {
      const p = this.posts.find(x => x.id === itemId);
      if (p) p.isReported = true;
    } else if (itemType === 'review') {
      const r = this.reviews.find(x => x.id === itemId);
      if (r) r.isReported = true;
    }
    return report;
  }

  // Community
  getCommunityPosts(): CommunityPost[] {
    return this.posts.filter(p => !p.isReported);
  }

  getAllCommunityPostsAdmin(): CommunityPost[] {
    return this.posts;
  }

  createPost(data: Partial<CommunityPost>): CommunityPost {
    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: data.authorId || this.currentUserId,
      authorName: data.authorName || '',
      authorAvatar: data.authorAvatar || '',
      authorDepartment: data.authorDepartment || '',
      authorYear: data.authorYear || '',
      category: data.category || 'Programming & Development',
      postType: data.postType || 'Question',
      title: data.title || '',
      content: data.content || '',
      likes: 0,
      likedBy: [],
      commentCount: 0,
      isReported: false,
      createdAt: new Date().toISOString()
    };
    this.posts.unshift(post);
    return post;
  }

  toggleLikePost(postId: string, userId: string): { likes: number; isLiked: boolean } | null {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;
    const index = post.likedBy.indexOf(userId);
    let isLiked = false;
    if (index >= 0) {
      post.likedBy.splice(index, 1);
      post.likes = Math.max(0, post.likes - 1);
      isLiked = false;
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
      isLiked = true;
    }
    return { likes: post.likes, isLiked };
  }

  getComments(postId: string): PostComment[] {
    return this.comments.filter(c => c.postId === postId);
  }

  addComment(postId: string, content: string, userId: string): PostComment | null {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;
    const user = this.getUserById(userId);
    const comm: PostComment = {
      id: `comm-${Date.now()}`,
      postId,
      authorId: userId,
      authorName: user?.name || 'Student',
      authorAvatar: user?.avatarUrl || '',
      authorDepartment: user?.department || 'Student',
      content,
      createdAt: new Date().toISOString()
    };
    this.comments.push(comm);
    post.commentCount += 1;
    return comm;
  }

  // Roadmaps
  getRoadmaps(): SkillRoadmap[] {
    return this.roadmaps;
  }

  addRoadmap(roadmap: SkillRoadmap) {
    this.roadmaps.unshift(roadmap);
  }

  // Admin Reports & Stats
  getReports(): ModerationReport[] {
    return this.reports;
  }

  updateReportStatus(reportId: string, status: 'resolved' | 'dismissed'): ModerationReport | null {
    const report = this.reports.find(r => r.id === reportId);
    if (!report) return null;
    report.status = status;
    return report;
  }

  getPlatformStats(): PlatformStats {
    const totalRegistered = this.users.length;
    const activeUsers = this.users.filter(u => !u.isSuspended).length;
    const completedExchanges = this.sessions.filter(s => s.status === 'completed').length;
    const totalHours = completedExchanges * 1; // 1 hr avg
    const activeRequests = this.requests.filter(r => r.status === 'pending' || r.status === 'accepted').length;

    const acceptedCount = this.requests.filter(r => r.status === 'accepted' || r.status === 'completed').length;
    const matchSuccessRate = this.requests.length > 0 ? Math.round((acceptedCount / this.requests.length) * 100) : 85;
    const exchangeCompletionRate = this.sessions.length > 0 ? Math.round((completedExchanges / this.sessions.length) * 100) : 90;

    const circulatingCredits = this.users.reduce((sum, u) => sum + u.creditBalance, 0);

    // Aggregate skill supply & demand
    const offeredSkillCounts: Record<string, number> = {};
    const wantedSkillCounts: Record<string, number> = {};

    this.users.forEach(u => {
      u.offeredSkills.forEach(s => {
        offeredSkillCounts[s.skillName] = (offeredSkillCounts[s.skillName] || 0) + 1;
      });
      u.wantedSkills.forEach(s => {
        wantedSkillCounts[s.skillName] = (wantedSkillCounts[s.skillName] || 0) + 1;
      });
    });

    const topOfferedSkills = Object.entries(offeredSkillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topWantedSkills = Object.entries(wantedSkillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Skills with high demand and few mentors
    const highDemandLowSupplySkills = Object.entries(wantedSkillCounts)
      .map(([skill, wantedCount]) => {
        const offeredCount = offeredSkillCounts[skill] || 0;
        return { skill, wantedCount, offeredCount, gap: wantedCount - offeredCount };
      })
      .filter(x => x.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 5);

    return {
      totalRegisteredStudents: totalRegistered,
      activeUsers,
      completedExchanges,
      totalHoursTaught: totalHours,
      activeExchangeRequests: activeRequests,
      matchSuccessRate,
      exchangeCompletionRate,
      circulatingCredits,
      topOfferedSkills,
      topWantedSkills,
      highDemandLowSupplySkills
    };
  }
}

export const db = new Database();
