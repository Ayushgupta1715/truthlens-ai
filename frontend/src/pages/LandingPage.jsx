import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Newspaper, Image as ImageIcon, Video, 
  CheckCircle2, ArrowRight, Sparkles, Cpu, BarChart2, Zap, Lock, 
  Layers, Terminal, Check, Globe, Activity, Eye, Scan, Sliders, 
  AlertTriangle, RefreshCw, FileText, Database, Compass 
} from 'lucide-react';
import BiometricHUDScanner from '../components/BiometricHUDScanner';

export default function LandingPage({ setActivePage }) {
  // Detection Feature Cards as requested in Requirement 3
  const featureCards = [
    {
      id: 'news',
      title: 'Fake News Detection',
      techLabel: 'NLP + ML',
      techBadge: 'Scikit-Learn • TF-IDF',
      desc: 'Evaluates article text and headlines using TF-IDF lexical modeling, sensational clickbait metrics, and punctuation intensity to uncover manipulated news.',
      icon: Newspaper,
      accent: 'border-blue-500/40 text-blue-300 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.25)]',
      btnText: 'Launch Text Scanner'
    },
    {
      id: 'image',
      title: 'Deepfake Image Detection',
      techLabel: 'CNN + EfficientNet',
      techBadge: 'PyTorch • ELA Forensics',
      desc: 'Inspects uploaded portraits and photos using Error Level Analysis (ELA) and residual frequency noise variance to identify synthetic GAN and Diffusion manipulation.',
      icon: ImageIcon,
      accent: 'border-purple-500/40 text-purple-300 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.25)]',
      btnText: 'Analyze Image'
    },
    {
      id: 'video',
      title: 'Deepfake Video Detection',
      techLabel: 'OpenCV + CNN',
      techBadge: 'OpenCV • Temporal CNN',
      desc: 'Decomposes video streams into keyframe sequences to measure temporal facial stability, eye-blink consistency, and lighting coherence across frames.',
      icon: Video,
      accent: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/20 shadow-[0_0_20px_rgba(0,242,254,0.25)]',
      btnText: 'Examine Video'
    },
    {
      id: 'claim',
      title: 'AI Fact Verification',
      techLabel: 'NLP + Evidence Retrieval',
      techBadge: 'RAG • Stance Classifier',
      desc: 'Cross-references submitted claim statements against verified institutional databases (WHO, PIB, Reuters, NASA) using semantic stance classification.',
      icon: CheckCircle2,
      accent: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.25)]',
      btnText: 'Verify Claim'
    }
  ];

  // 4 Academic Forensic Modules as requested in Requirement 4
  const academicModules = [
    {
      id: 'news',
      title: 'Lexical NLP News Classifier',
      category: 'Natural Language Processing',
      description: 'Feature vector extraction computing token weights, sensationalism frequency, and journalistic attribution confidence.',
      icon: Newspaper,
      badge: 'Module 01',
      badgeColor: 'text-blue-300 bg-blue-500/20 border-blue-500/40',
      actionLabel: 'Open News Console'
    },
    {
      id: 'image',
      title: 'Spatial & ELA Image Analyzer',
      category: 'Computer Vision & Deep Learning',
      description: 'Multi-stream visual forensics combining Error Level Analysis with high-frequency spatial noise variance filters.',
      icon: ImageIcon,
      badge: 'Module 02',
      badgeColor: 'text-purple-300 bg-purple-500/20 border-purple-500/40',
      actionLabel: 'Open Image Console'
    },
    {
      id: 'video',
      title: 'Temporal Video Motion Inspector',
      category: 'Sequential Frame Analysis',
      description: 'Temporal keyframe decomposition tracking facial landmark boundaries, blink cadence, and inter-frame optical continuity.',
      icon: Video,
      badge: 'Module 03',
      badgeColor: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/40',
      actionLabel: 'Open Video Console'
    },
    {
      id: 'claim',
      title: 'Semantic Stance Fact Engine',
      category: 'Knowledge Base Retrieval (RAG)',
      description: 'Entity extraction and stance classification checking claims against authenticated government and global fact repositories.',
      icon: CheckCircle2,
      badge: 'Module 04',
      badgeColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40',
      actionLabel: 'Open Fact Console'
    }
  ];

  const handleExploreTools = () => {
    const el = document.getElementById('detection-tools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActivePage('dashboard');
    }
  };

  return (
    <div className="relative overflow-hidden bg-facia-pattern bg-aurora-mesh min-h-screen">
      {/* Top Banner with Project Tagline & Platform Status */}
      <div className="border-b border-indigo-500/20 bg-[#040718]/90 py-2.5 px-4 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shadow-[0_0_8px_#34D399]" />
            <span className="text-white font-extrabold tracking-wider">TRUTHLENS AI FORENSICS</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-cyan-300 hidden sm:inline font-semibold">
              Don't Trust Everything You See. Verify Before You Believe.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Architecture: <b className="text-white">FastAPI • PyTorch • React</b></span>
            <span className="text-emerald-400 font-bold hidden md:inline">● Live Telemetry Active</span>
          </div>
        </div>
      </div>

      <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO SECTION */}
        <section className="pt-4 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                TruthLens AI Platform
              </div>

              {/* Exact Required Title */}
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
                AI-Powered <br />
                <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(99,102,241,0.5)]">
                  Fake News & Deepfake Detection Platform
                </span>
              </h1>

              {/* Tagline Callout */}
              <div className="p-3.5 rounded-2xl bg-[#070B20]/90 border border-cyan-500/30 text-cyan-200 text-sm font-semibold font-mono shadow-[0_0_20px_rgba(0,242,254,0.15)] flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                <span>Don't Trust Everything You See. Verify Before You Believe.</span>
              </div>

              {/* Description explaining all four detection modules */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal">
                A unified academic forensic system designed to combat digital deception. Detect manipulated textual news with NLP, analyze synthetic face artifacts in images via CNN forensics, identify temporal frame inconsistencies in deepfake videos, and verify claims against authoritative institutional knowledge bases.
              </p>

              {/* Action Buttons as requested */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setActivePage('dashboard')}
                  className="btn-aurora flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-white font-extrabold text-sm transition-all"
                >
                  <span>Launch TruthLens</span>
                  <ArrowRight className="w-4 h-4 text-cyan-200" />
                </button>
                <button
                  type="button"
                  onClick={handleExploreTools}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl facia-card text-white hover:text-cyan-300 font-bold text-sm border border-indigo-500/30 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Explore Detection Tools</span>
                </button>
              </div>

              {/* Realistic Feature Highlights (No Fabricated Stats) */}
              <div className="pt-6 border-t border-indigo-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-left">
                <div className="p-3.5 rounded-2xl bg-[#090E26]/70 border border-indigo-500/20">
                  <div className="text-sm font-black text-cyan-400 uppercase tracking-wide">4 Detection Modules</div>
                  <div className="text-xs text-slate-300 mt-1">Text, Image, Video & Fact Claims</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#090E26]/70 border border-indigo-500/20">
                  <div className="text-sm font-black text-indigo-400 uppercase tracking-wide">Multi-Model Analysis</div>
                  <div className="text-xs text-slate-300 mt-1">NLP, CNN, OpenCV & Knowledge RAG</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#090E26]/70 border border-indigo-500/20">
                  <div className="text-sm font-black text-emerald-400 uppercase tracking-wide">Explainable AI Results</div>
                  <div className="text-xs text-slate-300 mt-1">ELA Heatmaps, Token Weights & PDF Audits</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multi-Modal Forensic HUD Scanner */}
            <div className="lg:col-span-5 flex justify-center">
              <BiometricHUDScanner onLaunchModule={setActivePage} />
            </div>
          </div>
        </section>

        {/* SECTION 3: DETECTION FEATURE CARDS */}
        <section id="detection-tools" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 block mb-2 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]">
              MULTI-MODAL DETECTION CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Four Core Forensic Detection Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Each module targets specific vectors of digital misinformation using specialized machine learning and forensic algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="facia-card p-6 rounded-3xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3.5 rounded-2xl border ${card.accent} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                        {card.techLabel}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider block mb-1 text-slate-400">
                      {card.techBadge}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setActivePage(card.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-cyan-500/20 text-white hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <span>{card.btnText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: ACADEMIC FORENSIC MODULES */}
        <section className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-purple-400 block mb-1 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                ACADEMIC CURRICULUM PROJECT SCOPE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Academic Forensic Modules
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-sm">
              Engineered with explainable AI outputs, confidence calibration metrics, and PDF forensic certificate generation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {academicModules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.id}
                  className="facia-card p-6 rounded-3xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${m.badgeColor}`}>
                        {m.badge}
                      </span>
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                    </div>

                    <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-1 font-semibold">
                      {m.category}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setActivePage(m.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-cyan-400 hover:text-white group-hover:translate-x-0.5 transition-all"
                    >
                      <span>{m.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: PIPELINE ARCHITECTURE (Requirement 5) */}
        <section className="facia-card p-8 sm:p-12 rounded-3xl border border-indigo-500/30 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase text-cyan-400 block mb-1 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]">
              MULTI-STAGE FORENSIC WORKFLOW
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              TruthLens Pipeline Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              End-to-end verification dataflow from multi-modal ingestion to explainable report certification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Step 1 */}
            <div className="space-y-3 p-5 rounded-2xl bg-[#080D24]/80 border border-indigo-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-cyan-400 font-mono drop-shadow-[0_0_10px_rgba(0,242,254,0.5)]">
                    01
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Ingestion
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">Input Processing</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ingests multi-modal user input: raw news text, high-res photos, video streams, or claim statements. Normalizes text, sanitizes metadata, and extracts visual bounding regions.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-mono text-cyan-300/80 border-t border-white/[0.06]">
                Preprocessing & Validation
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 p-5 rounded-2xl bg-[#080D24]/80 border border-indigo-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-indigo-400 font-mono drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                    02
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    Ensemble
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">AI Model Analysis</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Passes inputs through specialized neural micro-engines: NLP TF-IDF lexical analysis, CNN Error Level Analysis (ELA), OpenCV video keyframe sampling, and semantic RAG retrieval.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-mono text-indigo-300/80 border-t border-white/[0.06]">
                Multi-Model Inference
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 p-5 rounded-2xl bg-[#080D24]/80 border border-indigo-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-purple-400 font-mono drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    03
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    Diagnostics
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">Evidence & Explainability</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Extracts explainable indicators: pixel-level ELA compression discrepancy heatmaps, temporal motion stability plots, clickbait linguistic triggers, and verified knowledge source stance.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-mono text-purple-300/80 border-t border-white/[0.06]">
                Explainable AI (XAI)
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-3 p-5 rounded-2xl bg-[#080D24]/80 border border-indigo-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-emerald-400 font-mono drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                    04
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Audit
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">Detection Report</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Synthesizes findings into a verifiable forensic scorecard with calibrated confidence ratings, primary citations, and an on-demand cryptographic PDF audit certificate.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-mono text-emerald-300/80 border-t border-white/[0.06]">
                Audit Certificate Export
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: VERIFICATION TOOL ACCESS CARDS */}
        <section className="space-y-6 scroll-mt-24">
          <div className="facia-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-[#070B20] via-[#0E163D] to-[#070B20]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                  <Database className="w-3.5 h-3.5" />
                  <span>COMPLETE FORENSIC SUITE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Ready to Authenticate Digital Media?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Access all verification tools, inspect your past scan history, review model performance telemetry, or consult the AI forensic chatbot.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setActivePage('dashboard')}
                  className="btn-aurora px-6 py-3 rounded-2xl text-white font-extrabold text-xs transition-all flex items-center gap-2 flex-1 sm:flex-initial justify-center"
                >
                  <Activity className="w-4 h-4 text-cyan-200" />
                  <span>Open Workspace Dashboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePage('history')}
                  className="px-5 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white font-bold text-xs transition-all flex items-center gap-2 flex-1 sm:flex-initial justify-center"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>View Scan History & Reports</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
