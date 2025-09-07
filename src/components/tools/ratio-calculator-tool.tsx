'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Ratio, Equal, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export default function RatioCalculatorTool() {
  const [a, setA] = useState(16);
  const [b, setB] = useState(9);
  const [simplifiedA, setSimplifiedA] = useState(16);
  const [simplifiedB, setSimplifiedB] = useState(9);

  useEffect(() => {
    if (a > 0 && b > 0) {
      const divisor = gcd(a, b);
      setSimplifiedA(a / divisor);
      setSimplifiedB(b / divisor);
    } else {
      setSimplifiedA(a);
      setSimplifiedB(b);
    }
  }, [a, b]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Ratio Calculator",
    steps: [
      { title: "Enter First Value", description: "Input the first number of your ratio (A)." },
      { title: "Enter Second Value", description: "Input the second number of your ratio (B)." },
      { title: "View Simplified Ratio", description: "The calculator automatically simplifies the ratio A:B to its simplest form." }
    ],
    features: [
      { icon: Ratio, title: "Simplify Ratios", description: "Quickly reduce any ratio to its simplest form, making it easier to understand and compare." },
      { icon: Equal, title: "Instant Calculation", description: "Results are calculated in real-time as you enter your numbers, providing immediate answers." },
      { icon: CheckCircle, title: "Easy to Use", description: "A clean and straightforward interface for fast and accurate ratio simplification." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Ratio Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-2">
              <Label htmlFor="value-a">Value A</Label>
              <Input type="number" id="value-a" value={a} onChange={handleInputChange(setA)} min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value-b">Value B</Label>
              <Input type="number" id="value-b" value={b} onChange={handleInputChange(setB)} min="0" />
            </div>
          </div>

          <div className="text-center">
            <Label>Simplified Ratio</Label>
            <motion.div key={`${simplifiedA}:${simplifiedB}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold text-primary p-4 bg-primary/10 rounded-lg mt-2">
              {simplifiedA} : {simplifiedB}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
