
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";

export default function EmiCalculatorTool() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const calculateEmi = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;

    if (principal > 0 && rate > 0 && tenureMonths > 0) {
      const emiValue = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
      const totalPaymentValue = emiValue * tenureMonths;
      const totalInterestValue = totalPaymentValue - principal;

      setEmi(emiValue);
      setTotalPayment(totalPaymentValue);
      setTotalInterest(totalInterestValue);
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  };

  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, loanTenure]);


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
  };
  
  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
        setter(0);
    } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue <= max) {
            setter(Math.max(min, numValue));
        }
    }
  };

  return (
    <div className="w-full">
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="loanAmount" className="text-lg font-medium">Loan Amount</Label>
                 <div className="w-40">
                    <Input 
                        type="number" 
                        id="loanAmount"
                        value={loanAmount} 
                        onChange={handleInputChange(setLoanAmount, 100000, 50000000)}
                        className="text-right font-bold"
                        prefix="₹"
                    />
                 </div>
              </div>
              <Slider
                min={100000}
                max={50000000}
                step={100000}
                value={[loanAmount]}
                onValueChange={(val) => setLoanAmount(val[0])}
              />
               <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹1 Lakh</span>
                <span>₹5 Crore</span>
              </div>
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                <Label htmlFor="interestRate" className="text-lg font-medium">Interest Rate</Label>
                 <div className="w-40">
                    <Input 
                        type="number"
                        id="interestRate"
                        value={interestRate}
                        onChange={handleInputChange(setInterestRate, 1, 20)}
                        className="text-right font-bold"
                        suffix="%"
                        step="0.05"
                    />
                 </div>
              </div>
              <Slider
                min={1}
                max={20}
                step={0.05}
                value={[interestRate]}
                onValueChange={(val) => setInterestRate(val[0])}
              />
               <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="loanTenure" className="text-lg font-medium">Loan Tenure</Label>
                  <div className="w-40">
                    <Input
                        type="number"
                        id="loanTenure"
                        value={loanTenure}
                        onChange={handleInputChange(setLoanTenure, 1, 30)}
                        className="text-right font-bold"
                        suffix="Years"
                    />
                  </div>
              </div>
              <Slider
                id="loanTenure"
                min={1}
                max={30}
                step={1}
                value={[loanTenure]}
                onValueChange={(val) => setLoanTenure(val[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
              <div className="text-center">
                <p className="text-lg text-muted-foreground">Monthly EMI</p>
                 <AnimatePresence mode="wait">
                  <motion.p 
                    key={emi}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                  >
                    {formatCurrency(emi)}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="w-full mt-6 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                      <p className="text-muted-foreground">Total Interest</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                           key={`interest-${totalInterest}`}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 0.5 }}
                           className="font-semibold text-foreground"
                        >
                          {formatCurrency(totalInterest)}
                        </motion.p>
                      </AnimatePresence>
                  </div>
                   <div className="flex justify-between items-center text-lg">
                      <p className="text-muted-foreground">Total Payment</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                           key={`payment-${totalPayment}`}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ duration: 0.5 }}
                           className="font-semibold text-foreground"
                        >
                            {formatCurrency(totalPayment)}
                        </motion.p>
                      </AnimatePresence>
                  </div>
              </div>
          </div>
        </CardContent>
      </Card>
       <div className="mt-8 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Use our EMI Calculator to easily compute your Equated Monthly Installment for any loan. Adjust the loan amount, interest rate, and tenure to see how it affects your monthly payments and total interest.
            </p>
        </div>
    </div>
  );
}
