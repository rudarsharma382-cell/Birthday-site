import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt auto-play on first user interaction anywhere on the screen
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Browser requires direct user click
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/audio/bgm.mp3" loop preload="auto" />
      <div className="fixed top-5 right-5 z-50">
        <button
          onClick={toggleMusic}
          className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-2.5 text-xs text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg group hover:scale-105 active:scale-95"
          title="Toggle Background Music"
        >
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className={`w-0.5 bg-pink-400 rounded-full transition-all ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1.5'}`}></span>
            <span className={`w-0.5 bg-pink-300 rounded-full transition-all ${isPlaying ? 'h-2 animate-bounce' : 'h-2.5'}`}></span>
            <span className={`w-0.5 bg-pink-400 rounded-full transition-all ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`}></span>
          </div>
          <span className="font-medium tracking-wide hidden sm:inline">
            {isPlaying ? "Can't Help Falling in Love" : "Play BGM"}
          </span>
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-pink-300 group-hover:rotate-12 transition-transform" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/60" />
          )}
        </button>
      </div>
    </>
  );
}
