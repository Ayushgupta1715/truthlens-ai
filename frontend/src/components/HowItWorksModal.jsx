import React, { useState } from 'react';
import { 
  X, Newspaper, Image as ImageIcon, Video, CheckCircle2, 
  Bot, FileDown, ArrowRight, Check, Sparkles, Sliders, ShieldCheck 
} from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose, onNavigate }) {
  const [activeTab, setActiveTab] = useState('news');

  if (!isOpen) return null;

  const guides = {
    news: {
      title: "Module 1: Fake News Detector",
      subtitle: "Natural Language Processing & TF-IDF",
      icon: Newspaper,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      steps: [
        {
          num: "01",
          heading: "Enter Headline & Content Text",
          desc: "Navigate to the 'Fake News' tab. Paste your news headline and article text, or click 'Sensational Health Scam' / 'Official Press Release' for instant benchmark evaluation."
        },
        {
          num: "02",
          heading: "NLP Feature Extraction",
          desc: "Click 'Verify Authenticity'. The system computes TF-IDF word vectors, assesses sensational clickbait phrases, and evaluates uppercase and emotional punctuation intensity."
        },
        {
          num: "03",
          heading: "Review Forensic Diagnostic Verdict",
          desc: "The engine displays the classification (e.g., Potentially Fake vs. Likely Authentic), an interactive confidence bar, and detected linguistic indicators."
        },
        {
          num: "04",
          heading: "Export PDF Audit Certificate",
          desc: "Click 'Download PDF Report' to generate a publication-ready academic verification certificate with unique scan ID and model telemetry."
        }
      ],
      targetPage: 'news'
    },
    image: {
      title: "Module 2: Deepfake Image Forensics",
      subtitle: "Error Level Analysis & Frequency Residuals",
      icon: ImageIcon,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      steps: [
        {
          num: "01",
          heading: "Upload or Select Sample Image",
          desc: "Navigate to 'Image Forensics'. Drag & drop your JPG or PNG photo, or click 'Load Deepfake Sample' / 'Load Authentic Sample' for 1-click testing."
        },
        {
          num: "02",
          heading: "Switch Forensic Optical Lens",
          desc: "Toggle between 'RGB Original', 'ELA Heatmap' (revealing compression rate discrepancies), and 'High-Freq Residuals' (isolating synthetic skin smoothing)."
        },
        {
          num: "03",
          heading: "Execute Multi-Stream Forensics",
          desc: "Click 'Analyze Image Forensics'. The neural model examines pixel-level deviations and GAN noise distribution patterns."
        },
        {
          num: "04",
          heading: "Review Forensics & Artifacts",
          desc: "Inspect the manipulation probability, maximum ELA deviation score, and facial boundary synthesis anomalies in the executive verdict card."
        }
      ],
      targetPage: 'image'
    },
    video: {
      title: "Module 3: Deepfake Video Forensics",
      subtitle: "Temporal Keyframe Motion Forensics",
      icon: Video,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      steps: [
        {
          num: "01",
          heading: "Upload Video File",
          desc: "Navigate to 'Video Deepfake'. Select an MP4, MOV, or AVI video, or click 'Load Sample Deepfake Video' for immediate testing."
        },
        {
          num: "02",
          heading: "Keyframe Decomposition",
          desc: "Click 'Analyze Video Frames'. The pipeline automatically extracts keyframe sequences at regular 1.5-second intervals across the video."
        },
        {
          num: "03",
          heading: "Biometric & Temporal Consistency",
          desc: "The engine tracks 68-point facial landmark meshes and evaluates frame-to-frame lighting jumps, eye-blink dynamics, and facial boundary jitter."
        },
        {
          num: "04",
          heading: "Inspect Anomaly Timeline",
          desc: "Examine the frame-by-frame anomaly cards, timestamps, and overall temporal biometric consistency score in the analysis report."
        }
      ],
      targetPage: 'video'
    },
    claim: {
      title: "Module 4: AI Fact Verification",
      subtitle: "Semantic Stance & Knowledge RAG",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      steps: [
        {
          num: "01",
          heading: "Submit Claim Statement",
          desc: "Navigate to 'Fact Verifier'. Type any statement or select one of the curated viral claims (e.g., 'Free laptops for college students')."
        },
        {
          num: "02",
          heading: "Semantic Knowledge Retrieval",
          desc: "Click 'Verify Claim'. The RAG engine extracts key entities and cross-references verified institutional databases (WHO, PIB, Reuters, NASA)."
        },
        {
          num: "03",
          heading: "Supporting vs. Contradicting Stance",
          desc: "The claim is categorized into 'Verified Authentic', 'Debunked / False', or 'Unverified / Lacks Evidence' based on empirical evidence."
        },
        {
          num: "04",
          heading: "Inspect Citations & Relevance",
          desc: "Review primary evidence sources with active links, stance badges, and semantic relevance percentages."
        }
      ],
      targetPage: 'claim'
    },
    chatbot: {
      title: "Module 5: Forensic AI Chatbot",
      subtitle: "Interactive Real-Time Assistant",
      icon: Bot,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      steps: [
        {
          num: "01",
          heading: "Launch Floating Chatbot",
          desc: "Click the floating 'Chatbot' button situated at the bottom-right corner of any screen."
        },
        {
          num: "02",
          heading: "Ask Forensic Concepts",
          desc: "Type inquiries such as 'How does ELA work?' or 'How does temporal consistency expose deepfake videos?' for instant scientific explanations."
        },
        {
          num: "03",
          heading: "Instant In-Chat Claim Triage",
          desc: "Paste any claim or headline (e.g., 'Verify: COVID vaccine microchip'). The chatbot generates an instant in-chat verdict scorecard."
        },
        {
          num: "04",
          heading: "One-Tap Quick Prompts",
          desc: "Click the prompt chips above the input bar to test common verification scenarios without manual typing."
        }
      ],
      targetPage: 'chatbot'
    }
  };

  const current = guides[activeTab];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn text-left">
      <div className="facia-card-glow w-full max-w-4xl max-h-[90vh] rounded-3xl border border-indigo-500/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#080D24] border-b border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-[1.5px] shadow-[0_0_15px_rgba(0,242,254,0.4)]">
              <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Platform User Guide & Operational Walkthrough</h2>
              <p className="text-xs text-slate-400 font-mono">Step-by-step procedures for all TruthLens AI verification modules</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Module Switcher Tabs */}
        <div className="p-3 bg-[#050816] border-b border-white/[0.08] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'news', label: '1. Fake News', icon: Newspaper },
            { id: 'image', label: '2. Image Forensics', icon: ImageIcon },
            { id: 'video', label: '3. Video Deepfake', icon: Video },
            { id: 'claim', label: '4. Fact Verifier', icon: CheckCircle2 },
            { id: 'chatbot', label: '5. AI Chatbot', icon: Bot },
          ].map((item) => {
            const TabIcon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${current.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">{current.title}</h3>
                <span className="text-xs text-cyan-300 font-mono">{current.subtitle}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                if (current.targetPage !== 'chatbot') {
                  onNavigate(current.targetPage);
                }
              }}
              className="btn-aurora hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all"
            >
              <span>Open This Module</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {current.steps.map((st, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#080D24] border border-indigo-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]">
                    STEP {st.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                </div>
                <h4 className="text-sm font-bold text-white">{st.heading}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050816] border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">Academic Mini Project: TruthLens AI Digital Forensics</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Got It (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
