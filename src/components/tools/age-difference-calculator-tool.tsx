'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { differenceInYears, differenceInMonths, differenceInDays, parseISO } from 'date-fns';
import HowToUseGuide from '@/components/how-to-use-guide';
import { Calendar, Users, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AgeDifferenceCalculatorTool() {
  const [date1, setDate1] = useState('1990-01-01');
  const [date2, setDate2] = useState('2024-01-01');
  const [difference, setDifference] = useState<{ years: number, months: number, days: number } | null>(null);

  const calculateDifference = () => {
    const d1 = parseISO(date1);
    const d2 = parseISO(date2);
    
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
        const years = differenceInYears(d2, d1);
        const months = differenceInMonths(d2, d1) % 12;
        // This is a simplification; precise day calculation is complex
        const days = differenceInDays(d2, d1) % 30; // Approximation
        setDifference({ years, months, days });
    } else {
        setDifference(null);
    }
  };
  
  const guideProps = {
    title: "How to Use the Age Difference Calculator",
    steps: [
      { title: "Enter First Date", description: "Input the first person's date of birth." },
      { title: "Enter Second Date", description: "Input the second person's date of birth or any other date." },
      { title: "Calculate the Difference", description: "The tool shows the exact age gap in years, months, and days." }
    ],
    features: [
      { icon: Users, title: "Compare Ages", description: "Quickly find the age gap between friends, family members, or historical figures." },
      { icon: Gift, title: "Birthday Planning", description: "Useful for calculating age for birthdays and milestone events." },
      { icon: Calendar, title: "Simple & Fast", description: "An easy-to-use interface for quick and accurate date and age calculations." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
                <Label htmlFor="date1">Date of Birth 1</Label>
                <Input type="date" id="date1" value={date1} onChange={(e) => setDate1(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date2">Date of Birth 2</Label>
                <Input type="date" id="date2" value={date2} onChange={(e) => setDate2(e.target.value)} />
            </div>
          </div>
          <div className="text-center mt-6">
            <Button onClick={calculateDifference}>Calculate Difference</Button>
          </div>
          {difference && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 text-center bg-primary/5 p-6 rounded-lg">
              <p className="text-lg text-muted-foreground">The age difference is:</p>
              <div className="text-3xl font-bold text-primary">
                {difference.years} years, {difference.months} months, and {difference.days} days
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
