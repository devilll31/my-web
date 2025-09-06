'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Clock, PlusCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function OvertimePayCalculatorTool() {
  const [hourlyRate, setHourlyRate] = useState<number>(500);
  const [overtimeHours, setOvertimeHours] = useState<number>(10);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  
  const [regularPay, setRegularPay] = useState<number>(0);
  const [overtimePay, setOvertimePay] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);

  useEffect(() => {
    const otPay = hourlyRate * overtimeHours * overtimeMultiplier;
    // Assuming a standard 40-hour work week for regular pay calculation
    const regPay = hourlyRate * 40; 
    
    setRegularPay(regPay);
    setOvertimePay(otPay);
    setTotalPay(regPay + otPay);
  }, [hourlyRate, overtimeHours, overtimeMultiplier]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };

  const guideProps = {
    title: "How to Use the Overtime Pay Calculator",
    steps: [
      { title: "Enter Your Rate", description: "Input your regular hourly pay rate." },
      { title: "Add Overtime Hours", description: "Provide the number of overtime hours you worked." },
      { title: "Set Multiplier", description: "Enter the overtime multiplier (e.g., 1.5 for time-and-a-half, 2 for double-time)." }
    ],
    features: [
      { icon: Clock, title: "Fair Compensation", description: "Ensure you're being paid correctly for your extra work by quickly calculating your overtime earnings." },
      { icon: PlusCircle, title: "Total Pay View", description: "See a clear breakdown of your regular pay, your overtime pay, and your total combined earnings." },
      { icon: IndianRupee, title: "Simple & Fast", description: "A straightforward tool to calculate overtime pay without complex manual calculations." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="hourlyRate">Regular Hourly Rate</Label>
              <Input type="number" id="hourlyRate" value={hourlyRate || ''} onChange={handleInputChange(setHourlyRate)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="overtimeHours">Overtime Hours Worked</Label>
              <Input type="number" id="overtimeHours" value={overtimeHours || ''} onChange={handleInputChange(setOvertimeHours)} className="mt-1" />
            </div>
             <div>
              <Label htmlFor="overtimeMultiplier">Overtime Rate Multiplier</Label>
              <Input type="number" id="overtimeMultiplier" value={overtimeMultiplier || ''} onChange={handleInputChange(setOvertimeMultiplier)} className="mt-1" placeholder="e.g., 1.5 or 2" />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center border border-primary/20 space-y-4">
            <div className="flex justify-between items-center text-lg">
                <p className="text-muted-foreground">Regular Pay (40 hrs)</p>
                <p className="font-bold">{formatCurrency(regularPay)}</p>
            </div>
            <div className="flex justify-between items-center text-lg">
                <p className="text-muted-foreground">Overtime Pay</p>
                <p className="font-bold">{formatCurrency(overtimePay)}</p>
            </div>
             <div className="flex justify-between items-center text-2xl border-t pt-4">
                <p className="text-muted-foreground">Total Pay</p>
                <p className="font-extrabold text-primary">{formatCurrency(totalPay)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
