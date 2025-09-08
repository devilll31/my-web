
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import HowToUseGuide from '../how-to-use-guide';
import { Landmark, Globe } from 'lucide-react';

const locales = ['en-US', 'en-GB', 'en-IN', 'de-DE', 'ja-JP'];
const currencies = ['USD', 'GBP', 'INR', 'EUR', 'JPY'];

export default function CurrencyLocalizationFormatterTool() {
  const [locale, setLocale] = useState('en-IN');
  const [currency, setCurrency] = useState('INR');
  const [amount, setAmount] = useState(123456.78);

  const formattedCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);

  const guideProps = {
    title: "How to Use the Currency Localization Formatter",
    steps: [
      { title: "Enter an Amount", description: "Input the numerical amount you want to format." },
      { title: "Select Locale & Currency", description: "Choose the target locale (language/region) and the currency code (e.g., USD, INR)." },
      { title: "View the Result", description: "The tool displays the amount formatted according to the conventions of the selected locale, with the correct currency symbol and separators." }
    ],
    features: [
      { icon: Landmark, title: "Correct Formatting", description: "Ensures numbers are displayed with the correct decimal and grouping separators for the chosen region." },
      { icon: Globe, title: "International Standards", description: "Uses the native browser `Intl` API for accurate, standardized formatting of global currencies." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader><CardTitle className="text-center">Currency Localization Formatter</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Amount</Label>
              <Input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <Label>Locale</Label>
              <Select value={locale} onValueChange={setLocale}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{locales.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
            </div>
            <div>
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            </div>
          </div>
          <div className="pt-4 text-center">
            <Label>Formatted Output</Label>
            <div className="p-4 mt-2 text-3xl font-bold text-primary bg-primary/10 rounded-lg">{formattedCurrency}</div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
