
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { motion, AnimatePresence } from 'framer-motion';

export default function PomodoroTimerTool() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);

  const workMinutes = 25;
  const shortBreakMinutes = 5;
  const longBreakMinutes = 15;

  const resetTimer = useCallback((work = true) => {
    setIsActive(false);
    setIsBreak(!work);
    if (work) {
      setMinutes(workMinutes);
    } else {
      // Every 4 cycles, take a long break
      setMinutes((cycles + 1) % 4 === 0 ? longBreakMinutes : shortBreakMinutes);
    }
    setSeconds(0);
  }, [cycles]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer ended
            if (!isBreak) {
              setCycles(c => c + 1);
            }
            resetTimer(isBreak); // Toggle between work and break
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if(interval) clearInterval(interval);
    }
    return () => { if(interval) clearInterval(interval) };
  }, [isActive, seconds, minutes, isBreak, resetTimer]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleResetClick = () => {
    setCycles(0);
    resetTimer(true);
  }
  
  const totalDuration = (isBreak ? ((cycles + 1) % 4 === 0 ? longBreakMinutes : shortBreakMinutes) : workMinutes) * 60;
  const timeRemaining = minutes * 60 + seconds;
  const progress = ((totalDuration - timeRemaining) / totalDuration) * 100;

  return (
    <>
      <Card className="max-w-md mx-auto bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">
             <AnimatePresence mode="wait">
                <motion.div
                    key={isBreak ? "break" : "work"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    {isBreak ? "Time for a Break" : "Time to Focus"}
                </motion.div>
             </AnimatePresence>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
           <div className="relative h-48 w-48">
              <motion.svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="stroke-current text-muted" strokeWidth="5" fill="transparent" />
                <motion.circle
                  cx="50" cy="50" r="45"
                  className="stroke-current text-primary" strokeWidth="5" fill="transparent"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (progress / 100) * 283}
                  transform="rotate(-90 50 50)"
                  transition={{ duration: 1, ease: "linear" }}
                />
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-mono font-bold">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
           </div>

          <div className="flex gap-4">
            <Button onClick={toggleTimer} size="lg" className="w-32">
              {isActive ? <Pause className="mr-2"/> : <Play className="mr-2"/>}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleResetClick} size="lg" variant="outline">
              <RotateCcw className="mr-2"/>
              Reset
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Completed cycles: {cycles}</p>
        </CardContent>
      </Card>
      {/* How to use Guide can be added here if needed */}
    </>
  );
}
