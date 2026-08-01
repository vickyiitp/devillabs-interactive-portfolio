'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Eye, Calendar, Clock, Film, Sliders, ExternalLink } from 'lucide-react';
import { VIDEOS_DATA, VideoItem } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface VideosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideosModal: React.FC<VideosModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Short Film', 'Tutorial', 'Tech & Gear', 'Behind The Scenes', 'Documentary'];

  const filteredVideos = selectedCategory === 'All'
    ? VIDEOS_DATA
    : VIDEOS_DATA.filter((v) => v.category === selectedCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  CINEMATIC VIDEO VAULT
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                    CAMERA LENS PORTAL
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Selected short films, color workflows, and director breakdowns in 8K</p>
              </div>
            </div>

            <button
              onClick={() => {
                studioAudio.playClick(400);
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="px-6 py-3 border-b border-slate-800/60 bg-slate-950/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  studioAudio.playClick(700);
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  studioAudio.playClick(900);
                  setActiveVideo(video);
                }}
                className="group relative cursor-pointer bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden shadow-lg transition-all"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-slate-800">
                    {video.duration}
                  </div>

                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-cyan-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                    {video.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {video.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {video.published}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Player & Shot List Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  CINEMA PLAYER // {activeVideo.category}
                </span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex flex-col gap-6">
                {/* Simulated High-Res Cinema Player Container */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3">
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeVideo.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      PLAY FULL 8K FILM ON YOUTUBE
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <span className="text-xs text-slate-300 font-mono">
                      Resolution: 8K DCI (7680x4320) | Audio: 24-Bit 96kHz Linear PCM
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">{activeVideo.title}</h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {activeVideo.description}
                  </p>
                </div>

                {/* Director Shot List & Gear Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      CAMERA RIG & GLASS USED
                    </h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {activeVideo.gearUsed.map((g) => (
                        <li
                          key={g}
                          className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono"
                        >
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                      COLOR PROFILE & LUT USED
                    </h4>
                    <div className="text-sm font-semibold text-white mb-2">{activeVideo.lutUsed}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Palette:</span>
                      <div className="flex gap-1.5">
                        {activeVideo.colorPalette.map((color) => (
                          <div
                            key={color}
                            style={{ backgroundColor: color }}
                            className="w-5 h-5 rounded-full border border-slate-700 shadow-sm"
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
