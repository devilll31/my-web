
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Sigma, CheckCircle, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

const countSigFigs = (numStr: string): number => {
  if (!numStr.includes('.')) {
    return numStr.replace(/^0+|0+$/g, '').length;
  }
  return numStr.replace('.', '').replace(/^0+/, '').length;
};

export default function SignificantFiguresCalculatorTool() {
  const [numberInput, setNumberInput] = useState('0.0500');
  const [sigFigs, setSigFigs] = useState(0);

  useEffect(() => {
    setSigFigs(countSigFigs(numberInput));
  }, [numberInput]);

  const guideProps = {
    title: "How to Use the Significant Figures Calculator",
    steps: [
      { title: "Enter a Number", description: "Input any number, including decimals, into the field." },
      { title: "View the Count", description: "The calculator instantly determines and displays the number of significant figures." },
      { title: "Understand Precision", description: "Use this tool to understand the rules of significant digits in scientific and mathematical contexts." }
    ],
    features: [
      { icon: FlaskConical, title: "Scientific Accuracy", description: "Correctly identifies significant figures based on standard scientific rules, including trailing and leading zeros." },
      { icon: CheckCircle, title: "Instant Feedback", description: "Get immediate results as you type, making it a quick and reliable tool for students and professionals." },
      { icon: Sigma, title: "Precision Measurement", description: "Essential for chemistry, physics, and engineering to maintain the correct level of precision in calculations." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <Label htmlFor="number-input" className="text-lg">Enter a number</Label>
            <Input
              type="text"
              id="number-input"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              className="h-12 text-xl"
              placeholder="e.g., 1.230"
            />
          </div>
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Number of Significant Figures</div>
            <motion.div
              key={sigFigs}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-6xl font-bold text-primary my-2"
            >
              {sigFigs}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
