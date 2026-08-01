'use client';

import React, { useState } from 'react';
import { Studio3DCanvas, RoomTarget } from '@/components/3d/Studio3DCanvas';
import { RoomControls } from '@/components/ui/RoomControls';
import { MobileStoryMode } from '@/components/mobile/MobileStoryMode';
import { VideosModal } from '@/components/modals/VideosModal';
import { AboutModal } from '@/components/modals/AboutModal';
import { ProjectsModal } from '@/components/modals/ProjectsModal';
import { ShopModal } from '@/components/modals/ShopModal';
import { PodcastModal } from '@/components/modals/PodcastModal';
import { MediaKitModal } from '@/components/modals/MediaKitModal';
import { ConsultationModal } from '@/components/modals/ConsultationModal';
import { StudioAIAssistant } from '@/components/ai/StudioAIAssistant';

export default function HomePage() {
  const [activeTarget, setActiveTarget] = useState<RoomTarget | null>(null);
  const [lightingMode, setLightingMode] = useState<'golden' | 'neon' | 'daylight'>('golden');
  const [isHoveringAny, setIsHoveringAny] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

  const handleSelectTarget = (target: RoomTarget) => {
    if (target === 'ai') {
      setIsAIOpen(true);
      setActiveTarget(null);
    } else {
      setActiveTarget(target);
    }
  };

  const handleCloseModal = () => {
    setActiveTarget(null);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050505] text-[#e0e0e0] font-sans select-none">
      {/* Geometric Balance Atmosphere & Radial Overlays */}
      <div className="absolute inset-0 bg-radial-at-tr from-[#1a1a1a] via-transparent to-transparent opacity-50 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(40,40,60,0.4),transparent)] pointer-events-none z-10" />

      {/* Frame Borders matching Geometric Balance */}
      <div className="absolute inset-0 border-[16px] md:border-[32px] border-black/80 pointer-events-none z-30" />
      <div className="absolute inset-0 border border-white/5 pointer-events-none z-30" />

      {/* Room Controls (Header & Ambient Toggles) */}
      <RoomControls
        lightingMode={lightingMode}
        setLightingMode={setLightingMode}
        onSelectTarget={handleSelectTarget}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* 3D WebGL Studio Room (Desktop & Tablet) */}
      <div className="hidden md:block w-full h-full">
        <Studio3DCanvas
          activeTarget={activeTarget}
          onSelectTarget={handleSelectTarget}
          lightingMode={lightingMode}
          isHoveringAny={isHoveringAny}
          setIsHoveringAny={setIsHoveringAny}
        />
      </div>

      {/* Mobile Interactive Vertical Story Experience (Small Screens) */}
      <div className="block md:hidden w-full h-full overflow-y-auto">
        <MobileStoryMode
          onSelectTarget={handleSelectTarget}
          onOpenAI={() => setIsAIOpen(true)}
        />
      </div>

      {/* Modals for Each Interactive Object Target */}
      <VideosModal
        isOpen={activeTarget === 'videos'}
        onClose={handleCloseModal}
      />

      <AboutModal
        isOpen={activeTarget === 'about'}
        onClose={handleCloseModal}
      />

      <ProjectsModal
        isOpen={activeTarget === 'projects'}
        onClose={handleCloseModal}
      />

      <ShopModal
        isOpen={activeTarget === 'shop'}
        onClose={handleCloseModal}
      />

      <PodcastModal
        isOpen={activeTarget === 'podcast'}
        onClose={handleCloseModal}
      />

      <MediaKitModal
        isOpen={activeTarget === 'mediakit'}
        onClose={handleCloseModal}
      />

      <ConsultationModal
        isOpen={activeTarget === 'consultation'}
        onClose={handleCloseModal}
      />

      {/* Studio AI Assistant */}
      <StudioAIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </main>
  );
}
