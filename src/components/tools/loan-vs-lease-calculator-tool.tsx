'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, GitCompareArrows, Car, Building } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function LoanVsLeaseCalculatorTool() {
  // Loan State
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [loanInterest, setLoanInterest] = useState(9);
  const [loanTenure, setLoanTenure] = useState(5);
  const [resaleValue, setResaleValue] = useState(800000);

  // Lease State
  const [leasePayment, setLeasePayment] = useState(35000);
  const [leaseTenure, setLeaseTenure] = useState(3);
  
  // Results
  const [totalLoanCost, setTotalLoanCost] = useState(0);
  const [totalLeaseCost, setTotalLeaseCost] = useState(0);

  useEffect(() => {
    // Total Loan Cost Calculation
    const rate = loanInterest / 12 / 100;
    const tenureMonthsLoan = loanTenure * 12;
    const emi = (loanAmount * rate * Math.pow(1 + rate, tenureMonthsLoan)) / (Math.pow(1 + rate, tenureMonthsLoan) - 1);
    const totalPaid = emi * tenureMonthsLoan;
    const netLoanCost = totalPaid - resaleValue;
    setTotalLoanCost(netLoanCost);
    
    // Total Lease Cost Calculation
    const tenureMonthsLease = leaseTenure * 12;
    const netLeaseCost = leasePayment * tenureMonthsLease;
    setTotalLeaseCost(netLeaseCost);

  }, [loanAmount, loanInterest, loanTenure, resaleValue, leasePayment, leaseTenure]);
  
  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const cheaperOption = totalLoanCost < totalLeaseCost ? 'Loan' : 'Lease';

  const guideProps = {
    title: "How to Use the Loan vs. Lease Calculator",
    steps: [
      { title: "Enter Loan Details", description: "Input the total loan amount, interest, tenure, and the expected resale value of the asset." },
      { title: "Enter Lease Details", description: "Provide the monthly lease payment and the total lease tenure in years." },
      { title: "Compare the Costs", description: "The calculator shows the total net cost for both options to reveal the more affordable choice." }
    ],
    features: [
      { icon: GitCompareArrows, title: "Clear Comparison", description: "Get a direct, side-by-side financial comparison to make an informed decision between buying and leasing." },
      { icon: Car, title: "Asset-Agnostic", description: "Useful for comparing loan vs. lease options for various assets, like cars or equipment." },
      { icon: IndianRupee, title: "Focus on Total Cost", description: "Calculates the total out-of-pocket cost over the term, providing a clearer financial picture than just comparing monthly payments." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-headline">Buy with Loan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Loan Amount</Label>
              <Input type="number" value={loanAmount} onChange={handleInputChange(setLoanAmount)} />
            </div>
             <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" value={loanInterest} onChange={handleInputChange(setLoanInterest)} />
            </div>
             <div>
              <Label>Loan Tenure (Years)</Label>
              <Input type="number" value={loanTenure} onChange={handleInputChange(setLoanTenure)} />
            </div>
             <div>
              <Label>Expected Resale Value</Label>
              <Input type="number" value={resaleValue} onChange={handleInputChange(setResaleValue)} />
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-headline">Lease</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Monthly Lease Payment</Label>
              <Input type="number" value={leasePayment} onChange={handleInputChange(setLeasePayment)} />
            </div>
            <div>
              <Label>Lease Tenure (Years)</Label>
              <Input type="number" value={leaseTenure} onChange={handleInputChange(setLeaseTenure)} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
          <CardHeader>
             <CardTitle className="text-center text-3xl font-headline">Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-muted-foreground">Total Cost of Loan</p>
                    <p className="text-3xl font-bold">{formatCurrency(totalLoanCost)}</p>
                </div>
                 <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-muted-foreground">Total Cost of Lease</p>
                    <p className="text-3xl font-bold">{formatCurrency(totalLeaseCost)}</p>
                </div>
            </div>
            <motion.div key={cheaperOption} initial={{opacity:0}} animate={{opacity:1}} className="mt-6 text-2xl font-bold text-primary">
                Buying with a <span className="underline">{cheaperOption}</span> is cheaper.
            </motion.div>
          </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
