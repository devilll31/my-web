
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HowToUseGuide from '@/components/how-to-use-guide';
import { ArrowRightLeft, Globe, AlertTriangle } from 'lucide-react';

// Placeholder data - In a real app, this would come from an API.
const currencies = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'GBP', name: 'British Pound Sterling' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
];

export default function CurrencyConverterTool() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState<string>('Fetching...');

  useEffect(() => {
    // This is where you would make an API call to get the real exchange rate.
    // For this placeholder, we'll use a mock rate.
    const mockRates: { [key: string]: number } = {
      'USD-INR': 83.50,
      'EUR-INR': 90.20,
      'GBP-INR': 105.80,
      'USD-EUR': 0.92,
    };
    const rate = mockRates[`${fromCurrency}-${toCurrency}`] || (fromCurrency === toCurrency ? 1 : 1 / (mockRates[`${toCurrency}-${fromCurrency}`] || 0));
    
    if (rate && amount) {
        const result = amount * rate;
        setConvertedAmount(result.toFixed(2));
    } else {
        setConvertedAmount('N/A');
    }

  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  const guideProps = {
    title: "How to Use the Currency Converter",
    steps: [
      { title: "Enter Amount", description: "Input the amount of money you want to convert." },
      { title: "Select Currencies", description: "Choose the currency you are converting from and the currency you are converting to." },
      { title: "View Result", description: "The tool shows the converted amount based on the latest exchange rates." }
    ],
    features: [
      { icon: Globe, title: "Global Rates", description: "Access up-to-date exchange rates for major currencies from around the world." },
      { icon: ArrowRightLeft, title: "Quick Swap", description: "Instantly swap the 'from' and 'to' currencies with a single click for reverse conversions." },
      { icon: AlertTriangle, title: "Placeholder Data", description: "Note: This tool uses mock data. Exchange rates are for demonstration purposes only." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
            <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="fromCurrency">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger><SelectValue placeholder="From currency" /></SelectTrigger>
                    <SelectContent>
                        {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.code} - {c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-center">
                <button onClick={handleSwap} className="p-2 rounded-full border bg-background hover:bg-accent">
                    <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>

            <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="toCurrency">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger><SelectValue placeholder="To currency" /></SelectTrigger>
                    <SelectContent>
                        {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.code} - {c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="col-span-full grid sm:grid-cols-2 gap-4 pt-4">
                <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input type="number" id="amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} className="mt-1 text-lg" />
                </div>
                <div>
                    <Label>Converted Amount</Label>
                    <div className="w-full h-10 mt-1 flex items-center px-3 rounded-md border border-input bg-muted">
                        <span className="text-lg font-bold text-primary">{convertedAmount}</span>
                    </div>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
