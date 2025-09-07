'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Calculator, Plus, Minus, X, AlertTriangle, GitCommitVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Matrix = number[][];
type Operation = 'add' | 'subtract' | 'multiply' | 'inverse';

const MatrixInput = ({ matrix, setMatrix, disabled }: { matrix: Matrix, setMatrix: (m: Matrix) => void, disabled?: boolean }) => {
  const handleInputChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  return (
    <div className="space-y-2">
      {matrix.map((row, rIdx) => (
        <div key={rIdx} className="flex gap-2">
          {row.map((val, cIdx) => (
            <Input key={cIdx} type="number" value={val} onChange={e => handleInputChange(rIdx, cIdx, e.target.value)} className="w-full text-center" disabled={disabled} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default function MatrixCalculatorTool() {
  const [matrixA, setMatrixA] = useState<Matrix>([[4, 7], [2, 6]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[5, 6], [7, 8]]);
  const [result, setResult] = useState<Matrix | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation>('add');

  useEffect(() => {
    try {
      setError(null);
      let res: Matrix;
      if (operation === 'add' || operation === 'subtract') {
        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
          throw new Error('Matrices must have the same dimensions for addition/subtraction.');
        }
        res = matrixA.map((row, r) => row.map((val, c) => operation === 'add' ? val + matrixB[r][c] : val - matrixB[r][c]));
      } else if (operation === 'multiply') { 
        if (matrixA[0].length !== matrixB.length) {
          throw new Error('Columns of Matrix A must equal rows of Matrix B for multiplication.');
        }
        res = Array(matrixA.length).fill(0).map(() => Array(matrixB[0].length).fill(0));
        for (let i = 0; i < matrixA.length; i++) {
          for (let j = 0; j < matrixB[0].length; j++) {
            for (let k = 0; k < matrixA[0].length; k++) {
              res[i][j] += matrixA[i][k] * matrixB[k][j];
            }
          }
        }
      } else { // Inverse
        if (matrixA.length !== matrixA[0].length) throw new Error('Matrix must be square to have an inverse.');
        const det = (matrixA[0][0] * matrixA[1][1]) - (matrixA[0][1] * matrixA[1][0]);
        if (det === 0) throw new Error('Matrix is not invertible (determinant is 0).');
        const invDet = 1 / det;
        res = [
            [matrixA[1][1] * invDet, -matrixA[0][1] * invDet],
            [-matrixA[1][0] * invDet, matrixA[0][0] * invDet]
        ];
      }
      setResult(res);
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  }, [matrixA, matrixB, operation]);

  const guideProps = {
    title: "How to Use the Matrix Calculator",
    steps: [
      { title: "Enter Matrices", description: "Input the numerical values for Matrix A and Matrix B (Matrix B is ignored for Inverse)." },
      { title: "Select Operation", description: "Choose to add, subtract, multiply, or find the inverse of Matrix A." },
      { title: "View the Result", description: "The calculator instantly computes the resulting matrix. Errors are shown for invalid operations." }
    ],
    features: [
      { icon: Plus, title: "Addition & Subtraction", description: "Easily add or subtract two matrices of the same dimensions." },
      { icon: X, title: "Multiplication", description: "Perform matrix multiplication, with automatic dimension validation." },
      { icon: GitCommitVertical, title: "Matrix Inverse", description: "Calculate the inverse of a 2x2 square matrix, essential for solving linear equations." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div><h3 className="font-semibold text-center mb-2">Matrix A</h3><MatrixInput matrix={matrixA} setMatrix={setMatrixA} /></div>
            <div><h3 className="font-semibold text-center mb-2">Matrix B</h3><MatrixInput matrix={matrixB} setMatrix={setMatrixB} disabled={operation === 'inverse'} /></div>
          </div>
          <div className="flex justify-center gap-2 mb-6">
            <Button variant={operation === 'add' ? 'default' : 'outline'} onClick={() => setOperation('add')}><Plus /></Button>
            <Button variant={operation === 'subtract' ? 'default' : 'outline'} onClick={() => setOperation('subtract')}><Minus /></Button>
            <Button variant={operation === 'multiply' ? 'default' : 'outline'} onClick={() => setOperation('multiply')}><X /></Button>
            <Button variant={operation === 'inverse' ? 'default' : 'outline'} onClick={() => setOperation('inverse')}>Inverse A</Button>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Result</h3>
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                  <AlertTriangle /> {error}
                </motion.div>
              ) : result && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-primary/10 rounded-lg inline-block border border-primary/20">
                  {result.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-2 mb-2 last:mb-0">
                      {row.map((val, cIdx) => (
                        <div key={cIdx} className="w-20 h-10 flex items-center justify-center font-bold text-lg bg-background rounded">
                          {val.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
