'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HowToUseGuide from '@/components/how-to-use-guide';
import { ArrowDownUp, Repeat, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';

const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export default function PermutationCombinationCalculatorTool() {
  const [calcType, setCalcType] = useState<'permutation' | 'combination'>('permutation');
  const [totalItems, setTotalItems] = useState(10); // n
  const [chosenItems, setChosenItems] = useState(3); // r
  const [result, setResult] = useState<number | string | null>(null);

  useEffect(() => {
    if (totalItems < chosenItems || totalItems < 0 || chosenItems < 0) {
      setResult('Invalid input');
      return;
    }
    
    try {
      if (calcType === 'permutation') {
        // P(n, r) = n! / (n-r)!
        const res = factorial(totalItems) / factorial(totalItems - chosenItems);
        setResult(res);
      } else { // combination
        // C(n, r) = n! / (r! * (n-r)!)
        const res = factorial(totalItems) / (factorial(chosenItems) * factorial(totalItems - chosenItems));
        setResult(res);
      }
    } catch {
      setResult('Calculation error');
    }

  }, [totalItems, chosenItems, calcType]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseInt(e.target.value, 10) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Permutation & Combination Calculator",
    steps: [
      { title: "Select Type", description: "Choose whether to calculate Permutations (order matters) or Combinations (order does not matter)." },
      { title: "Enter Values", description: "Input the total number of items (n) and the number of items to choose (r)." },
      { title: "View Result", description: "The calculator instantly computes the number of possible permutations or combinations." }
    ],
    features: [
      { icon: ArrowDownUp, title: "Permutations", description: "Calculate the number of ways to arrange a subset of items where the order is important." },
      { icon: Repeat, title: "Combinations", description: "Calculate the number of ways to choose a subset of items where the order is not important." },
      { icon: Sigma, title: "Combinatorics Tool", description: "A fundamental tool for solving problems in statistics, probability, and combinatorics." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <RadioGroup value={calcType} onValueChange={(v: 'permutation' | 'combination') => setCalcType(v)} className="grid grid-cols-2 gap-4">
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="permutation" /> Permutation (nPr)</Label>
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="combination" /> Combination (nCr)</Label>
            </RadioGroup>
            <div>
              <Label htmlFor="total-items">Total number of items (n)</Label>
              <Input type="number" id="total-items" value={totalItems} onChange={handleInputChange(setTotalItems)} min="0" />
            </div>
            <div>
              <Label htmlFor="chosen-items">Number of items to choose (r)</Label>
              <Input type="number" id="chosen-items" value={chosenItems} onChange={handleInputChange(setChosenItems)} min="0" />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Result</div>
            <motion.div key={`${calcType}-${result}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl font-bold text-primary my-2">
              {result}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
