
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
    const n = 4; // Compounded quarterly

    let maturity = 0;
    const totalMonths = t * 12;

    for (let i = 1; i <= totalMonths; i++) {
        const monthsRemaining = totalMonths - (i - 1);
        maturity += P * Math.pow(1 + r / n, (n * monthsRemaining) / 12);
    }
    
    // RD maturity formula is complex. A simpler approximation is often used:
    const N = tenure * 12;
    const i = r / 12;
    // M = P * [((1 + i)^N - 1) / i]
    // This is future value of annuity. But RD is compounded quarterly.
    // The precise formula is more complex, let's use a standard one for web calculators.
    const principalInvested = P * N;
    const ratePerQuarter = r / 4;
    const quarters = N / 3;
    const M = P * (Math.pow(1 + ratePerQuarter, quarters) - 1) / (1 - Math.pow(1 + ratePerQuarter, -1/3));

    // A simpler, more common formula: M = P * [((1 + R)^n - 1) / R] where R is rate per period and n is number of periods.
    let finalValue = 0;
    const i_quarterly = (rate/100)/4;
    for(let j=N; j>0; j--) {
        finalValue += P * Math.pow(1 + i_quarterly, j/3);
    }
    
    const principal = P * N;
    const interest = finalValue - principal;


    setMaturityValue(finalValue);
    setTotalInvestment(principal);
    setTotalInterest(interest);
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
