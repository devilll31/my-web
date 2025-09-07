'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Home, Building, IndianRupee, GitCompareArrows } from 'lucide-react';
import { motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function RentVsBuyCalculatorTool() {
  // Buying State
  const [propertyPrice, setPropertyPrice] = useState(7500000);
  const [downPayment, setDownPayment] = useState(1500000);
  const [loanInterest, setLoanInterest] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [propertyTaxRate, setPropertyTaxRate] = useState(0.5); // as a percentage of property price
  const [maintenance, setMaintenance] = useState(2000); // monthly

  // Renting State
  const [monthlyRent, setMonthlyRent] = useState(20000);
  
  // Results
  const [monthlyCostToBuy, setMonthlyCostToBuy] = useState(0);

  useEffect(() => {
    // Monthly Cost of Buying
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = loanInterest / 12 / 100;
    const tenureMonths = loanTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const monthlyPropertyTax = (propertyPrice * (propertyTaxRate / 100)) / 12;
    const totalMonthlyBuyCost = emi + monthlyPropertyTax + maintenance;
    setMonthlyCostToBuy(totalMonthlyBuyCost);

  }, [propertyPrice, downPayment, loanInterest, loanTenure, propertyTaxRate, maintenance]);
  
  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Rent vs. Buy Calculator",
    steps: [
      { title: "Enter Buying Details", description: "Input the property price, your down payment, loan details, and other ownership costs." },
      { title: "Enter Rent Details", description: "Provide the equivalent monthly rent for a similar property." },
      { title: "Compare Monthly Costs", description: "The tool compares the monthly out-of-pocket expense for both scenarios to help your decision." }
    ],
    features: [
      { icon: GitCompareArrows, title: "Clear Monthly Comparison", description: "Directly compare the monthly cash outflow of buying versus renting to understand the immediate financial impact." },
      { icon: Home, title: "Ownership Costs", description: "Factors in hidden costs of ownership like property taxes and maintenance for a more realistic buying calculation." },
      { icon: Building, title: "Informed Housing Decisions", description: "A simplified tool to help you analyze one of the most important financial decisions of your life." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline">Buying a Home</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Property Price</Label><Input type="number" value={propertyPrice} onChange={handleInputChange(setPropertyPrice)} /></div>
            <div><Label>Down Payment</Label><Input type="number" value={downPayment} onChange={handleInputChange(setDownPayment)} /></div>
            <div><Label>Loan Interest Rate (%)</Label><Input type="number" value={loanInterest} onChange={handleInputChange(setLoanInterest)} /></div>
            <div><Label>Loan Tenure (Years)</Label><Input type="number" value={loanTenure} onChange={handleInputChange(setLoanTenure)} /></div>
            <div><Label>Annual Property Tax Rate (%)</Label><Input type="number" value={propertyTaxRate} onChange={handleInputChange(setPropertyTaxRate)} /></div>
            <div><Label>Monthly Maintenance</Label><Input type="number" value={maintenance} onChange={handleInputChange(setMaintenance)} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline">Renting a Home</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Equivalent Monthly Rent</Label><Input type="number" value={monthlyRent} onChange={handleInputChange(setMonthlyRent)} /></div>
            <div className="pt-8 text-center">
                <p className="text-lg text-muted-foreground">Monthly Cost to Buy</p>
                <motion.div key={`buy-${monthlyCostToBuy}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold">{formatCurrency(monthlyCostToBuy)}</motion.div>
                 <p className="text-lg text-muted-foreground mt-4">Monthly Cost to Rent</p>
                <motion.div key={`rent-${monthlyRent}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold text-primary">{formatCurrency(monthlyRent)}</motion.div>
                 <motion.div key={`winner-${monthlyCostToBuy > monthlyRent}`} initial={{opacity:0}} animate={{opacity:1}} className="mt-6 text-xl font-bold text-primary">
                    {monthlyCostToBuy > monthlyRent ? "Renting is cheaper on a monthly basis." : "Buying is cheaper on a monthly basis."}
                </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
