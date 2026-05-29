"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimate } from "framer-motion";
import { Sparkles, Unlock } from "lucide-react";

interface PreloaderProps {
  onEnter: () => void;
}

export default function Preloader({ onEnter }: PreloaderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scope, animate] = useAnimate();

  // Physics rope variables
  const dragY = useMotionValue(0);
  
  // Transform drag Y to rope visual length and tassel scale
  const ropeLength = useTransform(dragY, (y) => 120 + y);
  const glowScale = useTransform(dragY, [0, 120], [1, 2.2]);
  const textOpacity = useTransform(dragY, [0, 100], [1, 0.2]);

  // Monitor drag value to trigger unlock
  useEffect(() => {
    const unsubscribe = dragY.on("change", (latest) => {
      if (latest >= 120 && !isUnlocked) {
        setIsUnlocked(true);
        triggerUnlockSequence();
      }
    });
    return () => unsubscribe();
  }, [dragY, isUnlocked]);

  const triggerUnlockSequence = async () => {
    // Play unlock chime sound (will be integrated with AudioEngine)
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } catch (e) {}

    // Animate gate doors splitting and sliding away
    await Promise.all([
      animate("#left-gate", { x: "-100%", opacity: 0 }, { duration: 1.8, ease: [0.77, 0, 0.175, 1] }),
      animate("#right-gate", { x: "100%", opacity: 0 }, { duration: 1.8, ease: [0.77, 0, 0.175, 1] }),
      animate("#rope-container", { y: -300, opacity: 0 }, { duration: 0.8, ease: "easeIn" }),
      animate("#ambient-bg", { opacity: 0 }, { duration: 1.8 }),
    ]);

    onEnter();
  };

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* Background with animated mist & glow */}
      <div
        id="ambient-bg"
        className="absolute inset-0 bg-radial-gradient from-royal-crimson-dark/40 via-black to-black opacity-90 transition-opacity duration-1000"
      >
        {/* SVG animated fog/clouds */}
        <div className="absolute inset-0 opacity-20 pointer-events-none filter blur-2xl royal-flare" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-royal-crimson/10 filter blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-royal-gold/5 filter blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Royal Palace silhouette overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-30 select-none">
        <svg viewBox="0 0 1440 600" className="w-full max-h-[50vh] fill-royal-crimson-dark">
          <path d="M0,500 L120,480 L180,430 L200,430 L220,400 L240,430 L260,430 L320,480 L440,490 L500,410 L540,320 L580,260 L600,120 L620,260 L660,320 L700,410 L820,490 L940,480 L1000,430 L1020,430 L1040,400 L1060,430 L1080,430 L1140,480 L1260,490 L1440,500 L1440,600 L0,600 Z" />
        </svg>
      </div>

      {/* Royal Gates (Left & Right halves) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        <div
          id="left-gate"
          className="w-1/2 h-full bg-gradient-to-r from-royal-dark to-royal-velvet border-r border-royal-gold/20 relative"
        >
          {/* Decorative filigree arch left */}
          <div className="absolute inset-y-0 right-0 w-24 h-full flex flex-col justify-between py-12 pr-4 border-r border-royal-gold/10 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="text-royal-gold font-cursive text-2xl rotate-90 select-none">❧</div>
            ))}
          </div>
        </div>
        <div
          id="right-gate"
          className="w-1/2 h-full bg-gradient-to-l from-royal-dark to-royal-velvet border-l border-royal-gold/20 relative"
        >
          {/* Decorative filigree arch right */}
          <div className="absolute inset-y-0 left-0 w-24 h-full flex flex-col justify-between py-12 pl-4 border-l border-royal-gold/10 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="text-royal-gold font-cursive text-2xl -rotate-90 select-none">❧</div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Rope Pull Mechanism */}
      <div id="rope-container" className="absolute top-0 flex flex-col items-center z-10 w-full h-full">
        {/* Tension Rope (stretches as Y increases) */}
        <motion.div
          style={{ height: ropeLength }}
          className="w-0.5 bg-gradient-to-b from-royal-gold-dark via-royal-gold to-royal-gold-light relative"
        >
          {/* Floating sparks around the rope */}
          <div className="absolute inset-x-[-15px] bottom-0 flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-royal-gold-light animate-pulse opacity-50" />
          </div>
        </motion.div>

        {/* Tassel Handle (Interactive Pull) */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 150 }}
          dragElastic={0.15}
          dragMomentum={false}
          style={{ y: dragY }}
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 0.95 }}
          className="flex flex-col items-center cursor-grab active:cursor-grabbing group mt-[-2px] relative"
        >
          {/* Glowing Aura */}
          <motion.div
            style={{ scale: glowScale }}
            className="absolute top-1 w-14 h-14 bg-royal-gold/20 rounded-full blur-md -z-10 group-hover:bg-royal-gold/30 transition-colors"
          />

          {/* Heavy Golden Ring */}
          <div className="w-10 h-10 rounded-full border-4 border-royal-gold flex items-center justify-center bg-royal-dark shadow-2xl relative">
            <div className="w-6 h-6 rounded-full border-2 border-royal-crimson bg-gradient-to-tr from-royal-gold-dark to-royal-gold-light flex items-center justify-center">
              <Unlock className="w-3 h-3 text-royal-crimson-dark" />
            </div>
          </div>

          {/* Royal Velvet Tassel */}
          <div className="w-4 h-16 bg-gradient-to-b from-royal-crimson via-royal-crimson-dark to-black rounded-b-lg shadow-lg relative border-x border-royal-gold/20 mt-[-2px]">
            {/* Golden Ribbon tied around tassel */}
            <div className="absolute top-1 left-0 right-0 h-1.5 bg-royal-gold border-y border-royal-gold-light" />
            <div className="absolute top-[5px] left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-royal-gold/40" />
          </div>
        </motion.div>

        {/* Text Prompt */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-20 flex flex-col items-center text-center px-6"
        >
          <p className="font-allura text-royal-gold-light text-4xl mb-2 tracking-wide animate-pulse">
            The Palace Gates Await
          </p>
          <p className="font-serif text-stone-400 text-xs uppercase tracking-[0.25em] max-w-xs leading-relaxed">
            Drag the golden tassel downward to unveil the royal invitation
          </p>
        </motion.div>
      </div>

      {/* Floating Sparkle Emitters around screen */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-royal-gold rounded-full opacity-35 filter blur-[0.5px]"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animation: `float ${Math.random() * 6 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
