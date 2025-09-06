'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Clock, Briefcase, ArrowRightLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function SalaryToHourlyConverterTool() {
  const [salary, setSalary] = useState<number>(1200000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  
  const [hourlyRate, setHourlyRate] = useState<number>(0);

  useEffect(() => {
    const totalHours = hoursPerWeek * weeksPerYear;
    if (totalHours > 0) {
        setHourlyRate(salary / totalHours);
    } else {
        setHourlyRate(0);
    }
  }, [salary, hoursPerWeek, weeksPerYear]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value === '' ? 0 : parseFloat(value));
  };
  
  const handleSliderChange = (setter: (value: number) => void) => (value: number[]) => {
      setter(value[0]);
  }

  const guideProps = {
    title: "How to Use the Salary to Hourly Converter",
    steps: [
      { title: "Enter Annual Salary", description: "Input your total gross annual salary." },
      { title: "Define Work Hours", description: "Specify your average hours worked per week and weeks worked per year." },
      { title: "Get Your Hourly Rate", description: "The calculator instantly converts your salary into an equivalent hourly wage." }
    ],
    features: [
      { icon: ArrowRightLeft, title: "Quick Conversion", description: "Easily convert your annual salary into an hourly rate to better understand your compensation." },
      { icon: Briefcase, title: "Job Comparison", description: "Compare salaried positions with hourly jobs on an equal footing." },
      { icon: Clock, title: "Time Value", description: "Gain insight into the value of your time by seeing what you earn each hour." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="salary">Annual Salary</Label>
              <Input type="number" id="salary" value={salary || ''} onChange={handleInputChange(setSalary)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="hoursPerWeek">Hours Per Week ({hoursPerWeek})</Label>
              <Slider value={[hoursPerWeek]} onValueChange={handleSliderChange(setHoursPerWeek)} min={1} max={80} step={1} />
            </div>
             <div>
              <Label htmlFor="weeksPerYear">Weeks Per Year ({weeksPerYear})</Label>
              <Slider value={[weeksPerYear]} onValueChange={handleSliderChange(setWeeksPerYear)} min={1} max={52} step={1} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Equivalent Hourly Rate</div>
             <motion.div
                key={hourlyRate}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-bold text-primary my-2"
            >
                {formatCurrency(hourlyRate)}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
