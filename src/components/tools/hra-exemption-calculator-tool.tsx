
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Home, Building, IndianRupee, CheckCircle, SlidersHorizontal } from 'lucide-react';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function HraExemptionCalculatorTool() {
  const [basicSalary, setBasicSalary] = useState<number>(600000);
  const [da, setDa] = useState<number>(0);
  const [hraReceived, setHraReceived] = useState<number>(300000);
  const [rentPaid, setRentPaid] = useState<number>(240000);
  const [isMetro, setIsMetro] = useState<boolean>(true);
  
  const [exemptedHra, setExemptedHra] = useState<number>(0);
  const [taxableHra, setTaxableHra] = useState<number>(0);

  useEffect(() => {
    const salaryForHra = basicSalary + da;
    
    // 1. Actual HRA received
    const actualHra = hraReceived;
    
    // 2. Actual rent paid minus 10% of salary
    const rentMinus10Percent = Math.max(0, rentPaid - (0.10 * salaryForHra));
    
    // 3. 50% of salary for metro cities, 40% for non-metro
    const salaryPercentage = (isMetro ? 0.50 : 0.40) * salaryForHra;
    
    const calculatedExemption = Math.min(actualHra, rentMinus10Percent, salaryPercentage);
    
    setExemptedHra(calculatedExemption);
    setTaxableHra(Math.max(0, hraReceived - calculatedExemption));

  }, [basicSalary, da, hraReceived, rentPaid, isMetro]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };
  
  const guideProps = {
    title: "How to Use the HRA Exemption Calculator",
    steps: [
      { title: "Enter Salary Details", description: "Input your annual basic salary and any Dearness Allowance (DA)." },
      { title: "Provide Rent & HRA", description: "Enter the total HRA received from your employer and the total rent you paid annually." },
      { title: "Select City Type", description: "Check the box if you live in a metro city (Delhi, Mumbai, Kolkata, Chennai) to calculate your exemption." }
    ],
    features: [
      { icon: Home, title: "Optimize Tax Savings", description: "Calculate the exact amount of House Rent Allowance that is exempt from tax to maximize your savings." },
      { icon: Building, title: "Metro/Non-Metro Logic", description: "Automatically applies the correct slab (50% for metro, 40% for non-metro) for accurate calculations." },
      { icon: CheckCircle, title: "Clear Breakdown", description: "Instantly see the breakdown of your exempted HRA and the portion that remains taxable." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
                <Label htmlFor="basicSalary">Annual Basic Salary</Label>
                <Input type="number" id="basicSalary" value={basicSalary} onChange={handleInputChange(setBasicSalary)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="da">Dearness Allowance (DA) - if applicable</Label>
              <Input type="number" id="da" value={da} onChange={handleInputChange(setDa)} className="mt-1" />
            </div>
             <div>
              <Label htmlFor="hraReceived">Total HRA Received from Employer</Label>
              <Input type="number" id="hraReceived" value={hraReceived} onChange={handleInputChange(setHraReceived)} className="mt-1" />
            </div>
             <div>
              <Label htmlFor="rentPaid">Total Rent Paid Annually</Label>
              <Input type="number" id="rentPaid" value={rentPaid} onChange={handleInputChange(setRentPaid)} className="mt-1" />
            </div>
            <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="isMetro" checked={isMetro} onCheckedChange={(checked) => setIsMetro(checked as boolean)} />
                <Label htmlFor="isMetro" className="text-base font-medium">Do you live in a metro city? (Delhi, Mumbai, Kolkata, Chennai)</Label>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
            <div className="text-center w-full">
                <p className="text-lg text-muted-foreground">Exempted HRA Amount</p>
                <AnimatePresence mode="wait">
                    <motion.p 
                    key={exemptedHra}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                    >
                    {formatCurrency(exemptedHra)}
                    </motion.p>
                </AnimatePresence>
                <p className="text-muted-foreground mt-4">Taxable HRA Amount</p>
                <p className="font-bold text-2xl text-foreground">{formatCurrency(taxableHra)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
