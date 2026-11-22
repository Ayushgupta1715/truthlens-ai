import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ setActivePage }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, role);
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto mb-3 border border-indigo-500/30">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Create an Account</h2>
          <p className="text-xs text-slate-400 mt-1">Join the TruthLens AI verification network</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. Alex Johnson"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="alex@college.edu"
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
              placeholder="Min 6 characters"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Platform Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="user">Student / General Researcher</option>
              <option value="admin">Platform Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Sign In here
          </button>
        </div>
      </div>
    </div>
  );
}
