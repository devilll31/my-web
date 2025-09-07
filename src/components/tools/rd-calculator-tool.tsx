'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { PiggyBank, Calendar, Percent, CheckCircle, SlidersHorizontal, BarChart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function RdCalculatorTool() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [rate, setRate] = useState<number>(6.5);
  const [tenure, setTenure] = useState<number>(5);
  
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    const P = monthlyInvestment;
    const r = rate / 100;
    const t = tenure; // in years
    const n = 4; // Compounding frequency (quarterly)
    const N = t * 12; // total number of installments

    let M = 0;
    // M = P * [((1 + i)^n - 1) / i] where i is rate per period, n is number of periods
    // This formula is for end-of-period payments.
    const i = r / n;
    for (let k = 1; k <= N; k++) {
        M += P * Math.pow(1 + i, (n * (N - k + 1)) / 12);
    }
    
    // A more standard formula used by banks in India for RD:
    // M = P * (N) + P * N * (N + 1) * r / 24
    // This is an approximation and might not be fully accurate. Let's use a more precise future value of annuity formula.
    const n_comp = tenure * 4;
    const i_rate = rate / 100 / 4;
    
    const calculatedMaturity = P * ( (Math.pow(1+i_rate, n_comp) - 1) / i_rate) * (1 / (1 - Math.pow(1+i_rate, -1/3)));
    
    // Let's use a loop for accuracy with quarterly compounding which is standard for RDs
    let futureValue = 0;
    const monthlyRate = r / 12;
    for(let m = 0; m < N; m++){
        futureValue = (futureValue + P) * (1 + monthlyRate);
    }
    
    const invested = P * N;

    // The most accurate way is to calculate maturity for each installment.
    let finalValue = 0;
    for (let i = 0; i < N; i++) {
      // Months remaining for this installment
      const monthsLeft = N - i;
      // Calculate future value of this single installment
      finalValue += P * Math.pow(1 + r/12, monthsLeft);
    }
    
    // Simplified standard formula often used:
    const finalAmount = P * (((Math.pow(1 + r/4, tenure * 4)) - 1) / (1 - Math.pow(1 + r/4, -1/3)));


    setMaturityValue(finalAmount);
    setTotalInvestment(invested);
    setTotalInterest(finalAmount - invested);
  }, [monthlyInvestment, rate, tenure]);

  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, Math.min(max, value === '' ? 0 : parseFloat(value))));
  };
  
  const pieData = [
    { name: 'Total Investment', value: totalInvestment, color: 'hsl(var(--primary))' },
    { name: 'Total Interest', value: totalInterest, color: 'hsl(var(--accent))' },
  ];

  const guideProps = {
    title: "How to Use the RD Calculator",
    steps: [
      { title: "Enter Monthly Deposit", description: "Input the amount you will deposit every month." },
      { title: "Set Rate & Tenure", description: "Provide the annual interest rate and the total deposit period in years." },
      { title: "View Maturity Amount", description: "The calculator instantly shows the total value of your Recurring Deposit upon maturity." }
    ],
    features: [
      { icon: PiggyBank, title: "Disciplined Savings", description: "Calculate the maturity value of your Recurring Deposit and see how small, regular savings can grow over time." },
      { icon: SlidersHorizontal, title: "Flexible Scenarios", description: "Use sliders or type in exact numbers to see how changing the monthly deposit, rate, or tenure affects your final amount." },
      { icon: BarChart, title: "Clear Breakdown", description: "The pie chart visualizes your total contributions versus the interest earned, highlighting the benefit of regular investing." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="monthlyInvestment" className="text-lg font-medium">Monthly Investment</Label>
                <div className="w-40"><Input type="number" id="monthlyInvestment" value={monthlyInvestment} onChange={handleInputChange(setMonthlyInvestment, 500, 100000)} /></div>
              </div>
              <Slider min={500} max={100000} step={500} value={[monthlyInvestment]} onValueChange={(val) => setMonthlyInvestment(val[0])} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="rate" className="text-lg font-medium">Interest Rate (% p.a.)</Label>
                <div className="w-40"><Input type="number" id="rate" value={rate} onChange={handleInputChange(setRate, 1, 15)} step="0.05" /></div>
              </div>
              <Slider min={1} max={15} step={0.05} value={[rate]} onValueChange={(val) => setRate(val[0])} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="tenure" className="text-lg font-medium">Tenure (Years)</Label>
                <div className="w-40"><Input type="number" id="tenure" value={tenure} onChange={handleInputChange(setTenure, 1, 10)} /></div>
              </div>
              <Slider min={1} max={10} step={1} value={[tenure]} onValueChange={(val) => setTenure(val[0])} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
            <div className="text-center w-full">
                <p className="text-lg text-muted-foreground">Maturity Value</p>
                <AnimatePresence mode="wait">
                    <motion.p 
                    key={maturityValue}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                    >
                    {formatCurrency(maturityValue)}
                    </motion.p>
                </AnimatePresence>
              <div className="w-full h-40 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={40} paddingAngle={5}>
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
               <div className="flex justify-center gap-4 text-xs mt-2">
                    {pieData.map(entry => <div key={entry.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: entry.color}}></div>{entry.name}</div>)}
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
