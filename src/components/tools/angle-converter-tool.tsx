
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { CircleDot, Replace, Calculator } from 'lucide-react';

export default function AngleConverterTool() {
  const [degrees, setDegrees] = useState('180');
  const [radians, setRadians] = useState('3.1416');
  const [gradians, setGradians] = useState('200');

  const handleDegreesChange = (value: string) => {
    setDegrees(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setRadians((num * Math.PI / 180).toFixed(4));
      setGradians((num * 200 / 180).toFixed(4));
    } else {
      setRadians(''); setGradians('');
    }
  };

  const handleRadiansChange = (value: string) => {
    setRadians(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setDegrees((num * 180 / Math.PI).toFixed(4));
      setGradians((num * 200 / Math.PI).toFixed(4));
    } else {
      setDegrees(''); setGradians('');
    }
  };

  const handleGradiansChange = (value: string) => {
    setGradians(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setDegrees((num * 180 / 200).toFixed(4));
      setRadians((num * Math.PI / 200).toFixed(4));
    } else {
      setDegrees(''); setRadians('');
    }
  };

  const guideProps = {
    title: "How to Use the Angle Converter",
    steps: [
      { title: "Enter an Angle", description: "Input a value in any of the three units: Degrees, Radians, or Gradians." },
      { title: "Instant Conversion", description: "As you type, the other two fields will automatically update with the corresponding converted values." },
      { title: "Multi-Unit Support", description: "Seamlessly convert between the most common units for measuring angles." }
    ],
    features: [
      { icon: Replace, title: "Three-Way Conversion", description: "Effortlessly convert between degrees, radians, and gradians in real-time." },
      { icon: CircleDot, title: "For Math & Engineering", description: "An essential tool for students, engineers, and scientists working with trigonometric functions and geometric calculations." },
      { icon: Calculator, title: "Simple & Fast", description: "A clean interface for quick and accurate angle conversions without manual formulas." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Angle Converter</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="degrees">Degrees</Label>
            <Input id="degrees" type="number" value={degrees} onChange={(e) => handleDegreesChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="radians">Radians</Label>
            <Input id="radians" type="number" value={radians} onChange={(e) => handleRadiansChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gradians">Gradians</Label>
            <Input id="gradians" type="number" value={gradians} onChange={(e) => handleGradiansChange(e.target.value)} />
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
