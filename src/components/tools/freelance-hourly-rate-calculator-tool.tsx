'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Briefcase, Percent, Target } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function FreelanceHourlyRateCalculatorTool() {
  const [targetSalary, setTargetSalary] = useState<number>(1200000);
  const [businessExpenses, setBusinessExpenses] = useState<number>(200000);
  const [profitMargin, setProfitMargin] = useState<number>(20);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);

  const [hourlyRate, setHourlyRate] = useState<number>(0);

  useEffect(() => {
    const totalAnnualRevenueNeeded = (targetSalary + businessExpenses) / (1 - profitMargin / 100);
    const totalBillableHoursPerYear = billableHoursPerWeek * 52;
    if (totalBillableHoursPerYear > 0) {
        setHourlyRate(totalAnnualRevenueNeeded / totalBillableHoursPerYear);
    } else {
        setHourlyRate(0);
    }
  }, [targetSalary, businessExpenses, profitMargin, billableHoursPerWeek]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };
  
  const handleSliderChange = (setter: (value: number) => void) => (value: number[]) => {
      setter(value[0]);
  }

  const guideProps = {
    title: "How to Use the Freelance Hourly Rate Calculator",
    steps: [
      { title: "Set Your Goal", description: "Enter your desired annual salary and estimated annual business expenses." },
      { title: "Define Profit & Hours", description: "Add a profit margin and specify how many hours you can bill per week on average." },
      { title: "Get Your Rate", description: "The calculator computes the minimum hourly rate you need to charge to meet your financial goals." }
    ],
    features: [
      { icon: Target, title: "Goal-Oriented Pricing", description: "Stop guessing your rate. Calculate a price that's based on your actual financial needs and business costs." },
      { icon: Briefcase, title: "Factor in Business Costs", description: "Accounts for crucial non-salary expenses like software, marketing, and office space to ensure true profitability." },
      { icon: Percent, title: "Plan for Profit", description: "Build a profit margin directly into your pricing strategy to ensure your business is growing, not just sustaining." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="targetSalary">Desired Annual Salary</Label>
              <Input type="number" id="targetSalary" value={targetSalary || ''} onChange={handleInputChange(setTargetSalary)} className="mt-1" />
            </div>
             <div>
              <Label htmlFor="businessExpenses">Total Annual Business Expenses</Label>
              <Input type="number" id="businessExpenses" value={businessExpenses || ''} onChange={handleInputChange(setBusinessExpenses)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="profitMargin">Profit Margin ({profitMargin}%)</Label>
              <Slider value={[profitMargin]} onValueChange={handleSliderChange(setProfitMargin)} min={0} max={50} step={1} />
            </div>
            <div>
              <Label htmlFor="billableHoursPerWeek">Billable Hours Per Week ({billableHoursPerWeek})</Label>
              <Slider value={[billableHoursPerWeek]} onValueChange={handleSliderChange(setBillableHoursPerWeek)} min={1} max={60} step={1} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Your Ideal Hourly Rate</div>
             <motion.div
                key={hourlyRate}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-bold text-primary my-2"
            >
                {formatCurrency(hourlyRate)}
            </motion.div>
            <p className="text-sm text-muted-foreground">per hour</p>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
