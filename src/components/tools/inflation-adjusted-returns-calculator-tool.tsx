
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { TrendingDown, TrendingUp, Wallet, CheckCircle, SlidersHorizontal } from 'lucide-react';

export default function InflationAdjustedReturnsCalculatorTool() {
  const [nominalReturn, setNominalReturn] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [realReturn, setRealReturn] = useState<number>(0);

  useEffect(() => {
    const calculatedRealReturn = (((1 + nominalReturn / 100) / (1 + inflationRate / 100)) - 1) * 100;
    setRealReturn(calculatedRealReturn);
  }, [nominalReturn, inflationRate]);

  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, Math.min(max, value === '' ? 0 : parseFloat(value))));
  };

  const guideProps = {
    title: "How to Use the Inflation-Adjusted Returns Calculator",
    steps: [
      { title: "Enter Nominal Return", description: "Input the stated return rate of your investment (e.g., 12%)." },
      { title: "Enter Inflation Rate", description: "Provide the average annual inflation rate for the period (e.g., 6%)." },
      { title: "View Real Return", description: "The calculator shows your actual return after accounting for inflation." }
    ],
    features: [
      { icon: Wallet, title: "True Purchasing Power", description: "Understand the real growth of your investment by seeing how it performs against inflation." },
      { icon: SlidersHorizontal, title: "Scenario Planning", description: "Adjust the return and inflation rates to see how different economic conditions can affect your earnings." },
      { icon: CheckCircle, title: "Informed Decisions", description: "Make better investment choices by focusing on real returns rather than just nominal figures." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="nominalReturn" className="text-lg font-medium">Nominal Return Rate (%)</Label>
                <div className="w-40"><Input type="number" id="nominalReturn" value={nominalReturn} onChange={handleInputChange(setNominalReturn, -50, 50)} step="0.1" /></div>
              </div>
              <Slider min={-50} max={50} step={0.1} value={[nominalReturn]} onValueChange={(val) => setNominalReturn(val[0])} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="inflationRate" className="text-lg font-medium">Inflation Rate (%)</Label>
                <div className="w-40"><Input type="number" id="inflationRate" value={inflationRate} onChange={handleInputChange(setInflationRate, -10, 20)} step="0.1" /></div>
              </div>
              <Slider min={-10} max={20} step={0.1} value={[inflationRate]} onValueChange={(val) => setInflationRate(val[0])} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
            <div className="text-center w-full">
                <p className="text-lg text-muted-foreground">Real Return Rate</p>
                <AnimatePresence mode="wait">
                    <motion.p 
                    key={realReturn}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                    >
                    {realReturn.toFixed(2)}%
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
