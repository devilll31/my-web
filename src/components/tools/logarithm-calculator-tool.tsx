
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { FunctionSquare, CheckCircle, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LogarithmCalculatorTool() {
  const [number, setNumber] = useState<number>(100);
  const [base, setBase] = useState<number>(10);
  const [result, setResult] = useState<number | string | null>(null);

  useEffect(() => {
    if (number > 0 && base > 0 && base !== 1) {
      const res = Math.log(number) / Math.log(base);
      setResult(res);
    } else {
      setResult('Invalid input');
    }
  }, [number, base]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Logarithm Calculator",
    steps: [
      { title: "Enter the Number", description: "Input the number you want to find the logarithm of." },
      { title: "Enter the Base", description: "Input the base of the logarithm (e.g., 10 for common log, 2.718... for natural log)." },
      { title: "View the Result", description: "The calculator instantly computes the logarithm." }
    ],
    features: [
      { icon: FunctionSquare, title: "Flexible Base", description: "Calculate logarithms for any positive base, including common (base 10) and natural (base e) logarithms." },
      { icon: CheckCircle, title: "Instant & Accurate", description: "Get immediate and precise results, essential for scientific, financial, and engineering calculations." },
      { icon: Calculator, title: "Key Mathematical Function", description: "A fundamental tool for working with exponential growth, decibels, pH, and more." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Logarithm Calculator</CardTitle>
           <p className="text-center text-muted-foreground text-lg">log_base (number)</p>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <Label htmlFor="number">Number</Label>
              <Input type="number" id="number" value={number} onChange={handleInputChange(setNumber)} />
            </div>
            <div>
              <Label htmlFor="base">Base</Label>
              <Input type="number" id="base" value={base} onChange={handleInputChange(setBase)} />
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Result</div>
            <motion.div
              key={String(result)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-bold text-primary my-2 break-all"
            >
              {typeof result === 'number' ? result.toFixed(6) : result}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
