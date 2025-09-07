'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Calculator, FunctionSquare, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Operator = '+' | '-' | '*' | '/';

export default function ScientificCalculatorTool() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const performOperation = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (left: number, right: number, op: Operator): number => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
      default: return right;
    }
  };
  
  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && currentValue !== null) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(result));
      setCurrentValue(result);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleUnaryOperation = (operation: (n: number) => number) => {
    const inputValue = parseFloat(display);
    const result = operation(inputValue);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const buttons = [
    { label: '(', action: () => {}, type: 'op' },
    { label: ')', action: () => {}, type: 'op' },
    { label: 'mc', action: () => {}, type: 'op' },
    { label: 'm+', action: () => {}, type: 'op' },
    { label: 'm-', action: () => {}, type: 'op' },
    { label: 'mr', action: () => {}, type: 'op' },
    { label: 'C', action: clearAll, type: 'op' },
    { label: '+/-', action: () => handleUnaryOperation(n => -n), type: 'op' },
    { label: '%', action: () => handleUnaryOperation(n => n / 100), type: 'op' },
    { label: '/', action: () => performOperation('/'), type: 'op' },
    { label: '2nd', action: () => {}, type: 'func' },
    { label: 'x²', action: () => handleUnaryOperation(n => n * n), type: 'func' },
    { label: 'x³', action: () => handleUnaryOperation(n => n * n * n), type: 'func' },
    { label: 'xʸ', action: () => {}, type: 'func' },
    { label: 'eˣ', action: () => handleUnaryOperation(n => Math.exp(n)), type: 'func' },
    { label: '10ˣ', action: () => handleUnaryOperation(n => 10 ** n), type: 'func' },
    { label: '7', action: () => inputDigit('7'), type: 'num' },
    { label: '8', action: () => inputDigit('8'), type: 'num' },
    { label: '9', action: () => inputDigit('9'), type: 'num' },
    { label: '*', action: () => performOperation('*'), type: 'op' },
    { label: '¹/x', action: () => handleUnaryOperation(n => 1/n), type: 'func' },
    { label: '√x', action: () => handleUnaryOperation(n => Math.sqrt(n)), type: 'func' },
    { label: '∛x', action: () => handleUnaryOperation(n => Math.cbrt(n)), type: 'func' },
    { label: 'ʸ√x', action: () => {}, type: 'func' },
    { label: 'ln', action: () => handleUnaryOperation(n => Math.log(n)), type: 'func' },
    { label: 'log₁₀', action: () => handleUnaryOperation(n => Math.log10(n)), type: 'func' },
    { label: '4', action: () => inputDigit('4'), type: 'num' },
    { label: '5', action: () => inputDigit('5'), type: 'num' },
    { label: '6', action: () => inputDigit('6'), type: 'num' },
    { label: '-', action: () => performOperation('-'), type: 'op' },
    { label: 'x!', action: () => handleUnaryOperation(n => {
        if (n < 0) return NaN;
        if (n === 0) return 1;
        let r = 1;
        for (let i = n; i > 0; i--) r *= i;
        return r;
    }), type: 'func' },
    { label: 'sin', action: () => handleUnaryOperation(n => Math.sin(n * Math.PI / 180)), type: 'func' },
    { label: 'cos', action: () => handleUnaryOperation(n => Math.cos(n * Math.PI / 180)), type: 'func' },
    { label: 'tan', action: () => handleUnaryOperation(n => Math.tan(n * Math.PI / 180)), type: 'func' },
    { label: 'e', action: () => { setDisplay(String(Math.E)); setWaitingForOperand(true); }, type: 'func' },
    { label: 'EE', action: () => {}, type: 'func' },
    { label: '1', action: () => inputDigit('1'), type: 'num' },
    { label: '2', action: () => inputDigit('2'), type: 'num' },
    { label: '3', action: () => inputDigit('3'), type: 'num' },
    { label: '+', action: () => performOperation('+'), type: 'op' },
    { label: 'Rad', action: () => {}, type: 'func' },
    { label: 'sinh', action: () => handleUnaryOperation(n => Math.sinh(n)), type: 'func' },
    { label: 'cosh', action: () => handleUnaryOperation(n => Math.cosh(n)), type: 'func' },
    { label: 'tanh', action: () => handleUnaryOperation(n => Math.tanh(n)), type: 'func' },
    { label: 'π', action: () => { setDisplay(String(Math.PI)); setWaitingForOperand(true); }, type: 'func' },
    { label: 'Rand', action: () => { setDisplay(String(Math.random())); setWaitingForOperand(true); }, type: 'func' },
    { label: '0', action: () => inputDigit('0'), type: 'num' },
    { label: '.', action: inputDecimal, type: 'num' },
    { label: '=', action: handleEquals, type: 'op' },
  ];

  const guideProps = {
    title: "How to Use the Scientific Calculator",
    steps: [
      { title: "Perform Basic Math", description: "Use the number pad and standard operators (+, -, *, /) for basic arithmetic." },
      { title: "Use Scientific Functions", description: "Access advanced functions like square root (√), powers (x²), logarithms (ln), and trigonometric functions (sin, cos)." },
      { title: "Clear and Continue", description: "Use the 'C' button to clear the current calculation and start a new one." }
    ],
    features: [
      { icon: Calculator, title: "All-in-One", description: "Combines a standard calculator with advanced scientific functionalities for all your calculation needs." },
      { icon: FunctionSquare, title: "Advanced Operations", description: "Supports trigonometric, logarithmic, exponential, and factorial operations for complex calculations." },
      { icon: Sigma, title: "User-Friendly Interface", description: "A familiar and intuitive layout that makes it easy to find the functions you need quickly." }
    ]
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto shadow-lg border-border/50">
        <CardContent className="p-4">
          <div className="bg-muted rounded-lg px-4 py-2 text-right mb-4 overflow-x-auto">
            <motion.div key={display} initial={{opacity:0.5}} animate={{opacity:1}} className="text-4xl font-mono text-foreground font-bold">{display}</motion.div>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {buttons.map((btn, i) => {
              const colSpan = (btn.label === '0' || btn.label === '=') ? 'col-span-2' : '';
              
              const buttonClasses = cn(
                'text-lg h-14',
                colSpan,
                {
                  'bg-primary/20 hover:bg-primary/30 text-primary': btn.type === 'op' && btn.label !== '=',
                  'bg-muted hover:bg-muted/80 text-foreground': btn.type === 'num',
                  'bg-secondary hover:bg-secondary/80 text-secondary-foreground': btn.type === 'func',
                  'bg-primary hover:bg-primary/80 text-primary-foreground': btn.label === '=',
                }
              );
              
              return (
                  <Button key={i} onClick={btn.action} className={buttonClasses}>
                    {btn.label}
                  </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
