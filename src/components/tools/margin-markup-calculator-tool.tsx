'use client';

import { useState, useEffect, useId } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Percent, TrendingUp, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function MarginMarkupCalculatorTool() {
  const [cost, setCost] = useState<number>(100);
  const [revenue, setRevenue] = useState<number>(150);
  const [margin, setMargin] = useState<number>(0);
  const [markup, setMarkup] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  
  const [lastChanged, setLastChanged] = useState<'margin' | 'markup' | 'cost' | 'revenue'>('revenue');

  useEffect(() => {
    if (lastChanged === 'cost' || lastChanged === 'revenue') {
        const p = revenue - cost;
        setProfit(p);
        if (revenue > 0) setMargin((p / revenue) * 100);
        if (cost > 0) setMarkup((p / cost) * 100);
    } else if (lastChanged === 'margin') {
        const newRevenue = cost / (1 - margin / 100);
        setRevenue(newRevenue);
        const p = newRevenue - cost;
        setProfit(p);
        if (cost > 0) setMarkup((p / cost) * 100);
    } else if (lastChanged === 'markup') {
        const newRevenue = cost * (1 + markup / 100);
        setRevenue(newRevenue);
        const p = newRevenue - cost;
        setProfit(p);
        if (newRevenue > 0) setMargin((p / newRevenue) * 100);
    }
  }, [cost, revenue, margin, markup, lastChanged]);

  const handleInputChange = (setter: (value: number) => void, changeSource: typeof lastChanged) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
    setLastChanged(changeSource);
  };

  const guideProps = {
    title: "How to Use the Margin & Markup Calculator",
    steps: [
      { title: "Enter Cost", description: "Input the total cost of the product or service." },
      { title: "Enter Revenue", description: "Provide the total revenue (selling price)." },
      { title: "View Results", description: "The calculator instantly computes your profit, margin, and markup percentages." }
    ],
    features: [
      { icon: TrendingUp, title: "Profitability Insights", description: "Understand the key difference between margin (profit relative to revenue) and markup (profit relative to cost)." },
      { icon: Percent, title: "Flexible Calculation", description: "Change any value—cost, revenue, margin, or markup—and see all other fields update automatically." },
      { icon: ShoppingCart, title: "Pricing Strategy", description: "Use this tool to set optimal selling prices for your products to achieve your desired profit margins." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="cost">Cost</Label>
              <Input type="number" id="cost" value={cost || ''} onChange={handleInputChange(setCost, 'cost')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="revenue">Revenue</Label>
              <Input type="number" id="revenue" value={revenue || ''} onChange={handleInputChange(setRevenue, 'revenue')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="margin">Gross Margin (%)</Label>
              <Input type="number" id="margin" value={margin || ''} onChange={handleInputChange(setMargin, 'margin')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="markup">Markup (%)</Label>
              <Input type="number" id="markup" value={markup || ''} onChange={handleInputChange(setMarkup, 'markup')} className="mt-1" />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center border border-primary/20 space-y-4 text-center">
            <div className="text-lg text-muted-foreground">Gross Profit</div>
             <motion.div
                key={profit}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-bold text-primary"
            >
                {formatCurrency(profit)}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
