
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

export default function LumpsumCalculatorTool() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(10);
  
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    const maturity = principal * Math.pow((1 + rate / 100), tenure);
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
    title: "How to Use the Lumpsum Calculator",
    steps: [
      { title: "Enter Investment", description: "Input the total one-time amount you wish to invest." },
      { title: "Set Rate & Tenure", description: "Provide the expected annual rate of return and the investment period in years." },
      { title: "View Future Value", description: "The calculator instantly projects the total value of your investment at the end of the tenure." }
    ],
    features: [
      { icon: PiggyBank, title: "Future Value Projection", description: "Clearly see the potential future value of your one-time investment through the power of compounding." },
      { icon: SlidersHorizontal, title: "Dynamic Simulation", description: "Use sliders or type in precise numbers to simulate how different amounts, returns, and time horizons impact your wealth." },
      { icon: BarChart, title: "Wealth Breakdown", description: "The pie chart offers a simple visual breakdown of your initial investment versus the estimated wealth gained over time." }
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
                <Label htmlFor="rate" className="text-lg font-medium">Expected Return Rate (% p.a.)</Label>
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
                <p className="text-lg text-muted-foreground">Future Value</p>
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
