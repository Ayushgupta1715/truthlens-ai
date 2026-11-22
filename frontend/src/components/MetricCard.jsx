import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20',
    rose: 'from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/20',
    emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20',
  };

  return (
    <div className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all hover:border-slate-600/60">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorMap[color]} border`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</div>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
