'use client';

import React, { useState } from 'react';
import { Sun, Moon, Volume2, VolumeX, Bot, Camera, BookOpen, Laptop, ShoppingBag, Mic, Image, Calendar } from 'lucide-react';
import { studioAudio } from '@/lib/audio';
import { RoomTarget } from '@/components/3d/Studio3DCanvas';

interface RoomControlsProps {
  lightingMode: 'golden' | 'neon' | 'daylight';
  setLightingMode: (mode: 'golden' | 'neon' | 'daylight') => void;
  onSelectTarget: (target: RoomTarget) => void;
  onOpenAI: () => void;
}

export const RoomControls: React.FC<RoomControlsProps> = ({
  lightingMode,
  setLightingMode,
  onSelectTarget,
  onOpenAI,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleAudio = () => {
    const muted = studioAudio.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { target: 'videos' as RoomTarget, label: 'CAMERA → Videos', icon: Camera },
    { target: 'about' as RoomTarget, label: 'BOOK → Story & Gear', icon: BookOpen },
    { target: 'projects' as RoomTarget, label: 'LAPTOP → Projects', icon: Laptop },
    { target: 'shop' as RoomTarget, label: 'BAG → Digital Shop', icon: ShoppingBag },
    { target: 'podcast' as RoomTarget, label: 'MIC → Podcast', icon: Mic },
    { target: 'mediakit' as RoomTarget, label: 'POSTER → Media Kit', icon: Image },
    { target: 'consultation' as RoomTarget, label: 'CALENDAR → Book Call', icon: Calendar },
  ];

  return (
    <>
      {/* Top Left Studio Logo & Title */}
      <div className="fixed top-8 left-8 z-40 flex items-center gap-3 pointer-events-auto">
        <div className="px-5 py-2.5 rounded-xl bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-black tracking-[0.5em] text-white uppercase">MOTION</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 border-l border-white/10 pl-3">
            VISUAL NARRATIVE STUDIO
          </span>
        </div>
      </div>

      {/* Top Right Room Ambience Controls */}
      <div className="fixed top-8 right-8 z-40 flex items-center gap-3 pointer-events-auto">
        {/* Lighting Mode Switcher */}
        <div className="p-1 rounded-xl bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-1">
          <button
            onClick={() => {
              studioAudio.playClick(600);
              setLightingMode('golden');
            }}
            title="Golden Hour Lighting"
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              lightingMode === 'golden' ? 'bg-white text-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            Golden
          </button>
          <button
            onClick={() => {
              studioAudio.playClick(600);
              setLightingMode('neon');
            }}
            title="Cyberpunk Neon Night"
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              lightingMode === 'neon' ? 'bg-white text-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            Neon
          </button>
          <button
            onClick={() => {
              studioAudio.playClick(600);
              setLightingMode('daylight');
            }}
            title="5600K Studio Daylight"
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              lightingMode === 'daylight' ? 'bg-white text-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            Daylight
          </button>
        </div>

        {/* Audio Mute Switcher */}
        <button
          onClick={handleToggleAudio}
          className="p-3 rounded-xl bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white shadow-2xl transition-all"
          title="Toggle Studio Audio Ambiance"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-white" />}
        </button>

        {/* Ask AI Assistant Button (Geometric Balance Badge Style) */}
        <button
          onClick={() => {
            studioAudio.playClick(800);
            onOpenAI();
          }}
          className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 shadow-2xl transition-all hover:scale-105"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden lg:inline text-white/70 italic text-[11px] normal-case font-light tracking-wide mr-1">"I'm here to help you navigate my mind..."</span>
          <span className="text-white font-black tracking-[0.2em]">ASK ASSISTANT</span>
        </button>
      </div>

      {/* Bottom Floating Object Navigation Quick Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-auto hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 px-2 border-r border-white/10">
          OBJECT NAV
        </span>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.target}
              onClick={() => {
                studioAudio.playClick(700);
                onSelectTarget(item.target);
              }}
              className="px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-wider text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-all uppercase"
            >
              <Icon className="w-3.5 h-3.5 text-white/70" />
              <span>{item.label.split('→')[0].trim()}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
