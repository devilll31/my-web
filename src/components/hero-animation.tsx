'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const meanings = [
  "Digital Tools",
  "Data Tools",
  "Document Tools",
  "Daily Tools"
];

const HeroAnimation = () => {
  const [phase, setPhase] = useState<'typing' | 'flipping'>('typing');
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [meaningIndex, setMeaningIndex] = useState(0);

  const fullWelcomeText = "Welcome to D2ools";
  const typingPhaseDuration = 6000;
  const flippingPhaseDuration = 8000;

  // Phase Controller: Switches between Typing (6s) and Flipping (8s)
  useEffect(() => {
    const runLoop = () => {
      setPhase('typing');
      setDisplayText('');
      setIsDeleting(false);
      
      setTimeout(() => {
        setPhase('flipping');
        setMeaningIndex(0);
      }, typingPhaseDuration);
    };

    runLoop();
    const interval = setInterval(runLoop, typingPhaseDuration + flippingPhaseDuration);

    return () => clearInterval(interval);
  }, []);

  // Typing Logic: Handles character-by-character typing and erasing
  useEffect(() => {
    if (phase !== 'typing') return;

    let timer: NodeJS.Timeout;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 1200;

    const handleType = () => {
      if (!isDeleting) {
        if (displayText.length < fullWelcomeText.length) {
          setDisplayText(fullWelcomeText.substring(0, displayText.length + 1));
          timer = setTimeout(handleType, typeSpeed);
        } else {
          // Pause at full text before starting to delete
          timer = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullWelcomeText.substring(0, displayText.length - 1));
          timer = setTimeout(handleType, deleteSpeed);
        }
      }
    };

    timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phase]);

  // Flipping Logic: Cycles meanings every 2 seconds
  useEffect(() => {
    if (phase !== 'flipping') return;

    const interval = setInterval(() => {
      setMeaningIndex((prev) => (prev + 1) % meanings.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="relative h-32 sm:h-40 md:h-48 flex items-center justify-center w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'typing' ? (
          <motion.div
            key="typing-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline gradient-text">
              {displayText}
              <span 
                className="inline-block w-[3px] ml-1 bg-primary animate-pulse align-middle opacity-70" 
                style={{ height: '0.2em', marginBottom: '0.1em' }}
              ></span>
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="flipping-phase"
            initial={{ opacity: 0, y: 20, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-2xl px-4"
            style={{ perspective: '1000px' }}
          >
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-1 shadow-[0_20px_50px_rgba(85,139,207,0.15)] overflow-hidden border border-primary/20">
              <div className="bg-background/90 backdrop-blur-xl rounded-[1.4rem] py-8 md:py-12 px-6 md:px-12 text-center flex flex-col items-center justify-center gap-4">
                <span className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.3em] font-black opacity-60">
                  D2ools means
                </span>
                <div className="h-16 md:h-24 flex items-center justify-center overflow-hidden w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={meanings[meaningIndex]}
                      initial={{ rotateX: -90, opacity: 0, y: 20 }}
                      animate={{ rotateX: 0, opacity: 1, y: 0 }}
                      exit={{ rotateX: 90, opacity: 0, y: -20 }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      className="text-3xl sm:text-4xl md:text-6xl font-extrabold gradient-text whitespace-nowrap"
                    >
                      &quot;{meanings[meaningIndex]}&quot;
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              {/* Subtle background glow effect */}
              <div className="absolute -inset-24 bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl pointer-events-none opacity-50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroAnimation;
