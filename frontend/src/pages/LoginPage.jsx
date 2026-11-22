import React, { useState } from 'react';
import { ShieldAlert, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ setActivePage }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@truthlens.ai');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@truthlens.ai');
      setPassword('admin123');
    } else {
      setEmail('demo@truthlens.ai');
      setPassword('demo123');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sign In to TruthLens</h2>
          <p className="text-xs text-slate-400 mt-1">Access detection tools, scan history & verified reports</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="you@university.edu"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 block mb-2 font-mono">Quick Demo Credentials:</span>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCredentials('user')}
              type="button"
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
            >
              Student (demo)
            </button>
            <button
              onClick={() => setCredentials('admin')}
              type="button"
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
            >
              Admin (admin)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={() => setActivePage('register')}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}
