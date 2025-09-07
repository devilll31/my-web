'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Percent, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function GstCalculatorTool() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');
  
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    let baseAmount = amount;
    let calculatedGst = 0;
    
    if (type === 'exclusive') {
      calculatedGst = baseAmount * (rate / 100);
      setNetAmount(baseAmount);
      setTotalAmount(baseAmount + calculatedGst);
    } else { // Inclusive
      calculatedGst = baseAmount - (baseAmount / (1 + rate / 100));
      setNetAmount(baseAmount - calculatedGst);
      setTotalAmount(baseAmount);
    }
    setGstAmount(calculatedGst);

  }, [amount, rate, type]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };
  
  const guideProps = {
    title: "How to Use the GST Calculator",
    steps: [
      { title: "Enter Amount", description: "Input the transaction amount." },
      { title: "Set GST Rate", description: "Select or enter the applicable GST rate (e.g., 5%, 12%, 18%, 28%)." },
      { title: "Choose GST Type", description: "Select if the GST is exclusive (added on top) or inclusive (part of the total amount)." }
    ],
    features: [
      { icon: Plus, title: "Add GST", description: "Quickly calculate the final price of a product or service after adding the applicable GST." },
      { icon: Minus, title: "Extract GST", description: "Easily find the base amount and the GST component from a GST-inclusive price." },
      { icon: Percent, title: "Flexible Rates", description: "Use common preset GST slabs or enter a custom rate for accurate calculations." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
                <Label htmlFor="amount">Amount</Label>
                <Input type="number" id="amount" value={amount} onChange={handleInputChange(setAmount)} className="mt-1" />
            </div>
            <div>
              <Label>GST Rate</Label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[5, 12, 18, 28].map(r => (
                        <Button key={r} variant={rate === r ? "default" : "outline"} onClick={() => setRate(r)}>{r}%</Button>
                    ))}
                </div>
                 <Input type="number" className="mt-2" value={rate || ''} onChange={handleInputChange(setRate)} placeholder="Custom Rate"/>
            </div>
            <div>
              <Label>GST Type</Label>
              <RadioGroup value={type} onValueChange={(v: 'exclusive'|'inclusive')=> setType(v)} className="mt-2 grid grid-cols-2 gap-4">
                  <Label className="border rounded-md p-3 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary">
                      <RadioGroupItem value="exclusive" id="exclusive" />
                      Add GST (Exclusive)
                  </Label>
                  <Label className="border rounded-md p-3 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary">
                      <RadioGroupItem value="inclusive" id="inclusive" />
                      Remove GST (Inclusive)
                  </Label>
              </RadioGroup>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center border border-primary/20 space-y-4">
            <div className="flex justify-between items-center text-lg">
                <p className="text-muted-foreground">Net Amount</p>
                <p className="font-bold">{formatCurrency(netAmount)}</p>
            </div>
            <div className="flex justify-between items-center text-lg">
                <p className="text-muted-foreground">GST @{rate}%</p>
                <p className="font-bold">{formatCurrency(gstAmount)}</p>
            </div>
             <div className="flex justify-between items-center text-2xl border-t pt-4">
                <p className="text-muted-foreground">Total Amount</p>
                <p className="font-extrabold text-primary">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
