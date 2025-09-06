
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Tag, Wallet, IndianRupee, CheckCircle, Percent } from 'lucide-react';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
};

export default function DiscountCalculatorTool() {
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discount, setDiscount] = useState<number>(25);
  
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [youSave, setYouSave] = useState<number>(0);

  useEffect(() => {
    const savings = originalPrice * (discount / 100);
    setYouSave(savings);
    setFinalPrice(originalPrice - savings);
  }, [originalPrice, discount]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };
  
  const guideProps = {
    title: "How to Use the Discount Calculator",
    steps: [
      { title: "Enter Original Price", description: "Input the initial price of the item before any discounts." },
      { title: "Set Discount Percentage", description: "Provide the discount percentage being offered (e.g., 25 for 25%)." },
      { title: "View Final Price", description: "The calculator instantly shows the price you'll pay after the discount and how much you saved." }
    ],
    features: [
      { icon: Tag, title: "Quick Calculations", description: "Instantly find out the final price of a discounted item without manual math." },
      { icon: Wallet, title: "See Your Savings", description: "Clearly see the exact amount of money you save with the discount, helping you make smart purchase decisions." },
      { icon: CheckCircle, title: "Simple and Fast", description: "A straightforward interface for quick and accurate discount calculations on the go." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
                <Label htmlFor="originalPrice">Original Price</Label>
                <Input type="number" id="originalPrice" value={originalPrice} onChange={handleInputChange(setOriginalPrice)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input type="number" id="discount" value={discount} onChange={handleInputChange(setDiscount)} className="mt-1" />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center border border-primary/20 text-center">
                <p className="text-lg text-muted-foreground">Final Price</p>
                <AnimatePresence mode="wait">
                    <motion.p 
                    key={finalPrice}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl lg:text-5xl font-bold text-primary my-2"
                    >
                    {formatCurrency(finalPrice)}
                    </motion.p>
                </AnimatePresence>
                <p className="font-bold text-lg text-green-600">You Save {formatCurrency(youSave)}</p>
            </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
