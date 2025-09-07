
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Superscript, CheckCircle, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExponentPowerCalculatorTool() {
  const [base, setBase] = useState<number>(2);
  const [exponent, setExponent] = useState<number>(10);
  const [result, setResult] = useState<number | string | null>(null);

  useEffect(() => {
    const res = Math.pow(base, exponent);
    setResult(res);
  }, [base, exponent]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Exponent/Power Calculator",
    steps: [
      { title: "Enter the Base", description: "Input the base number (X)." },
      { title: "Enter the Exponent", description: "Input the exponent or power (Y)." },
      { title: "View the Result", description: "The calculator instantly computes X raised to the power of Y." }
    ],
    features: [
      { icon: Superscript, title: "Exponential Calculations", description: "Quickly compute the result of any number raised to any power, including decimals and negative exponents." },
      { icon: CheckCircle, title: "Instant & Accurate", description: "Get immediate and precise results for both simple and complex exponentiation problems." },
      { icon: Calculator, title: "Fundamental Math Tool", description: "Essential for students, engineers, and scientists for a wide range of mathematical applications." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Exponent (Power) Calculator</CardTitle>
           <p className="text-center text-muted-foreground text-lg">X ʸ</p>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <Label htmlFor="base">Base (X)</Label>
              <Input type="number" id="base" value={base} onChange={handleInputChange(setBase)} />
            </div>
            <div>
              <Label htmlFor="exponent">Exponent (Y)</Label>
              <Input type="number" id="exponent" value={exponent} onChange={handleInputChange(setExponent)} />
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Result</div>
            <motion.div
              key={String(result)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-bold text-primary my-2 break-all"
            >
              {result !== null ? Number(result).toLocaleString() : 'N/A'}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
