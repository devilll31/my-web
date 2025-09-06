'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, ArrowDown, ArrowUp, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function ProfitLossCalculatorTool() {
  const [costPrice, setCostPrice] = useState<number>(1000);
  const [sellingPrice, setSellingPrice] = useState<number>(1200);

  const [result, setResult] = useState<{ type: 'Profit' | 'Loss' | 'None', amount: number, percentage: number }>({ type: 'None', amount: 0, percentage: 0 });

  useEffect(() => {
    const diff = sellingPrice - costPrice;
    if (diff > 0) {
      setResult({ type: 'Profit', amount: diff, percentage: (diff / costPrice) * 100 });
    } else if (diff < 0) {
      setResult({ type: 'Loss', amount: Math.abs(diff), percentage: (Math.abs(diff) / costPrice) * 100 });
    } else {
      setResult({ type: 'None', amount: 0, percentage: 0 });
    }
  }, [costPrice, sellingPrice]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };

  const guideProps = {
    title: "How to Use the Profit/Loss Calculator",
    steps: [
      { title: "Enter Cost Price", description: "Input the total cost at which the item was acquired." },
      { title: "Enter Selling Price", description: "Provide the price at which the item was sold." },
      { title: "See the Result", description: "Instantly view whether it was a profit or loss, along with the exact amount and percentage." }
    ],
    features: [
      { icon: IndianRupee, title: "Quick Calculation", description: "Instantly calculate the profit or loss from any transaction without manual calculations." },
      { icon: TrendingUp, title: "Percentage View", description: "Understand your financial outcome not just in absolute numbers but also as a percentage of your cost." },
      { icon: ArrowUp, title: "Clear Indication", description: "The interface clearly indicates whether the transaction resulted in a profit or a loss with distinct visual cues." }
    ]
  };

  const resultColorClass = result.type === 'Profit' ? 'text-green-600' : result.type === 'Loss' ? 'text-red-600' : 'text-gray-600';

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="costPrice">Cost Price</Label>
              <Input type="number" id="costPrice" value={costPrice || ''} onChange={handleInputChange(setCostPrice)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="sellingPrice">Selling Price</Label>
              <Input type="number" id="sellingPrice" value={sellingPrice || ''} onChange={handleInputChange(setSellingPrice)} className="mt-1" />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center border border-primary/20 text-center">
             <AnimatePresence mode="wait">
                <motion.div
                    key={result.type}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className={cn("text-2xl font-bold mb-2", resultColorClass)}>{result.type}</div>
                    <div className={cn("text-5xl font-extrabold", resultColorClass)}>{formatCurrency(result.amount)}</div>
                    <div className={cn("text-xl font-semibold mt-2", resultColorClass)}>({result.percentage.toFixed(2)}%)</div>
                </motion.div>
             </AnimatePresence>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
