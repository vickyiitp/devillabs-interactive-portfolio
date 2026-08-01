'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Award, Camera, Cpu, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { CREATOR_PROFILE, GEAR_VAULT, GearItem } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'manifesto' | 'gear'>('story');
  const [selectedGearCategory, setSelectedGearCategory] = useState<string>('All');

  if (!isOpen) return null;

  const gearCategories = ['All', 'Cameras', 'Lenses', 'Audio', 'Lighting', 'Computing & Post'];

  const filteredGear = selectedGearCategory === 'All'
    ? GEAR_VAULT
    : GEAR_VAULT.filter((g) => g.category === selectedGearCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header - Editorial Monograph style */}
          <div className="px-6 py-5 border-b border-stone-800/80 flex items-center justify-between bg-stone-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
                  MOTION MONOGRAPH
                  <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 tracking-wider uppercase border border-amber-500/30">
                    BOOK OBJECT PORTAL
                  </span>
                </h2>
                <p className="text-xs text-stone-400 font-sans">The story, philosophy, and equipment vault of Julian Vance</p>
              </div>
            </div>

            <button
              onClick={() => {
                studioAudio.playClick(400);
                onClose();
              }}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Editorial Navigation Tabs */}
          <div className="px-6 py-3 border-b border-stone-800/80 bg-stone-900/30 flex items-center gap-6 text-sm font-sans">
            <button
              onClick={() => {
                studioAudio.playClick(600);
                setActiveTab('story');
              }}
              className={`pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'story'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-stone-400 hover:text-amber-100'
              }`}
            >
              1. Story & Milestones
            </button>
            <button
              onClick={() => {
                studioAudio.playClick(600);
                setActiveTab('manifesto');
              }}
              className={`pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'manifesto'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-stone-400 hover:text-amber-100'
              }`}
            >
              2. Creative Manifesto
            </button>
            <button
              onClick={() => {
                studioAudio.playClick(600);
                setActiveTab('gear');
              }}
              className={`pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'gear'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-stone-400 hover:text-amber-100'
              }`}
            >
              3. The Gear Vault
            </button>
          </div>

          {/* Modal Content Area */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 font-sans">
            {activeTab === 'story' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Profile Column */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-xl aspect-4/5 bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                      alt={CREATOR_PROFILE.name}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-serif font-bold">{CREATOR_PROFILE.name}</h3>
                      <p className="text-xs text-amber-300 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {CREATOR_PROFILE.location}
                      </p>
                    </div>
                  </div>

                  {/* Profile Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                      <div className="text-lg font-bold text-amber-400">{CREATOR_PROFILE.stats.youtubeSubscribers}</div>
                      <div className="text-[11px] text-stone-400">YouTube Subs</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                      <div className="text-lg font-bold text-amber-400">{CREATOR_PROFILE.stats.totalAudience}</div>
                      <div className="text-[11px] text-stone-400">Total Reach</div>
                    </div>
                  </div>
                </div>

                {/* Right Editorial Story Column */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-amber-100 leading-snug">
                      "{CREATOR_PROFILE.bio}"
                    </h3>
                    <p className="mt-4 text-sm text-stone-300 leading-relaxed font-serif">
                      Julian Vance began his journey in traditional 35mm street photography before expanding into directing global commercial films for Sony, Leica, and Nike. Based between Tokyo and Los Angeles, his director style merges atmospheric lighting, high-contrast anamorphic lens textures, and generative WebGL experiences.
                    </p>
                  </div>

                  {/* Career Timeline */}
                  <div className="pt-6 border-t border-stone-800/80">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      CAREER MILESTONES (2021 — 2026)
                    </h4>
                    <div className="space-y-4">
                      {CREATOR_PROFILE.timeline.map((item) => (
                        <div key={item.year} className="flex gap-4 group">
                          <span className="text-xs font-mono font-bold text-amber-400 w-12 pt-0.5">
                            {item.year}
                          </span>
                          <div className="flex-1 pb-3 border-b border-stone-800/60">
                            <h5 className="text-sm font-bold text-stone-200 group-hover:text-amber-200 transition-colors">
                              {item.title}
                            </h5>
                            <p className="text-xs text-stone-400 mt-0.5">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manifesto' && (
              <div className="max-w-3xl mx-auto py-4 flex flex-col gap-8">
                <div className="text-center">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">PHILOSOPHY & VISION</span>
                  <h3 className="text-3xl font-serif font-bold text-amber-100 mt-2">THE CREATIVE MANIFESTO</h3>
                </div>

                <div className="space-y-6">
                  {CREATOR_PROFILE.manifesto.map((quote, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition-all flex items-start gap-4"
                    >
                      <span className="text-2xl font-serif font-bold text-amber-500/40 font-mono">0{idx + 1}</span>
                      <p className="text-base font-serif italic text-stone-200 leading-relaxed">{quote}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gear' && (
              <div className="flex flex-col gap-6">
                {/* Category Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {gearCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        studioAudio.playClick(700);
                        setSelectedGearCategory(cat);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        selectedGearCategory === cat
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-900 text-stone-400 hover:text-amber-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Gear Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGear.map((item) => (
                    <div
                      key={item.name}
                      className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-stone-400">{item.rating}</span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-100">{item.name}</h4>
                      <p className="text-xs text-stone-400 font-mono">{item.specs}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
