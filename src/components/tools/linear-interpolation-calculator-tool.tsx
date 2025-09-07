
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { LineChart, CheckCircle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LinearInterpolationCalculatorTool() {
  const [x1, setX1] = useState<number>(2);
  const [y1, setY1] = useState<number>(4);
  const [x2, setX2] = useState<number>(6);
  const [y2, setY2] = useState<number>(12);
  const [x3, setX3] = useState<number>(4);
  const [y3, setY3] = useState<number | null>(null);

  useEffect(() => {
    if (x2 - x1 !== 0) {
      const result = y1 + (x3 - x1) * (y2 - y1) / (x2 - x1);
      setY3(result);
    } else {
      setY3(null);
    }
  }, [x1, y1, x2, y2, x3]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Linear Interpolation Calculator",
    steps: [
      { title: "Define Known Points", description: "Enter the coordinates for two known points (Point 1: x1, y1 and Point 2: x2, y2)." },
      { title: "Enter Target Point", description: "Input the x-coordinate (x3) of the point for which you want to find the corresponding y-coordinate." },
      { title: "View the Result", description: "The calculator instantly computes the interpolated y-coordinate (y3) based on a straight line between the two known points." }
    ],
    features: [
      { icon: LineChart, title: "Estimate Values", description: "Estimate unknown values that lie between two known data points, essential in finance, science, and engineering." },
      { icon: HelpCircle, title: "Simple Formula", description: "Based on the standard linear interpolation formula for quick and reliable results." },
      { icon: CheckCircle, title: "Real-Time Calculation", description: "Results update instantly as you change any of the input values, making it easy to test different scenarios." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Linear Interpolation Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-semibold text-center">Point 1</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div><Label htmlFor="x1">x₁</Label><Input id="x1" type="number" value={x1} onChange={handleInputChange(setX1)} /></div>
                    <div><Label htmlFor="y1">y₁</Label><Input id="y1" type="number" value={y1} onChange={handleInputChange(setY1)} /></div>
                </div>
            </div>
             <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="font-semibold text-center">Point 2</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div><Label htmlFor="x2">x₂</Label><Input id="x2" type="number" value={x2} onChange={handleInputChange(setX2)} /></div>
                    <div><Label htmlFor="y2">y₂</Label><Input id="y2" type="number" value={y2} onChange={handleInputChange(setY2)} /></div>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
             <div className="space-y-2">
                <h3 className="font-semibold text-center">Point to Find</h3>
                <Label htmlFor="x3">x₃</Label>
                <Input id="x3" type="number" value={x3} onChange={handleInputChange(setX3)} />
            </div>
             <div className="space-y-2">
                <Label>Interpolated Value (y₃)</Label>
                <motion.div key={y3} initial={{opacity:0}} animate={{opacity:1}} className="w-full text-2xl font-bold text-primary p-3 bg-primary/10 rounded-md border border-primary/20 text-center">
                  {y3 !== null ? y3.toFixed(4) : 'N/A'}
                </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
