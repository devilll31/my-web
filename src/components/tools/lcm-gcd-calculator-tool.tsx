'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Sigma, CheckCircle, Component } from 'lucide-react';
import { motion } from 'framer-motion';

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

export default function LcmGcdCalculatorTool() {
  const [num1, setNum1] = useState(12);
  const [num2, setNum2] = useState(18);
  const [resultGcd, setResultGcd] = useState(0);
  const [resultLcm, setResultLcm] = useState(0);

  useEffect(() => {
    const a = Math.abs(Math.floor(num1));
    const b = Math.abs(Math.floor(num2));
    if (a > 0 && b > 0) {
      setResultGcd(gcd(a, b));
      setResultLcm(lcm(a, b));
    } else {
      setResultGcd(0);
      setResultLcm(0);
    }
  }, [num1, num2]);
  
  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseInt(e.target.value, 10) || 0);
  };
  
  const guideProps = {
    title: "How to Use the LCM & GCD Calculator",
    steps: [
      { title: "Enter First Number", description: "Input the first integer." },
      { title: "Enter Second Number", description: "Input the second integer." },
      { title: "View Results", description: "The calculator instantly provides the Greatest Common Divisor (GCD) and the Least Common Multiple (LCM)." }
    ],
    features: [
      { icon: Sigma, title: "Greatest Common Divisor", description: "Find the largest positive integer that divides both numbers without a remainder." },
      { icon: Component, title: "Least Common Multiple", description: "Find the smallest positive integer that is a multiple of both numbers." },
      { icon: CheckCircle, title: "Instant Calculation", description: "Get fast and accurate results for these fundamental number theory concepts." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
             <div>
                <Label htmlFor="num1">First Number</Label>
                <Input type="number" id="num1" value={num1} onChange={handleInputChange(setNum1)} />
            </div>
             <div>
                <Label htmlFor="num2">Second Number</Label>
                <Input type="number" id="num2" value={num2} onChange={handleInputChange(setNum2)} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Greatest Common Divisor (GCD)</p>
              <motion.div key={`gcd-${resultGcd}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold text-primary">{resultGcd}</motion.div>
            </div>
             <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Least Common Multiple (LCM)</p>
              <motion.div key={`lcm-${resultLcm}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold text-primary">{resultLcm}</motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
