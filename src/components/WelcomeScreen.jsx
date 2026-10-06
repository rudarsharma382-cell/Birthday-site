import React from 'react';
import { motion } from 'framer-motion';

export default function WelcomeScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full bg-[#fdfdfd] flex flex-col items-center justify-center p-4 sm:p-8 relative select-none font-['Sniglet']"
    >
      
      {/* Centerpiece: Cute Line Friends Birthday Celebration Artwork */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', damping: 14 }}
        className="max-w-xl w-full flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden relative">
          <img
            src="/assets/images/line_friends_birthday.jpg"
            alt="Happy Birthday Celebration"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Dedicated to Naksh Dahiya banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-center"
        >
          <span className="font-['Great_Vibes'] text-4xl sm:text-5xl text-rose-500 font-bold block filter drop-shadow-sm">
            Naksh Dahiya
          </span>
          <span className="text-xs font-['Sniglet'] text-slate-400 font-bold uppercase tracking-widest mt-1 block">
            Chapter 2026 • A Special Celebration
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom-Right "NEXT" Black Pill Button (Exact match to user screenshot 1!) */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onNext}
          className="bg-black hover:bg-neutral-800 text-white font-['Fredoka'] font-bold text-base sm:text-lg px-8 sm:px-10 py-2.5 sm:py-3 rounded-full shadow-2xl cursor-pointer transition-all flex items-center justify-center"
        >
          NEXT
        </motion.button>
      </div>

    </motion.div>
  );
}
