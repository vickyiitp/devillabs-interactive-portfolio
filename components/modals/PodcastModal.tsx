'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Play, Pause, Volume2, Clock, ExternalLink, Sparkles } from 'lucide-react';
import { PODCAST_DATA, PodcastEpisode } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PodcastModal: React.FC<PodcastModalProps> = ({ isOpen, onClose }) => {
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(PODCAST_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1x');

  if (!isOpen) return null;

  const togglePlay = () => {
    studioAudio.playClick(800);
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  MIND OF MOTION PODCAST
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
                    STUDIO MIC PORTAL
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Deep conversations on film synthesis, spatial audio & creative strategy</p>
              </div>
            </div>

            <button
              onClick={() => {
                studioAudio.playClick(400);
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Active Episode Player & Details (Left Column) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-16/9 shadow-xl">
                <img
                  src={activeEpisode.coverImage}
                  alt={activeEpisode.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                    EPISODE #{activeEpisode.number}
                  </span>
                  <h3 className="text-lg font-bold mt-1 leading-snug">{activeEpisode.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">Guest: {activeEpisode.guest} ({activeEpisode.guestRole})</p>
                </div>
              </div>

              {/* Audio Player Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col gap-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                  </button>

                  {/* Simulated Scrubbable Audio Waveform */}
                  <div className="flex-1 mx-4 flex items-center gap-1 h-8">
                    {Array.from({ length: 32 }).map((_, i) => {
                      const height = Math.min(100, Math.max(20, Math.sin(i * 0.4) * 80 + 30));
                      return (
                        <div
                          key={i}
                          style={{ height: `${height}%` }}
                          className={`flex-1 rounded-full transition-all ${
                            i < 12 && isPlaying ? 'bg-purple-400' : 'bg-slate-800'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      const speeds = ['1x', '1.25x', '1.5x', '2x'];
                      const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(next);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-purple-400"
                  >
                    {playbackSpeed}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>14:20 / {activeEpisode.duration}</span>
                  <span className="flex items-center gap-1 text-purple-400">
                    <Volume2 className="w-3.5 h-3.5" /> 24-Bit Studio Audio
                  </span>
                </div>
              </div>

              {/* Episode Summary & Timestamps */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">SHOW NOTES & TIMESTAMPS</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{activeEpisode.summary}</p>

                <div className="space-y-2">
                  {activeEpisode.timestamps.map((ts) => (
                    <div
                      key={ts.time}
                      onClick={() => studioAudio.playClick(700)}
                      className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-purple-500/40 cursor-pointer flex items-center gap-3 transition-colors text-xs"
                    >
                      <span className="font-mono text-purple-400 font-bold">{ts.time}</span>
                      <span className="text-slate-300">{ts.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Episode List (Right Column) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ALL EPISODES</h4>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {PODCAST_DATA.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => {
                      studioAudio.playClick(900);
                      setActiveEpisode(ep);
                    }}
                    className={`p-3.5 rounded-xl cursor-pointer border transition-all flex items-center gap-3 ${
                      activeEpisode.id === ep.id
                        ? 'bg-purple-500/10 border-purple-500/40 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-purple-500/20 text-slate-400'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                      <img src={ep.coverImage} alt={ep.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-purple-400">EP #{ep.number}</span>
                      <h5 className="text-xs font-bold text-white truncate">{ep.title}</h5>
                      <span className="text-[10px] text-slate-500">{ep.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
