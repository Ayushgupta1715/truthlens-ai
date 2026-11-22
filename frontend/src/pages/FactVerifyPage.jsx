import React, { useState } from 'react';
import { CheckCircle2, Search, Send, RefreshCw, AlertCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { api } from '../services/api';
import ResultCard from '../components/ResultCard';

export default function FactVerifyPage() {
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const sampleClaims = [
    "Government has announced free laptops for all college students.",
    "COVID-19 vaccine contains microchips for 5G tracking.",
    "Apollo 11 mission successfully landed astronauts on the moon in 1969.",
    "Scientists confirm Earth is flat with a giant ice wall in Antarctica."
  ];

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!claim.trim()) {
      setError('Please enter a claim statement to verify.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const data = await api.verifyClaim(claim);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Fact verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Module 4: Evidence-Based Fact Verification
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI Claim & Fact Verification Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Retrieves corroborating and refuting evidence from verified institutional records to determine if claims are authentic, debunked, or unverified.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        {/* Sample claims pills */}
        <div className="pb-6 mb-6 border-b border-slate-800">
          <span className="text-xs text-slate-400 font-mono block mb-2.5">
            Try benchmark claims from recent fact-checking archives:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleClaims.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setClaim(c)}
                className="px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs text-slate-300 border border-slate-700 hover:border-slate-600 transition-all text-left"
              >
                "{c.length > 50 ? c.slice(0, 50) + '...' : c}"
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Claim or Statement to Verify *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="e.g. Government announces free laptops for all students..."
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Search className="w-5 h-5 text-slate-500 absolute right-4 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Missing evidence is accurately classified as "Unverified" rather than automatically fake.
            </span>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Retrieving Sources...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Verify Claim
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {result && <ResultCard scan={result} onReset={() => { setResult(null); setClaim(''); }} />}
    </div>
  );
}
