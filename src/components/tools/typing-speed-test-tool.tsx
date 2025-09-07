'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Never underestimate the power of a good book.",
  "The early bird catches the worm.",
  "Technology has revolutionized the way we live and work.",
  "To be or not to be, that is the question."
];

export default function TypingSpeedTestTool() {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<{ wpm: number, accuracy: number } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    setUserInput('');
    setTimer(0);
    setIsActive(true);
    setResults(null);
    if(intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };
  
  useEffect(() => {
    if(isActive && userInput === text){
        setIsActive(false);
        if(intervalRef.current) clearInterval(intervalRef.current);
        const words = text.split(' ').length;
        const wpm = Math.round((words / timer) * 60);

        let correctChars = 0;
        userInput.split('').forEach((char, index) => {
            if(char === text[index]) correctChars++;
        });
        const accuracy = Math.round((correctChars / text.length) * 100);
        setResults({ wpm, accuracy });
    }
  }, [userInput, text, isActive, timer]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader><CardTitle className="text-center">Typing Speed Test</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg text-lg font-mono tracking-wider">
          {text.split('').map((char, index) => {
            let color = 'text-muted-foreground';
            if (index < userInput.length) {
              color = char === userInput[index] ? 'text-green-500' : 'text-red-500';
            }
            return <span key={index} className={color}>{char}</span>
          })}
        </div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={!isActive}
          className="w-full p-2 border rounded-lg font-mono text-lg"
          rows={3}
          placeholder={!isActive ? "Click Start to begin..." : ""}
        />
        <div className="flex justify-between items-center">
            <Button onClick={startTest}>
                <RefreshCw className="mr-2"/>
                {results ? 'Try Again' : 'Start'}
            </Button>
            <div className="text-2xl font-bold">{timer}s</div>
        </div>
        {results && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-2 gap-4 text-center pt-4 border-t">
                <div>
                    <p className="text-muted-foreground">Words per Minute</p>
                    <p className="text-4xl font-bold text-primary">{results.wpm}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Accuracy</p>
                    <p className="text-4xl font-bold text-primary">{results.accuracy}%</p>
                </div>
            </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
