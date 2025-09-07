
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Sigma, BarChart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StandardDeviationCalculatorTool() {
  const [inputNumbers, setInputNumbers] = useState('10, 12, 23, 23, 16, 23, 21, 16');
  const [stdDev, setStdDev] = useState<number | null>(null);
  const [mean, setMean] = useState<number | null>(null);

  useEffect(() => {
    const numbers = inputNumbers
      .split(/[\s,]+/)
      .filter(n => n.trim() !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (numbers.length > 1) {
      const n = numbers.length;
      const calculatedMean = numbers.reduce((a, b) => a + b) / n;
      setMean(calculatedMean);

      const variance = numbers.reduce((acc, val) => acc + Math.pow(val - calculatedMean, 2), 0) / (n - 1); // Sample standard deviation
      setStdDev(Math.sqrt(variance));
    } else {
      setStdDev(null);
      setMean(null);
    }
  }, [inputNumbers]);

  const guideProps = {
    title: "How to Use the Standard Deviation Calculator",
    steps: [
      { title: "Enter Your Data", description: "Input a list of numbers, separated by commas or spaces, into the text area." },
      { title: "View the Result", description: "The calculator instantly computes the standard deviation and the mean (average) of your dataset." },
      { title: "Analyze Your Data", description: "Use the standard deviation to understand the variability or dispersion of your data points." }
    ],
    features: [
      { icon: BarChart, title: "Measure of Spread", description: "Calculate the sample standard deviation, a key statistical measure of how spread out the numbers in a dataset are." },
      { icon: Sigma, title: "Includes Mean", description: "The tool also calculates the mean (average) of your data, which is essential for the standard deviation calculation." },
      { icon: CheckCircle, title: "Real-Time Calculation", description: "Results are updated automatically as you type, providing quick and efficient statistical analysis." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Standard Deviation Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="numbers-input">Enter numbers (separated by comma, space, or new line)</Label>
            <Textarea
              id="numbers-input"
              value={inputNumbers}
              onChange={(e) => setInputNumbers(e.target.value)}
              className="mt-2 min-h-[120px] text-lg"
              placeholder="e.g., 10, 12, 23, 23, 16"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Standard Deviation (Sample)</p>
              <motion.div key={`stddev-${stdDev}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold text-primary">{stdDev !== null ? stdDev.toFixed(4) : 'N/A'}</motion.div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Mean</p>
              <motion.div key={`mean-${mean}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold">{mean !== null ? mean.toFixed(2) : 'N/A'}</motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
