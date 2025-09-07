'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IndianRupee, Percent, Users, Utensils } from 'lucide-react';
import HowToUseGuide from '@/components/how-to-use-guide';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function TipCalculatorTool() {
  const [bill, setBill] = useState(1000);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);
  
  const [tipAmount, setTipAmount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [perPerson, setPerPerson] = useState(0);

  useEffect(() => {
    const tip = bill * (tipPercent / 100);
    const total = bill + tip;
    setTipAmount(tip);
    setTotalBill(total);
    setPerPerson(people > 0 ? total / people : 0);
  }, [bill, tipPercent, people]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Tip Calculator",
    steps: [
      { title: "Enter Bill Amount", description: "Input the total bill from your receipt." },
      { title: "Select Tip & People", description: "Choose a tip percentage and enter the number of people splitting the bill." },
      { title: "Get Your Totals", description: "The tool calculates the tip amount, the final bill, and the cost per person." }
    ],
    features: [
      { icon: Percent, title: "Flexible Tip Rates", description: "Quickly select common tip percentages or enter a custom amount for precise tipping." },
      { icon: Users, title: "Easy Bill Splitting", description: "Effortlessly split the total bill, including the tip, among any number of people." },
      { icon: Utensils, title: "Dining Out Made Simple", description: "Take the guesswork out of restaurant tipping and bill splitting with this fast and easy tool." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label>Bill Amount</Label>
              <Input type="number" value={bill || ''} onChange={handleInputChange(setBill)} />
            </div>
            <div>
              <Label>Tip Percentage</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[10, 15, 20].map(p => <Button key={p} variant={tipPercent === p ? "default" : "outline"} onClick={() => setTipPercent(p)}>{p}%</Button>)}
              </div>
               <Input type="number" className="mt-2" value={tipPercent || ''} onChange={handleInputChange(setTipPercent)} />
            </div>
            <div>
              <Label>Number of People</Label>
              <Input type="number" value={people || ''} onChange={handleInputChange(setPeople)} min="1"/>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center border border-primary/20 space-y-4">
            <div className="flex justify-between items-baseline text-lg">
                <p className="text-muted-foreground">Tip Amount</p><p className="font-bold">{formatCurrency(tipAmount)}</p>
            </div>
             <div className="flex justify-between items-baseline text-lg">
                <p className="text-muted-foreground">Total Bill</p><p className="font-bold">{formatCurrency(totalBill)}</p>
            </div>
             <div className="border-t pt-4 mt-4">
                 <p className="text-muted-foreground text-center">Total Per Person</p>
                 <p className="font-extrabold text-4xl text-primary text-center">{formatCurrency(perPerson)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
