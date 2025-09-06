
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { PiggyBank, Calendar, Percent, CheckCircle, SlidersHorizontal, BarChart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function FdCalculatorTool() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(5);
  
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    // FD is typically compounded quarterly in India, so n=4
    const n = 4; 
    const maturity = principal * Math.pow((1 + (rate / 100) / n), n * tenure);
    setMaturityValue(maturity);
    setTotalInterest(maturity - principal);
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
    title: "How to Use the FD Calculator",
    steps: [
      { title: "Enter Investment", description: "Input the total amount you want to deposit in the Fixed Deposit." },
      { title: "Set Rate & Tenure", description: "Provide the annual interest rate and the lock-in period in years." },
      { title: "View Maturity Amount", description: "The calculator instantly shows the total value of your FD upon maturity." }
    ],
    features: [
      { icon: PiggyBank, title: "Guaranteed Returns", description: "Calculate the exact maturity value of your safe investment, as FDs offer guaranteed returns." },
      { icon: SlidersHorizontal, title: "Instant Adjustments", description: "Use the sliders or type in precise numbers to see how changing the amount, rate, or tenure affects your final returns." },
      { icon: BarChart, title: "Clear Visualization", description: "The pie chart provides a simple visual breakdown of your initial investment versus the interest earned over the tenure." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="principal" className="text-lg font-medium">Total Investment</Label>
                <div className="w-40"><Input type="number" id="principal" value={principal} onChange={handleInputChange(setPrincipal, 1000, 100000000)} /></div>
              </div>
              <Slider min={1000} max={100000000} step={1000} value={[principal]} onValueChange={(val) => setPrincipal(val[0])} />
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
                <div className="w-40"><Input type="number" id="tenure" value={tenure} onChange={handleInputChange(setTenure, 1, 20)} /></div>
              </div>
              <Slider min={1} max={20} step={1} value={[tenure]} onValueChange={(val) => setTenure(val[0])} />
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
