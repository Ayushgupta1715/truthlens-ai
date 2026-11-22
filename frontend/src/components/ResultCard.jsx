import React, { useState } from 'react';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, FileDown, Layers, 
  Info, Share2, Check, Sparkles, Sliders, Zap, Eye, BarChart2 
} from 'lucide-react';
import { api } from '../services/api';

export default function ResultCard({ scan, onReset }) {
  if (!scan) return null;

  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState('summary');

  const prediction = scan.prediction || 'Unknown';
  const confidence = scan.confidence_score || 0;
  const analysis = scan.analysis_results && scan.analysis_results[0];
  const explanation = analysis?.explanation || 'No forensic explanation provided.';
  const details = analysis?.prediction_details || {};
  const indicators = details?.indicators || [];
  const modelName = analysis?.model_name || 'TruthLens AI Multi-Model Forensics';

  const isFake = prediction.toLowerCase().includes('fake') || 
                 prediction.toLowerCase().includes('manipulated') || 
                 prediction.toLowerCase().includes('false');
  const isAuthentic = prediction.toLowerCase().includes('authentic') || 
                      prediction.toLowerCase().includes('verified');

  let badgeColor = 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]';
  let badgeIcon = AlertTriangle;
  let progressColor = 'from-amber-400 via-amber-500 to-orange-500';
  let cardGlow = 'bg-amber-500/20';
  let borderHighlight = 'border-amber-500/40';

  if (isFake) {
    badgeColor = 'bg-rose-500/20 text-rose-200 border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.4)]';
    badgeIcon = ShieldAlert;
    progressColor = 'from-rose-500 via-red-500 to-rose-700';
    cardGlow = 'bg-rose-600/25';
    borderHighlight = 'border-rose-500/40';
  } else if (isAuthentic) {
    badgeColor = 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.4)]';
    badgeIcon = CheckCircle2;
    progressColor = 'from-emerald-400 via-teal-400 to-cyan-500';
    cardGlow = 'bg-emerald-600/25';
    borderHighlight = 'border-emerald-500/40';
  }

  const BadgeIcon = badgeIcon;

  const handleDownloadPDF = () => {
    window.open(api.getReportUrl(scan.id), '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + api.getReportUrl(scan.id));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`facia-card-glow p-6 sm:p-8 rounded-3xl border ${borderHighlight} mt-8 shadow-2xl relative overflow-hidden transition-all text-left`}>
      {/* Dynamic Ambient Background Glows */}
      <div className={`absolute -right-24 -top-24 w-96 h-96 rounded-full blur-[110px] pointer-events-none ${cardGlow}`} />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none bg-blue-600/20" />

      {/* Top Bar: Scan ID & Action Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.1] relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              FORENSIC AUDIT CERTIFICATE
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/40 shadow-[0_0_8px_rgba(0,242,254,0.3)]">
              HASH: {scan.id?.slice(0, 12)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold border ${badgeColor}`}>
              <BadgeIcon className="w-4 h-4" />
              {prediction}
            </span>
          </div>
        </div>

        {/* Action Buttons with Jewel Lighting */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0C122C] hover:bg-[#131C44] text-slate-200 border border-indigo-500/30 transition-all shadow-sm"
            title="Copy Report Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="btn-aurora flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-200" />
            Download PDF Report
          </button>
        </div>
      </div>

      {/* Interactive Tabs within Result */}
      <div className="flex items-center gap-2 mt-6 border-b border-white/[0.08] pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveView('summary')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
            activeView === 'summary' 
              ? 'bg-blue-600/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,242,254,0.3)]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Executive Verdict
        </button>

        <button
          onClick={() => setActiveView('forensics')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
            activeView === 'forensics' 
              ? 'bg-blue-600/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,242,254,0.3)]' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Technical Telemetry ({indicators.length})
        </button>

        {scan.verification_sources && scan.verification_sources.length > 0 && (
          <button
            onClick={() => setActiveView('sources')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              activeView === 'sources' 
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,242,254,0.3)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Evidence Citations ({scan.verification_sources.length})
          </button>
        )}
      </div>

      {/* View 1: Summary */}
      {activeView === 'summary' && (
        <div className="space-y-6 pt-4 animate-fadeIn">
          {/* Confidence Gauge & Progress */}
          <div className="p-5 rounded-2xl bg-[#080D24]/80 border border-indigo-500/30 shadow-inner">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="text-slate-200 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-300" />
                Forensic Model Diagnostic Certainty
              </span>
              <span className="font-mono font-black text-white text-sm bg-[#040614] px-2.5 py-0.5 rounded border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                {confidence}%
              </span>
            </div>
            <div className="w-full bg-[#02040D] rounded-full h-4 p-0.5 border border-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${progressColor} transition-all duration-1000 shadow-[0_0_15px_rgba(0,242,254,0.5)]`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
              <span>0% Ambiguous</span>
              <span>50% Threshold</span>
              <span>100% Deterministic</span>
            </div>
          </div>

          {/* Forensic Explanation Narrative */}
          <div className="p-5 rounded-2xl bg-[#0A102D]/90 border border-indigo-500/30 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
              <Info className="w-4 h-4" />
              Forensic Synthesis & Rationale
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {explanation}
            </p>
          </div>

          {/* Quick Indicator Preview */}
          {indicators.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3 font-mono">
                Primary Diagnostic Signals:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {indicators.slice(0, 4).map((ind, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#090E26]/80 border border-indigo-500/20 text-xs text-slate-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0 shadow-[0_0_6px_#00F2FE]" />
                    <span className="leading-tight">{ind}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* View 2: Technical Telemetry & Deep Metrics */}
      {activeView === 'forensics' && (
        <div className="space-y-6 pt-4 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3 font-mono">
              Full Forensic Anomaly Registry
            </span>
            <div className="space-y-2.5">
              {indicators.map((ind, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#090E26]/90 border border-indigo-500/20 text-xs text-slate-200 shadow-sm">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Frame Timeline */}
          {details?.frame_timeline && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3 font-mono">
                Temporal Video Frame Decomposition ({details.total_frames_sampled} Sampled Frames)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {details.frame_timeline.map((f) => (
                  <div
                    key={f.frame_id}
                    className={`p-3.5 rounded-2xl border text-xs transition-all ${
                      f.is_suspicious
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                        : 'bg-[#080D24] border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono mb-1.5">
                      <span className="font-bold">#Frame {f.frame_id}</span>
                      <span className="text-[10px] text-slate-300 bg-black/60 px-1.5 py-0.5 rounded">{f.timestamp}</span>
                    </div>
                    <div className="text-xs font-black mb-1">
                      {f.score}% anomaly
                    </div>
                    <span className="text-[10px] block opacity-80 leading-tight">
                      {f.is_suspicious ? 'Facial boundary jitter' : 'Continuous biometric'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional details JSON inspection */}
          {details && Object.keys(details).length > 0 && (
            <div className="p-4 rounded-2xl bg-black/70 border border-white/10 shadow-inner">
              <span className="text-[11px] font-mono text-cyan-400 block mb-2">RAW MODEL FORENSIC OUTPUT</span>
              <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(details.details || details, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* View 3: Evidence Sources */}
      {activeView === 'sources' && (
        <div className="space-y-4 pt-4 animate-fadeIn">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1 font-mono">
            Corroborating & Fact-Checking Primary Repositories
          </span>
          <div className="space-y-3">
            {scan.verification_sources?.map((src, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#090E26]/90 border border-indigo-500/20 flex items-center justify-between gap-4 hover:border-cyan-400/40 transition-all shadow-sm">
                <div>
                  <a
                    href={src.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-cyan-300 hover:text-white hover:underline block mb-1"
                  >
                    {src.source_title}
                  </a>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Knowledge Match Certainty: <b className="text-emerald-400">{Math.round(src.relevance_score * 100)}%</b>
                  </span>
                </div>
                <span className={`text-[10px] uppercase font-mono font-bold px-3 py-1 rounded-full border ${
                  src.evidence_type === 'supporting'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : src.evidence_type === 'contradicting'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {src.evidence_type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-white/[0.08] text-[11px] text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Architecture: <b className="text-slate-200">{modelName}</b></span>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="text-cyan-300 hover:text-white font-bold transition-colors flex items-center gap-1 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]"
          >
            Start New Forensic Scan →
          </button>
        )}
      </div>
    </div>
  );
}
