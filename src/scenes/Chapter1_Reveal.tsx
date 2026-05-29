"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

interface Chapter1Props {
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function Chapter1_Reveal({ isMuted, onToggleMute }: Chapter1Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-gradient-to-b from-black via-royal-dark/95 to-royal-dark"
    >
      {/* Dynamic Sound Button */}
      <div className="absolute top-8 right-8 z-30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleMute}
          className="p-3 rounded-full border border-royal-gold/30 bg-royal-dark/80 text-royal-gold hover:border-royal-gold/60 transition-colors shadow-lg shadow-black/50"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
        </motion.button>
      </div>

      {/* Floating lanterns backdrop (aesthetic parallax overlay) */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 opacity-40">
        <div className="absolute top-0 left-[15%] w-32 h-[350px] bg-gradient-to-b from-royal-gold/5 via-transparent to-transparent blur-md" />
        <div className="absolute top-0 right-[20%] w-40 h-[450px] bg-gradient-to-b from-royal-gold/5 via-transparent to-transparent blur-md" />
      </div>

      {/* Top Header credits */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-center z-20 mt-8"
      >
        <span className="font-serif text-royal-gold-light text-xs uppercase tracking-[0.4em] block mb-2">
          Under the Grace of Almighty
        </span>
        <span className="font-serif text-stone-400 text-[10px] uppercase tracking-[0.3em] block">
          We Cordially Invite You to Witness a Love Story
        </span>
      </motion.div>

      {/* Main Couple Names & Title Reveal */}
      <div className="flex flex-col items-center justify-center text-center z-20 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mb-4"
        >
          <h2 className="font-allura text-royal-gold text-5xl md:text-6xl mb-1 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            The Royal Invitation
          </h2>
          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-royal-gold to-transparent my-3" />
        </motion.div>

        {/* Groom & Bride Names */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 px-4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, delay: 1 }}
            className="font-cursive text-royal-gold-light text-6xl md:text-8xl tracking-wide hover:scale-105 transition-transform duration-500 cursor-default"
          >
            Suhail
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.4 }}
            className="font-allura text-royal-gold text-4xl md:text-5xl my-2 md:my-0"
          >
            &
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, delay: 1.2 }}
            className="font-cursive text-royal-gold-light text-6xl md:text-8xl tracking-wide hover:scale-105 transition-transform duration-500 cursor-default"
          >
            Nahitha
          </motion.h1>
        </div>

        {/* Date and Location reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.5 }}
          className="mt-6"
        >
          <p className="font-serif text-stone-300 text-sm tracking-[0.25em] uppercase">
            June 28, 2026
          </p>
          <p className="font-serif text-royal-gold-light text-xs tracking-[0.3em] uppercase mt-2">
            Al Saj Convention Center, Nemom, Trivandrum
          </p>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 2.2 }}
        className="flex flex-col items-center justify-center z-20 cursor-pointer"
      >
        <span className="font-serif text-stone-500 text-[10px] uppercase tracking-[0.3em] mb-2">
          Scroll to Begin the Film
        </span>
        <ChevronDown className="w-5 h-5 text-royal-gold animate-bounce" />
      </motion.div>
    </section>
  );
}
