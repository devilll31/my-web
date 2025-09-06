'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Package, Scale, Target } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function BreakEvenPointCalculatorTool() {
  const [fixedCosts, setFixedCosts] = useState<number>(50000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(150);
  const [salePricePerUnit, setSalePricePerUnit] = useState<number>(250);

  const [breakEvenUnits, setBreakEvenUnits] = useState<number>(0);
  const [breakEvenRevenue, setBreakEvenRevenue] = useState<number>(0);

  useEffect(() => {
    const contributionMargin = salePricePerUnit - variableCostPerUnit;
    if (contributionMargin > 0) {
        const units = fixedCosts / contributionMargin;
        setBreakEvenUnits(units);
        setBreakEvenRevenue(units * salePricePerUnit);
    } else {
        setBreakEvenUnits(Infinity);
        setBreakEvenRevenue(Infinity);
    }
  }, [fixedCosts, variableCostPerUnit, salePricePerUnit]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };

  const guideProps = {
    title: "How to Use the Break-Even Point Calculator",
    steps: [
      { title: "Enter Fixed Costs", description: "Input your total fixed costs for a period (e.g., rent, salaries)." },
      { title: "Enter Unit Costs", description: "Provide the variable cost per unit and the selling price per unit." },
      { title: "Find Your Break-Even", description: "The calculator shows how many units you must sell to cover all your costs." }
    ],
    features: [
      { icon: Target, title: "Sales Target", description: "Determine the exact number of units you need to sell to start making a profit." },
      { icon: Scale, title: "Pricing Analysis", description: "Experiment with different price points to see how they affect your break-even point and overall profitability." },
      { icon: IndianRupee, title: "Financial Planning", description: "A crucial tool for business plans, loan applications, and strategic financial planning." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="fixedCosts">Total Fixed Costs</Label>
              <Input type="number" id="fixedCosts" value={fixedCosts || ''} onChange={handleInputChange(setFixedCosts)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="variableCostPerUnit">Variable Cost Per Unit</Label>
              <Input type="number" id="variableCostPerUnit" value={variableCostPerUnit || ''} onChange={handleInputChange(setVariableCostPerUnit)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="salePricePerUnit">Sale Price Per Unit</Label>
              <Input type="number" id="salePricePerUnit" value={salePricePerUnit || ''} onChange={handleInputChange(setSalePricePerUnit)} className="mt-1" />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center border border-primary/20 space-y-4 text-center">
            <div>
                <div className="text-lg text-muted-foreground">Break-Even Point in Units</div>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`units-${breakEvenUnits}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold text-primary"
                    >
                        {isFinite(breakEvenUnits) ? Math.ceil(breakEvenUnits).toLocaleString() : 'N/A'}
                    </motion.p>
                </AnimatePresence>
            </div>
             <div>
                <div className="text-lg text-muted-foreground">Break-Even Point in Revenue</div>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`revenue-${breakEvenRevenue}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold text-primary"
                    >
                        {isFinite(breakEvenRevenue) ? formatCurrency(breakEvenRevenue) : 'N/A'}
                    </motion.p>
                </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
