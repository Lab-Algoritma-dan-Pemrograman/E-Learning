/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { SupabaseProvider } from './components/SupabaseProvider';
import { PyodideInitializer } from './components/PyodideInitializer';
import { ClangInitializer } from './components/ClangInitializer';
import { useStore } from './store/useStore';
import { secureLog, secureError } from './lib/securityUtils';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

// Halaman dalam (butuh login) di-lazy agar bundle awal landing tetap kecil.
// Sebelumnya semua halaman ikut terunduh saat buka landing -> 3 MB sekaligus.
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const LessonPage = lazy(() => import('./pages/LessonPage').then((m) => ({ default: m.LessonPage })));
const Playground = lazy(() => import('./pages/Playground').then((m) => ({ default: m.Playground })));
const Leaderboard = lazy(() => import('./pages/Leaderboard').then((m) => ({ default: m.Leaderboard })));
const CourseExplorer = lazy(() => import('./pages/CourseExplorer').then((m) => ({ default: m.CourseExplorer })));
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const StudentMonitoring = lazy(() => import('./pages/StudentMonitoring').then((m) => ({ default: m.StudentMonitoring })));
const AuditLogPage = lazy(() => import('./pages/AuditLogPage').then((m) => ({ default: m.AuditLogPage })));
const TerminalDemo = lazy(() => import('./pages/TerminalDemo').then((m) => ({ default: m.TerminalDemo })));


// Kosakata role lokal E-Learning: admin | kordas | asisten | praktikan.
// Alias dari backend Go (koordinator, mahasiswa) tetap diterima supaya token lama tidak terkunci.
const ADMIN_ROLES = ['admin', 'kordas', 'koordinator'];
const STAFF_ROLES = ['admin', 'kordas', 'koordinator', 'asisten'];


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

  const content = renderPage();

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
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-zinc-500">Memuat halaman...</div>}>
        {content}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <SupabaseProvider>
      <AppWithWorkers />
    </SupabaseProvider>
  );
}

// Worker compiler (Pyodide/Clang) hanya dinyalakan SETELAH login.
// Sebelumnya jalan sejak landing dibuka -> rebutan CPU/bandwidth
// padahal pengunjung belum tentu menekan "Jalankan".
function AppWithWorkers() {
  const { user } = useStore();
  return (
    <>
      {user && <PyodideInitializer />}
      {user && <ClangInitializer />}
      <div className="relative min-h-screen">
        <AppContent />
      </div>
    </>
  );
}
