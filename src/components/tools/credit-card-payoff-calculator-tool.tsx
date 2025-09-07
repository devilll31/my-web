'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Calendar, Percent, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function CreditCardPayoffCalculatorTool() {
  const [balance, setBalance] = useState(50000);
  const [interestRate, setInterestRate] = useState(36); // Annual rate
  const [monthlyPayment, setMonthlyPayment] = useState(2500);

  const [monthsToPayoff, setMonthsToPayoff] = useState<number | string>(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    if (balance > 0 && monthlyPayment > 0 && interestRate > 0) {
        const monthlyRate = interestRate / 12 / 100;
        // Check if payment is greater than interest
        if(monthlyPayment <= balance * monthlyRate) {
            setMonthsToPayoff('Never');
            setTotalInterest(Infinity);
            return;
        }

        // N = -log(1 - (B*i)/P) / log(1+i)
        const months = -Math.log(1 - (balance * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate);
        setMonthsToPayoff(Math.ceil(months));
        setTotalInterest(Math.ceil(months) * monthlyPayment - balance);
    } else {
        setMonthsToPayoff(0);
        setTotalInterest(0);
    }
  }, [balance, interestRate, monthlyPayment]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Credit Card Payoff Calculator",
    steps: [
      { title: "Enter Card Balance", description: "Input your total outstanding credit card balance." },
      { title: "Set Rate & Payment", description: "Provide your card's annual interest rate (APR) and your planned monthly payment." },
      { title: "See Your Payoff Timeline", description: "The calculator shows how long it will take to be debt-free and the total interest you'll pay." }
    ],
    features: [
      { icon: Target, title: "Debt-Free Goal", description: "Create a clear and achievable plan to pay off your credit card debt." },
      { icon: Calendar, title: "Payoff Timeline", description: "Understand exactly how many months it will take to clear your balance with your current payment plan." },
      { icon: IndianRupee, title: "Interest Savings", description: "See how increasing your monthly payment can drastically reduce the total interest you pay over time." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div><Label>Credit Card Balance</Label><Input type="number" value={balance} onChange={handleInputChange(setBalance)} /></div>
            <div><Label>Annual Interest Rate (APR %)</Label><Input type="number" value={interestRate} onChange={handleInputChange(setInterestRate)} /></div>
            <div><Label>Monthly Payment</Label><Input type="number" value={monthlyPayment} onChange={handleInputChange(setMonthlyPayment)} /></div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center gap-6">
            <div>
                <div className="text-lg text-muted-foreground">Months to Pay Off</div>
                <motion.div key={`months-${monthsToPayoff}`} initial={{opacity:0}} animate={{opacity:1}} className="text-5xl font-bold text-primary my-1">{monthsToPayoff}</motion.div>
            </div>
            <div>
                <div className="text-lg text-muted-foreground">Total Interest Paid</div>
                <motion.div key={`interest-${totalInterest}`} initial={{opacity:0}} animate={{opacity:1}} className="text-5xl font-bold text-primary my-1">{isFinite(totalInterest) ? formatCurrency(totalInterest) : 'N/A'}</motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
