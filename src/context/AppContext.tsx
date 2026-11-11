import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  StudentProfile,
  SkillCategory,
  ExchangeRequest,
  LearningSession,
  CreditTransaction,
  MatchRecommendation,
  CommunityPost
} from '../types/index.ts';
import { api } from '../services/api.ts';

interface AppContextType {
  currentUser: StudentProfile | null;
  categories: SkillCategory[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  switchAccount: (userId: string) => Promise<void>;
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  onboardingOpen: boolean;
  setOnboardingOpen: (open: boolean) => void;
  requestModalStudent: StudentProfile | null;
  setRequestModalStudent: (student: StudentProfile | null) => void;
  reviewModalSession: LearningSession | null;
  setReviewModalSession: (session: LearningSession | null) => void;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  setNotification: (notif: { message: string; type: 'success' | 'error' | 'info' } | null) => void;
  allStudents: StudentProfile[];
  refreshAllStudents: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(null);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [allStudents, setAllStudents] = useState<StudentProfile[]>([]);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [requestModalStudent, setRequestModalStudent] = useState<StudentProfile | null>(null);
  const [reviewModalSession, setReviewModalSession] = useState<LearningSession | null>(null);

  // Toast notification
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const refreshUser = useCallback(async () => {
    try {
      const data = await api.getMe();
      if (data?.user) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.warn('Using default student profile:', err);
    }
  }, []);

  const refreshCategories = useCallback(async () => {
    try {
      const data = await api.getCategories();
      if (data?.categories) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.warn('Using fallback categories:', err);
    }
  }, []);

  const refreshAllStudents = useCallback(async () => {
    try {
      const data = await api.getStudents();
      if (data?.students) {
        setAllStudents(data.students);
      }
    } catch (err) {
      console.warn('Using fallback students:', err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await Promise.all([refreshUser(), refreshCategories(), refreshAllStudents()]);
      setIsLoading(false);
    };
    init();
  }, [refreshUser, refreshCategories, refreshAllStudents]);

  const switchAccount = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/switch-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        setNotification({ message: `Switched active student to ${data.user.name}`, type: 'success' });
        await refreshAllStudents();
      }
    } catch (err) {
      setNotification({ message: 'Failed to switch student account', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('landing');
    setNotification({ message: 'Signed out of S2S learn', type: 'info' });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        categories,
        activeTab,
        setActiveTab,
        isLoading,
        refreshUser,
        switchAccount,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        onboardingOpen,
        setOnboardingOpen,
        requestModalStudent,
        setRequestModalStudent,
        reviewModalSession,
        setReviewModalSession,
        notification,
        setNotification,
        allStudents,
        refreshAllStudents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
