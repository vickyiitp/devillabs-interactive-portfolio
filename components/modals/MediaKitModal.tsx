'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image, Users, Globe, BarChart2, Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { CREATOR_PROFILE, MEDIA_KIT_STATS } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface MediaKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaKitModal: React.FC<MediaKitModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'partners' | 'inquiry'>('stats');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    budget: '$10,000 - $25,000',
    projectType: 'YouTube Video Integration',
    brief: ''
  });

  if (!isOpen) return null;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    studioAudio.playWhoosh();
    setSubmitted(true);
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
              <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Image className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  MEDIA KIT & BRAND COLLABORATIONS
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono border border-pink-500/30">
                    WALL POSTER PORTAL
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Live audience metrics, demographics, past campaigns & partnership rate card</p>
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

          {/* Navigation */}
          <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/30 flex items-center gap-6 text-sm">
            <button
              onClick={() => {
                studioAudio.playClick(600);
                setActiveTab('stats');
              }}
              className={`pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'border-pink-400 text-pink-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              1. Audience Reach & Demographics
            </button>
            <button
              onClick={() => {
                studioAudio.playClick(600);
                setActiveTab('partners');
              }}
              className={`pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'partners'
                  ? 'border-pink-400 text-pink-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              2. Past Campaigns & Partners
            </button>
            <button
              onClick={() => {
                studioAudio.playClick(600);
                setActiveTab('inquiry');
              }}
              className={`pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'inquiry'
                  ? 'border-pink-400 text-pink-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              3. Partnership Inquiry Form
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 font-sans">
            {activeTab === 'stats' && (
              <div className="flex flex-col gap-6">
                {/* Total Reach Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-pink-400">{CREATOR_PROFILE.stats.totalAudience}</div>
                    <div className="text-xs text-slate-400 mt-1">Total Cross-Platform Reach</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-pink-400">{CREATOR_PROFILE.stats.monthlyViews}</div>
                    <div className="text-xs text-slate-400 mt-1">Monthly Impressions</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-pink-400">8.4%</div>
                    <div className="text-xs text-slate-400 mt-1">Avg Engagement Rate</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <div className="text-2xl font-bold text-pink-400">40+</div>
                    <div className="text-xs text-slate-400 mt-1">Completed Brand Deals</div>
                  </div>
                </div>

                {/* Demographics Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4" /> GEOGRAPHIC DISTRIBUTION
                    </h4>
                    <div className="space-y-3">
                      {MEDIA_KIT_STATS.demographics.map((geo) => (
                        <div key={geo.country}>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>{geo.country}</span>
                            <span className="font-mono text-pink-300 font-bold">{geo.percentage}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div style={{ width: `${geo.percentage}%` }} className="h-full bg-pink-400 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4" /> AGE & CATEGORY INTERESTS
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-slate-400 mb-2">Age Group Breakdown</div>
                        <div className="flex gap-2">
                          {MEDIA_KIT_STATS.ageGroup.map((ag) => (
                            <div key={ag.range} className="flex-1 p-2 rounded bg-slate-900 border border-slate-800 text-center">
                              <div className="text-xs font-bold text-white">{ag.percentage}%</div>
                              <div className="text-[10px] text-slate-500 font-mono">{ag.range}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-slate-400 mb-2">Primary Niche Affinity</div>
                        <div className="flex flex-wrap gap-1.5">
                          {MEDIA_KIT_STATS.topCategories.map((cat) => (
                            <span key={cat} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-pink-300 font-mono">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'partners' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MEDIA_KIT_STATS.pastPartners.map((partner) => (
                  <div key={partner.name} className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono text-pink-400">{partner.year}</span>
                      <h4 className="text-lg font-bold text-white mt-1">{partner.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">Campaign: {partner.campaign}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-900 text-pink-300 font-mono text-[10px] font-bold self-start border border-slate-800">
                      OFFICIAL PARTNER
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'inquiry' && (
              <div className="max-w-xl mx-auto">
                {!submitted ? (
                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Brand / Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        placeholder="e.g. Sony, Leica, Red Bull, Apple"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marketing@brand.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Estimated Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-pink-500 focus:outline-none"
                        >
                          <option>$5,000 - $10,000</option>
                          <option>$10,000 - $25,000</option>
                          <option>$25,000 - $50,000</option>
                          <option>$50,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-pink-500 focus:outline-none"
                        >
                          <option>YouTube Video Integration</option>
                          <option>Commercial Direction</option>
                          <option>Social Media Campaign</option>
                          <option>Keynote / Speaking</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Campaign Brief / Goals
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.brief}
                        onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                        placeholder="Tell Julian about your product launch dates, key deliverables and expectations..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> SUBMIT PARTNERSHIP BRIEF
                    </button>
                  </form>
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-white">BRIEF RECEIVED!</h4>
                    <p className="text-xs text-slate-300">
                      Julian's production team reviews brand inquiries within 24 hours. A custom proposal and rate deck will be dispatched to {formData.email}.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
