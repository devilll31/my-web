
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

export default function SimpleInterestCalculatorTool() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(8);
  const [tenure, setTenure] = useState<number>(5);
  
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    const interest = (principal * rate * tenure) / 100;
    setTotalInterest(interest);
    setMaturityValue(principal + interest);
  }, [principal, rate, tenure]);

  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, Math.min(max, value === '' ? 0 : parseFloat(value))));
  };
  
  const pieData = [
    { name: 'Principal Amount', value: principal, color: 'hsl(var(--primary))' },
    { name: 'Total Interest', value: totalInterest, color: 'hsl(var(--accent))' },
  ];

  const guideProps = {
    title: "How to Use the Simple Interest Calculator",
    steps: [
      { title: "Enter Principal", description: "Input the initial amount of your loan or investment." },
      { title: "Set Rate & Tenure", description: "Provide the annual interest rate and the total time period in years." },
      { title: "View Results", description: "The calculator instantly shows the total interest earned and the final maturity value." }
    ],
    features: [
      { icon: PiggyBank, title: "Straightforward Calculation", description: "Quickly calculate interest that is applied only to the principal amount over time." },
      { icon: SlidersHorizontal, title: "Interactive Controls", description: "Use sliders for quick adjustments or type in exact numbers for precise calculations." },
      { icon: BarChart, title: "Clear Breakdown", description: "The pie chart provides a simple visual of your principal versus the interest accumulated." }
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
                <div className="w-40"><Input type="number" id="principal" value={principal} onChange={handleInputChange(setPrincipal, 1000, 100000000)} /></div>
              </div>
              <Slider min={1000} max={100000000} step={1000} value={[principal]} onValueChange={(val) => setPrincipal(val[0])} />
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
                <Label htmlFor="tenure" className="text-lg font-medium">Time Period (Years)</Label>
                <div className="w-40"><Input type="number" id="tenure" value={tenure} onChange={handleInputChange(setTenure, 1, 40)} /></div>
              </div>
              <Slider min={1} max={40} step={1} value={[tenure]} onValueChange={(val) => setTenure(val[0])} />
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
                <p className="text-muted-foreground">Total Interest: <strong className="text-foreground">{formatCurrency(totalInterest)}</strong></p>
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
