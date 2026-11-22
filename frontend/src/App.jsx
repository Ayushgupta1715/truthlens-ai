import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FakeNewsPage from './pages/FakeNewsPage';
import DeepfakeImagePage from './pages/DeepfakeImagePage';
import DeepfakeVideoPage from './pages/DeepfakeVideoPage';
import FactVerifyPage from './pages/FactVerifyPage';
import ScanHistoryPage from './pages/ScanHistoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ForensicChatbot from './components/ForensicChatbot';
import HowItWorksModal from './components/HowItWorksModal';
import { ShieldCheck, Heart } from 'lucide-react';

function AppContent() {
  const [activePage, setActivePage] = useState('landing');
  const [selectedScan, setSelectedScan] = useState(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { user } = useAuth();

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      case 'dashboard':
        return <DashboardPage setActivePage={setActivePage} setSelectedScan={setSelectedScan} />;
      case 'news':
        return <FakeNewsPage />;
      case 'image':
        return <DeepfakeImagePage />;
      case 'video':
        return <DeepfakeVideoPage />;
      case 'claim':
        return <FactVerifyPage />;
      case 'history':
        return <ScanHistoryPage />;
      case 'admin':
        return user?.role === 'admin' ? (
          <AdminDashboardPage />
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Admin Access Required</h2>
            <p className="text-xs text-slate-400 mb-4">Please log in with an administrator account to view telemetry.</p>
            <button
              onClick={() => setActivePage('login')}
              className="px-4 py-2 bg-blue-600 rounded-xl text-xs font-semibold text-white"
            >
              Sign In as Admin
            </button>
          </div>
        );
      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenGuide={() => setIsGuideOpen(true)} 
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Interactive Platform User Guide Modal */}
      <HowItWorksModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigate={(page) => setActivePage(page)}
      />

      {/* Global Forensic AI Chatbot Widget */}
      <ForensicChatbot />

      {/* Academic Project Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-8 px-4 text-center mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-slate-300">TruthLens AI</span>
            <span className="text-slate-600">•</span>
            <span>Academic Mini Project (AI & Data Science)</span>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            FastAPI + PyTorch / Scikit-learn + React (Vite)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
