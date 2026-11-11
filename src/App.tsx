import React from 'react';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { ExploreSkills } from './components/ExploreSkills.tsx';
import { SmartMatching } from './components/SmartMatching.tsx';
import { SessionsView } from './components/SessionsView.tsx';
import { RoadmapsView } from './components/RoadmapsView.tsx';
import { CommunityView } from './components/CommunityView.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { SendRequestModal } from './components/SendRequestModal.tsx';
import { ReviewModal } from './components/ReviewModal.tsx';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, notification, setNotification } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B132B] text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Universal Top Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'explore' && <ExploreSkills />}
        {activeTab === 'matches' && <SmartMatching />}
        {activeTab === 'sessions' && <SessionsView />}
        {activeTab === 'roadmaps' && <RoadmapsView />}
        {activeTab === 'community' && <CommunityView />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AuthModal />
      <OnboardingModal />
      <SendRequestModal />
      <ReviewModal />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-medium max-w-md animate-fade-in transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
          {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
          {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />}
          {notification.type === 'info' && <Info className="w-4 h-4 text-blue-500 shrink-0" />}
          <span className="flex-1">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ThemeProvider>
  );
}
