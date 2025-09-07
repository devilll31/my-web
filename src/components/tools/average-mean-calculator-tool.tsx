
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Sigma, Divide, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AverageMeanCalculatorTool() {
  const [inputNumbers, setInputNumbers] = useState('10, 20, 30, 40, 50');
  const [average, setAverage] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const numbers = inputNumbers
      .split(/[\s,]+/)
      .filter(n => n.trim() !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));
      
    setCount(numbers.length);
    if (numbers.length > 0) {
      const totalSum = numbers.reduce((a, b) => a + b, 0);
      setSum(totalSum);
      setAverage(totalSum / numbers.length);
    } else {
      setAverage(null);
      setSum(0);
    }
  }, [inputNumbers]);
  
  const guideProps = {
    title: "How to Use the Average/Mean Calculator",
    steps: [
      { title: "Enter Numbers", description: "Input a list of numbers separated by commas or spaces into the text area." },
      { title: "View the Result", description: "The calculator automatically computes the average (mean), count, and sum of the numbers you entered." },
      { title: "Modify and Repeat", description: "Add, remove, or change numbers in the list to see the results update in real-time." }
    ],
    features: [
      { icon: Sigma, title: "Sum and Count", description: "Along with the average, the tool provides the sum of all numbers and the total count of the numbers entered." },
      { icon: Divide, title: "Real-time Calculation", description: "Get instant results as you type. No need to click a button, making calculations fast and efficient." },
      { icon: CheckCircle, title: "Flexible Input", description: "Accepts numbers separated by commas, spaces, or even new lines, making it easy to paste data from various sources." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Average / Mean Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="numbers-input">Enter numbers (separated by comma, space, or new line)</Label>
            <Textarea
              id="numbers-input"
              value={inputNumbers}
              onChange={(e) => setInputNumbers(e.target.value)}
              className="mt-2 min-h-[120px] text-lg"
              placeholder="e.g., 10, 20, 30.5, 40"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Average (Mean)</p>
              <motion.div key={`avg-${average}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold text-primary">{average !== null ? average.toFixed(2) : 'N/A'}</motion.div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Sum</p>
              <motion.div key={`sum-${sum}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold">{sum}</motion.div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Count</p>
              <motion.div key={`count-${count}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold">{count}</motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
