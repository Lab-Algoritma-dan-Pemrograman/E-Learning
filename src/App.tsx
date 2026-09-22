/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SupabaseProvider } from './components/SupabaseProvider';
import { PyodideInitializer } from './components/PyodideInitializer';
import { ClangInitializer } from './components/ClangInitializer';
import { useStore } from './store/useStore';
import { secureLog, secureError } from './lib/securityUtils';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { LessonPage } from './pages/LessonPage';
import { Playground } from './pages/Playground';
import { Leaderboard } from './pages/Leaderboard';
import { CourseExplorer } from './pages/CourseExplorer';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { StudentMonitoring } from './pages/StudentMonitoring';
import { AuditLogPage } from './pages/AuditLogPage';
import { TerminalDemo } from './pages/TerminalDemo';


// Kosakata role kanonis = backend Go: koordinator | asisten | mahasiswa.
// Alias lama (admin, kordas, praktikan) tetap diterima supaya sesi/token lama tidak terkunci.
const ADMIN_ROLES = ['koordinator', 'kordas', 'admin'];
const STAFF_ROLES = ['koordinator', 'kordas', 'admin', 'asisten'];


function AppContent() {
  const { user, page, setPage } = useStore();
  const [showLogin, setShowLogin] = useState(false);

  // If user just logged in, ensure we are on dashboard
  const handleStart = () => {
    secureLog("handleStart called, showing LoginPage");
    setShowLogin(true);
  };

  if (!user) {
    if (showLogin) {
      secureLog("No user found, showing LoginPage");
      return <LoginPage onBack={() => setShowLogin(false)} />;
    }
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
        case 'admin': return (ADMIN_ROLES.includes(user?.role || '')) ? <AdminDashboard /> : <Dashboard />;
        case 'monitoring': return (STAFF_ROLES.includes(user?.role || '')) ? <StudentMonitoring /> : <Dashboard />;
        case 'auditlog': return (ADMIN_ROLES.includes(user?.role || '')) ? <AuditLogPage /> : <Dashboard />;
        case 'terminal-demo': return <TerminalDemo />;

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
        if (href === '/monitoring') { e.preventDefault(); setPage('monitoring'); }
        if (href === '/auditlog') { e.preventDefault(); setPage('auditlog'); }
        if (href === '/terminal-demo') { e.preventDefault(); setPage('terminal-demo'); }

      }
    }}>
      {renderPage()}
    </div>
  );
}

export default function App() {
  return (
    <SupabaseProvider>
      <PyodideInitializer />
      <ClangInitializer />
      <div className="relative min-h-screen">
        <AppContent />
      </div>
    </SupabaseProvider>
  );
}
