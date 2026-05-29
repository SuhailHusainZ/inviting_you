"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Music, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Chapter3_Events() {
  const scrollData = [
    {
      title: "The Sangeet Night",
      tag: "Music & Celebration",
      icon: <Music className="w-6 h-6 text-royal-crimson" />,
      date: "Friday, December 18, 2026",
      time: "7:00 PM onwards",
      venue: "The Palace Grand Ballroom",
      note: "Join us for an evening of royal beats, glowing lanterns, and dance celebrations.",
    },
    {
      title: "Baraat & Pheras",
      tag: "The Holy Union",
      icon: <Heart className="w-6 h-6 text-royal-crimson" />,
      date: "Sunday, December 20, 2026",
      time: "4:00 PM Reception of Baraat",
      venue: "The Royal Pavilion Gardens",
      note: "Witness the sacred vows of the Groom and the Bride under the floral golden archway.",
    },
    {
      title: "The Royal Reception",
      tag: "The Grand Feast",
      icon: <Sparkles className="w-6 h-6 text-royal-crimson" />,
      date: "Monday, December 21, 2026",
      time: "8:00 PM onwards",
      venue: "The Durbar Hall",
      note: "An elegant royal dining banquet to celebrate the newlywed couple in majestic splendor.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: index * 0.25,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Background image backdrop representing the walk */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/4_both_walk.png"
          alt="Walk down the aisle"
          fill
          className="object-cover object-center scale-102"
        />
        {/* Soft, deep overlay to make text pop out beautifully */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-dark/95 via-royal-dark/90 to-royal-dark/95" />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Chapter Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center mb-20 z-10"
      >
        {/* <span className="font-serif text-royal-gold-light text-xs uppercase tracking-[0.4em] block mb-2">
          Chapter II
        </span> */}
        <h2 className="font-cursive text-royal-gold text-5xl md:text-6xl tracking-wide filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
          The Celebrations
        </h2>
        <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-royal-gold to-transparent my-3" />
        <p className="font-serif text-stone-400 text-sm max-w-md mx-auto uppercase tracking-[0.2em]">
          Schedule of the royal wedding ceremonies
        </p>
      </motion.div>

      {/* Scroll Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full z-10">
        {scrollData.map((event, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="parchment-bg rounded-lg border-2 border-royal-gold/40 px-8 py-10 flex flex-col justify-between shadow-2xl relative animate-sway hover:border-royal-gold transition-all duration-500 overflow-hidden"
            style={{ animationDelay: `${index * 1.5}s` }}
          >
            {/* Top Filigree Accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-royal-gold-dark via-royal-gold-light to-royal-gold-dark" />
            <div className="text-center font-cursive text-2xl text-royal-gold-dark/40 mb-4 select-none">❧ ❁ ❧</div>

            {/* Event Info */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full border border-royal-crimson/25 bg-royal-crimson/5 flex items-center justify-center mb-4 shadow-inner">
                {event.icon}
              </div>
              <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-royal-gold-dark font-semibold mb-1 block">
                {event.tag}
              </span>
              <h3 className="font-serif text-[#4a0404] text-2xl font-bold tracking-wide mb-6">
                {event.title}
              </h3>

              <div className="h-[1px] w-16 bg-royal-crimson/15 mb-6" />

              {/* Time Details */}
              <div className="flex flex-col gap-3 w-full text-left font-serif text-[#3b2314] text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-royal-gold-dark shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-royal-gold-dark shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-royal-gold-dark shrink-0" />
                  <span className="font-semibold">{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Note/Description */}
            <div className="mt-8 text-center">
              <p className="font-serif text-stone-700 italic text-xs leading-relaxed max-w-[240px] mx-auto">
                "{event.note}"
              </p>

              {/* Bottom Filigree Accent */}
              <div className="text-center font-cursive text-xl text-royal-gold-dark/40 mt-6 select-none">❧</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
