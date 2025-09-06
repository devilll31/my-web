
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';
import HowToUseGuide from '@/components/how-to-use-guide';
import { CheckCircle, SlidersHorizontal, BarChart, TableIcon } from 'lucide-react';

interface AmortizationData {
  month: number;
  beginningBalance: number;
  emi: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function LoanAmortizationScheduleTool() {
  const [loanAmount, setLoanAmount] = useState<number>(2000000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [loanTenure, setLoanTenure] = useState<number>(15);

  const handleInputChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
        setter(0);
    } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue <= max) {
            setter(Math.max(min, numValue));
        }
    }
  };

  const amortizationSchedule: AmortizationData[] = useMemo(() => {
    const schedule: AmortizationData[] = [];
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;

    if (principal <= 0 || rate <= 0 || tenureMonths <= 0) return [];

    const emi = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
    let beginningBalance = principal;

    for (let month = 1; month <= tenureMonths; month++) {
      const interest = beginningBalance * rate;
      const principalPaid = emi - interest;
      const endingBalance = beginningBalance - principalPaid;

      schedule.push({
        month,
        beginningBalance,
        emi,
        principal: principalPaid,
        interest,
        endingBalance: endingBalance < 0 ? 0 : endingBalance,
      });

      beginningBalance = endingBalance;
    }
    return schedule;
  }, [loanAmount, interestRate, loanTenure]);
  
  const guideProps = {
    title: "How to Use the Loan Amortization Schedule",
    steps: [
      { title: "Enter Loan Details", description: "Input your total loan amount, annual interest rate, and the loan period in years." },
      { title: "View Schedule", description: "The tool instantly generates a detailed month-by-month breakdown of your loan payments." },
      { title: "Analyze Payments", description: "Scroll through the table to see how each EMI contributes towards principal and interest over the loan's lifetime." }
    ],
    features: [
      { icon: TableIcon, title: "Detailed Breakdown", description: "Get a clear, table-based view of your payment schedule, including principal, interest, and remaining balance for each month." },
      { icon: SlidersHorizontal, title: "Interactive Controls", description: "Use sliders or type in exact numbers to adjust loan parameters and see the amortization schedule update in real-time." },
      { icon: BarChart, title: "Financial Insight", description: "Understand how your loan is paid off over time, helping you plan for pre-payments or evaluate loan structures." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input type="number" id="loanAmount" value={loanAmount} onChange={handleInputChange(setLoanAmount, 10000, 100000000)} />
              <Slider min={10000} max={100000000} step={10000} value={[loanAmount]} onValueChange={(v) => setLoanAmount(v[0])} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input type="number" id="interestRate" value={interestRate} onChange={handleInputChange(setInterestRate, 1, 25)} step="0.05" />
              <Slider min={1} max={25} step={0.05} value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
              <Input type="number" id="loanTenure" value={loanTenure} onChange={handleInputChange(setLoanTenure, 1, 30)} />
              <Slider min={1} max={30} step={1} value={[loanTenure]} onValueChange={(v) => setLoanTenure(v[0])} />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-center">Amortization Schedule</h3>
          <ScrollArea className="h-96 w-full rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-secondary">
                <TableRow>
                  <TableHead className="w-[100px]">Month</TableHead>
                  <TableHead>Beginning Balance</TableHead>
                  <TableHead>EMI</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Ending Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amortizationSchedule.length > 0 ? (
                  amortizationSchedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell className="font-medium">{row.month}</TableCell>
                      <TableCell>{formatCurrency(row.beginningBalance)}</TableCell>
                      <TableCell>{formatCurrency(row.emi)}</TableCell>
                      <TableCell>{formatCurrency(row.principal)}</TableCell>
                      <TableCell>{formatCurrency(row.interest)}</TableCell>
                      <TableCell>{formatCurrency(row.endingBalance)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      Enter loan details to see the amortization schedule.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
