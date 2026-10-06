import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function MakeAWishScreen({ onNext }) {
  const [isBlown, setIsBlown] = useState(false);
  const [typedText, setTypedText] = useState('');

  const fullText = "happy birthday Naksh";

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);

    // Letter-by-letter reveal
    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        current += fullText.charAt(i);
        setTypedText(current);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 65);

    // Confetti explosion
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#ffffff', '#ffd269', '#60a5fa', '#f472b6']
    });
  };

  // Candle X positions matching the 7 candles across the cake
  const candlePositions = [98, 132, 166, 200, 234, 268, 302];

  return (
    <div className="min-h-screen w-full bg-[#eb2828] flex flex-col items-center justify-center p-3 sm:p-6 relative select-none font-['Sniglet'] overflow-hidden">
      
      {/* Background Sparkles */}
      <div className="absolute top-[22%] left-[14%] text-white text-3xl pointer-events-none animate-pulse">✦</div>
      <div className="absolute top-[20%] right-[16%] text-white text-4xl pointer-events-none animate-pulse" style={{ animationDelay: '0.6s' }}>✦</div>
      <div className="absolute bottom-[20%] left-[16%] text-white text-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.2s' }}>✦</div>

      {/* Title Area: "Make a wish" -> "happy birthday Naksh" */}
      <div className="mb-2 sm:mb-4 text-center min-h-[56px] flex items-center justify-center">
        {!isBlown ? (
          <motion.h1
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-['Fredoka'] text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide flex items-center gap-2 drop-shadow-[2px_2px_0px_rgba(180,20,20,0.6)]"
          >
            <span>Make a wish</span>
            <span className="text-3xl sm:text-4xl">✦</span>
          </motion.h1>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-['Fredoka'] text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide drop-shadow-[2px_2px_0px_rgba(180,20,20,0.6)]"
          >
            {typedText}
            <span className="inline-block w-2.5 h-10 bg-white ml-1 animate-pulse align-middle"></span>
          </motion.div>
        )}
      </div>

      {/* The Unified Cake & Candles (Pixel-perfect exact match to screenshot) */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg my-1 flex justify-center">
        <svg
          viewBox="0 0 400 330"
          className="w-full h-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Flame gradient */}
            <radialGradient id="flameGlow" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
            {/* Candle gradient */}
            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffb3c6" />
              <stop offset="40%" stopColor="#ffe4ea" />
              <stop offset="100%" stopColor="#ff8fab" />
            </linearGradient>
            {/* Sponge gradient */}
            <linearGradient id="spongeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a7e8fb" />
              <stop offset="100%" stopColor="#7ad5f7" />
            </linearGradient>
          </defs>

          {/* ====== 1. CANDLE STICKS (Stuck directly into cake top) ====== */}
          {candlePositions.map((x, i) => (
            <g key={i}>
              {/* Pink candle cylinder */}
              <rect
                x={x - 6}
                y={65}
                width={12}
                height={55}
                rx={3}
                fill="url(#candleGrad)"
                stroke="#f472b6"
                strokeWidth="1"
              />
              {/* Candle wick */}
              <line x1={x} y1={65} x2={x} y2={58} stroke="#475569" strokeWidth="1.5" />

              {/* Flame (Only when not blown) */}
              {!isBlown ? (
                <g>
                  {/* Outer Flame Glow */}
                  <circle cx={x} cy={44} r={12} fill="#ffedd5" opacity="0.35" />
                  {/* Flame Teardrop */}
                  <path
                    d={`M ${x} 28 
                        C ${x - 7} 38, ${x - 6} 50, ${x} 54 
                        C ${x + 6} 50, ${x + 7} 38, ${x} 28 Z`}
                    fill="url(#flameGlow)"
                    className="filter drop-shadow-[0_0_8px_#f59e0b]"
                  >
                    <animate
                      attributeName="transform"
                      type="scale"
                      values="1 1; 1.05 0.95; 0.95 1.05; 1 1"
                      dur={`${0.4 + i * 0.07}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                  {/* Inner Flame Core */}
                  <ellipse cx={x} cy={47} rx={2.5} ry={5} fill="#ffffff" opacity="0.9" />
                </g>
              ) : (
                /* Smoke puffs when blown */
                <g opacity="0.6">
                  <circle cx={x - 2} cy={52} r={3} fill="#ffffff" />
                  <circle cx={x + 2} cy={46} r={4} fill="#ffffff" />
                  <circle cx={x} cy={38} r={5} fill="#ffffff" />
                </g>
              )}
            </g>
          ))}

          {/* ====== 2. TOP TIER CAKE ====== */}
          {/* Top Tier Blue Sponge Body */}
          <path
            d="M 68 115 
               L 68 175 
               C 68 198, 332 198, 332 175 
               L 332 115 Z"
            fill="url(#spongeGrad)"
          />

          {/* Top Tier White Dripping Frosting */}
          <path
            d="M 66 115 
               C 66 94, 334 94, 334 115 
               C 334 130, 322 130, 314 122 
               C 304 112, 294 146, 276 146 
               C 260 146, 252 122, 240 122 
               C 226 122, 218 152, 198 152 
               C 178 152, 170 122, 156 122 
               C 142 122, 134 148, 118 148 
               C 102 148, 92 114, 82 124 
               C 74 132, 66 130, 66 115 Z"
            fill="#ffffff"
            stroke="#f1f5f9"
            strokeWidth="1.5"
          />

          {/* Top Frosting Rim Highlight */}
          <ellipse cx="200" cy="115" rx="130" ry="18" fill="#ffffff" opacity="0.4" />

          {/* ====== 3. BOTTOM TIER CAKE ====== */}
          {/* Bottom Tier Blue Sponge Body */}
          <path
            d="M 36 180 
               L 36 265 
               C 36 298, 364 298, 364 265 
               L 364 180 Z"
            fill="url(#spongeGrad)"
          />

          {/* Bottom Tier White Dripping Frosting */}
          <path
            d="M 34 180 
               C 34 158, 366 158, 366 180 
               C 366 198, 350 198, 340 188 
               C 328 174, 316 218, 294 218 
               C 274 218, 264 188, 248 188 
               C 232 188, 222 225, 198 225 
               C 174 225, 164 188, 148 188 
               C 132 188, 122 220, 100 220 
               C 80 220, 68 178, 56 192 
               C 46 204, 34 200, 34 180 Z"
            fill="#ffffff"
            stroke="#f1f5f9"
            strokeWidth="1.5"
          />

          {/* Bottom Frosting Rim Highlight */}
          <ellipse cx="200" cy="180" rx="162" ry="20" fill="#ffffff" opacity="0.4" />

          {/* ====== 4. THE RED "BLOW" PILL BUTTON (On the bottom tier) ====== */}
          {!isBlown ? (
            <g
              onClick={handleBlow}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              style={{ transformOrigin: '200px 240px' }}
            >
              {/* Outer button shadow */}
              <rect
                x="138"
                y="222"
                width="124"
                height="44"
                rx="22"
                fill="#b91c1c"
                opacity="0.5"
              />
              {/* Button Body */}
              <rect
                x="140"
                y="220"
                width="120"
                height="44"
                rx="22"
                fill="#eb2828"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
              {/* Button Text */}
              <text
                x="200"
                y="248"
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="Fredoka, sans-serif"
                fontWeight="800"
                fontSize="20"
                letterSpacing="0.05em"
              >
                BLOW
              </text>
            </g>
          ) : (
            /* Wish Made Pill when blown */
            <g>
              <rect
                x="130"
                y="222"
                width="140"
                height="40"
                rx="20"
                fill="#059669"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x="200"
                y="248"
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="Fredoka, sans-serif"
                fontWeight="700"
                fontSize="16"
              >
                Wish Made! ✨
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Bottom-Right "NEXT: GIFTS" Black Pill Button (Appears after blowing) */}
      {isBlown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={onNext}
            className="bg-black hover:bg-neutral-800 text-white font-['Fredoka'] font-bold text-base sm:text-lg px-8 sm:px-10 py-2.5 sm:py-3 rounded-full shadow-2xl cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <span>NEXT: GIFTS</span>
            <span>🎁</span>
          </motion.button>
        </motion.div>
      )}

    </div>
  );
}
