import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ShieldAlert, Newspaper, Image as ImageIcon, Video, 
  CheckCircle2, ArrowRight, Sparkles, Layers, Sliders, Activity, 
  Eye, RefreshCw, AlertTriangle, FileText, Check 
} from 'lucide-react';

export default function BiometricHUDScanner({ onLaunchModule }) {
  const [activeModule, setActiveModule] = useState('image'); // 'news' | 'image' | 'video' | 'claim'
  const [targetMode, setTargetMode] = useState('manipulated'); // 'authentic' | 'manipulated'
  const [scanning, setScanning] = useState(false);

  const modules = {
    image: {
      id: 'image',
      name: 'Deepfake Image Forensics',
      tech: 'CNN + EfficientNet & ELA',
      icon: ImageIcon,
      authentic: {
        verdict: 'Likely Authentic Photo',
        score: '12% Manipulation Prob',
        metric1Label: 'ELA Deviation',
        metric1Value: 'Normal (<15)',
        metric2Label: 'Sensor Noise Pattern',
        metric2Value: 'Uniform ISO Noise',
        indicator: 'Natural pixel compression & organic skin pore distribution',
        isFake: false
      },
      manipulated: {
        verdict: 'Synthetic Face Manipulation',
        score: '94% Manipulation Prob',
        metric1Label: 'ELA Deviation',
        metric1Value: 'High Discontinuity (87.4)',
        metric2Label: 'Sensor Noise Pattern',
        metric2Value: 'Synthetic Smoothing Artifacts',
        indicator: 'Error Level Analysis reveals compression mismatch at facial boundary',
        isFake: true
      }
    },
    video: {
      id: 'video',
      name: 'Deepfake Video Forensics',
      tech: 'OpenCV + Temporal CNN',
      icon: Video,
      authentic: {
        verdict: 'Consistent Video Stream',
        score: '08% Anomaly Rate',
        metric1Label: 'Temporal Coherence',
        metric1Value: '96.2% Frame Match',
        metric2Label: 'Facial Mesh Jitter',
        metric2Value: 'Stable Landmark Mesh',
        indicator: 'Organic optical flow and steady eye-blink cadence across keyframes',
        isFake: false
      },
      manipulated: {
        verdict: 'Temporal Deepfake Detected',
        score: '91% Anomaly Rate',
        metric1Label: 'Temporal Coherence',
        metric1Value: 'Inter-frame Discontinuity',
        metric2Label: 'Facial Mesh Jitter',
        metric2Value: 'Boundary Warping Detected',
        indicator: 'Frame-to-frame lighting jumps and facial perimeter jitter at t=1.5s',
        isFake: true
      }
    },
    news: {
      id: 'news',
      name: 'Fake News NLP Scanner',
      tech: 'NLP + Scikit-Learn TF-IDF',
      icon: Newspaper,
      authentic: {
        verdict: 'Legitimate Report',
        score: '89% Authenticity Score',
        metric1Label: 'Clickbait Index',
        metric1Value: 'Low (0.12)',
        metric2Label: 'Punctuation Intensity',
        metric2Value: 'Standard Journalistic',
        indicator: 'Verified institutional tone with direct attribution to authoritative sources',
        isFake: false
      },
      manipulated: {
        verdict: 'Sensational Fake News',
        score: '92% Misinformation Prob',
        metric1Label: 'Clickbait Index',
        metric1Value: 'Extreme (0.88)',
        metric2Label: 'Punctuation Intensity',
        metric2Value: 'Excessive All-Caps & Exclamation',
        indicator: 'High-frequency sensational emotional triggers with zero verifiable source citations',
        isFake: true
      }
    },
    claim: {
      id: 'claim',
      name: 'AI Fact Verification',
      tech: 'NLP + Evidence Retrieval RAG',
      icon: CheckCircle2,
      authentic: {
        verdict: 'Verified Authentic Claim',
        score: '95% Evidence Alignment',
        metric1Label: 'Knowledge Match',
        metric1Value: 'Matched (WHO/PIB/Reuters)',
        metric2Label: 'Institutional Stance',
        metric2Value: 'Supporting Stance',
        indicator: 'Corroborated by official government press release and peer-reviewed records',
        isFake: false
      },
      manipulated: {
        verdict: 'Debunked False Claim',
        score: '97% Contradiction Index',
        metric1Label: 'Knowledge Match',
        metric1Value: 'Discredited by Fact Repositories',
        metric2Label: 'Institutional Stance',
        metric2Value: 'Contradicting Stance',
        indicator: 'Explicitly flagged as fabricated rumor by PIB Fact Check and health authorities',
        isFake: true
      }
    }
  };

  const currentMod = modules[activeModule];
  const isManipulated = targetMode === 'manipulated';
  const data = isManipulated ? currentMod.manipulated : currentMod.authentic;

  const handleModeToggle = (mode) => {
    setScanning(true);
    setTargetMode(mode);
    setTimeout(() => setScanning(false), 350);
  };

  const handleModuleChange = (modKey) => {
    setScanning(true);
    setActiveModule(modKey);
    setTimeout(() => setScanning(false), 350);
  };

  return (
    <div className="facia-card-glow rounded-3xl p-6 sm:p-7 relative overflow-hidden text-left max-w-xl mx-auto w-full border border-indigo-500/40 shadow-[0_0_60px_rgba(99,102,241,0.25)]">
      {/* Neon Reticle Corners */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-500/20 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#00F2FE]" />
          <div>
            <span className="text-xs font-mono font-extrabold tracking-wider uppercase text-white block">
              TRUTHLENS FORENSIC SIMULATOR
            </span>
            <span className="text-[10px] font-mono text-cyan-300">
              Multi-Model Explainable AI Engine
            </span>
          </div>
        </div>

        {/* Target Sample Toggle */}
        <div className="flex items-center gap-1 bg-[#06091A] p-1 rounded-xl border border-indigo-500/30 text-[11px] font-mono shadow-inner">
          <button
            type="button"
            onClick={() => handleModeToggle('authentic')}
            className={`px-3 py-1 rounded-lg transition-all ${
              !isManipulated 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Authentic Sample
          </button>
          <button
            type="button"
            onClick={() => handleModeToggle('manipulated')}
            className={`px-3 py-1 rounded-lg transition-all ${
              isManipulated 
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.5)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manipulated / Fake
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-[#070B20] border border-white/[0.08] mb-4 text-[11px] font-mono">
        {[
          { key: 'image', label: 'Image ELA', icon: ImageIcon },
          { key: 'video', label: 'Video Frame', icon: Video },
          { key: 'news', label: 'News NLP', icon: Newspaper },
          { key: 'claim', label: 'Fact Check', icon: CheckCircle2 }
        ].map(item => {
          const Icon = item.icon;
          const isSelected = activeModule === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleModuleChange(item.key)}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl font-semibold transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Inspection Frame */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#020512] to-[#080D24] border border-indigo-500/30 p-4 overflow-hidden mb-4 shadow-inner">
        {/* Animated laser scanline */}
        <div className="biometric-laser" />

        {/* Visual Inspection Area */}
        <div className="relative rounded-xl border border-indigo-500/30 bg-[#05081A] p-4 min-h-[140px] flex flex-col justify-between overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-facia-pattern opacity-40 pointer-events-none" />

          {/* Module-Specific Simulation Render */}
          {activeModule === 'image' && (
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-cyan-400/60 bg-gradient-to-br from-[#1E1B4B]/80 to-[#0F172A] flex items-center justify-center overflow-hidden shadow-[inset_0_0_15px_rgba(0,242,254,0.3)]">
                {/* Facial mesh nodes */}
                <div className="w-14 h-18 rounded-[30px] border border-cyan-400/50 flex items-center justify-center relative">
                  <div className={`w-2 h-2 rounded-full absolute top-4 left-2.5 ${isManipulated ? 'bg-rose-500 animate-ping' : 'bg-cyan-400'}`} />
                  <div className={`w-2 h-2 rounded-full absolute top-4 right-2.5 ${isManipulated ? 'bg-rose-500 animate-ping' : 'bg-cyan-400'}`} />
                  <div className={`w-2 h-2 rounded-full absolute bottom-4 ${isManipulated ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                </div>
                {/* ELA boundary highlight if manipulated */}
                {isManipulated && (
                  <div className="absolute inset-2 border-2 border-rose-500/80 rounded-xl animate-pulse shadow-[0_0_12px_#F43F5E]" />
                )}
                <span className="absolute bottom-1 text-[8px] font-mono text-cyan-300 font-bold bg-black/80 px-1 rounded">
                  {isManipulated ? 'ELA MISMATCH' : 'ORGANIC NOISE'}
                </span>
              </div>
              <div className="flex-1 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>ANALYSIS STREAM:</span>
                  <span className="text-cyan-300 font-bold">Error Level Analysis</span>
                </div>
                <div className="p-2 rounded-lg bg-[#090E26] border border-indigo-500/20 text-[11px] text-slate-300">
                  {data.indicator}
                </div>
              </div>
            </div>
          )}

          {activeModule === 'video' && (
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>KEYFRAME SEQUENCE SAMPLING:</span>
                <span className="text-cyan-300 font-bold">OpenCV 1.5s Stride</span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono">
                {['t=0.0s [Frame #01]', 't=1.5s [Frame #45]', 't=3.0s [Frame #90]'].map((lbl, idx) => (
                  <div 
                    key={lbl} 
                    className={`p-2 rounded-xl border text-center text-[10px] ${
                      isManipulated && idx === 1
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                        : 'bg-[#090E26] border-indigo-500/20 text-slate-300'
                    }`}
                  >
                    <span className="block font-bold text-slate-200">{lbl}</span>
                    <span className={isManipulated && idx === 1 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {isManipulated && idx === 1 ? 'Jitter Anomaly' : 'Stable Coherence'}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-mono text-slate-400">
                {data.indicator}
              </p>
            </div>
          )}

          {activeModule === 'news' && (
            <div className="relative z-10 space-y-2 font-mono">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>LEXICAL FEATURE VECTOR:</span>
                <span className="text-cyan-300 font-bold">TF-IDF + Sensationalism</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#090E26] border border-indigo-500/20 text-[11px] leading-relaxed text-slate-300">
                {isManipulated ? (
                  <span>
                    Headline: <span className="text-rose-300 font-bold bg-rose-500/20 px-1 rounded">BREAKING: MIRACLE CURE</span> doctors banned worldwide! Share before it's deleted!
                  </span>
                ) : (
                  <span>
                    Headline: <span className="text-emerald-300 font-bold bg-emerald-500/20 px-1 rounded">WHO Releases Updated</span> peer-reviewed research protocols for clinical assessment.
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">
                {data.indicator}
              </p>
            </div>
          )}

          {activeModule === 'claim' && (
            <div className="relative z-10 space-y-2 font-mono">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>EVIDENCE RETRIEVAL (RAG):</span>
                <span className="text-cyan-300 font-bold">WHO • PIB • Reuters • NASA</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#090E26] border border-indigo-500/20 text-[11px] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[9px]">EVALUATED CLAIM:</span>
                  <span className="text-white font-semibold">
                    {isManipulated ? '"Free laptops for college students"' : '"Polio vaccination drive dates"'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  isManipulated 
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' 
                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                }`}>
                  {isManipulated ? 'DEBUNKED' : 'CONFIRMED'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {data.indicator}
              </p>
            </div>
          )}
        </div>

        {/* Verdict Bar */}
        <div className={`mt-3 p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between ${
          isManipulated 
            ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.25)]' 
            : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
        }`}>
          <div className="flex items-center gap-2">
            {isManipulated ? <ShieldAlert className="w-4 h-4 text-rose-300" /> : <ShieldCheck className="w-4 h-4 text-emerald-300" />}
            <span>{data.verdict}</span>
          </div>
          <span className="text-sm font-extrabold">{data.score}</span>
        </div>

        {/* Dual Telemetry Badges */}
        <div className="grid grid-cols-2 gap-2 mt-2.5 text-[10px] font-mono">
          <div className="p-2.5 rounded-xl bg-[#090E26]/80 border border-indigo-500/20">
            <span className="text-slate-400 block mb-0.5">{data.metric1Label}:</span>
            <span className="text-white font-bold">{data.metric1Value}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#090E26]/80 border border-indigo-500/20">
            <span className="text-slate-400 block mb-0.5">{data.metric2Label}:</span>
            <span className="text-white font-bold">{data.metric2Value}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[10px] font-mono text-slate-400">
          Simulated Pipeline: <b className="text-cyan-300">{currentMod.tech}</b>
        </span>
        <button
          type="button"
          onClick={() => onLaunchModule(currentMod.id)}
          className="btn-aurora flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-white transition-all shadow-lg"
        >
          <span>Launch {currentMod.name.split(' ')[0]} Tool</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-200" />
        </button>
      </div>
    </div>
  );
}
