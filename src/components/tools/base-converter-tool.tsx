
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Binary, Code, Replace } from 'lucide-react';

export default function BaseConverterTool() {
  const [decimal, setDecimal] = useState('255');
  const [binary, setBinary] = useState('11111111');
  const [octal, setOctal] = useState('377');
  const [hex, setHex] = useState('FF');

  const handleDecimalChange = (value: string) => {
    setDecimal(value);
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setBinary(num.toString(2));
      setOctal(num.toString(8));
      setHex(num.toString(16).toUpperCase());
    } else {
      setBinary(''); setOctal(''); setHex('');
    }
  };
  
  const handleBinaryChange = (value: string) => {
    setBinary(value);
    const num = parseInt(value, 2);
    if (!isNaN(num)) {
      setDecimal(String(num));
      setOctal(num.toString(8));
      setHex(num.toString(16).toUpperCase());
    } else {
      setDecimal(''); setOctal(''); setHex('');
    }
  };

  const handleOctalChange = (value: string) => {
    setOctal(value);
    const num = parseInt(value, 8);
    if (!isNaN(num)) {
      setDecimal(String(num));
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
    } else {
      setDecimal(''); setBinary(''); setHex('');
    }
  };

  const handleHexChange = (value: string) => {
    setHex(value.toUpperCase());
    const num = parseInt(value, 16);
    if (!isNaN(num)) {
      setDecimal(String(num));
      setBinary(num.toString(2));
      setOctal(num.toString(8));
    } else {
      setDecimal(''); setBinary(''); setOctal('');
    }
  };

  const guideProps = {
    title: "How to Use the Base Converter",
    steps: [
      { title: "Enter a Number", description: "Input a number in any of the four bases (Decimal, Binary, Octal, Hexadecimal)." },
      { title: "Instant Conversion", description: "As you type, the other fields will automatically update with the converted values." },
      { title: "Explore Different Bases", description: "Use this tool to understand how numbers are represented in different numeral systems." }
    ],
    features: [
      { icon: Replace, title: "Multi-Base System", description: "Seamlessly convert between Decimal (Base-10), Binary (Base-2), Octal (Base-8), and Hexadecimal (Base-16)." },
      { icon: Binary, title: "Real-Time Updates", description: "All fields are interconnected and update instantly, providing a fast and intuitive experience." },
      { icon: Code, title: "Developer's Friend", description: "An essential utility for programmers, computer science students, and anyone working with different number systems." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Number Base Converter</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="decimal">Decimal (Base 10)</Label>
            <Input id="decimal" value={decimal} onChange={(e) => handleDecimalChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="binary">Binary (Base 2)</Label>
            <Input id="binary" value={binary} onChange={(e) => handleBinaryChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="octal">Octal (Base 8)</Label>
            <Input id="octal" value={octal} onChange={(e) => handleOctalChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hex">Hexadecimal (Base 16)</Label>
            <Input id="hex" value={hex} onChange={(e) => handleHexChange(e.target.value)} />
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
