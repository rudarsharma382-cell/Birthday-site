import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LockScreen from './components/LockScreen';
import WelcomeScreen from './components/WelcomeScreen';
import MakeAWishScreen from './components/MakeAWishScreen';
import GiftsScreen from './components/GiftsScreen';
import BroNoteScreen from './components/BroNoteScreen';
import ScrapbookScreen from './components/ScrapbookScreen';
import RandomGiftScreen from './components/RandomGiftScreen';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('lock');
  const [openedGifts, setOpenedGifts] = useState([]);

  // Flow handlers
  const handleUnlock = () => {
    setCurrentScreen('welcome');
  };

  const handleWelcomeNext = () => {
    // 1. A cake-blowing part right after welcome
    setCurrentScreen('wish');
  };

  const handleWishNext = () => {
    // 2. Showing three gift boxes after blowing the cake
    setCurrentScreen('gifts');
  };

  const handleSelectGift = (targetScreen, giftId) => {
    if (!openedGifts.includes(giftId)) {
      setOpenedGifts([...openedGifts, giftId]);
    }
    setCurrentScreen(targetScreen);
  };

  const handleReturnToGifts = () => {
    setCurrentScreen('gifts');
  };

  const handleGoToScrapbook = () => {
    if (!openedGifts.includes(2)) setOpenedGifts((prev) => [...prev, 2]);
    setCurrentScreen('scrapbook');
  };

  const handleGoToRandom = () => {
    if (!openedGifts.includes(3)) setOpenedGifts((prev) => [...prev, 3]);
    setCurrentScreen('random');
  };

  const handleRestartJourney = () => {
    setCurrentScreen('lock');
    setOpenedGifts([]);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-400 relative overflow-hidden select-none ${
        currentScreen === 'welcome' || currentScreen === 'gifts' ? 'bg-[#fbfbfb]' : 'bg-[#eb2828]'
      }`}
    >
      {/* Background Music Player */}
      <MusicPlayer />

      {/* Screen Transitions with AnimatePresence */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentScreen === 'lock' && (
            <LockScreen key="lock" onUnlock={handleUnlock} />
          )}

          {currentScreen === 'welcome' && (
            <WelcomeScreen key="welcome" onNext={handleWelcomeNext} />
          )}

          {currentScreen === 'wish' && (
            <MakeAWishScreen key="wish" onNext={handleWishNext} />
          )}

          {currentScreen === 'gifts' && (
            <GiftsScreen
              key="gifts"
              onSelectGift={handleSelectGift}
              openedGifts={openedGifts}
            />
          )}

          {currentScreen === 'note' && (
            <BroNoteScreen
              key="note"
              onBack={handleReturnToGifts}
              onNext={handleGoToScrapbook}
            />
          )}

          {currentScreen === 'scrapbook' && (
            <ScrapbookScreen
              key="scrapbook"
              onBack={handleReturnToGifts}
              onNext={handleGoToRandom}
            />
          )}

          {currentScreen === 'random' && (
            <RandomGiftScreen
              key="random"
              onBack={handleReturnToGifts}
              onRestart={handleRestartJourney}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
