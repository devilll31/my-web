
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { FunctionSquare, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuadraticEquationSolverTool() {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-3);
  const [c, setC] = useState<number>(2);
  const [roots, setRoots] = useState<{ x1: string; x2: string } | string>('');

  useEffect(() => {
    const discriminant = b * b - 4 * a * c;

    if (a === 0) {
        setRoots("Not a quadratic equation (a=0).");
        return;
    }

    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      setRoots({ x1: root1.toFixed(4), x2: root2.toFixed(4) });
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      setRoots({ x1: root.toFixed(4), x2: root.toFixed(4) });
    } else {
      const realPart = (-b / (2 * a)).toFixed(4);
      const imaginaryPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
      setRoots({ x1: `${realPart} + ${imaginaryPart}i`, x2: `${realPart} - ${imaginaryPart}i` });
    }
  }, [a, b, c]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Quadratic Equation Solver",
    steps: [
      { title: "Enter Coefficients", description: "Input the values for coefficients a, b, and c from the equation ax² + bx + c = 0." },
      { title: "View the Roots", description: "The calculator instantly solves for x, providing the two roots of the equation." },
      { title: "Complex Roots", description: "The tool handles real, repeated, and complex (imaginary) roots automatically." }
    ],
    features: [
      { icon: FunctionSquare, title: "Solve for x", description: "Quickly find the roots of any quadratic equation without manual calculation." },
      { icon: HelpCircle, title: "Discriminant Logic", description: "Correctly identifies and computes real, identical, or complex roots based on the discriminant." },
      { icon: CheckCircle, title: "Instant & Accurate", description: "Get immediate and precise solutions for your algebraic equations, perfect for students and professionals." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Quadratic Equation Solver</CardTitle>
           <p className="text-center text-muted-foreground text-lg">ax² + bx + c = 0</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coeff-a">Coefficient a</Label>
              <Input type="number" id="coeff-a" value={a} onChange={handleInputChange(setA)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coeff-b">Coefficient b</Label>
              <Input type="number" id="coeff-b" value={b} onChange={handleInputChange(setB)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coeff-c">Coefficient c</Label>
              <Input type="number" id="coeff-c" value={c} onChange={handleInputChange(setC)} />
            </div>
          </div>
          
          <div>
            <Label>Roots (x)</Label>
            <motion.div key={JSON.stringify(roots)} initial={{opacity:0}} animate={{opacity:1}} className="w-full text-2xl font-bold text-primary p-4 bg-primary/10 rounded-md border border-primary/20 mt-2 text-center">
              {typeof roots === 'string' ? (
                <span>{roots}</span>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <span>x₁ = {roots.x1}</span>
                    <span>x₂ = {roots.x2}</span>
                </div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
