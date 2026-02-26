'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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

  // Phase Controller
  useEffect(() => {
    const typingDuration = 6000;
    const flippingDuration = 8000;

    const runLoop = () => {
      setPhase('typing');
      setDisplayText('');
      setIsDeleting(false);
      
      setTimeout(() => {
        setPhase('flipping');
        setMeaningIndex(0);
      }, typingDuration);
    };

    runLoop();
    const interval = setInterval(runLoop, typingDuration + flippingDuration);

    return () => clearInterval(interval);
  }, []);

  // Typing Logic
  useEffect(() => {
    if (phase !== 'typing') return;

    let timer: NodeJS.Timeout;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 1000;

    const handleType = () => {
      if (!isDeleting) {
        if (displayText.length < fullWelcomeText.length) {
          setDisplayText(fullWelcomeText.substring(0, displayText.length + 1));
          timer = setTimeout(handleType, typeSpeed);
        } else {
          timer = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullWelcomeText.substring(0, displayText.length - 1));
          timer = setTimeout(handleType, deleteSpeed);
        } else {
          // Stay empty until phase switches
        }
      }
    };

    timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phase]);

  // Flipping Logic
  useEffect(() => {
    if (phase !== 'flipping') return;

    const interval = setInterval(() => {
      setMeaningIndex((prev) => (prev + 1) % meanings.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="relative h-24 sm:h-32 md:h-40 flex items-center justify-center w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'typing' ? (
          <motion.div
            key="typing-phase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline gradient-text">
              {displayText}
              <span className="inline-block w-[2px] h-[0.6em] ml-1 bg-primary animate-pulse align-middle opacity-70" style={{ height: '40%' }}></span>
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="flipping-phase"
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotateX: 90 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="perspective-1000 w-full max-w-2xl px-4"
          >
            <div className="relative bg-gradient-to-r from-primary to-accent rounded-2xl p-1 shadow-2xl overflow-hidden group">
              <div className="bg-background/95 backdrop-blur-sm rounded-xl py-6 md:py-8 px-4 md:px-10 text-center flex flex-col items-center justify-center gap-2">
                <span className="text-muted-foreground text-sm md:text-base uppercase tracking-widest font-semibold">D2ools means</span>
                <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={meanings[meaningIndex]}
                      initial={{ rotateX: -90, opacity: 0, y: 20 }}
                      animate={{ rotateX: 0, opacity: 1, y: 0 }}
                      exit={{ rotateX: 90, opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text whitespace-nowrap"
                    >
                      &quot;{meanings[meaningIndex]}&quot;
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroAnimation;
