import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

export default function BroNoteScreen({ onBack, onNext }) {
  return (
    <div className="min-h-screen w-full bg-[#eb2828] flex flex-col items-center justify-center p-4 sm:p-8 relative select-none font-['Caveat'] overflow-hidden">
      
      {/* Sparkle Stars on background */}
      <div className="absolute top-[20%] left-[12%] text-white text-3xl pointer-events-none animate-pulse">✦</div>
      <div className="absolute bottom-[20%] right-[15%] text-white text-4xl pointer-events-none animate-pulse">✦</div>

      {/* Heading Badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 text-center"
      >
        <span className="font-['Fredoka'] text-sm uppercase tracking-widest text-white/90 bg-black/30 px-4 py-1.5 rounded-full border border-white/20">
          GIFT #1 • A SPECIAL NOTE FOR NAKSH
        </span>
      </motion.div>

      {/* The Special Handwritten Note */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: -1 }}
        transition={{ type: 'spring', damping: 14 }}
        className="relative max-w-lg w-full bg-[#fffef5] p-6 sm:p-10 rounded-2xl shadow-2xl text-slate-800 border-2 border-amber-200 transform -rotate-1"
      >
        {/* Washi Tape at Top Center */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-7 bg-amber-200/90 shadow-sm transform -rotate-2 border-dashed border border-amber-400 flex items-center justify-center">
          <span className="text-[11px] font-mono font-bold tracking-widest text-amber-900">FROM THE HEART 💌</span>
        </div>

        {/* Vintage Stamp Top Right */}
        <div className="absolute top-4 right-4 text-3xl">
          🎂
        </div>

        {/* Note Salutation */}
        <h2 className="font-['Fredoka'] text-2xl sm:text-3xl font-bold text-rose-600 mb-3 tracking-wide">
          Dear Naksh,
        </h2>

        {/* The Special Note Content */}
        <div className="text-xl sm:text-2xl text-slate-800 leading-relaxed font-bold space-y-4 font-['Caveat']">
          <p className="text-2xl sm:text-3xl text-rose-700 font-extrabold bg-rose-50 px-3 py-1.5 rounded-lg border-l-4 border-rose-500 shadow-sm">
            "You are so special. You are something else."
          </p>
          
          <p className="text-slate-800">
            From the relentless dedication you put into everything you do, to your unmatched energy and warmth — there is truly nobody like you. You don't just chase goals; you inspire everyone around you while doing it.
          </p>

          <p className="text-slate-800">
            On your birthday, I want you to know how deeply appreciated and respected you are. May this year shower you with boundless success, good health, unforgettable memories, and the greatness you deserve.
          </p>

          <p className="pt-2 text-rose-600 text-2xl sm:text-3xl font-extrabold font-['Great_Vibes']">
            Happy Birthday, Naksh! Keep shining bright ✨
          </p>
        </div>

        {/* Stickers & Sign-off */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl">
            <span>👑</span>
            <span>⭐</span>
            <span>🔥</span>
          </div>
          <span className="font-['Fredoka'] text-xs font-bold text-slate-500 uppercase tracking-wider">
            ALWAYS IN YOUR CORNER • 2026
          </span>
        </div>
      </motion.div>

      {/* Bottom Action Controls */}
      <div className="mt-8 flex items-center gap-4 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onBack}
          className="bg-white/20 hover:bg-white/30 text-white font-['Fredoka'] font-bold text-sm sm:text-base px-6 py-2.5 rounded-full border border-white/40 shadow-lg cursor-pointer transition-all"
        >
          BACK TO GIFTS
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onNext}
          className="bg-black hover:bg-neutral-800 text-white font-['Fredoka'] font-bold text-sm sm:text-base px-8 py-2.5 rounded-full shadow-2xl cursor-pointer transition-all flex items-center gap-2"
        >
          <span>NEXT GIFT</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

    </div>
  );
}
