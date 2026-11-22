import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Database, ShieldCheck, Cpu, RefreshCw, AlertCircle } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAdminData() {
      try {
        const data = await api.getAdminStats();
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to load administrator statistics.');
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
        <p className="text-xs text-slate-400 font-mono">Loading platform telemetry & model benchmarks...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          System Administration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Admin Analytics & Model Benchmarks
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor system health, registered accounts, platform scan volumes, and ML/CV benchmark evaluation metrics.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Top Level Telemetry */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Registered Users"
          value={stats?.total_users || 0}
          subtitle="Active researchers"
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Cumulative Scans"
          value={stats?.total_scans || 0}
          subtitle="Across all modules"
          icon={Database}
          color="emerald"
        />
        <MetricCard
          title="Flagged Misinformation"
          value={stats?.prediction_distribution?.fake_or_manipulated || 0}
          subtitle="Detected violations"
          icon={ShieldCheck}
          color="rose"
        />
        <MetricCard
          title="Active Model Pipelines"
          value="4 Models"
          subtitle="NLP, CV, Video, RAG"
          icon={Cpu}
          color="purple"
        />
      </div>

      {/* Model Benchmark Evaluation Table (PRD Section 8 & Section 10 Table 5) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              AI / ML Model Performance Benchmarks
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Trained evaluation metrics recorded on test split datasets (Accuracy, Precision, Recall, F1-Score)
            </p>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
            All Models Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono bg-slate-900/50">
                <th className="py-3 px-4">Forensic Model</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">F1-Score</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {stats?.model_metrics?.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                    {m.model_name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                    {m.accuracy}%
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">
                    {m.precision}%
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                    {m.recall}%
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {m.f1_score}%
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Production
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
