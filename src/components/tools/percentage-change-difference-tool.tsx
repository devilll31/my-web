
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Percent, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PercentageChangeDifferenceTool() {
  const [initialValue, setInitialValue] = useState<number>(100);
  const [finalValue, setFinalValue] = useState<number>(150);
  const [change, setChange] = useState<number>(0);
  const [isIncrease, setIsIncrease] = useState<boolean>(true);

  useEffect(() => {
    if (initialValue !== 0) {
      const percentageChange = ((finalValue - initialValue) / initialValue) * 100;
      setChange(percentageChange);
      setIsIncrease(percentageChange >= 0);
    } else {
      setChange(0);
    }
  }, [initialValue, finalValue]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Percentage Change Calculator",
    steps: [
      { title: "Enter Initial Value", description: "Input the starting value or 'old' number." },
      { title: "Enter Final Value", description: "Input the ending value or 'new' number." },
      { title: "View the Change", description: "The calculator instantly shows the percentage increase or decrease." }
    ],
    features: [
      { icon: TrendingUp, title: "Track Growth", description: "Easily calculate percentage increases for investments, sales figures, or any other metric." },
      { icon: TrendingDown, title: "Monitor Reduction", description: "Quickly determine percentage decreases, useful for tracking discounts, weight loss, or performance changes." },
      { icon: Percent, title: "Clear Indication", description: "The result clearly indicates whether the change was an increase or decrease, along with the precise percentage." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Percentage Change Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <Label htmlFor="initial-value">Initial Value</Label>
              <Input type="number" id="initial-value" value={initialValue} onChange={handleInputChange(setInitialValue)} />
            </div>
            <div>
              <Label htmlFor="final-value">Final Value</Label>
              <Input type="number" id="final-value" value={finalValue} onChange={handleInputChange(setFinalValue)} />
            </div>
          </div>
          <div className={`bg-primary/5 rounded-lg p-6 border border-primary/20 text-center ${isIncrease ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
            <div className="text-lg text-muted-foreground">Percentage Change</div>
            <motion.div
              key={change}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-6xl font-bold my-2 ${isIncrease ? 'text-green-600' : 'text-red-600'}`}
            >
              {isIncrease ? <TrendingUp className="inline-block h-12 w-12 mr-2"/> : <TrendingDown className="inline-block h-12 w-12 mr-2"/>}
              {Math.abs(change).toFixed(2)}%
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
