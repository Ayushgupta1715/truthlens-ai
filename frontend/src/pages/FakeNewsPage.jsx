import React, { useState } from 'react';
import { 
  Newspaper, Sparkles, Send, RefreshCw, AlertCircle, 
  FileText, Zap, HelpCircle, CheckCircle 
} from 'lucide-react';
import { api } from '../services/api';
import ResultCard from '../components/ResultCard';

export default function FakeNewsPage() {
  const [headline, setHeadline] = useState('');
  const [articleText, setArticleText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const sampleFake = {
    headline: "BREAKING: Secret Miracle Herb Cures All Known Viruses in 24 Hours Banned By Doctors!",
    text: "You won't believe what pharmaceutical corporations don't want you to know! A secret herbal brew 100% cures every pandemic illness overnight. Doctors are stunned and banned it from TV immediately. Wake up and share this urgently before the government deletes it!"
  };

  const sampleReal = {
    headline: "WHO Releases Updated Guidelines on Seasonal Influenza Vaccination Protocols",
    text: "According to an official press release issued on Wednesday by researchers at the World Health Organization, seasonal influenza vaccination rates have shown a moderate increase. Spokespersons confirmed that clinical peer-reviewed data underscores standard efficacy protocols."
  };

  const sampleViralConspiracy = {
    headline: "LEAKED: 5G Towers Are Triggering Secret Weather Patterns Across The Nation!",
    text: "Bombshell leaked documents expose how cell towers are being manipulated to change global climates. Whistleblowers have been silenced and mainstream media refuses to report this mind-blowing truth. Forward this immediately to everyone you love!"
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!articleText.trim()) {
      setError('Please provide news article content or paste a statement to analyze.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const data = await api.detectNews(headline, articleText);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Detection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Newspaper className="w-3.5 h-3.5" />
          Module 1: Natural Language Processing
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Fake News & Misinformation Detector
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Multi-layer NLP ensemble: extracts TF-IDF token weights, measures sensationalist sentiment polarity, and evaluates journalistic source attributions.
        </p>
      </div>

      {/* Main Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl relative">
        {/* Quick Sample Fillers Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-white/[0.08]">
          <span className="text-xs text-slate-400 font-mono">Test with benchmark news corpora:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => { setHeadline(sampleFake.headline); setArticleText(sampleFake.text); }}
              className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all"
            >
              Sensational Health Scam
            </button>
            <button
              type="button"
              onClick={() => { setHeadline(sampleViralConspiracy.headline); setArticleText(sampleViralConspiracy.text); }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
            >
              Viral Conspiracy
            </button>
            <button
              type="button"
              onClick={() => { setHeadline(sampleReal.headline); setArticleText(sampleReal.text); }}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all"
            >
              Official Press Release
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAnalyze} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              News Headline (Optional)
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. BREAKING: Health Ministry announces new discovery..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Article Body / Content Text *
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {articleText.trim() ? articleText.trim().split(/\s+/).length : 0} words
              </span>
            </div>
            <textarea
              rows={7}
              required
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              placeholder="Paste article paragraph, social media post, blog text or WhatsApp forward here..."
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-y leading-relaxed shadow-inner"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Features analyzed: Sensationalism lexical hits, uppercase intensity, attribution tags.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Analyzing NLP Features...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Verify Authenticity
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Result Display */}
      {result && (
        <ResultCard 
          scan={result} 
          onReset={() => { setResult(null); setHeadline(''); setArticleText(''); }} 
        />
      )}
    </div>
  );
}
