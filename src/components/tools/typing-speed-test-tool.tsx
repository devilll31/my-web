'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import HowToUseGuide from '@/components/how-to-use-guide';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Never underestimate the power of a good book.",
  "The early bird catches the worm.",
  "Technology has revolutionized the way we live and work.",
  "To be or not to be, that is the question."
];

export default function TypingSpeedTestTool() {
  const [textToType, setTextToType] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<{ wpm: number, accuracy: number } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const startTest = useCallback(() => {
    setTextToType(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    setUserInput('');
    setTimer(0);
    setIsActive(true);
    setResults(null);
    if(intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    inputRef.current?.focus();
  }, []);
  
  useEffect(() => {
    if(isActive && userInput.length === textToType.length){
        setIsActive(false);
        if(intervalRef.current) clearInterval(intervalRef.current);
        
        const words = textToType.split(' ').length;
        const wpm = timer > 0 ? Math.round((words / timer) * 60) : 0;

        let correctChars = 0;
        userInput.split('').forEach((char, index) => {
            if(char === textToType[index]) correctChars++;
        });
        const accuracy = textToType.length > 0 ? Math.round((correctChars / textToType.length) * 100) : 0;
        setResults({ wpm, accuracy });
    }
  }, [userInput, textToType, isActive, timer]);
  
  useEffect(() => {
      startTest(); // Start test on initial load
      return () => {
          if(intervalRef.current) clearInterval(intervalRef.current);
      }
  }, [startTest]);

  const guideProps = {
    title: "How to Use the Typing Speed Test",
    steps: [
      { title: "Start Typing", description: "The test starts automatically. Begin typing the sample text into the text area." },
      { title: "Complete the Text", description: "Type the entire sample text. The timer will stop once you've typed the last character." },
      { title: "See Your Results", description: "Your Words Per Minute (WPM) and accuracy will be displayed. Click 'Try Again' for a new test." }
    ],
    features: [
      { icon: Target, title: "Measure WPM", description: "Accurately measures your typing speed in Words Per Minute." },
      { icon: CheckCircle, title: "Check Accuracy", description: "Calculates your typing accuracy to help you identify and reduce errors." },
      { icon: RefreshCw, title: "Practice & Improve", description: "Use the tool to practice regularly and track your improvement over time." }
    ]
  };

  return (
    <>
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader><CardTitle className="text-center">Typing Speed Test</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg text-lg font-mono tracking-wider">
          {textToType.split('').map((char, index) => {
            let color = 'text-muted-foreground';
            if (index < userInput.length) {
              color = char === userInput[index] ? 'text-green-500' : 'text-red-500 line-through';
            }
            return <span key={index} className={color}>{char}</span>
          })}
        </div>
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={(e) => {
              if(!isActive && !results) startTest();
              if(isActive) setUserInput(e.target.value);
          }}
          disabled={!isActive}
          className="w-full p-2 border rounded-lg font-mono text-lg"
          rows={3}
          placeholder={!isActive ? "Click Start to begin..." : ""}
        />
        <div className="flex justify-between items-center">
            <Button onClick={startTest}>
                <RefreshCw className="mr-2"/>
                {results ? 'Try Again' : 'Restart'}
            </Button>
            <div className="text-2xl font-bold">{timer}s</div>
        </div>
        {results && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-2 gap-4 text-center pt-4 border-t">
                <div>
                    <p className="text-muted-foreground">Words per Minute (WPM)</p>
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
    <HowToUseGuide {...guideProps} />
    </>
  );
}
