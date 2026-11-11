export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';
export type SessionFormat = 'online' | 'offline' | 'both';

export interface User {
  id: string;
  email: string;
  name: string;
  college: string;
  department: string;
  yearOfStudy: string;
  avatarUrl: string;
  bio: string;
  role: 'student' | 'admin';
  creditBalance: number;
  isSuspended: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  mentorCount: number;
}

export interface OfferedSkill {
  id: string;
  userId: string;
  categoryId: string;
  skillName: string;
  level: SkillLevel;
  description: string;
  portfolioUrl?: string;
}

export interface WantedSkill {
  id: string;
  userId: string;
  categoryId: string;
  skillName: string;
  currentLevel: SkillLevel;
  learningGoal: string;
}

export interface AvailabilitySlot {
  id: string;
  userId: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
  format: 'online' | 'offline' | 'both';
}

export interface UserPreferences {
  userId: string;
  preferredDurationMinutes: number; // 30, 60, 90
  preferredStyle: 'hands-on' | 'conceptual' | 'project-based' | 'casual';
  partnerNotes?: string;
}

export interface StudentProfile extends User {
  offeredSkills: OfferedSkill[];
  wantedSkills: WantedSkill[];
  availability: AvailabilitySlot[];
  preferences?: UserPreferences;
  badges: string[]; // badge IDs
  averageRating: number;
  totalReviews: number;
  completedExchangesCount: number;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';

export interface ExchangeRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderDepartment: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  receiverDepartment: string;
  skillOfferedName: string; // What sender teaches
  skillWantedName: string;  // What sender wants to learn
  proposedDate: string;
  proposedTime: string;
  durationMinutes: number;
  format: 'online' | 'offline';
  locationOrLink: string;
  note: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LearningSession {
  id: string;
  requestId: string;
  mentorId: string;
  mentorName: string;
  learnerId: string;
  learnerName: string;
  skillTaught: string;
  skillLearned?: string;
  sessionDate: string;
  sessionTime: string;
  durationMinutes: number;
  format: 'online' | 'offline';
  locationOrLink: string;
  learningObjectives: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  mentorConfirmed: boolean;
  learnerConfirmed: boolean;
  createdAt: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'bonus' | 'refund';
  amount: number;
  description: string;
  relatedSessionId?: string;
  timestamp: string;
  balanceAfter: number;
}

export interface Review {
  id: string;
  sessionId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  targetUserId: string;
  targetUserName: string;
  skillName: string;
  teachingQuality: number; // 1-5
  communication: number; // 1-5
  punctuality: number; // 1-5
  overallRating: number; // 1-5
  comment: string;
  isReported: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: 'mentor' | 'learner' | 'community' | 'milestone';
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  badge: Badge;
  earnedAt: string;
}

export interface MatchRecommendation {
  student: StudentProfile;
  matchScore: number; // 0-100
  scoreBreakdown: {
    skillCompatibility: number; // 0-100
    availabilityCompatibility: number; // 0-100
    learningLevelCompatibility: number; // 0-100
  };
  isReciprocal: boolean;
  complementarySkills: {
    theyTeachYou: string[];
    youTeachThem: string[];
  };
  reason: string;
  overlappingDays: string[];
  compatibleFormats: string[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: string;
  authorYear: string;
  category: string;
  postType: 'Question' | 'Project' | 'Mentor Request' | 'Resource';
  title: string;
  content: string;
  likes: number;
  likedBy: string[];
  commentCount: number;
  isReported: boolean;
  createdAt: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: string;
  content: string;
  createdAt: string;
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  reporterName: string;
  itemType: 'post' | 'review' | 'user' | 'exchange';
  itemId: string;
  itemSummary: string;
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface RoadmapModule {
  week: number;
  title: string;
  objective: string;
  topics: string[];
  activities: string[];
  miniProject: string;
}

export interface SkillRoadmap {
  id: string;
  skillName: string;
  targetLevel: SkillLevel;
  durationWeeks: number;
  description: string;
  modules: RoadmapModule[];
  isAiGenerated?: boolean;
}

export interface PlatformStats {
  totalRegisteredStudents: number;
  activeUsers: number;
  completedExchanges: number;
  totalHoursTaught: number;
  activeExchangeRequests: number;
  matchSuccessRate: number;
  exchangeCompletionRate: number;
  circulatingCredits: number;
  topOfferedSkills: { skill: string; count: number }[];
  topWantedSkills: { skill: string; count: number }[];
  highDemandLowSupplySkills: { skill: string; wantedCount: number; offeredCount: number; gap: number }[];
}
