'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Laptop, ArrowUpRight, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Commercial', 'Music Video', 'Interactive 3D', 'Editorial'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

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
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  CLIENT & COMMERCIAL PORTFOLIO
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                    LAPTOP SCREEN PORTAL
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Global campaigns for Sony, Leica, Nike Lab & Teenage Engineering</p>
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

          {/* Category Filter */}
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
                    ? 'bg-blue-500 text-slate-950 font-bold shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  studioAudio.playClick(900);
                  setActiveProject(project);
                }}
                className="group relative cursor-pointer bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 rounded-xl overflow-hidden shadow-lg transition-all flex flex-col"
              >
                <div className="relative aspect-16/9 overflow-hidden bg-slate-950">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-blue-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                    {project.client}
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                    {project.year}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-blue-400 font-medium">
                    <span>Role: {project.role}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Case Study <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Case Study Overlay */}
        {activeProject && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
                  CASE STUDY // {activeProject.client}
                </span>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex flex-col gap-6">
                <div className="relative aspect-21/9 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                  <img
                    src={activeProject.coverImage}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{activeProject.title}</h2>
                      <p className="text-xs text-blue-300 font-mono mt-0.5">{activeProject.role}</p>
                    </div>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeProject.stats.map((st) => (
                    <div key={st.label} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                      <div className="text-xl font-bold text-blue-400">{st.value}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">THE CREATIVE BRIEF</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{activeProject.challenge}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">THE SOLUTION & EXECUTION</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{activeProject.solution}</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">DELIVERABLES DELIVERED</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.deliverables.map((d) => (
                      <span key={d} className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                        {d}
                      </span>
                    ))}
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
