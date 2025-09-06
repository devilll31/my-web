'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Briefcase, PiggyBank, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function RetirementCorpusCalculatorTool() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [expectedInflation, setExpectedInflation] = useState(6);
  const [returnsPostRetirement, setReturnsPostRetirement] = useState(7);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const [retirementCorpus, setRetirementCorpus] = useState(0);
  const [futureMonthlyExpenses, setFutureMonthlyExpenses] = useState(0);

  useEffect(() => {
    const yearsToRetire = retirementAge - currentAge;
    const futureExpenses = monthlyExpenses * Math.pow(1 + expectedInflation / 100, yearsToRetire);
    setFutureMonthlyExpenses(futureExpenses);

    const realRateOfReturn = ((1 + returnsPostRetirement / 100) / (1 + expectedInflation / 100)) - 1;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    if (realRateOfReturn > 0) {
        const annualExpenses = futureExpenses * 12;
        const corpus = (annualExpenses / realRateOfReturn) * (1 - (1 / Math.pow(1 + realRateOfReturn, yearsInRetirement)));
        setRetirementCorpus(corpus);
    } else {
        setRetirementCorpus(Infinity); // Cannot outpace inflation
    }

  }, [currentAge, retirementAge, monthlyExpenses, expectedInflation, returnsPostRetirement, lifeExpectancy]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  const handleSliderChange = (setter: (value: number) => void) => (value: number[]) => {
      setter(value[0]);
  }

  const guideProps = {
    title: "How to Use the Retirement Corpus Calculator",
    steps: [
      { title: "Enter Current Details", description: "Input your current age, retirement age, and current monthly expenses." },
      { title: "Define Future Assumptions", description: "Set the expected inflation rate, post-retirement returns, and your life expectancy." },
      { title: "Get Your Target Corpus", description: "The calculator estimates the total amount you'll need to accumulate for a comfortable retirement." }
    ],
    features: [
      { icon: Target, title: "Clear Financial Goal", description: "Gives you a tangible target for your retirement savings, making planning more effective." },
      { icon: TrendingDown, title: "Inflation-Adjusted", description: "Calculates your future expenses based on inflation to give you a realistic view of your needs." },
      { icon: Briefcase, title: "Lifecycle Planning", description: "Helps you plan for your entire retirement period, from your retirement day to your life expectancy." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label>Current Age ({currentAge})</Label>
              <Slider value={[currentAge]} onValueChange={handleSliderChange(setCurrentAge)} min={18} max={60} />
            </div>
             <div>
              <Label>Retirement Age ({retirementAge})</Label>
              <Slider value={[retirementAge]} onValueChange={handleSliderChange(setRetirementAge)} min={currentAge+1} max={70} />
            </div>
            <div>
              <Label>Current Monthly Expenses</Label>
              <Input type="number" value={monthlyExpenses} onChange={handleInputChange(setMonthlyExpenses)} />
            </div>
             <div>
              <Label>Expected Inflation Rate ({expectedInflation}%)</Label>
              <Slider value={[expectedInflation]} onValueChange={handleSliderChange(setExpectedInflation)} min={1} max={15} step={0.5}/>
            </div>
             <div>
              <Label>Post-Retirement Returns ({returnsPostRetirement}%)</Label>
              <Slider value={[returnsPostRetirement]} onValueChange={handleSliderChange(setReturnsPostRetirement)} min={1} max={15} step={0.5}/>
            </div>
             <div>
              <Label>Life Expectancy ({lifeExpectancy})</Label>
              <Slider value={[lifeExpectancy]} onValueChange={handleSliderChange(setLifeExpectancy)} min={retirementAge+1} max={100} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">You will need a corpus of</div>
             <motion.div
                key={retirementCorpus}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-bold text-primary my-2"
            >
                {isFinite(retirementCorpus) ? formatCurrency(retirementCorpus) : 'Goal is unachievable'}
            </motion.div>
            <p className="text-muted-foreground mt-4">To manage monthly expenses of <strong className="text-foreground">{formatCurrency(futureMonthlyExpenses)}</strong> at retirement.</p>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
