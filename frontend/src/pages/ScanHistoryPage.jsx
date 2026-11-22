import React, { useState, useEffect } from 'react';
import { History, Search, Filter, Trash2, FileDown, Eye, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import ResultCard from '../components/ResultCard';

export default function ScanHistoryPage() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectScan, setInspectScan] = useState(null);

  const fetchScans = async () => {
    setLoading(true);
    try {
      const data = await api.getScans(selectedType, searchQuery);
      setScans(data);
    } catch (err) {
      setError(err.message || 'Failed to retrieve scan history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScans();
  }, [selectedType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchScans();
  };

  const handleDelete = async (scanId) => {
    if (!window.confirm('Are you sure you want to delete this scan record?')) return;
    try {
      await api.deleteScan(scanId);
      setScans(scans.filter(s => s.id !== scanId));
      if (inspectScan?.id === scanId) setInspectScan(null);
    } catch (err) {
      alert(err.message || 'Failed to delete scan.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Scan History & Archive</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Review past verification logs, inspected indicators, and generated reports</p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search headline or filename..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['', 'news', 'image', 'video', 'claim'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {type === '' ? 'All Scans' : type}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Scans Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono bg-slate-900/50">
                <th className="py-3.5 px-4">Media</th>
                <th className="py-3.5 px-4">Input Reference</th>
                <th className="py-3.5 px-4">Prediction</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400 font-mono">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-500" />
                    Fetching scan archive...
                  </td>
                </tr>
              ) : scans.length > 0 ? (
                scans.map((scan) => {
                  const isFake = scan.prediction.toLowerCase().includes('fake') || scan.prediction.toLowerCase().includes('manipulated');
                  const isAuth = scan.prediction.toLowerCase().includes('authentic') || scan.prediction.toLowerCase().includes('verified');
                  const timeStr = new Date(scan.created_at).toLocaleString();

                  return (
                    <tr key={scan.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold uppercase text-slate-300">
                        {scan.content_type}
                      </td>
                      <td className="py-3.5 px-4 text-slate-200 max-w-sm truncate">
                        {scan.input_reference}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isFake
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : isAuth
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {scan.prediction}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {scan.confidence_score}%
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {timeStr}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setInspectScan(scan)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-blue-400 transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => window.open(api.getReportUrl(scan.id), '_blank')}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
                            title="Download PDF"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(scan.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No matching scan records found in archive.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Inspection Modal / Card */}
      {inspectScan && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Detailed Inspection for Scan #{inspectScan.id?.slice(0, 8)}
            </h3>
            <button
              onClick={() => setInspectScan(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close Details ✕
            </button>
          </div>
          <ResultCard scan={inspectScan} onReset={() => setInspectScan(null)} />
        </div>
      )}
    </div>
  );
}
