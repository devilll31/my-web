'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { IndianRupee, Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function GratuityCalculatorTool() {
  const [monthlySalary, setMonthlySalary] = useState(75000);
  const [yearsOfService, setYearsOfService] = useState(10);
  
  const [gratuityAmount, setGratuityAmount] = useState(0);

  useEffect(() => {
    if (yearsOfService >= 5) {
      // Gratuity = (Last Drawn Salary * 15/26 * Number of Years of Service)
      // Salary includes Basic + Dearness Allowance
      const gratuity = (monthlySalary * 15 / 26) * yearsOfService;
      setGratuityAmount(gratuity);
    } else {
      setGratuityAmount(0);
    }
  }, [monthlySalary, yearsOfService]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Gratuity Calculator",
    steps: [
      { title: "Enter Salary", description: "Input your last drawn monthly salary (Basic + Dearness Allowance)." },
      { title: "Enter Service Period", description: "Provide the total number of years you have worked in the company." },
      { title: "Calculate Gratuity", description: "The tool computes the gratuity amount you are eligible for based on the formula." }
    ],
    features: [
      { icon: Briefcase, title: "Eligibility Check", description: "The calculator correctly applies the 5-year minimum service rule for gratuity eligibility." },
      { icon: IndianRupee, title: "Accurate Calculation", description: "Uses the standard formula (15 * last drawn salary * tenure) / 26 to provide an accurate estimate of your gratuity." },
      { icon: Calendar, title: "For Job Changers", description: "An essential tool for employees planning to switch jobs to understand their end-of-service benefits." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label>Monthly Salary (Basic + DA)</Label>
              <Input type="number" value={monthlySalary} onChange={handleInputChange(setMonthlySalary)} />
            </div>
            <div>
              <Label>Years of Service</Label>
              <Input type="number" value={yearsOfService} onChange={handleInputChange(setYearsOfService)} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Estimated Gratuity Amount</div>
            <motion.div
                key={gratuityAmount}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-5xl font-bold text-primary my-2"
            >
                {formatCurrency(gratuityAmount)}
            </motion.div>
            {yearsOfService < 5 && <p className="text-sm text-yellow-600 mt-2">Gratuity is typically applicable after 5 years of service.</p>}
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
