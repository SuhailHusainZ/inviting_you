"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, CheckCircle, MailOpen } from "lucide-react";
import Image from "next/image";

export default function Chapter4_RSVP() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    // Break wax seal sound effect
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
      audio.volume = 0.25;
      audio.play().catch(() => { });
    } catch (e) { }
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate golden submit sparkles and sound
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav");
      audio.volume = 0.3;
      audio.play().catch(() => { });
    } catch (e) { }
    setIsSubmitted(true);
  };

  return (
    <section className="relative min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-royal-dark via-royal-velvet to-black">
      {/* Background decoration with lantern theme */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/1.Invitation.png"
          alt="Vintage Envelope theme"
          fill
          className="object-cover object-center filter blur-sm scale-102"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Chapter Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center mb-16 z-10"
      >
        {/* <span className="font-serif text-royal-gold-light text-xs uppercase tracking-[0.4em] block mb-2">
          Chapter III
        </span> */}
        <h2 className="font-cursive text-royal-gold text-5xl md:text-6xl tracking-wide filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
          {/* The RSVP */}
          Honour us with your gracious presence
        </h2>
        {/* <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-royal-gold to-transparent my-3" /> */}
        {/* <p className="font-serif text-stone-400 text-sm max-w-md mx-auto uppercase tracking-[0.2em]">
          Honour us with your gracious presence
        </p> */}
      </motion.div>

      {/* Envelope / RSVP Area */}
      <div className="relative w-full max-w-xl min-h-[400px] z-10 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* SEALED ENVELOPE */
            <motion.div
              key="sealed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[460px] aspect-[4/3] bg-gradient-to-br from-[#f5ebd6] to-[#e4d4b3] rounded-lg border-2 border-royal-gold/40 shadow-2xl relative flex flex-col items-center justify-center p-8 select-none"
            >
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 pointer-events-none border-x border-b border-royal-gold/10" />
              <svg className="absolute inset-0 w-full h-full stroke-royal-gold/25 fill-none" viewBox="0 0 460 345">
                <path d="M0,0 L230,160 L460,0" strokeWidth="2" />
                <path d="M0,345 L180,180" strokeWidth="1.5" />
                <path d="M460,345 L280,180" strokeWidth="1.5" />
              </svg>

              {/* Invitation Text on Envelope */}
              {/* <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-[#5c4327] mb-2 font-bold block">
                To the Royal Guests
              </span> */}
              <h3 className="font-cursive text-royal-crimson text-3xl tracking-wide mb-6">
                Suhail  &  Nahitha
              </h3>

              {/* Pulsing Wax Heart Seal (Click to Open) */}
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full bg-[#8c1017] border-2 border-[#b01e26] flex items-center justify-center shadow-lg shadow-red-950/60 cursor-pointer relative group"
              >
                <div className="absolute inset-0 rounded-full bg-[#8c1017]/40 animate-ping opacity-60 group-hover:hidden" />
                <Heart className="w-8 h-8 text-royal-gold-light fill-royal-gold-light/20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              </motion.button>
              <span className="font-serif text-[10px] uppercase tracking-[0.2em] text-stone-600 mt-4 animate-pulse">
                Open The Seal
              </span>
            </motion.div>
          ) : !isSubmitted ? (
            /* OPEN ENVELOPE FORM (Parchment Paper Letter) */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="w-full parchment-bg rounded-lg border-2 border-royal-gold p-8 md:p-10 shadow-2xl relative"
            >
              {/* Mail Open Icon Decor */}
              <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-royal-crimson border-2 border-royal-gold flex items-center justify-center shadow-lg">
                <MailOpen className="w-5 h-5 text-royal-gold" />
              </div>

              {/* RSVP Form */}
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6 text-[#3b2314]">
                <div className="text-center mb-4">
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-royal-crimson">
                    Royal Attendance
                  </h3>
                  <div className="text-center font-cursive text-xl text-royal-gold-dark/40 mt-1 select-none">❧</div>
                </div>

                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="font-serif text-xs uppercase tracking-[0.2em] font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#fcf8ef] border-b border-royal-crimson/20 px-4 py-2.5 font-serif text-sm focus:outline-none focus:border-royal-crimson transition-colors"
                  />
                </div>

                {/* Attendance Selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-serif text-xs uppercase tracking-[0.2em] font-bold">
                    Will You Attend?
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <button
                      type="button"
                      onClick={() => setAttendance("yes")}
                      className={`py-3 px-4 rounded font-serif text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${attendance === "yes"
                        ? "bg-royal-crimson text-royal-gold-light border-royal-crimson shadow-md"
                        : "bg-[#fcf8ef] border-royal-crimson/10 text-stone-600 hover:bg-[#faeed6]"
                        }`}
                    >
                      Attend with Joy
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance("no")}
                      className={`py-3 px-4 rounded font-serif text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${attendance === "no"
                        ? "bg-royal-crimson text-royal-gold-light border-royal-crimson shadow-md"
                        : "bg-[#fcf8ef] border-royal-crimson/10 text-stone-600 hover:bg-[#faeed6]"
                        }`}
                    >
                      Decline with Regret
                    </button>
                  </div>
                </div>

                {/* Guest Count */}
                {attendance === "yes" && (
                  <div className="flex flex-col gap-2">
                    <label className="font-serif text-xs uppercase tracking-[0.2em] font-bold">
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#fcf8ef] border-b border-royal-crimson/20 px-4 py-2.5 font-serif text-sm focus:outline-none focus:border-royal-crimson transition-colors"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Warm Blessings Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-serif text-xs uppercase tracking-[0.2em] font-bold">
                    Warm Blessings & Wishes
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your wishes for Suhail & Nahitha..."
                    className="w-full bg-[#fcf8ef] border border-royal-crimson/10 px-4 py-3 font-serif text-sm focus:outline-none focus:border-royal-crimson transition-colors resize-none rounded"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 mt-2 bg-gradient-to-r from-royal-gold-dark to-royal-gold rounded text-royal-dark font-serif text-xs uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-3 shadow-lg shadow-royal-gold/25 border border-royal-gold-light hover:brightness-105 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  Send to Royal Court
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* SUCCESS RESPONSE STATE */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 70 }}
              className="w-full parchment-bg rounded-lg border-2 border-royal-gold p-10 shadow-2xl relative text-center text-[#3b2314]"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>
              <h3 className="font-cursive text-royal-crimson text-4xl tracking-wide mb-3">
                Gracious Thank You
              </h3>
              <p className="font-serif text-stone-700 text-sm max-w-xs mx-auto leading-relaxed mb-6">
                Your response and blessings have been successfully registered in the royal wedding registry.
              </p>
              <div className="h-[1px] w-24 bg-royal-crimson/15 mx-auto mb-6" />
              <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-royal-gold-dark font-semibold">
                Suhail & Nahitha look forward to welcoming you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
