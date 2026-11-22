import React, { useState, useRef } from 'react';
import { 
  Image as ImageIcon, UploadCloud, RefreshCw, AlertCircle, FileCheck, 
  X, Eye, Layers, Sliders, ShieldAlert, Sparkles, Cpu 
} from 'lucide-react';
import { api } from '../services/api';
import ResultCard from '../components/ResultCard';

export default function DeepfakeImagePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [forensicFilter, setForensicFilter] = useState('normal'); // 'normal' | 'ela' | 'noise'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const processSelectedFile = (file) => {
    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validExtensions.includes(file.type)) {
      setError('Invalid format. Please upload a JPG, JPEG, or PNG image.');
      return;
    }
    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) processSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Helper to generate a demo sample image canvas in memory
  const loadSyntheticSample = (isManipulated = true) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 400, 400);
    grad.addColorStop(0, isManipulated ? '#2E1065' : '#0F172A');
    grad.addColorStop(1, isManipulated ? '#0284C7' : '#1E293B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 400, 400);

    // Face oval
    ctx.beginPath();
    ctx.ellipse(200, 200, 110, 140, 0, 0, 2 * Math.PI);
    ctx.fillStyle = isManipulated ? '#FCE7F3' : '#FDE68A';
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(160, 180, 14, 0, 2 * Math.PI);
    ctx.arc(240, 180, 14, 0, 2 * Math.PI);
    ctx.fill();

    // Mouth
    ctx.beginPath();
    ctx.arc(200, 250, 40, 0.2, Math.PI - 0.2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#991B1B';
    ctx.stroke();

    // If manipulated: add subtle blending boundary artifact
    if (isManipulated) {
      ctx.beginPath();
      ctx.arc(200, 200, 125, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    canvas.toBlob((blob) => {
      const fileName = isManipulated ? 'sample_deepfake_face.png' : 'sample_authentic_photo.png';
      const file = new File([blob], fileName, { type: 'image/png' });
      processSelectedFile(file);
    }, 'image/png');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please choose or drop an image file first.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.detectImage(selectedFile);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Image forensic analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    setForensicFilter('normal');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ImageIcon className="w-3.5 h-3.5" />
          Module 2: Computer Vision Forensics
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Deepfake Image & Face Manipulation Forensics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Multi-stream neural forensics: analyzes Error Level Analysis (ELA) compression residuals, sensor noise consistency, and facial boundary synthesis.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl relative">
        {/* Quick Sample Image Generator Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-white/[0.08]">
          <span className="text-xs text-slate-400 font-mono">No image on hand? Try instant benchmark samples:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadSyntheticSample(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
              Load Deepfake Sample
            </button>
            <button
              type="button"
              onClick={() => loadSyntheticSample(false)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <FileCheck className="w-3 h-3 text-blue-400" />
              Load Authentic Sample
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload State vs Preview State */}
        {!previewUrl ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/70 transition-all group relative overflow-hidden"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/15 text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              Upload Image for Neural Forensics
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5 leading-relaxed">
              Drag & drop a facial portrait, news photograph, or artwork here (JPG, JPEG, PNG up to 15MB)
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
                ELA Discontinuity
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
                GAN Texture Forensics
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Visual Forensic Lens Filters */}
            <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-2xl border border-white/[0.08]">
              <span className="text-xs font-mono font-semibold text-slate-300 ml-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Forensic Optical Lens:
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setForensicFilter('normal')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    forensicFilter === 'normal' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  RGB Original
                </button>
                <button
                  type="button"
                  onClick={() => setForensicFilter('ela')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    forensicFilter === 'ela' 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ELA Heatmap (Error Levels)
                </button>
                <button
                  type="button"
                  onClick={() => setForensicFilter('noise')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    forensicFilter === 'noise' 
                      ? 'bg-cyan-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  High-Freq Residuals
                </button>
              </div>
            </div>

            {/* Interactive Image Preview with Lens Effect */}
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] max-h-96 flex items-center justify-center bg-black/80">
              <img
                src={previewUrl}
                alt="Upload Preview"
                className={`max-h-96 object-contain transition-all duration-300 ${
                  forensicFilter === 'ela' 
                    ? 'contrast-200 brightness-125 saturate-200 hue-rotate-90 invert' 
                    : forensicFilter === 'noise' 
                    ? 'grayscale contrast-200 brightness-110' 
                    : ''
                }`}
              />

              {/* Scanning Laser Line when loading */}
              {loading && <div className="scan-line" />}

              <button
                onClick={clearSelection}
                className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-black/70 hover:bg-black text-white transition-colors border border-white/10"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Controls */}
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
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Executing Neural Forensics...
                  </>
                ) : (
                  <>
                    <Cpu className="w-3.5 h-3.5" />
                    Analyze Image Forensics
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
