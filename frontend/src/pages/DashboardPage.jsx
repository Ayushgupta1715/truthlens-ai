import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Newspaper, Image as ImageIcon, Video, CheckCircle2, 
  ShieldAlert, FileDown, ArrowUpRight, Clock, Sparkles, Activity, Search 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function DashboardPage({ setActivePage, setSelectedScan }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-xs text-slate-400 font-mono">Connecting to neural database telemetry...</p>
      </div>
    );
  }

  const pieData = [
    { name: 'Potentially Fake / Spliced', value: stats?.fake_count || 0, color: '#EF4444' },
    { name: 'Authentic / Verified', value: stats?.authentic_count || 0, color: '#10B981' },
    { name: 'Unverified / Inconclusive', value: stats?.unverified_count || 0, color: '#F59E0B' },
  ];

  const barData = [
    { module: 'News (NLP)', scans: stats?.news_scans || 0, fill: '#3B82F6' },
    { module: 'Images (ELA)', scans: stats?.image_scans || 0, fill: '#8B5CF6' },
    { module: 'Videos (CNN)', scans: stats?.video_scans || 0, fill: '#06B6D4' },
    { module: 'Claims (RAG)', scans: stats?.claim_scans || 0, fill: '#10B981' },
  ];

  const filteredScans = (stats?.recent_scans || []).filter(s => 
    s.input_reference.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.content_type.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              PLATFORM TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Forensic Command Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-modal verification activity, detection distributions, and audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('news')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Launch New Verification
          </button>
        </div>
      </div>

      {/* Top 5 Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Scans"
          value={stats?.total_scans || 0}
          subtitle="All media formats"
          icon={LayoutDashboard}
          color="blue"
        />
        <MetricCard
          title="Flagged Misinformation"
          value={stats?.fake_count || 0}
          subtitle="High anomaly alerts"
          icon={ShieldAlert}
          color="rose"
        />
        <MetricCard
          title="Authentic Media"
          value={stats?.authentic_count || 0}
          subtitle="Passed forensic criteria"
          icon={CheckCircle2}
          color="emerald"
        />
        <MetricCard
          title="Images Analyzed"
          value={stats?.image_scans || 0}
          subtitle="ELA compression check"
          icon={ImageIcon}
          color="purple"
        />
        <MetricCard
          title="Videos Sampled"
          value={stats?.video_scans || 0}
          subtitle="Temporal keyframe passes"
          icon={Video}
          color="amber"
        />
      </div>

      {/* Quick Launch Cards for the 4 Engines */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
          Direct Forensic Workspaces:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'news', name: 'Fake News (NLP)', icon: Newspaper, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
            { id: 'image', name: 'Image Forensics (ELA)', icon: ImageIcon, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
            { id: 'video', name: 'Video Deepfake (CNN)', icon: Video, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
            { id: 'claim', name: 'Fact Verifier (RAG)', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`p-3.5 rounded-2xl border ${item.color} flex items-center justify-between text-left hover:scale-[1.02] transition-all`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-bold text-white">{item.name}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Breakdown Pie */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Platform Verdict Distribution
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">N={stats?.total_scans || 0} scans</span>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '14px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs mt-3">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: d.color }} />
                <span className="text-slate-400 text-[11px] font-mono">{d.name}: <b className="text-white">{d.value}</b></span>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Bar Chart */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Workload per Forensic Engine
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">4 Engines</span>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                <XAxis dataKey="module" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '14px', fontSize: '12px' }}
                />
                <Bar dataKey="scans" fill="#3B82F6" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Scans Table */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Live Audit Log & Recent Activities
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter recent logs..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            <button
              onClick={() => setActivePage('history')}
              className="text-xs text-blue-400 hover:text-cyan-300 font-bold whitespace-nowrap ml-2"
            >
              Full Archive →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-slate-400 uppercase font-mono bg-slate-950/40">
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Input Reference</th>
                <th className="py-3 px-3">Prediction</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3 text-right">PDF Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredScans.length > 0 ? (
                filteredScans.map((scan) => {
                  const isFake = scan.prediction.toLowerCase().includes('fake') || scan.prediction.toLowerCase().includes('manipulated');
                  const isAuth = scan.prediction.toLowerCase().includes('authentic') || scan.prediction.toLowerCase().includes('verified');
                  return (
                    <tr key={scan.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 font-mono uppercase font-bold text-slate-300">
                        {scan.content_type}
                      </td>
                      <td className="py-3.5 px-3 text-slate-200 max-w-xs truncate">
                        {scan.input_reference}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isFake
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            : isAuth
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}>
                          {scan.prediction}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-white">
                        {scan.confidence_score}%
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => window.open(api.getReportUrl(scan.id), '_blank')}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5 text-[11px] font-mono"
                          title="Download PDF"
                        >
                          <FileDown className="w-3.5 h-3.5 text-blue-400" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No matching scan activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
