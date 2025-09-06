
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Percent, Plus, Minus, ShoppingCart, Landmark } from 'lucide-react';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
};

export default function VatSalesTaxCalculatorTool() {
  const [amount, setAmount] = useState<number>(100);
  const [rate, setRate] = useState<number>(8.25);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');
  
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    let baseAmount = amount;
    let calculatedTax = 0;
    
    if (type === 'exclusive') {
      calculatedTax = baseAmount * (rate / 100);
      setNetAmount(baseAmount);
      setTotalAmount(baseAmount + calculatedTax);
    } else { // Inclusive
      calculatedTax = baseAmount - (baseAmount / (1 + rate / 100));
      setNetAmount(baseAmount - calculatedTax);
      setTotalAmount(baseAmount);
    }
    setTaxAmount(calculatedTax);

  }, [amount, rate, type]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };
  
  const guideProps = {
    title: "How to Use the VAT/Sales Tax Calculator",
    steps: [
      { title: "Enter Amount", description: "Input the price of the goods or services." },
      { title: "Set Tax Rate", description: "Enter the applicable VAT or Sales Tax rate for your region." },
      { title: "Choose Tax Type", description: "Select if the tax should be added to the price (exclusive) or if it's already included (inclusive)." }
    ],
    features: [
      { icon: Plus, title: "Add Tax", description: "Quickly find the total cost of an item by adding the sales tax on top of the listed price." },
      { icon: Minus, title: "Extract Tax", description: "Easily determine the pre-tax price and the tax amount from a total bill." },
      { icon: Landmark, title: "Universal Use", description: "Works for both VAT (Value Added Tax) and standard sales tax systems in any country." }
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
              <Label htmlFor="rate">Tax Rate (%)</Label>
              <Input type="number" id="rate" value={rate} onChange={handleInputChange(setRate)} className="mt-1" step="0.01" />
            </div>
            <div>
              <Label>Tax Type</Label>
              <RadioGroup value={type} onValueChange={(v: 'exclusive'|'inclusive')=> setType(v)} className="mt-2 grid grid-cols-2 gap-4">
                  <Label className="border rounded-md p-3 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary">
                      <RadioGroupItem value="exclusive" id="exclusive" />
                      Add Tax (Exclusive)
                  </Label>
                  <Label className="border rounded-md p-3 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary">
                      <RadioGroupItem value="inclusive" id="inclusive" />
                      Remove Tax (Inclusive)
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
                <p className="text-muted-foreground">Tax @{rate}%</p>
                <p className="font-bold">{formatCurrency(taxAmount)}</p>
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
