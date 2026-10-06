import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set starting position to 19 seconds as requested
    const startOffset = 19;
    audio.currentTime = startOffset;

    const tryPlay = () => {
      if (audio && audio.paused) {
        if (Math.abs(audio.currentTime - startOffset) > 2 && audio.currentTime < startOffset) {
          audio.currentTime = startOffset;
        }
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Will play on next touch/click interaction
        });
      }
    };

    // 1. Attempt automatic playback on initial load
    tryPlay();

    // 2. Play on first user touch/click/gesture anywhere if browser blocked initial autoplay
    const triggerEvents = ['click', 'touchstart', 'pointerdown', 'keydown'];
    const handleGesture = () => {
      tryPlay();
      triggerEvents.forEach(evt => window.removeEventListener(evt, handleGesture));
    };

    triggerEvents.forEach(evt => window.addEventListener(evt, handleGesture, { once: true }));

    return () => {
      triggerEvents.forEach(evt => window.removeEventListener(evt, handleGesture));
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.currentTime < 19) {
        audio.currentTime = 19;
      }
      audio.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/audio/bdysong.mp3"
        loop
        preload="auto"
      />

      {/* Floating Audio Controller */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-full flex items-center gap-2 text-xs text-white/90 shadow-xl cursor-pointer transition-all hover:scale-105 active:scale-95"
          title="Toggle Birthday Song"
        >
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className={`w-0.5 bg-rose-400 rounded-full transition-all ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1.5'}`}></span>
            <span className={`w-0.5 bg-yellow-300 rounded-full transition-all ${isPlaying ? 'h-2 animate-bounce' : 'h-2.5'}`}></span>
            <span className={`w-0.5 bg-rose-400 rounded-full transition-all ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`}></span>
          </div>
          <span className="font-['Fredoka'] font-bold tracking-wide hidden sm:inline">
            {isPlaying ? "Birthday Song Playing 🎵" : "Play Song 🎵"}
          </span>
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-rose-300" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-white/50" />
          )}
        </button>
      </div>
    </>
  );
}
