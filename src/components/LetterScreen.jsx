import React from 'react';
import { motion } from 'framer-motion';

export default function LetterScreen({ onBack }) {
  return (
    <div className="min-h-screen w-full bg-[#eb2828] flex flex-col items-center justify-center p-3 sm:p-8 relative select-none font-['Caveat'] overflow-hidden">
      
      {/* Container matching Image 4 layout */}
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 py-6">
        
        {/* ================= LEFT: VERTICAL PHOTOBOOTH STRIP ================= */}
        <motion.div
          initial={{ y: 30, opacity: 0, rotate: -6 }}
          animate={{ y: 0, opacity: 1, rotate: -3 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-2 sm:p-2.5 rounded-sm shadow-2xl w-36 sm:w-44 flex flex-col items-center flex-shrink-0 border border-slate-200"
        >
          {/* 3 Photos inside Strip */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 rounded-xs">
              <img src="/assets/images/naksh_lounge.jpg" alt="Photo 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 rounded-xs">
              <img src="/assets/images/naksh_grind.jpg" alt="Photo 2" className="w-full h-full object-cover object-top" />
            </div>
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 rounded-xs">
              <img src="/assets/images/naksh_sparkler.jpg" alt="Photo 3" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bottom Blue "LOVE 💙" Banner (Exact match to Image 4) */}
          <div className="w-full bg-[#38bdf8] py-1.5 mt-2 rounded-xs flex items-center justify-center gap-1 text-white font-['Fredoka'] font-extrabold text-sm tracking-wider shadow-sm">
            <span>LOVE</span>
            <span>💙</span>
          </div>
        </motion.div>

        {/* ================= RIGHT: SKY BLUE ENVELOPE + LETTER ================= */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative flex flex-col items-center max-w-lg w-full"
        >
          {/* Top Vintage Postage Stamp (as in Image 4) */}
          <div className="absolute -top-10 right-4 z-20 w-12 h-14 bg-amber-100 border-2 border-dashed border-amber-500 rounded-xs flex flex-col items-center justify-center shadow-md transform rotate-6">
            <span className="text-xl">☕</span>
            <span className="text-[8px] font-mono font-bold text-amber-900">POSTAGE</span>
          </div>

          {/* Speech Bubble: "LOVE YOU" with Hearts (as in Image 4) */}
          <div className="absolute -top-12 left-6 z-20 bg-white px-3 py-1 rounded-full shadow-md border border-slate-300 text-xs font-['Fredoka'] font-bold text-[#38bdf8] flex items-center gap-1 transform -rotate-3">
            <span>LOVE YOU</span>
            <span>💙💙💙</span>
          </div>

          {/* The Sky-Blue Envelope Container (Matching Image 4) */}
          <div className="relative w-80 sm:w-96 min-h-[380px] sm:min-h-[420px] bg-[#38bdf8] rounded-2xl shadow-2xl border-2 border-white/50 p-4 flex flex-col justify-end overflow-visible">
            
            {/* The Handwritten Letter Sliding Out */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: -30 }}
              transition={{ delay: 0.3, type: 'spring', damping: 14 }}
              className="relative z-10 bg-white p-5 sm:p-7 rounded-xl shadow-xl w-full text-left text-slate-800 border border-slate-100"
            >
              <div className="font-['Caveat'] text-lg sm:text-xl text-slate-800 leading-relaxed font-semibold">
                <p className="mb-2">
                  The calm I never knew I needed and the warmth I always look for.
                </p>
                <p className="mb-2">
                  I just want you to know that I'm really happy with you, and I want to keep choosing you every single day.
                </p>
                <p className="mb-2">
                  Happy birthday Naksh, you are truly one of a kind. Keep shining and inspiring everyone around you!
                </p>
                <p className="text-right text-rose-600 font-bold font-['Great_Vibes'] text-2xl pt-2">
                  With love forever ❤️
                </p>
              </div>
            </motion.div>

            {/* Front Envelope Flap & Red Heart Seal (as in Image 4) */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-rose-600 border-2 border-white shadow-xl flex items-center justify-center text-3xl">
                ❤️
              </div>
            </div>

          </div>

        </motion.div>

      </div>

      {/* Bottom-Right "BACK" Button (as in Image 4) */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onBack}
          className="bg-black hover:bg-neutral-800 text-white font-['Fredoka'] font-bold text-base sm:text-lg px-8 sm:px-10 py-2.5 sm:py-3 rounded-full shadow-2xl cursor-pointer transition-all flex items-center justify-center"
        >
          BACK
        </motion.button>
      </div>

    </div>
  );
}
