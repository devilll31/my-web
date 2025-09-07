
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HowToUseGuide from '@/components/how-to-use-guide';
import { ArrowRightLeft, History, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return 'Invalid';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syb = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let result = '';
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      result += syb[i];
      num -= val[i];
    }
  }
  return result;
};

const fromRoman = (roman: string): number => {
    const romanMap: { [key: string]: number } = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i].toUpperCase()];
        const next = romanMap[roman[i + 1]?.toUpperCase()];
        if (current < next) {
            result -= current;
        } else {
            result += current;
        }
    }
    return isNaN(result) ? 0 : result;
};


export default function RomanNumeralConverterTool() {
  const [numberInput, setNumberInput] = useState<string>('1994');
  const [romanInput, setRomanInput] = useState<string>('MCMXCIV');

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    setNumberInput(e.target.value);
    setRomanInput(toRoman(num));
  };
  
  const handleRomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const roman = e.target.value.toUpperCase();
      setRomanInput(roman);
      const num = fromRoman(roman);
      if(num > 0 && num < 4000) {
        setNumberInput(String(num));
      } else {
        setNumberInput('');
      }
  };

  const guideProps = {
    title: "How to Use the Roman Numeral Converter",
    steps: [
      { title: "Enter a Number or Roman Numeral", description: "Type a number in the 'Arabic Number' field or a Roman numeral in the 'Roman Numeral' field." },
      { title: "Instant Conversion", description: "The other field will automatically update with the converted value." },
      { title: "Two-Way Tool", description: "Seamlessly convert from numbers to Roman numerals and back again." }
    ],
    features: [
      { icon: History, title: "Historical & Modern", description: "Easily translate between ancient Roman notation and modern Arabic numerals." },
      { icon: ArrowRightLeft, title: "Bidirectional Conversion", description: "The calculator works both ways instantly, providing a seamless user experience." },
      { icon: Calculator, title: "Simple Interface", description: "A clean and intuitive tool for quick and accurate numeral conversions." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Roman Numeral Converter</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                    <Label htmlFor="arabic-number">Arabic Number</Label>
                    <Input id="arabic-number" type="number" value={numberInput} onChange={handleNumberChange} placeholder="e.g., 2024" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="roman-numeral">Roman Numeral</Label>
                    <Input id="roman-numeral" value={romanInput} onChange={handleRomanChange} placeholder="e.g., MMXXIV" />
                </div>
            </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
