import React from 'react';
import { motion } from 'framer-motion';

export default function GiftsScreen({ onSelectGift, openedGifts = [] }) {
  const gifts = [
    { id: 1, target: 'note' },
    { id: 2, target: 'scrapbook' },
    { id: 3, target: 'random' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen w-full bg-[#fbfbfb] flex flex-col items-center justify-center p-4 sm:p-8 select-none font-['Sniglet']"
    >
      
      {/* Title: "Gift for you" in pastel pink */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 sm:mb-12 text-center"
      >
        <h1 className="font-['Fredoka'] text-4xl sm:text-5xl md:text-6xl font-bold text-[#ff708d] tracking-wide">
          Gift for you
        </h1>
      </motion.div>

      {/* Three 3D Pink Gift Boxes in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-4xl w-full items-center justify-items-center mb-10 sm:mb-14">
        {gifts.map((g, index) => {
          const isOpened = openedGifts.includes(g.id);

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.1, type: 'spring', damping: 15 }}
              whileHover={{ scale: 1.08, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectGift(g.target, g.id)}
              className="relative cursor-pointer flex flex-col items-center group"
            >
              {/* 3D Pink Gift Box Image */}
              <div className="w-52 sm:w-56 md:w-64 aspect-square relative flex items-center justify-center">
                <img
                  src="/assets/images/pink_gift_box_3d.jpg"
                  alt={`Gift Box ${g.id}`}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-2xl transition-all duration-300 pointer-events-none"
                />
                
                {/* Subtle soft glow on hover */}
                <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                {/* Opened indicator tag if already visited */}
                {isOpened && (
                  <div className="absolute -top-2 right-4 px-2.5 py-1 rounded-full bg-pink-500 text-white text-[11px] font-['Fredoka'] font-bold shadow-md">
                    Opened ✓
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtitle: "click any gift to open" */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <p className="font-['Fredoka'] text-xl sm:text-2xl text-[#ff708d] font-semibold tracking-wide">
          click any gift to open
        </p>
      </motion.div>

    </motion.div>
  );
}
