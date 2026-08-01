'use client';

import React from 'react';
import { Camera, BookOpen, Laptop, ShoppingBag, Mic, Image, Calendar, Bot, ChevronRight, Play, Sparkles } from 'lucide-react';
import { RoomTarget } from '@/components/3d/Studio3DCanvas';
import { CREATOR_PROFILE } from '@/lib/data';
import { studioAudio } from '@/lib/audio';

interface MobileStoryModeProps {
  onSelectTarget: (target: RoomTarget) => void;
  onOpenAI: () => void;
}

export const MobileStoryMode: React.FC<MobileStoryModeProps> = ({
  onSelectTarget,
  onOpenAI,
}) => {
  const storyCards = [
    {
      target: 'videos' as RoomTarget,
      title: 'THE CAMERA',
      subtitle: '8K Films & Masterclasses',
      description: 'Explore Julian’s cinematic short films, color grading breakdowns, and studio tutorials.',
      icon: Camera,
      badge: 'FEATURED FILMS',
      gradient: 'from-cyan-900/40 via-slate-900 to-slate-950',
      borderColor: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80'
    },
    {
      target: 'about' as RoomTarget,
      title: 'THE BOOK',
      subtitle: 'Monograph & Gear Vault',
      description: 'Read the creator backstory, manifesto, career timeline, and 13+ camera gear specs.',
      icon: BookOpen,
      badge: 'CREATOR STORY',
      gradient: 'from-amber-950/40 via-stone-900 to-stone-950',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    },
    {
      target: 'projects' as RoomTarget,
      title: 'THE LAPTOP',
      subtitle: 'Commercial Portfolio',
      description: 'Global campaigns for Sony, Leica, Nike Lab, and Teenage Engineering.',
      icon: Laptop,
      badge: 'CLIENT PORTFOLIO',
      gradient: 'from-blue-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80'
    },
    {
      target: 'shop' as RoomTarget,
      title: 'THE SHOPPING BAG',
      subtitle: 'Digital Products & Tools',
      description: 'Cinema LUTs V3, Director Notion OS, Lighting Course, and Inner Circle Membership.',
      icon: ShoppingBag,
      badge: 'DIGITAL STORE',
      gradient: 'from-amber-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80'
    },
    {
      target: 'podcast' as RoomTarget,
      title: 'THE MICROPHONE',
      subtitle: 'Mind of Motion Podcast',
      description: 'Deep discussions on synthetic cinema, street photography, and spatial audio.',
      icon: Mic,
      badge: 'AUDIO EPISODES',
      gradient: 'from-purple-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
    },
    {
      target: 'mediakit' as RoomTarget,
      title: 'THE POSTER',
      subtitle: 'Media Kit & Collaborations',
      description: '1.27M+ cross-platform audience metrics and brand partnership inquiry form.',
      icon: Image,
      badge: 'BRAND PARTNERSHIPS',
      gradient: 'from-pink-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-400',
      image: 'https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?auto=format&fit=crop&w=800&q=80'
    },
    {
      target: 'consultation' as RoomTarget,
      title: 'THE CALENDAR',
      subtitle: 'Book 1:1 Creative Advisory',
      description: 'Schedule private video calls for film reviews, YouTube growth, and studio setup.',
      icon: Calendar,
      badge: '1:1 CALLS',
      gradient: 'from-emerald-950/40 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e0e0e0] p-4 pb-28 flex flex-col gap-6 md:hidden relative">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-at-tr from-[#1a1a1a] via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* Hero Intro */}
      <div className="pt-16 pb-6 border-b border-white/10 text-center flex flex-col items-center gap-3 relative z-10">
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] uppercase font-bold tracking-[0.3em]">
          MOTION // VISUAL NARRATIVE STUDIO
        </div>
        <h1 className="text-4xl font-light tracking-tighter text-white uppercase">
          {CREATOR_PROFILE.name}
        </h1>
        <p className="text-xs text-white/50 max-w-xs leading-relaxed">
          {CREATOR_PROFILE.bio}
        </p>

        <button
          onClick={() => {
            studioAudio.playClick(800);
            onOpenAI();
          }}
          className="mt-2 w-full max-w-xs py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ASK ASSISTANT</span>
        </button>
      </div>

      {/* Vertical Interactive Story Feed */}
      <div className="space-y-6 relative z-10">
        {storyCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.target}
              onClick={() => {
                studioAudio.playWhoosh();
                onSelectTarget(card.target);
              }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-[#151515] p-5 shadow-2xl flex flex-col gap-4 active:scale-[0.98] transition-transform"
            >
              <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-[#080808] border border-white/5">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-none bg-black/80 text-[9px] font-bold tracking-widest text-white uppercase border border-white/10">
                  {card.badge}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-white/80" />
                  <h3 className="text-base font-bold tracking-wider text-white uppercase">{card.title}</h3>
                </div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-white/50 mt-1">
                  {card.subtitle}
                </div>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-white/90">
                <span>BROWSE PORTAL</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
