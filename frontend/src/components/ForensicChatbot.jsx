import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, 
  Trash2, ShieldCheck, ShieldAlert, CheckCircle2, 
  Maximize2, Minimize2, ExternalLink, RefreshCw, Zap 
} from 'lucide-react';
import { api } from '../services/api';

export default function ForensicChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 **Hello! I'm your TruthLens AI Chatbot**.\n\nYou can ask me questions about deepfake forensics, or paste any news claim/headline directly here for an **instant forensic triage scan**!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Verify: Government announces free laptops for all students",
    "How does Error Level Analysis (ELA) detect image manipulation?",
    "How does temporal jitter expose deepfake videos?",
    "How does NLP feature extraction identify fake news?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : input;
    if (!text.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await api.sendChatMessage(text, historyPayload);

      const botMessage = {
        role: 'assistant',
        content: res.reply,
        verification_card: res.verification_card,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "⚠️ I encountered an issue connecting to the forensic neural service. Please verify your backend server is active.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared. What claim or forensic topic would you like to explore?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080D24]/90 border border-indigo-500/40 text-[11px] font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)] backdrop-blur-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chatbot</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[2px] shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:shadow-[0_0_40px_rgba(0,242,254,0.8)] hover:scale-110 transition-all flex items-center justify-center group"
            title="Open Chatbot"
          >
            <div className="w-full h-full bg-[#050816] rounded-[14px] flex items-center justify-center relative">
              <Bot className="w-6 h-6 text-cyan-300 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#050816] rounded-full shadow-[0_0_8px_#34D399]" />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[90] w-[95vw] sm:w-[420px] h-[580px] max-h-[85vh] facia-card-glow rounded-3xl border border-indigo-500/40 shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-left backdrop-blur-2xl">
          {/* Header Bar */}
          <div className="p-4 bg-gradient-to-r from-[#0B1028] via-[#10173D] to-[#0D153A] border-b border-indigo-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-[1.5px] shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                  <div className="w-full h-full bg-[#060A1D] rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-[#060A1D] rounded-full shadow-[0_0_6px_#34D399]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-tight">Chatbot</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Online • TruthLens AI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-white/5 transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2.5 bg-[#06091A]/90 border-b border-white/[0.06] overflow-x-auto flex items-center gap-1.5 text-[11px] no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-cyan-300 border border-indigo-500/30 whitespace-nowrap transition-all font-mono text-[10px] flex-shrink-0"
              >
                {q.length > 32 ? q.slice(0, 32) + '...' : q}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m, idx) => {
              const isBot = m.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_8px_rgba(0,242,254,0.3)]">
                      <Bot className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    isBot 
                      ? 'bg-[#0A102D] border border-indigo-500/30 text-slate-200 shadow-md' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                  }`}>
                    {/* Message Body */}
                    <div className="whitespace-pre-wrap font-sans">
                      {m.content}
                    </div>

                    {/* Verification Card if returned */}
                    {m.verification_card && (
                      <div className="mt-3 p-2.5 rounded-xl bg-black/50 border border-white/10 space-y-1.5 font-mono text-[10px]">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-slate-400">STATUS:</span>
                          <span className={m.verification_card.confidence_score > 70 ? 'text-rose-400' : 'text-emerald-400'}>
                            {m.verification_card.prediction}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">CERTAINTY:</span>
                          <span className="text-cyan-300 font-bold">{m.verification_card.confidence_score}%</span>
                        </div>
                      </div>
                    )}

                    <span className="block text-[9px] text-slate-400 font-mono mt-1 text-right">
                      {m.time}
                    </span>
                  </div>

                  {!isBot && (
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm text-[10px] font-bold text-white">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2.5 justify-start items-center text-xs text-cyan-300 font-mono">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-cyan-300" />
                </div>
                <div className="p-3 rounded-2xl bg-[#0A102D] border border-indigo-500/30 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Scanning neural forensic knowledge base...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Bar */}
          <div className="p-3 bg-[#060A1C] border-t border-indigo-500/20">
            <div className="flex items-center gap-2 bg-[#090E26] rounded-2xl border border-indigo-500/30 p-1.5 focus-within:border-cyan-400/60 shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about deepfakes or paste claim to verify..."
                className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-40 transition-all shadow-md shadow-blue-500/20"
                title="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1 px-1">
              <span>TruthLens AI Forensic Agent</span>
              <span>Press Enter ↵</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
