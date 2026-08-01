'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, X, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { studioAudio } from '@/lib/audio';

interface StudioAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const StudioAIAssistant: React.FC<StudioAIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Welcome to MOTION studio. I'm Julian's AI Assistant. Ask me anything about Julian's short films, camera gear, digital products, rate card, or creative philosophy!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What camera & lens rig does Julian shoot on?",
    "Tell me about the Cinema LUT Collection V3.",
    "How do I book Julian for a brand campaign?",
    "What is Julian's backstory and manifesto?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    studioAudio.playClick(900);
    const userMsg: Message = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "Julian's AI Studio Assistant is temporarily offline. Explore the room objects directly!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#080808]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white flex items-center gap-2">
                  JULIAN AI — STUDIO ASSISTANT
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] uppercase font-mono tracking-wider text-white/40">SYSTEM TERMINAL // ADVISORY ENGINE</p>
              </div>
            </div>

            <button
              onClick={() => {
                studioAudio.playClick(400);
                onClose();
              }}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-[#080808]/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-[10px] tracking-wider uppercase whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4 font-sans text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-xl max-w-[82%] leading-relaxed text-xs ${
                    msg.role === 'user'
                      ? 'bg-white text-black font-medium shadow-lg'
                      : 'bg-[#181818] border border-white/10 text-white/90'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-white/50">
                <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-mono">Synthesizing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#080808]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about work, gear, products, or rates..."
                className="flex-1 px-4 py-3 rounded-lg bg-[#151515] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 py-3 rounded-lg bg-white hover:bg-white/90 disabled:opacity-30 text-black font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
