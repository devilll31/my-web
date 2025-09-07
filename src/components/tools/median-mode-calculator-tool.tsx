
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HowToUseGuide from '@/components/how-to-use-guide';
import { ArrowDownUp, Repeat, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedianModeCalculatorTool() {
  const [inputNumbers, setInputNumbers] = useState('10, 20, 20, 30, 40, 50');
  const [median, setMedian] = useState<number | null>(null);
  const [mode, setMode] = useState<number[]>([]);

  useEffect(() => {
    const numbers = inputNumbers
      .split(/[\s,]+/)
      .filter(n => n.trim() !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (numbers.length > 0) {
      // Median calculation
      numbers.sort((a, b) => a - b);
      const mid = Math.floor(numbers.length / 2);
      const calculatedMedian = numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
      setMedian(calculatedMedian);

      // Mode calculation
      const frequency: { [key: number]: number } = {};
      let maxFreq = 0;
      numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
          maxFreq = frequency[num];
        }
      });
      
      if(maxFreq > 1) {
        const calculatedMode = Object.keys(frequency)
            .map(Number)
            .filter(num => frequency[num] === maxFreq);
        setMode(calculatedMode);
      } else {
        setMode([]);
      }

    } else {
      setMedian(null);
      setMode([]);
    }
  }, [inputNumbers]);

  const guideProps = {
    title: "How to Use the Median & Mode Calculator",
    steps: [
      { title: "Enter Numbers", description: "Input a list of numbers separated by commas or spaces into the text area." },
      { title: "View the Results", description: "The calculator automatically finds the median (the middle value) and the mode (the most frequent value) from your list." },
      { title: "Instant Updates", description: "Modify your list of numbers at any time to see the median and mode results update in real-time." }
    ],
    features: [
      { icon: ArrowDownUp, title: "Find the Median", description: "Quickly calculates the middle value of your dataset, a key measure of central tendency." },
      { icon: Repeat, title: "Identify the Mode", description: "Instantly finds the number that appears most frequently in your list. Handles multiple modes correctly." },
      { icon: Sigma, title: "Real-Time Analysis", description: "No need to click a 'calculate' button. The results update instantly as you type, making data analysis fast and easy." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Median & Mode Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="numbers-input">Enter numbers (separated by comma, space, or new line)</Label>
            <Textarea
              id="numbers-input"
              value={inputNumbers}
              onChange={(e) => setInputNumbers(e.target.value)}
              className="mt-2 min-h-[120px] text-lg"
              placeholder="e.g., 10, 20, 20, 30, 40"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Median</p>
              <motion.div key={`median-${median}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold text-primary">{median !== null ? median : 'N/A'}</motion.div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Mode</p>
              <motion.div key={`mode-${mode.join(',')}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold text-primary">
                {mode.length > 0 ? mode.join(', ') : 'None'}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
