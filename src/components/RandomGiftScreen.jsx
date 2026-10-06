import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Flame, RotateCcw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RandomGiftScreen({ onBack, onRestart }) {
  const [auraLevel, setAuraLevel] = useState(100);
  const [unlockedTitle, setUnlockedTitle] = useState("LEVEL 9999 GRIND LORD");
  const [isDetonated, setIsDetonated] = useState(false);

  const titles = [
    "🔥 LEVEL 9999 GRIND DEMON",
    "👑 CHIEF HUSTLE OFFICER OF 2026",
    "⚡ CERTIFIED MAXIMUM AURA BRO",
    "🚀 UNSTOPPABLE MILESTONE CONQUEROR"
  ];

  const handlePowerUp = () => {
    setIsDetonated(true);
    setAuraLevel((prev) => prev + 9999);
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    setUnlockedTitle(randomTitle);

    // Multi-cannon confetti blast
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ffd269', '#f59e0b', '#ef4444', '#3b82f6', '#10b981']
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 }
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 }
      });
    }, 250);
  };

  return (
    <div className="min-h-screen w-full bg-[#eb2828] flex flex-col items-center justify-center p-4 sm:p-8 relative select-none font-['Sniglet'] overflow-hidden">
      
      {/* Background Sparkles */}
      <div className="absolute top-[16%] left-[12%] text-white text-4xl pointer-events-none animate-bounce">⚡</div>
      <div className="absolute top-[20%] right-[14%] text-white text-3xl pointer-events-none animate-pulse">✦</div>
      <div className="absolute bottom-[22%] left-[16%] text-white text-4xl pointer-events-none animate-bounce">🔥</div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 text-center"
      >
        <span className="font-['Fredoka'] text-xs uppercase tracking-widest text-white/90 bg-black/30 px-4 py-1.5 rounded-full border border-white/20">
          GIFT #3 • RANDOM CRAZY SURPRISE
        </span>
        <h1 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold text-white mt-2 drop-shadow-[2px_2px_0px_rgba(180,20,20,0.6)]">
          The Maximum Aura Detonator!
        </h1>
        <p className="font-['Caveat'] text-xl text-amber-200 mt-1 font-bold">
          Tap the button below to supercharge Naksh's birthday stats! 💥
        </p>
      </motion.div>

      {/* Interactive Arcade Trophy Centerpiece */}
      <motion.div
        animate={isDetonated ? { scale: [1, 1.05, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="relative max-w-md w-full bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-center border-4 border-yellow-400 my-4"
      >
        {/* Floating Crown Sticker */}
        <div className="absolute -top-6 inset-x-0 flex justify-center">
          <div className="w-14 h-14 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-bounce">
            👑
          </div>
        </div>

        {/* Big Animated Trophy */}
        <div className="text-7xl sm:text-8xl my-4 filter drop-shadow-md">
          🏆
        </div>

        {/* Aura Status */}
        <div className="my-2">
          <span className="text-xs font-['Fredoka'] font-bold text-slate-400 uppercase tracking-widest block">
            OFFICIAL TITLE UNLOCKED
          </span>
          <h2 className="font-['Fredoka'] text-xl sm:text-2xl font-extrabold text-rose-600 mt-1">
            {unlockedTitle}
          </h2>
        </div>

        {/* Stat Bar */}
        <div className="my-4 p-3 bg-slate-100 rounded-2xl flex items-center justify-around border border-slate-200">
          <div>
            <span className="text-[10px] font-['Fredoka'] text-slate-400 uppercase block">GRIND POWER</span>
            <span className="font-['Fredoka'] text-xl font-bold text-slate-800">OVER 9000! 🚀</span>
          </div>
          <div className="w-px h-8 bg-slate-300"></div>
          <div>
            <span className="text-[10px] font-['Fredoka'] text-slate-400 uppercase block">AURA LEVEL</span>
            <span className="font-['Fredoka'] text-xl font-bold text-amber-500">+{auraLevel} ✨</span>
          </div>
        </div>

        {/* Detonate Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handlePowerUp}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-red-500 text-white font-['Fredoka'] font-extrabold text-lg uppercase tracking-wider shadow-xl cursor-pointer flex items-center justify-center gap-2 mt-2"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span>BOOST NAKSH'S AURA!</span>
        </motion.button>
      </motion.div>

      {/* Bottom Action Controls */}
      <div className="mt-6 flex items-center gap-4 z-40">
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
          onClick={onRestart}
          className="bg-black hover:bg-neutral-800 text-white font-['Fredoka'] font-bold text-sm sm:text-base px-8 py-2.5 rounded-full shadow-2xl cursor-pointer transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>REPLAY JOURNEY</span>
        </motion.button>
      </div>

    </div>
  );
}
