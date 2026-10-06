import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LockScreen({ onUnlock }) {
  const [passcode, setPasscode] = useState([]);
  const [shake, setShake] = useState(false);

  // Correct codes: 2412 (reference video code), 2026, 1006
  const handleKeyClick = (val) => {
    if (passcode.length < 4) {
      const next = [...passcode, val];
      setPasscode(next);
      if (next.length === 4) {
        checkCode(next.join(''));
      }
    }
  };

  const handleBackspace = () => {
    if (passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
    }
  };

  const checkCode = (code) => {
    if (code === '2412' || code === '2026' || code === '1006' || code.length === 4) {
      setTimeout(() => {
        onUnlock();
      }, 400);
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPasscode([]);
      }, 600);
    }
  };

  const handleNextClick = () => {
    if (passcode.length === 4) {
      onUnlock();
    } else {
      // Auto-fill 2412 and proceed
      setPasscode(['2', '4', '1', '2']);
      setTimeout(() => {
        onUnlock();
      }, 350);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#eb2828] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none font-['Gaegu']">
      
      {/* Comic Container (No straight corporate lines, playful organic layout) */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-14 py-4">
        
        {/* ================= LEFT SIDE: POLAROID PHOTO ================= */}
        <div className="relative flex items-center justify-center">
          
          {/* Polaroid Frame with organic tilt (-3deg) */}
          <motion.div
            initial={{ scale: 0.9, rotate: -6 }}
            animate={{ scale: 1, rotate: -3 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="comic-polaroid relative w-64 sm:w-76 md:w-84 max-w-xs"
          >
            {/* Blue Ribbon Bow on Top-Right Corner */}
            <div className="absolute -top-7 -right-5 z-20 pointer-events-none sticker-shadow">
              <svg width="76" height="76" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left bow loop */}
                <path d="M50 48 C32 20 6 36 24 60 C36 70 48 58 50 50 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2.5" />
                <path d="M42 46 C32 30 18 38 28 54 C34 60 40 52 42 46 Z" fill="#93c5fd" />
                {/* Right bow loop */}
                <path d="M50 48 C68 20 94 36 76 60 C64 70 52 58 50 50 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2.5" />
                <path d="M58 46 C68 30 82 38 72 54 C66 60 60 52 58 46 Z" fill="#93c5fd" />
                {/* Bow knot */}
                <circle cx="50" cy="50" r="10" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
                <circle cx="48" cy="48" r="4" fill="#bfdbfe" />
                {/* Dangling tails */}
                <path d="M44 58 L28 88 C25 93 32 95 36 90 L48 64 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
                <path d="M56 58 L72 88 C75 93 68 95 64 90 L52 64 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
              </svg>
            </div>

            {/* Photo inside frame (User's authentic provided photo: Part of the Grind!) */}
            <div className="aspect-[4/5] overflow-hidden bg-slate-100 rounded-sm shadow-inner relative">
              <img
                src="/assets/images/naksh_grind.jpg"
                alt="Naksh Dahiya - Part of the Grind"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Bottom-Left: The Exact Cute Blue Teddy Bear Sticker */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-8 -left-8 z-30 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none sticker-shadow"
            >
              <img
                src="/assets/images/blue_teddy_sticker.jpg"
                alt="Cute Blue Teddy"
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* ================= RIGHT SIDE: COMIC DIGITAL KEYPAD ================= */}
        <div className="flex flex-col items-center justify-center">
          
          {/* Header Title: "Entre a passcode" */}
          <div className="mb-4 text-center">
            <h1 className="font-['Sniglet'] text-3xl sm:text-4xl text-white tracking-wide font-extrabold drop-shadow-[2px_2px_0px_rgba(180,20,20,0.6)]">
              Entre a passcode
            </h1>
          </div>

          {/* 4 Digit Passcode Boxes */}
          <motion.div
            animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 sm:gap-3 mb-5"
          >
            {[0, 1, 2, 3].map((idx) => {
              const val = passcode[idx];
              return (
                <div key={idx} className="comic-passcode-box">
                  {val ? (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white font-['Sniglet'] text-3xl"
                    >
                      {val}
                    </motion.span>
                  ) : null}
                </div>
              );
            })}
          </motion.div>

          {/* 3x4 Comic Keypad Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-3.5 w-60 sm:w-68">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
              <button
                key={k}
                onClick={() => {
                  if (k === '#') handleBackspace();
                  else handleKeyClick(k);
                }}
                className="comic-key-btn h-14 sm:h-16 text-2xl sm:text-3xl"
              >
                {k}
              </button>
            ))}
          </div>

          {/* NEXT Button (Pill shaped with red text as in screenshot) */}
          <div className="mt-5">
            <button
              onClick={handleNextClick}
              className="comic-next-btn text-lg sm:text-xl font-['Sniglet'] font-extrabold uppercase shadow-lg"
            >
              NEXT
            </button>
          </div>

          {/* Hint text at bottom: "Hint- 4s are for code" */}
          <div className="mt-3 text-center">
            <p className="font-['Sniglet'] text-sm sm:text-base text-white/95 font-bold tracking-wide drop-shadow-[1px_1px_0px_rgba(180,20,20,0.5)]">
              Hint- 4s are for code (2412)
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
