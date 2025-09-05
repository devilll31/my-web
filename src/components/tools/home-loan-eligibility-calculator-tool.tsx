
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function HomeLoanEligibilityCalculatorTool() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000);
  const [existingEMI, setExistingEMI] = useState<number>(5000);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [foir, setFoir] = useState<number>(50); // Fixed Obligation to Income Ratio in %

  const [eligibleLoan, setEligibleLoan] = useState<number>(0);
  const [eligibleEMI, setEligibleEMI] = useState<number>(0);

  useEffect(() => {
    const calculateEligibility = () => {
      const maxPermissibleEMI = (monthlyIncome * foir / 100) - existingEMI;
      
      if (maxPermissibleEMI <= 0) {
        setEligibleEMI(0);
        setEligibleLoan(0);
        return;
      }

      setEligibleEMI(maxPermissibleEMI);
      
      const rate = interestRate / 12 / 100;
      const tenureMonths = loanTenure * 12;

      if (rate > 0) {
        const loanAmount = (maxPermissibleEMI * (Math.pow(1 + rate, tenureMonths) - 1)) / (rate * Math.pow(1 + rate, tenureMonths));
        setEligibleLoan(loanAmount);
      } else {
        setEligibleLoan(maxPermissibleEMI * tenureMonths);
      }
    };
    calculateEligibility();
  }, [monthlyIncome, existingEMI, loanTenure, interestRate, foir]);
  
  const pieData = [
    { name: 'Principal Loan', value: eligibleLoan, color: 'hsl(var(--primary))' },
    { name: 'Total Interest', value: (eligibleEMI * loanTenure * 12) - eligibleLoan, color: 'hsl(var(--accent))' },
  ];

  return (
    <div className="w-full">
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="monthlyIncome" className="text-base font-medium">Gross Monthly Income</Label>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {formatCurrency(monthlyIncome)}
                </div>
              </div>
              <Slider id="monthlyIncome" min={10000} max={500000} step={5000} value={[monthlyIncome]} onValueChange={(val) => setMonthlyIncome(val[0])} />
               <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹10,000</span><span>₹5,00,000</span></div>
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                <Label htmlFor="existingEMI" className="text-base font-medium">Other Existing EMIs</Label>
                 <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {formatCurrency(existingEMI)}
                </div>
              </div>
              <Slider id="existingEMI" min={0} max={100000} step={1000} value={[existingEMI]} onValueChange={(val) => setExistingEMI(val[0])} />
               <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹0</span><span>₹1,00,000</span></div>
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="loanTenure" className="text-base font-medium">Loan Tenure</Label>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {loanTenure} Years
                  </div>
              </div>
              <Slider id="loanTenure" min={1} max={30} step={1} value={[loanTenure]} onValueChange={(val) => setLoanTenure(val[0])} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1 Year</span><span>30 Years</span></div>
            </div>
            
            <div>
               <div className="flex justify-between items-center mb-2">
                <Label htmlFor="interestRate" className="text-base font-medium">Interest Rate</Label>
                 <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {interestRate.toFixed(2)} %
                </div>
              </div>
              <Slider id="interestRate" min={6} max={15} step={0.05} value={[interestRate]} onValueChange={(val) => setInterestRate(val[0])} />
               <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>6%</span><span>15%</span></div>
            </div>

          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
              <div className="text-center">
                <p className="text-lg text-muted-foreground">You are eligible for a loan of</p>
                 <AnimatePresence mode="wait">
                  <motion.p 
                    key={eligibleLoan}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                  >
                    {formatCurrency(eligibleLoan)}
                  </motion.p>
                </AnimatePresence>
                <p className="text-muted-foreground mt-2">with an EMI of <strong className="text-foreground">{formatCurrency(eligibleEMI)}/month</strong></p>
              </div>
              
              <div className="w-full h-48 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={40} paddingAngle={5}>
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                        }}
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 text-xs mt-2">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieData[0].color }}></div>{pieData[0].name}</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieData[1].color }}></div>{pieData[1].name}</div>
              </div>
          </div>
        </CardContent>
      </Card>
       <div className="mt-8 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Disclaimer: This calculator provides an estimate based on standard FOIR assumptions (approx. 50%). Your final loan eligibility will be determined by the lending institution based on their specific criteria.
            </p>
        </div>
    </div>
  );
}
