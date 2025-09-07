'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Component, Sigma, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const getPrimeFactors = (num: number): number[] => {
  const factors: number[] = [];
  let divisor = 2;
  let n = Math.abs(Math.floor(num));

  if (n <= 1) return [];

  while (n >= 2) {
    if (n % divisor === 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
};

export default function FactorizationTool() {
  const [number, setNumber] = useState(360);
  const [factors, setFactors] = useState<number[]>([]);

  useEffect(() => {
    setFactors(getPrimeFactors(number));
  }, [number]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(e.target.value, 10) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Factorization Tool",
    steps: [
      { title: "Enter an Integer", description: "Input any positive integer you want to factorize." },
      { title: "View Prime Factors", description: "The calculator instantly breaks down the number into its prime factors." },
      { title: "Analyze the Result", description: "See the fundamental building blocks of your number." }
    ],
    features: [
      { icon: Component, title: "Prime Decomposition", description: "Breaks down any integer into its set of prime factors." },
      { icon: CheckCircle, title: "Instant & Accurate", description: "Get immediate and correct prime factorization for your numbers." },
      { icon: Sigma, title: "Fundamental Math Tool", description: "A crucial tool for number theory, algebra, and cryptography." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <Label htmlFor="number-input" className="text-lg">Enter an integer to factorize</Label>
            <Input type="number" id="number-input" value={number} onChange={handleInputChange} className="h-12 text-xl" />
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Prime Factors</div>
            <motion.div
              key={factors.join(',')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-bold text-primary my-2 break-words"
            >
              {factors.length > 0 ? factors.join(' × ') : 'None'}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
