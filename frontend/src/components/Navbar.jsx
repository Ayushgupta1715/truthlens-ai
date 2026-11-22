import React from 'react';
import { 
  ShieldAlert, Newspaper, Image as ImageIcon, Video, CheckCircle2, 
  History, LayoutDashboard, BarChart3, LogIn, LogOut, Sparkles, HelpCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activePage, setActivePage, onOpenGuide }) {
  const { user, logout, isAuthenticated } = useAuth();

  // Navigation Items strictly adhering to Requirement 6:
  // Dashboard, Fake News, Image Detection, Video Detection, Fact Verification, Scan History, How It Works, Sign In, Register
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'Fake News', icon: Newspaper },
    { id: 'image', label: 'Image Detection', icon: ImageIcon },
    { id: 'video', label: 'Video Detection', icon: Video },
    { id: 'claim', label: 'Fact Verification', icon: CheckCircle2 },
    { id: 'history', label: 'Scan History', icon: History },
  ];

  if (user?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Telemetry', icon: BarChart3 });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#030611]/90 backdrop-blur-2xl border-b border-indigo-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Jewel Aurora Glow */}
          <button
            type="button"
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-3.5 group text-left focus:outline-none"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 p-[1.5px] shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_30px_rgba(0,242,254,0.7)] group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#050816] rounded-full shadow-[0_0_8px_#34D399]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                  TruthLens
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                  AI
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-emerald-400 font-semibold tracking-wider">NEURAL RADAR LIVE</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-2xl bg-[#090D22]/80 border border-white/[0.08] shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] border-t border-white/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action / How It Works Guide & Auth */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all shadow-[0_0_10px_rgba(0,242,254,0.2)]"
              title="How TruthLens Works"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">How It Works</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-xl bg-[#0B1028] border border-indigo-500/30 shadow-sm">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-100 leading-tight">{user?.name}</span>
                    <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold tracking-wider">{user?.role}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-300 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 transition-all shadow-sm"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePage('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/[0.08] border border-white/[0.1] transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage('register')}
                  className="btn-aurora flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around py-2 border-t border-white/[0.08] bg-[#030611]/95 overflow-x-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                isActive ? 'text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
