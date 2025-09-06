
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Landmark, FileText, IndianRupee, CheckCircle, SlidersHorizontal, BarChart, Percent } from 'lucide-react';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function IncomeTaxCalculatorTool() {
  const [income, setIncome] = useState<number>(1200000);
  const [deductions, setDeductions] = useState<number>(150000); // 80C
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  
  const [tax, setTax] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);

  useEffect(() => {
    let taxableIncome = income;
    let calculatedTax = 0;

    if (regime === 'old') {
      taxableIncome -= deductions;
      taxableIncome -= 50000; // Standard Deduction

      if (taxableIncome > 1000000) {
        calculatedTax = 112500 + (taxableIncome - 1000000) * 0.30;
      } else if (taxableIncome > 500000) {
        calculatedTax = 12500 + (taxableIncome - 500000) * 0.20;
      } else if (taxableIncome > 250000) {
        calculatedTax = (taxableIncome - 250000) * 0.05;
      }
    } else { // New Regime
      taxableIncome -= 50000; // Standard Deduction
      if (taxableIncome > 1500000) {
        calculatedTax = 150000 + (taxableIncome - 1500000) * 0.30;
      } else if (taxableIncome > 1200000) {
        calculatedTax = 90000 + (taxableIncome - 1200000) * 0.20;
      } else if (taxableIncome > 900000) {
        calculatedTax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome > 600000) {
        calculatedTax = 15000 + (taxableIncome - 600000) * 0.10;
      } else if (taxableIncome > 300000) {
        calculatedTax = (taxableIncome - 300000) * 0.05;
      }
    }
    
    // Tax rebate under sec 87A
    if(taxableIncome <= (regime === 'new' ? 700000 : 500000)) {
        calculatedTax = 0;
    }

    if(calculatedTax > 0){
        // Add 4% cess
        calculatedTax += calculatedTax * 0.04;
    }

    setTax(Math.max(0, calculatedTax));
    if (income > 0) {
        setEffectiveRate((Math.max(0, calculatedTax) / income) * 100);
    } else {
        setEffectiveRate(0);
    }

  }, [income, deductions, regime]);
  
  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, Math.min(max, value === '' ? 0 : parseFloat(value))));
  };

  const guideProps = {
    title: "How to Use the Income Tax Calculator",
    steps: [
      { title: "Enter Your Income", description: "Input your gross annual salary." },
      { title: "Add Deductions", description: "If using the old regime, enter your total tax-deductible investments and expenses." },
      { title: "Choose Regime", description: "Select between the Old and New tax regimes to see your final tax liability." }
    ],
    features: [
      { icon: FileText, title: "Dual Regime Comparison", description: "Effortlessly switch between the Old and New tax regimes to find out which is more beneficial for you." },
      { icon: SlidersHorizontal, title: "Dynamic Calculation", description: "Adjust your income and deductions to instantly see how they impact your tax payable." },
      { icon: Percent, title: "Effective Tax Rate", description: "Understand your actual tax outflow as a percentage of your total income for better financial planning." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-center">
                <RadioGroup defaultValue={regime} onValueChange={(val: 'old'|'new') => setRegime(val)} className="grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="new" id="new" className="peer sr-only" />
                        <Label htmlFor="new" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">New Regime</Label>
                    </div>
                    <div>
                        <RadioGroupItem value="old" id="old" className="peer sr-only" />
                        <Label htmlFor="old" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Old Regime</Label>
                    </div>
                </RadioGroup>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="income" className="text-lg font-medium">Gross Annual Income</Label>
                <div className="w-48"><Input type="number" id="income" value={income} onChange={handleInputChange(setIncome, 0, 50000000)} /></div>
              </div>
              <Slider min={0} max={50000000} step={10000} value={[income]} onValueChange={(val) => setIncome(val[0])} />
            </div>
            <AnimatePresence>
            {regime === 'old' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="deductions" className="text-lg font-medium">Total Deductions (80C, etc.)</Label>
                        <div className="w-48"><Input type="number" id="deductions" value={deductions} onChange={handleInputChange(setDeductions, 0, 1000000)} /></div>
                    </div>
                    <Slider min={0} max={1000000} step={5000} value={[deductions]} onValueChange={(val) => setDeductions(val[0])} />
                </motion.div>
            )}
            </AnimatePresence>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
            <div className="text-center w-full">
                <p className="text-lg text-muted-foreground">Total Tax Payable</p>
                <AnimatePresence mode="wait">
                    <motion.p 
                    key={tax}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                    >
                    {formatCurrency(tax)}
                    </motion.p>
                </AnimatePresence>
                <p className="text-muted-foreground">Effective Tax Rate: <strong className="text-foreground">{effectiveRate.toFixed(2)}%</strong></p>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
