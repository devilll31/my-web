
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Scale, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProportionCalculatorTool() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(4);
  const [c, setC] = useState(8);
  const [d, setD] = useState<number | string>('');

  useEffect(() => {
    if (a !== 0 && b !== 0 && c !== 0) {
      const result = (b * c) / a;
      setD(result);
    } else {
      setD('');
    }
  }, [a, b, c]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Proportion Calculator",
    steps: [
      { title: "Enter Three Values", description: "Fill in the first three fields (A, B, and C) of the proportion 'A is to B as C is to D'." },
      { title: "Find the Missing Value", description: "The calculator automatically solves for the missing value (D) in the proportion." },
      { title: "Real-Time Updates", description: "Change any of the input values to see the result update instantly." }
    ],
    features: [
      { icon: Scale, title: "Solve for X", description: "Easily find the unknown value in a proportional relationship, perfect for scaling recipes, map distances, and more." },
      { icon: HelpCircle, title: "Clear Formula", description: "The tool is based on the simple cross-multiplication formula A/B = C/D, making it intuitive to use." },
      { icon: CheckCircle, title: "Instant & Accurate", description: "Get immediate and precise results without the need for manual calculation." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Proportion Calculator</CardTitle>
          <p className="text-center text-muted-foreground">A / B = C / D</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            <div className="space-y-2">
              <Label htmlFor="value-a">Value A</Label>
              <Input type="number" id="value-a" value={a} onChange={handleInputChange(setA)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="value-b">Value B</Label>
              <Input type="number" id="value-b" value={b} onChange={handleInputChange(setB)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="value-c">Value C</Label>
              <Input type="number" id="value-c" value={c} onChange={handleInputChange(setC)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value-d">Value D (Result)</Label>
              <Input id="value-d" value={typeof d === 'number' ? d.toFixed(2) : d} readOnly className="font-bold text-primary bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
