/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SupabaseProvider } from './components/SupabaseProvider';
import { PyodideInitializer } from './components/PyodideInitializer';
import { useStore } from './store/useStore';
import { secureLog, secureError } from './lib/securityUtils';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { LessonPage } from './pages/LessonPage';
import { Playground } from './pages/Playground';
import { Leaderboard } from './pages/Leaderboard';
import { CourseExplorer } from './pages/CourseExplorer';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { AssessmentPage } from './pages/AssessmentPage';
import { RichTextDemo } from './pages/RichTextDemo';


function AppContent() {
  const { user, page, setPage } = useStore();

  secureLog("AppContent Render:", { hasUser: !!user, page });

  // If user just logged in, ensure we are on dashboard
  const handleStart = () => {
    secureLog("handleStart called, setting page to dashboard");
    setPage('dashboard');
  };

  if (!user) {
    secureLog("No user found, showing LandingPage");
    return <LandingPage onStart={handleStart} />;
  }

  const renderPage = () => {
    secureLog("Rendering page:", page);
    try {
      switch (page) {
        case 'dashboard': return <Dashboard />;
        case 'lesson': return <LessonPage />;
        case 'playground': return <Playground />;
        case 'leaderboard': return <Leaderboard />;
        case 'courses': return <CourseExplorer />;
        case 'profile': return <Profile />;
        case 'admin': return <AdminDashboard />;
        case 'assessments': return (user?.role === 'praktikan') ? <Dashboard /> : <AssessmentPage />;

        default: return <Dashboard />;
      }
    } catch (error) {
      secureError("Page render error:", error);
      return <Dashboard />;
    }
  };

  return (
    <div onClick={(e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href === '/') { e.preventDefault(); setPage('dashboard'); }
        if (href === '/courses') { e.preventDefault(); setPage('courses'); }
        if (href === '/playground') { e.preventDefault(); setPage('playground'); }
        if (href === '/leaderboard') { e.preventDefault(); setPage('leaderboard'); }
        if (href === '/profile') { e.preventDefault(); setPage('profile'); }
        if (href === '/admin') { e.preventDefault(); setPage('admin'); }
        if (href === '/assessments') { e.preventDefault(); setPage('assessments'); }

      }
    }}>
      {renderPage()}
    </div>
  );
}

export default function App() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <SupabaseProvider>
      <PyodideInitializer />
      <div className="relative min-h-screen">
        {/* Floating Demo Toggle Button */}
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="fixed top-4 right-4 z-[9999] px-4 py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-700/20 active:scale-95 transition-all text-xs flex items-center gap-1.5"
        >
          {showDemo ? '🔙 Kembali ke E-Learning' : '🧪 Buka Demo Rich Text (Edra)'}
        </button>
        
        {showDemo ? <RichTextDemo /> : <AppContent />}
      </div>
    </SupabaseProvider>
  );
}

