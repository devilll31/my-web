
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { ArrowRightLeft, FlaskConical, Calculator } from 'lucide-react';

export default function ScientificNotationConverterTool() {
  const [decimal, setDecimal] = useState('12345.67');
  const [scientific, setScientific] = useState('1.234567e+4');

  const handleDecimalChange = (value: string) => {
    setDecimal(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setScientific(num.toExponential());
    } else {
      setScientific('');
    }
  };

  const handleScientificChange = (value: string) => {
    setScientific(value);
    try {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setDecimal(String(num));
      } else {
        setDecimal('');
      }
    } catch {
      setDecimal('Invalid Input');
    }
  };
  
  const guideProps = {
    title: "How to Use the Scientific Notation Converter",
    steps: [
      { title: "Enter a Number", description: "Input a standard decimal number or a number in scientific (exponential) notation." },
      { title: "Instant Conversion", description: "The other field automatically updates to show the converted value." },
      { title: "Handle Large & Small Numbers", description: "Easily work with very large or very small numbers in a compact format." }
    ],
    features: [
      { icon: ArrowRightLeft, title: "Two-Way Conversion", description: "Instantly convert from standard decimal format to scientific notation and vice-versa." },
      { icon: FlaskConical, title: "Scientific Standard", description: "Essential for scientists, engineers, and students who frequently work with large or small quantities." },
      { icon: Calculator, title: "Easy to Use", description: "A simple and straightforward interface for quick conversions without manual calculations." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Scientific Notation Converter</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="decimal">Standard Decimal Number</Label>
            <Input id="decimal" value={decimal} onChange={(e) => handleDecimalChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scientific">Scientific Notation</Label>
            <Input id="scientific" value={scientific} onChange={(e) => handleScientificChange(e.target.value)} />
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
