import React, { useState, useRef } from 'react';
import { 
  Video, UploadCloud, RefreshCw, AlertCircle, FileCheck, 
  X, Film, CheckCircle, Sparkles, Sliders, Activity, Clock 
} from 'lucide-react';
import { api } from '../services/api';
import ResultCard from '../components/ResultCard';

export default function DeepfakeVideoPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const processSelectedVideo = (file) => {
    const validExtensions = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!validExtensions.includes(file.type) && !file.name.match(/\.(mp4|mov|avi)$/i)) {
      setError('Invalid format. Please upload an MP4, MOV, or AVI video.');
      return;
    }
    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) processSelectedVideo(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedVideo(e.dataTransfer.files[0]);
    }
  };

  // Helper to load sample test video blob for instant one-click demonstration
  const loadSampleVideo = () => {
    // Create dummy mp4 file blob for demonstration
    const blob = new Blob(["demo_mp4_bytes_truthlens_academic_verification"], { type: "video/mp4" });
    const file = new File([blob], "interview_deepfake_speech_sample.mp4", { type: "video/mp4" });
    processSelectedVideo(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please upload a video file first.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    setAnalysisStep('Sampling keyframe sequences at 1.5s intervals...');
    const t1 = setTimeout(() => {
      setAnalysisStep('Tracking 68-point facial landmarks & eye blink frequency...');
    }, 1000);
    const t2 = setTimeout(() => {
      setAnalysisStep('Evaluating temporal edge jitter & neural blending artifacts...');
    }, 2000);

    try {
      const data = await api.detectVideo(selectedFile);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Video deepfake analysis failed.');
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setLoading(false);
      setAnalysisStep('');
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Video className="w-3.5 h-3.5" />
          Module 3: Temporal Video Forensics
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Deepfake Video & Synthetic Speech Forensics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Extracts video keyframes and tracks temporal biometric stability, eye-blink dynamics, and facial mask boundary warping across consecutive frames.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl relative">
        {/* Sample Trigger Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-white/[0.08]">
          <span className="text-xs text-slate-400 font-mono">No video file available? Try benchmark sample:</span>
          <button
            type="button"
            onClick={loadSampleVideo}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Load Sample Deepfake Video
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!previewUrl ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".mp4,.mov,.avi"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-cyan-600/15 text-cyan-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              <Film className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              Upload Video for Deepfake Sequence Analysis
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
              Drag & drop an MP4, MOV, or AVI video (up to 50MB) for automated frame sampling.
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
                Keyframe Decomposition
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
                Temporal Jitter Aggregator
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] max-h-96 flex items-center justify-center bg-black/90">
              <video
                src={previewUrl}
                controls
                className="max-h-96 w-full rounded-3xl"
              />
              <button
                onClick={clearSelection}
                className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-black/70 hover:bg-black text-white transition-colors z-10 border border-white/10"
                title="Remove video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {loading && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center gap-3.5 animate-pulse">
                <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">Forensic Frame Pipeline Active</span>
                  <span className="text-[11px] text-cyan-300 font-mono">{analysisStep}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">{selectedFile?.name}</span>
                <span className="text-slate-500 font-mono">
                  ({(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Analyzing Timeline...
                  </>
                ) : (
                  <>
                    <Video className="w-3.5 h-3.5" />
                    Analyze Video Frames
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {result && <ResultCard scan={result} onReset={clearSelection} />}
    </div>
  );
}
