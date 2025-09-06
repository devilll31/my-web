
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { PiggyBank, Calendar, Percent, CheckCircle, SlidersHorizontal, BarChart, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function NpsCalculatorTool() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [expectedReturns, setExpectedReturns] = useState<number>(10);
  
  const [totalCorpus, setTotalCorpus] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalGain, setTotalGain] = useState<number>(0);
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(0);
  const [annuityAmount, setAnnuityAmount] = useState<number>(0);
  const [monthlyPension, setMonthlyPension] = useState<number>(0);

  useEffect(() => {
    const investmentPeriod = retirementAge - currentAge;
    if (investmentPeriod <= 0) {
        setTotalCorpus(0);
        setTotalInvestment(0);
        setTotalGain(0);
        setLumpsumAmount(0);
        setAnnuityAmount(0);
        setMonthlyPension(0);
        return;
    };
    
    const i = expectedReturns / 100 / 12;
    const n = investmentPeriod * 12;
    const P = monthlyInvestment;

    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    
    setTotalCorpus(futureValue);
    const invested = P * n;
    setTotalInvestment(invested);
    setTotalGain(futureValue - invested);

    // Assuming 60% lumpsum withdrawal and 40% for annuity, with 6% return on annuity
    const lumpsum = futureValue * 0.6;
    const annuityCorpus = futureValue * 0.4;
    setLumpsumAmount(lumpsum);
    setAnnuityAmount(annuityCorpus);
    setMonthlyPension((annuityCorpus * (6 / 100)) / 12);

  }, [monthlyInvestment, currentAge, retirementAge, expectedReturns]);

  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(Math.max(min, Math.min(max, value === '' ? 0 : parseFloat(value))));
  };

  const pieData = [
    { name: 'Total Investment', value: totalInvestment, color: 'hsl(var(--primary))' },
    { name: 'Total Gain', value: totalGain, color: 'hsl(var(--accent))' },
  ];

  const guideProps = {
    title: "How to Use the NPS Calculator",
    steps: [
      { title: "Enter Investment & Age", description: "Input your monthly contribution, your current age, and your desired retirement age." },
      { title: "Set Expected Returns", description: "Provide the expected annual rate of return on your NPS investment." },
      { title: "Analyze Your Retirement", description: "The tool projects your total corpus, pension, and lumpsum amount for a secure retirement." }
    ],
    features: [
      { icon: Briefcase, title: "Retirement Planning", description: "Plan effectively for your retirement by projecting your National Pension System corpus and monthly pension." },
      { icon: SlidersHorizontal, title: "Scenario Analysis", description: "Adjust your contributions, age, and expected returns to see how different scenarios can impact your financial future." },
      { icon: BarChart, title: "Corpus Breakdown", description: "The pie chart gives a clear visual of your total contributions versus the wealth gained through compounding over the years." }
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
                <Label htmlFor="currentAge" className="text-lg font-medium">Your Current Age</Label>
                <div className="w-40"><Input type="number" id="currentAge" value={currentAge} onChange={handleInputChange(setCurrentAge, 18, 59)} /></div>
              </div>
              <Slider min={18} max={59} step={1} value={[currentAge]} onValueChange={(val) => setCurrentAge(val[0])} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="retirementAge" className="text-lg font-medium">Retirement Age</Label>
                <div className="w-40"><Input type="number" id="retirementAge" value={retirementAge} onChange={handleInputChange(setRetirementAge, currentAge + 1, 70)} /></div>
              </div>
              <Slider min={currentAge + 1} max={70} step={1} value={[retirementAge]} onValueChange={(val) => setRetirementAge(val[0])} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="expectedReturns" className="text-lg font-medium">Expected Returns (% p.a.)</Label>
                <div className="w-40"><Input type="number" id="expectedReturns" value={expectedReturns} onChange={handleInputChange(setExpectedReturns, 5, 15)} step="0.1" /></div>
              </div>
              <Slider min={5} max={15} step={0.1} value={[expectedReturns]} onValueChange={(val) => setExpectedReturns(val[0])} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20">
            <div className="text-center w-full">
              <p className="text-lg text-muted-foreground">Total Corpus</p>
              <AnimatePresence mode="wait">
                <motion.p key={totalCorpus} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-4xl lg:text-5xl font-bold text-primary my-2">{formatCurrency(totalCorpus)}</motion.p>
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
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                 <div className="text-left"><p className="text-muted-foreground">Pension/Month</p><p className="font-bold text-lg">{formatCurrency(monthlyPension)}</p></div>
                 <div className="text-right"><p className="text-muted-foreground">Lumpsum (60%)</p><p className="font-bold text-lg">{formatCurrency(lumpsumAmount)}</p></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
