import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Flame, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScrapbookScreen({ onBack, onNext }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    {
      id: 1,
      title: "PART OF THE GRIND",
      subtitle: "The Legendary Original Photo",
      src: "/assets/images/naksh_grind.jpg",
      tag: "ORIGINAL 🚀",
      rotate: -3
    },
    {
      id: 2,
      title: "CERTIFICATE OF ACHIEVEMENT",
      subtitle: "Hard Work Paid Off",
      src: "/assets/images/naksh_certificate.jpg",
      tag: "ACHIEVEMENT 🏅",
      rotate: 2
    },
    {
      id: 3,
      title: "SPARKLER CELEBRATION",
      subtitle: "Birthday Night Energy",
      src: "/assets/images/naksh_sparkler.jpg",
      tag: "BIRTHDAY VIBE ✨",
      rotate: -1
    }
  ];

  const handlePhotoClick = (p) => {
    setSelectedPhoto(p);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#eb2828] flex flex-col items-center justify-center p-4 sm:p-8 relative select-none font-['Sniglet'] overflow-hidden">
      
      {/* Background Sparkles */}
      <div className="absolute top-[18%] left-[10%] text-white text-3xl pointer-events-none animate-pulse">✦</div>
      <div className="absolute bottom-[20%] right-[10%] text-white text-4xl pointer-events-none animate-pulse">✦</div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <span className="font-['Fredoka'] text-xs uppercase tracking-widest text-white/90 bg-black/30 px-4 py-1.5 rounded-full border border-white/20">
          GIFT #2 • THE REAL VAULT
        </span>
        <h1 className="font-['Fredoka'] text-3xl sm:text-5xl font-bold text-white mt-2 drop-shadow-[2px_2px_0px_rgba(180,20,20,0.6)]">
          Real Photos of Naksh Dahiya
        </h1>
        <p className="font-['Caveat'] text-xl sm:text-2xl text-amber-200 mt-1 font-bold">
          Click any card to inspect the grind! 🔥
        </p>
      </motion.div>

      {/* 3 Real Photo Cards Grid (Filled with animations and crazy physics) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full items-center justify-items-center mb-8">
        {photos.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30, rotate: p.rotate * 2 }}
            animate={{ opacity: 1, y: 0, rotate: p.rotate }}
            transition={{ delay: 0.15 + idx * 0.1, type: 'spring', damping: 12 }}
            whileHover={{ scale: 1.08, rotate: 0, y: -10, zIndex: 30 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePhotoClick(p)}
            className="comic-polaroid bg-white p-3.5 sm:p-4 rounded-xl shadow-2xl w-64 sm:w-72 cursor-pointer relative group"
          >
            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/90 border-dashed border border-yellow-400 shadow-sm flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold text-amber-900 tracking-wider">TAP ME!</span>
            </div>

            {/* Photo */}
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 shadow-inner relative">
              <img
                src={p.src}
                alt={p.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[9px] font-bold text-white tracking-wider">
                {p.tag}
              </div>
            </div>

            {/* Caption */}
            <div className="pt-3 pb-1 text-center">
              <h3 className="font-['Fredoka'] text-base font-bold text-slate-800">
                {p.title}
              </h3>
              <p className="font-['Caveat'] text-base text-slate-500 font-bold mt-0.5">
                {p.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Zoom Modal on Photo Click */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 sm:p-6 rounded-2xl max-w-md w-full shadow-2xl text-slate-900 text-center relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700"
              >
                ✕
              </button>
              <div className="max-h-[60vh] overflow-hidden rounded-xl bg-slate-100 mb-4">
                <img src={selectedPhoto.src} alt={selectedPhoto.title} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-['Fredoka'] text-2xl font-bold text-slate-900">
                {selectedPhoto.title}
              </h3>
              <p className="font-['Caveat'] text-xl text-rose-600 font-bold mt-1">
                "Pure grind, zero excuses!" 🔥
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action Controls */}
      <div className="mt-4 flex items-center gap-4 z-40">
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
          <span>NEXT: CRAZY RANDOM GIFT</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

    </div>
  );
}
