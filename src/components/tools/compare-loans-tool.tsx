
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import HowToUseGuide from '@/components/how-to-use-guide';
import { CheckCircle, SlidersHorizontal, BarChart, GitCompareArrows } from 'lucide-react';

interface LoanDetails {
  amount: number;
  rate: number;
  tenure: number;
}

interface LoanResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

const calculateLoan = (loan: LoanDetails): LoanResult => {
    const principal = loan.amount;
    const rate = loan.rate / 12 / 100;
    const tenureMonths = loan.tenure * 12;

    if (principal > 0 && rate > 0 && tenureMonths > 0) {
      const emiValue = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
      const totalPaymentValue = emiValue * tenureMonths;
      const totalInterestValue = totalPaymentValue - principal;
      return { emi: emiValue, totalInterest: totalInterestValue, totalPayment: totalPaymentValue };
    }
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
};

const LoanInputCard = ({ loan, setLoan, title }: { loan: LoanDetails, setLoan: (loan: LoanDetails) => void, title: string }) => {
    
    const handleSliderChange = (key: keyof LoanDetails) => (value: number[]) => {
      setLoan({ ...loan, [key]: value[0] });
    };

    const handleInputChange = (key: keyof LoanDetails, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let numValue = parseFloat(value);
      if (value === '' || isNaN(numValue)) {
        numValue = 0;
      }
      if (numValue <= max) {
        setLoan({ ...loan, [key]: Math.max(min, numValue) });
      }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-headline">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor={`${title}-amount`}>Loan Amount</Label>
                    <Input type="number" id={`${title}-amount`} value={loan.amount} onChange={handleInputChange('amount', 10000, 100000000)} />
                    <Slider min={10000} max={100000000} step={10000} value={[loan.amount]} onValueChange={handleSliderChange('amount')} />
                </div>
                <div>
                    <Label htmlFor={`${title}-rate`}>Interest Rate (%)</Label>
                    <Input type="number" id={`${title}-rate`} value={loan.rate} onChange={handleInputChange('rate', 1, 25)} step="0.05" />
                    <Slider min={1} max={25} step={0.05} value={[loan.rate]} onValueChange={handleSliderChange('rate')} />
                </div>
                <div>
                    <Label htmlFor={`${title}-tenure`}>Loan Tenure (Years)</Label>
                    <Input type="number" id={`${title}-tenure`} value={loan.tenure} onChange={handleInputChange('tenure', 1, 30)} />
                    <Slider min={1} max={30} step={1} value={[loan.tenure]} onValueChange={handleSliderChange('tenure')} />
                </div>
            </CardContent>
        </Card>
    );
};

const ResultDisplay = ({ result, title }: { result: LoanResult, title: string }) => (
    <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-lg text-muted-foreground">Monthly EMI</p>
        <p className="text-3xl font-bold text-primary mb-4">{formatCurrency(result.emi)}</p>
        <p className="text-muted-foreground">Total Interest</p>
        <p className="font-semibold text-lg mb-2">{formatCurrency(result.totalInterest)}</p>
        <p className="text-muted-foreground">Total Payment</p>
        <p className="font-semibold text-lg">{formatCurrency(result.totalPayment)}</p>
    </div>
);

export default function CompareLoansTool() {
  const [loan1, setLoan1] = useState<LoanDetails>({ amount: 5000000, rate: 8.5, tenure: 20 });
  const [loan2, setLoan2] = useState<LoanDetails>({ amount: 5000000, rate: 9.0, tenure: 25 });
  
  const result1 = calculateLoan(loan1);
  const result2 = calculateLoan(loan2);

  const difference = {
      emi: result1.emi - result2.emi,
      interest: result1.totalInterest - result2.totalInterest,
      payment: result1.totalPayment - result2.totalPayment,
  };

  const getDifferenceClass = (value: number) => {
    if (value < 0) return "text-green-600"; // Loan 2 is cheaper
    if (value > 0) return "text-red-600"; // Loan 1 is cheaper
    return "text-muted-foreground";
  }
  
  const guideProps = {
    title: "How to Compare Loans",
    steps: [
      { title: "Enter Loan 1 Details", description: "Input the amount, interest rate, and tenure for the first loan scenario." },
      { title: "Enter Loan 2 Details", description: "Do the same for the second loan to create a comparison." },
      { title: "Analyze the Difference", description: "The tool shows you the difference in EMI, interest, and total payment, helping you pick the better option." }
    ],
    features: [
      { icon: GitCompareArrows, title: "Side-by-Side View", description: "Directly compare two loan scenarios to easily see the financial implications of each." },
      { icon: SlidersHorizontal, title: "Real-time Adjustments", description: "Modify any loan parameter and instantly see how it affects the outcome and the difference between the two loans." },
      { icon: CheckCircle, title: "Confident Decision-Making", description: "Make a well-informed choice by understanding the long-term cost differences between loan offers." }
    ]
  };

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LoanInputCard loan={loan1} setLoan={setLoan1} title="Loan 1" />
            <LoanInputCard loan={loan2} setLoan={setLoan2} title="Loan 2" />
        </div>

        <Card className="mt-8 bg-card shadow-lg border-border/50">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-headline">Comparison Results</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                    <ResultDisplay result={result1} title="Loan 1" />
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Difference</h3>
                        <p className="text-lg text-muted-foreground">Monthly EMI</p>
                        <p className={`text-3xl font-bold mb-4 ${getDifferenceClass(difference.emi)}`}>
                            {formatCurrency(Math.abs(difference.emi))}
                        </p>
                        <p className="text-muted-foreground">Total Interest</p>
                        <p className={`font-semibold text-lg mb-2 ${getDifferenceClass(difference.interest)}`}>
                           {formatCurrency(Math.abs(difference.interest))}
                        </p>
                        <p className="text-muted-foreground">Total Payment</p>
                        <p className={`font-semibold text-lg ${getDifferenceClass(difference.payment)}`}>
                           {formatCurrency(Math.abs(difference.payment))}
                        </p>
                    </div>
                    <ResultDisplay result={result2} title="Loan 2" />
                </div>
            </CardContent>
        </Card>
        <HowToUseGuide {...guideProps} />
    </>
  );
}
