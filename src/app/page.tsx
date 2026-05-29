"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { audioEngine } from "@/audio/AudioEngine";

// Components
import Preloader from "@/components/Preloader";
import ScenicCanvas from "@/particles/ScenicCanvas";

// Scenes
import Chapter1_Reveal from "@/scenes/Chapter1_Reveal";
import Chapter2_LoveStory from "@/scenes/Chapter2_LoveStory";
import Chapter3_Events from "@/scenes/Chapter3_Events";
import Chapter4_RSVP from "@/scenes/Chapter4_RSVP";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize Lenis smooth scroll and monitor scroll position
  useEffect(() => {
    if (!isEntered) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", (e: any) => {
      const scrollY = e.scroll;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);

      // Blends sound loops according to progress
      if (audioEngine) {
        audioEngine.adjustVolumeByScroll(progress);
      }
    });

    return () => {
      lenis.destroy();
    };
  }, [isEntered]);

  // Audio trigger on entry
  const handleEnterPalace = () => {
    setIsEntered(true);
    if (audioEngine) {
      audioEngine.playAmbient();
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioEngine) {
      audioEngine.mute(nextMuted);
    }
  };

  return (
    <main className="relative min-h-screen w-full select-none overflow-x-hidden bg-black text-stone-100">

      {/* 1. Cinematic Film Grain Celluloid Texture Overlay */}
      <div className="film-grain" />

      {/* 2. Interactive Preloader Rope Pull Gate */}
      {!isEntered && <Preloader onEnter={handleEnterPalace} />}

      {/* 3. 3D Scenic Particle Canvas Backdrop */}
      {isEntered && <ScenicCanvas scrollProgress={scrollProgress} />}

      {/* 4. Cinematic Letterbox Bars (Top & Bottom black bars to frame like a 21:9 movie) */}
      <div className="fixed top-0 inset-x-0 h-6 md:h-10 bg-black z-40 border-b border-royal-gold/10 pointer-events-none transition-transform duration-1000" />
      <div className="fixed bottom-0 inset-x-0 h-6 md:h-10 bg-black z-40 border-t border-royal-gold/10 pointer-events-none transition-transform duration-1000" />

      {/* 5. Main Story Page Scenes (Animated Reveal once entered) */}
      <div
        className={`transition-opacity duration-[2.5s] ease-out ${isEntered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <Chapter1_Reveal isMuted={isMuted} onToggleMute={handleToggleMute} />
        <Chapter2_LoveStory />
        <Chapter3_Events />
        <Chapter4_RSVP />

        {/* Cinematic Credits Footer */}
        <footer className="relative py-12 bg-black border-t border-royal-gold/15 flex flex-col items-center justify-center text-center px-6 z-20">
          <span className="font-cursive text-royal-gold-light text-2xl mb-2">
            ❧ Suhail & Nahitha ☙
          </span>
          <p className="font-serif text-stone-500 text-[10px] uppercase tracking-[0.3em]">
            Designed for the Royal Union • Created with Love
          </p>
        </footer>
      </div>
    </main>
  );
}
