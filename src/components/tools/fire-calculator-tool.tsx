'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Flame, PiggyBank, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function FireCalculatorTool() {
  const [annualExpenses, setAnnualExpenses] = useState(600000);
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(1000000);
  const [annualInvestment, setAnnualInvestment] = useState(200000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  
  const [fireNumber, setFireNumber] = useState(0);
  const [yearsToFire, setYearsToFire] = useState<number | string>(0);

  useEffect(() => {
    const targetCorpus = annualExpenses * (100 / safeWithdrawalRate);
    setFireNumber(targetCorpus);

    if (expectedReturn > 0) {
      const r = expectedReturn / 100;
      const FV = targetCorpus;
      const PMT = annualInvestment;
      const PV = currentSavings;
      
      // NPER formula
      const years = Math.log((FV * r + PMT) / (PV * r + PMT)) / Math.log(1 + r);
      setYearsToFire(isFinite(years) && years > 0 ? years.toFixed(1) : 'Over 50');
    } else {
        setYearsToFire('N/A');
    }

  }, [annualExpenses, safeWithdrawalRate, currentSavings, annualInvestment, expectedReturn]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the FIRE Calculator",
    steps: [
      { title: "Enter Expenses", description: "Input your estimated annual expenses in retirement." },
      { title: "Define Savings & Returns", description: "Provide your current savings, annual investment, and expected rate of return." },
      { title: "Get Your FIRE Number", description: "The calculator shows your target corpus and estimates how many years it will take to reach it." }
    ],
    features: [
      { icon: Flame, title: "Calculate Your FIRE Number", description: "Determine the exact savings target you need to achieve Financial Independence and Retire Early." },
      { icon: Target, title: "Retirement Timeline", description: "Get a clear estimate of how many years it will take to reach your financial independence goal." },
      { icon: PiggyBank, title: "Scenario Planning", description: "Adjust your savings, investments, and expenses to see how changes can accelerate your path to FIRE." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label>Annual Expenses in Retirement</Label>
              <Input type="number" value={annualExpenses} onChange={handleInputChange(setAnnualExpenses)} />
            </div>
            <div>
              <Label>Current Savings / Corpus</Label>
              <Input type="number" value={currentSavings} onChange={handleInputChange(setCurrentSavings)} />
            </div>
            <div>
              <Label>Annual Investment towards FIRE</Label>
              <Input type="number" value={annualInvestment} onChange={handleInputChange(setAnnualInvestment)} />
            </div>
            <div>
              <Label>Expected Annual Return (%)</Label>
              <Input type="number" value={expectedReturn} onChange={handleInputChange(setExpectedReturn)} />
            </div>
            <div>
              <Label>Safe Withdrawal Rate (%)</Label>
              <Input type="number" value={safeWithdrawalRate} onChange={handleInputChange(setSafeWithdrawalRate)} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center gap-6">
            <div>
                <div className="text-lg text-muted-foreground">Your FIRE Number is</div>
                <motion.div
                    key={`fire-${fireNumber}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-5xl font-bold text-primary my-1"
                >
                    {formatCurrency(fireNumber)}
                </motion.div>
            </div>
             <div>
                <div className="text-lg text-muted-foreground">Years to achieve FIRE</div>
                <motion.div
                    key={`years-${yearsToFire}`}
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-5xl font-bold text-primary my-1"
                >
                    {yearsToFire}
                </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
