"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Chapter2_LoveStory() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] } },
  };

  return (
    <section className="relative min-h-screen w-full py-24 px-6 md:px-12 bg-royal-dark/95 flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background Flare */}
      <div className="absolute inset-0 royal-flare opacity-30 pointer-events-none" />

      {/* Chapter Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        className="text-center mb-20 z-10"
      >
        {/* <span className="font-serif text-royal-gold-light text-xs uppercase tracking-[0.4em] block mb-2">
          Chapter I
        </span> */}
        <h2 className="font-cursive text-royal-gold text-5xl md:text-6xl tracking-wide filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
          The Story of Us
        </h2>
        <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-royal-gold to-transparent my-3" />
        <p className="font-serif text-stone-400 text-sm max-w-md mx-auto uppercase tracking-[0.2em] leading-relaxed">
          From two independent paths into one beautiful, lifelong symphony.
        </p>
      </motion.div>

      {/* The Couple Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl w-full z-10">

        {/* The Groom Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
          className="flex flex-col items-center group"
        >
          {/* Portrait Container */}
          <div className="w-full max-w-[450px] aspect-[4/5] relative rounded-lg overflow-hidden border border-royal-gold/25 group-hover:border-royal-gold/60 transition-all duration-700 shadow-2xl shadow-black/85">
            <Image
              src="/images/2_the_groom.png"
              alt="The Groom - Suhail Husain Z"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2.5s] ease-out"
            />
            {/* Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />

            {/* Floating details overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="font-serif text-royal-gold-light text-xs uppercase tracking-[0.3em] block mb-1">
                The Groom
              </span>
              <h3 className="font-cursive text-white text-4xl tracking-wide">
                Suhail
              </h3>
            </div>
          </div>
          {/* Story text */}
          <p className="font-serif text-stone-300 text-center text-md leading-relaxed max-w-sm mt-6 group-hover:text-stone-100 transition-colors duration-500">
            "Dressed in hand-embroidered royal threads, his eyes capture the vision of a shared future, filled with devotion, strength, and endless love."
          </p>
        </motion.div>

        {/* The Bride Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
          className="flex flex-col items-center group mt-8 lg:mt-0"
        >
          {/* Portrait Container */}
          <div className="w-full max-w-[450px] aspect-[4/5] relative rounded-lg overflow-hidden border border-royal-gold/25 group-hover:border-royal-gold/60 transition-all duration-700 shadow-2xl shadow-black/85">
            <Image
              src="/images/3_the_bride.png"
              alt="The Bride - Nahitha Nazrin S"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2.5s] ease-out"
            />
            {/* Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />

            {/* Floating details overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="font-serif text-royal-gold-light text-xs uppercase tracking-[0.3em] block mb-1">
                The Bride
              </span>
              <h3 className="font-cursive text-white text-4xl tracking-wide">
                Nahitha
              </h3>
            </div>
          </div>
          {/* Story text */}
          <p className="font-serif text-stone-300 text-center text-md leading-relaxed max-w-sm mt-6 group-hover:text-stone-100 transition-colors duration-500">
            "Draped in radiant imperial crimson with delicate golden accents, her spirit shines bright as she steps gracefully towards a new beginning."
          </p>
        </motion.div>

      </div>

      {/* The Union Climax Scene */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        className="w-full max-w-5xl mt-28 z-10 flex flex-col items-center group"
      >
        <div className="w-full aspect-[16/10] md:aspect-[21/9] relative rounded-lg overflow-hidden border border-royal-gold/25 group-hover:border-royal-gold/50 transition-all duration-750 shadow-2xl shadow-black/90">
          <Image
            src="/images/5_both.png"
            alt="Suhail and Nahitha - The Union"
            fill
            className="object-cover object-center group-hover:scale-102 transition-transform duration-[3s] ease-out"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/90 via-transparent to-transparent opacity-95" />

          {/* Dynamic candle lighting look */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-royal-crimson-dark/10 to-black/70 pointer-events-none" />

          {/* Floating centered quote */}
          <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-serif text-royal-gold text-xs uppercase tracking-[0.4em] block mb-2">
                The Eternal Promise
              </span>
              <h3 className="font-cursive text-white text-3xl md:text-5xl tracking-wide">
                Two Hearts, One Journey
              </h3>
            </div>
            <p className="font-serif text-stone-300 text-xs md:text-sm max-w-xs md:max-w-md text-left leading-relaxed">
              "We took our first breath of love in silence. Now, before God and our loved ones, we write our vow across the stars."
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
