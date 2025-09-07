'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, TrendingDown, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function MortgageRefinanceSavingsTool() {
  // Current Loan
  const [currentBalance, setCurrentBalance] = useState(4000000);
  const [currentInterestRate, setCurrentInterestRate] = useState(9.5);
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState(38000);

  // New Loan
  const [newInterestRate, setNewInterestRate] = useState(8.5);
  const [newLoanTenure, setNewLoanTenure] = useState(20);
  
  // Results
  const [newMonthlyPayment, setNewMonthlyPayment] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);

  useEffect(() => {
    // Calculate new EMI
    const rate = newInterestRate / 12 / 100;
    const tenureMonths = newLoanTenure * 12;
    const emi = (currentBalance * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
    setNewMonthlyPayment(emi);
    setMonthlySavings(currentMonthlyPayment - emi);
  }, [currentBalance, currentInterestRate, currentMonthlyPayment, newInterestRate, newLoanTenure]);
  
  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Mortgage Refinance Calculator",
    steps: [
      { title: "Enter Current Loan Details", description: "Input your outstanding loan balance, current interest rate, and current EMI." },
      { title: "Enter New Loan Offer", description: "Provide the interest rate and tenure for the new loan you are considering." },
      { title: "See Your Potential Savings", description: "The calculator shows your new EMI and how much you could save each month." }
    ],
    features: [
      { icon: TrendingDown, title: "Reduce Your EMI", description: "Find out if refinancing your mortgage can lead to lower monthly payments." },
      { icon: IndianRupee, title: "Monthly Savings", description: "Clearly see the potential cash savings each month by switching to a lower interest rate." },
      { icon: CheckCircle, title: "Informed Decision", description: "Make a confident choice about refinancing by understanding the direct financial benefits." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline">Current Loan</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Current Loan Balance</Label><Input type="number" value={currentBalance} onChange={handleInputChange(setCurrentBalance)} /></div>
            <div><Label>Current Interest Rate (%)</Label><Input type="number" value={currentInterestRate} onChange={handleInputChange(setCurrentInterestRate)} /></div>
            <div><Label>Current Monthly Payment (EMI)</Label><Input type="number" value={currentMonthlyPayment} onChange={handleInputChange(setCurrentMonthlyPayment)} /></div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline">New Loan Offer</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>New Interest Rate (%)</Label><Input type="number" value={newInterestRate} onChange={handleInputChange(setNewInterestRate)} /></div>
            <div><Label>New Loan Tenure (Years)</Label><Input type="number" value={newLoanTenure} onChange={handleInputChange(setNewLoanTenure)} /></div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
          <CardHeader><CardTitle className="text-center text-3xl font-headline">Refinance Savings</CardTitle></CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-muted-foreground">New Monthly Payment</p>
                    <motion.p key={`new-${newMonthlyPayment}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold">{formatCurrency(newMonthlyPayment)}</motion.p>
                </div>
                 <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <p className="text-green-800 dark:text-green-200">Potential Monthly Savings</p>
                    <motion.p key={`savings-${monthlySavings}`} initial={{opacity:0}} animate={{opacity:1}} className="text-3xl font-bold text-green-600">{formatCurrency(monthlySavings)}</motion.p>
                </div>
            </div>
          </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
