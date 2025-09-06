
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { CheckCircle, SlidersHorizontal, BarChart, Percent, Calendar, PiggyBank } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function CompoundInterestCalculatorTool() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(10);
  const [compounding, setCompounding] = useState<number>(1); // 1: Annually, 2: Half-yearly, 4: Quarterly, 12: Monthly
  
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    const calculateCompoundInterest = () => {
      const P = principal;
      const r = rate / 100;
      const n = compounding;
      const t = tenure;
      
      const maturity = P * Math.pow((1 + r / n), n * t);
      const interest = maturity - P;

      setMaturityValue(maturity);
      setTotalInterest(interest);
    };
    calculateCompoundInterest();
  }, [principal, rate, tenure, compounding]);

  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, Math.min(max, value === '' ? 0 : parseFloat(value))));
  };

  const pieData = [
    { name: 'Principal Amount', value: principal, color: 'hsl(var(--primary))' },
    { name: 'Total Interest', value: totalInterest, color: 'hsl(var(--accent))' },
  ];

  const guideProps = {
    title: "How to Use the Compound Interest Calculator",
    steps: [
      { title: "Enter Principal", description: "Input the initial amount of your investment." },
      { title: "Set Rate & Tenure", description: "Provide the annual interest rate and the total investment period in years." },
      { title: "Choose Compounding", description: "Select how frequently the interest is compounded to see the final maturity value." }
    ],
    features: [
      { icon: PiggyBank, title: "Investment Growth", description: "Clearly see how your initial investment grows over time with the power of compounding." },
      { icon: SlidersHorizontal, title: "Interactive Controls", description: "Use sliders or type in exact numbers to instantly see how different variables affect your returns." },
      { icon: BarChart, title: "Visual Breakdown", description: "The pie chart visualizes the proportion of your principal amount versus the interest earned, giving you a clear picture of your earnings." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="principal" className="text-lg font-medium">Principal Amount</Label>
                <div className="w-40"><Input type="number" id="principal" value={principal} onChange={handleInputChange(setPrincipal, 1000, 10000000)} /></div>
              </div>
              <Slider min={1000} max={10000000} step={1000} value={[principal]} onValueChange={(val) => setPrincipal(val[0])} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="rate" className="text-lg font-medium">Interest Rate (% p.a.)</Label>
                <div className="w-40"><Input type="number" id="rate" value={rate} onChange={handleInputChange(setRate, 1, 30)} step="0.1" /></div>
              </div>
              <Slider min={1} max={30} step={0.1} value={[rate]} onValueChange={(val) => setRate(val[0])} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="tenure" className="text-lg font-medium">Tenure (Years)</Label>
                <div className="w-40"><Input type="number" id="tenure" value={tenure} onChange={handleInputChange(setTenure, 1, 40)} /></div>
              </div>
              <Slider min={1} max={40} step={1} value={[tenure]} onValueChange={(val) => setTenure(val[0])} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
            <div className="text-center w-full">
              <p className="text-lg text-muted-foreground">Maturity Value</p>
              <AnimatePresence mode="wait">
                <motion.p key={maturityValue} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-4xl lg:text-5xl font-bold text-primary my-2">{formatCurrency(maturityValue)}</motion.p>
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
                {pieData.map(entry => <div key={entry.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>{entry.name}</div>)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
