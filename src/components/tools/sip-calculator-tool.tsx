
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

export default function SIPCalculatorTool() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [investedAmount, setInvestedAmount] = useState<number>(0);
  const [estReturns, setEstReturns] = useState<number>(0);

  useEffect(() => {
    const i = returnRate / 100 / 12; // monthly interest rate
    const n = timePeriod * 12; // number of months
    const P = monthlyInvestment;

    if (P > 0 && i > 0 && n > 0) {
      const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const totalInvested = P * n;
      setMaturityValue(futureValue);
      setInvestedAmount(totalInvested);
      setEstReturns(futureValue - totalInvested);
    } else {
      setMaturityValue(0);
      setInvestedAmount(0);
      setEstReturns(0);
    }
  }, [monthlyInvestment, returnRate, timePeriod]);

  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, Math.min(max, value === '' ? 0 : parseFloat(value))));
  };
  
  const pieData = [
    { name: 'Invested Amount', value: investedAmount, color: 'hsl(var(--primary))' },
    { name: 'Est. Returns', value: estReturns, color: 'hsl(var(--accent))' },
  ];

  const guideProps = {
    title: "How to Use the SIP Calculator",
    steps: [
      { title: "Enter Monthly Investment", description: "Input the amount you plan to invest each month." },
      { title: "Set Expected Returns", description: "Provide the expected annual rate of return for your investment." },
      { title: "Define Time Period", description: "Specify the total duration of your investment in years to see the projected value." }
    ],
    features: [
      { icon: PiggyBank, title: "Wealth Projection", description: "See how small, consistent monthly investments can grow into a significant corpus over time through the power of compounding." },
      { icon: SlidersHorizontal, title: "Interactive Simulation", description: "Instantly adjust sliders or type in exact numbers to see how different investment amounts, returns, or timelines can affect your future wealth." },
      { icon: BarChart, title: "Visual Returns Breakdown", description: "The pie chart clearly illustrates the difference between your total investment and the estimated returns, showcasing the growth of your money." }
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
                <div className="w-40"><Input type="number" id="monthlyInvestment" value={monthlyInvestment} onChange={handleInputChange(setMonthlyInvestment, 500, 200000)} /></div>
              </div>
              <Slider min={500} max={200000} step={500} value={[monthlyInvestment]} onValueChange={(val) => setMonthlyInvestment(val[0])} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="returnRate" className="text-lg font-medium">Expected Return Rate (% p.a.)</Label>
                <div className="w-40"><Input type="number" id="returnRate" value={returnRate} onChange={handleInputChange(setReturnRate, 1, 30)} step="0.1" /></div>
              </div>
              <Slider min={1} max={30} step={0.1} value={[returnRate]} onValueChange={(val) => setReturnRate(val[0])} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="timePeriod" className="text-lg font-medium">Time Period (Years)</Label>
                <div className="w-40"><Input type="number" id="timePeriod" value={timePeriod} onChange={handleInputChange(setTimePeriod, 1, 40)} /></div>
              </div>
              <Slider min={1} max={40} step={1} value={[timePeriod]} onValueChange={(val) => setTimePeriod(val[0])} />
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
