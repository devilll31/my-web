'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { ShieldCheck, ShieldOff, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i = i + 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export default function PrimeNumberCheckerTool() {
  const [number, setNumber] = useState(17);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    const num = Math.floor(number);
    setResult(isPrime(num));
  }, [number]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(e.target.value, 10) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Prime Number Checker",
    steps: [
      { title: "Enter a Number", description: "Input any positive integer into the field." },
      { title: "View the Result", description: "The tool will instantly tell you if the number is prime or not." },
      { title: "Test Another", description: "Change the number to check other integers." }
    ],
    features: [
      { icon: ShieldCheck, title: "Instant Verification", description: "Quickly determine if a number can only be divided by 1 and itself." },
      { icon: CheckCircle, title: "Efficient Algorithm", description: "Uses an optimized algorithm to check for primality quickly, even for larger numbers." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <Label htmlFor="number-input" className="text-lg">Enter a number</Label>
            <Input type="number" id="number-input" value={number} onChange={handleInputChange} className="h-12 text-xl" />
          </div>
          
          <motion.div
            key={String(result)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center"
          >
            {result ? (
              <>
                <ShieldCheck className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-2xl font-bold">The number <span className="text-primary">{number}</span> is Prime</p>
              </>
            ) : (
               <>
                <ShieldOff className="w-16 h-16 text-red-500 mb-4" />
                <p className="text-2xl font-bold">The number <span className="text-primary">{number}</span> is Not Prime</p>
              </>
            )}
          </motion.div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
