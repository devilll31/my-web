
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { TrendingUp, Calendar, Target, CheckCircle, BarChart } from 'lucide-react';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function CagrCalculatorTool() {
  const [initialValue, setInitialValue] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(250000);
  const [years, setYears] = useState<number>(5);
  const [cagr, setCagr] = useState<number>(0);

  useEffect(() => {
    if (initialValue > 0 && finalValue > 0 && years > 0) {
      const result = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
      setCagr(result);
    } else {
      setCagr(0);
    }
  }, [initialValue, finalValue, years]);

  const handleInputChange = (setter: (value: number) => void, min: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, value === '' ? 0 : parseFloat(value)));
  };

  const guideProps = {
    title: "How to Use the CAGR Calculator",
    steps: [
      { title: "Enter Initial Value", description: "Input the starting value of your investment." },
      { title: "Enter Final Value", description: "Provide the ending value of the investment at the end of the period." },
      { title: "Set Time Period", description: "Specify the total duration of the investment in years to see the growth rate." }
    ],
    features: [
      { icon: TrendingUp, title: "Measure Growth", description: "Calculate the Compound Annual Growth Rate to understand the mean annual growth of your investment." },
      { icon: Target, title: "Investment Analysis", description: "CAGR helps in comparing the performance of different investments over the same period." },
      { icon: BarChart, title: "Clear Results", description: "Instantly get the CAGR percentage, providing a clear metric for your investment's performance." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
                <Label htmlFor="initialValue" className="text-lg font-medium">Initial Investment Value</Label>
                <Input type="number" id="initialValue" value={initialValue} onChange={handleInputChange(setInitialValue, 0)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="finalValue" className="text-lg font-medium">Final Investment Value</Label>
              <Input type="number" id="finalValue" value={finalValue} onChange={handleInputChange(setFinalValue, 0)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="years" className="text-lg font-medium">Time Period (Years)</Label>
              <Input type="number" id="years" value={years} onChange={handleInputChange(setYears, 1)} className="mt-2" />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
            <div className="text-center w-full">
                <p className="text-lg text-muted-foreground">Compound Annual Growth Rate</p>
                <AnimatePresence mode="wait">
                    <motion.p 
                    key={cagr}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                    >
                    {cagr.toFixed(2)}%
                    </motion.p>
                </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
