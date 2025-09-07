
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Calculator, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';

type Matrix = number[][];

export default function DeterminantCalculatorTool() {
  const [size, setSize] = useState<'2x2' | '3x3'>('2x2');
  const [matrix, setMatrix] = useState<Matrix>([[1, 2], [3, 4]]);
  const [determinant, setDeterminant] = useState<number | null>(null);

  useEffect(() => {
    if (size === '2x2') {
      const [[a, b], [c, d]] = matrix;
      setDeterminant(a * d - b * c);
    } else { // 3x3
      const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
      const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
      setDeterminant(det);
    }
  }, [matrix, size]);

  useEffect(() => {
    if (size === '2x2') {
      setMatrix([[1, 2], [3, 4]]);
    } else {
      setMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    }
  }, [size]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const guideProps = {
    title: "How to Use the Determinant Calculator",
    steps: [
      { title: "Select Matrix Size", description: "Choose whether you are calculating the determinant for a 2x2 or a 3x3 matrix." },
      { title: "Enter Matrix Values", description: "Input the numerical values for each element of the matrix." },
      { title: "View the Determinant", description: "The calculator instantly computes and displays the determinant of the matrix." }
    ],
    features: [
      { icon: Calculator, title: "2x2 & 3x3 Support", description: "Quickly calculate determinants for both 2x2 and 3x3 square matrices." },
      { icon: Sigma, title: "Linear Algebra Tool", description: "A fundamental tool for solving systems of linear equations and understanding matrix properties." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <RadioGroup value={size} onValueChange={(v: '2x2' | '3x3') => setSize(v)} className="flex justify-center gap-4">
              <Label className="border rounded-md p-3 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="2x2" id="2x2" /> 2x2</Label>
              <Label className="border rounded-md p-3 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="3x3" id="3x3" /> 3x3</Label>
            </RadioGroup>
            <div className="space-y-2 p-4 border rounded-lg">
              <h3 className="font-semibold text-center mb-2">Matrix</h3>
              {matrix.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-2">
                  {row.map((val, cIdx) => (
                    <Input key={cIdx} type="number" value={val} onChange={e => handleInputChange(rIdx, cIdx, e.target.value)} className="w-full text-center" />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center h-full">
            <div className="text-lg text-muted-foreground">Determinant</div>
            <motion.div key={determinant} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl font-bold text-primary my-2">
              {determinant !== null ? determinant : 'N/A'}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
