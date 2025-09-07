
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Percent, HelpCircle, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

type CalculationType = 'what_is_x_of_y' | 'x_is_what_percent_of_y' | 'percentage_change';

export default function PercentageCalculatorTool() {
  const [calcType, setCalcType] = useState<CalculationType>('what_is_x_of_y');
  const [value1, setValue1] = useState(10);
  const [value2, setValue2] = useState(50);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    let res: number | null = null;
    switch (calcType) {
      case 'what_is_x_of_y':
        res = (value1 / 100) * value2;
        break;
      case 'x_is_what_percent_of_y':
        if (value2 !== 0) {
          res = (value1 / value2) * 100;
        }
        break;
      case 'percentage_change':
        if (value1 !== 0) {
          res = ((value2 - value1) / value1) * 100;
        }
        break;
    }
    setResult(res);
  }, [calcType, value1, value2]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Percentage Calculator",
    steps: [
      { title: "Select Calculation", description: "Choose the type of percentage calculation you want to perform from the dropdown menu." },
      { title: "Enter Your Numbers", description: "Input the required values into the fields. The labels will guide you." },
      { title: "Get Instant Result", description: "The result is calculated automatically and displayed in the result box." }
    ],
    features: [
      { icon: Calculator, title: "Versatile Modes", description: "Supports three common percentage calculations: finding a percentage of a number, finding what percentage one number is of another, and percentage change." },
      { icon: HelpCircle, title: "Contextual Labels", description: "Input field labels change dynamically based on the selected calculation type, making it easy to understand." },
      { icon: Percent, title: "Real-Time Calculation", description: "Results are updated instantly as you type, providing a fast and seamless experience." }
    ]
  };

  const getLabels = () => {
    switch (calcType) {
      case 'what_is_x_of_y': return { label1: 'What is', label2: 'of', resultLabel: 'Result' };
      case 'x_is_what_percent_of_y': return { label1: '', label2: 'is what percent of', resultLabel: 'Result (%)' };
      case 'percentage_change': return { label1: 'From', label2: 'to', resultLabel: 'Change (%)' };
    }
  }

  const { label1, label2, resultLabel } = getLabels();

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Percentage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Calculation Type</Label>
            <Select value={calcType} onValueChange={(v: CalculationType) => setCalcType(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="what_is_x_of_y">What is X% of Y?</SelectItem>
                <SelectItem value="x_is_what_percent_of_y">X is what percent of Y?</SelectItem>
                <SelectItem value="percentage_change">Percentage change from X to Y</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>{label1} {calcType === 'what_is_x_of_y' && '(%)'}</Label>
              <Input type="number" value={value1} onChange={handleInputChange(setValue1)} />
            </div>
             <div className="space-y-2">
              <Label>{label2}</Label>
              <Input type="number" value={value2} onChange={handleInputChange(setValue2)} />
            </div>
          </div>
          
          <div>
            <Label>{resultLabel}</Label>
            <motion.div key={result} initial={{opacity:0}} animate={{opacity:1}} className="w-full text-2xl font-bold text-primary p-3 bg-primary/10 rounded-md border border-primary/20 mt-2 text-center">
              {result !== null ? result.toFixed(2) + (calcType !== 'what_is_x_of_y' ? '%' : '') : 'N/A'}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
