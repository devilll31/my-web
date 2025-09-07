'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HowToUseGuide from '@/components/how-to-use-guide';
import { HeartPulse, Scale, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';

type UnitSystem = 'metric' | 'imperial';

export default function BmiCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [height, setHeight] = useState<number>(175); // cm or inches
  const [weight, setWeight] = useState<number>(70); // kg or lbs
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  
  useEffect(() => {
    let bmiValue: number | null = null;
    if (unitSystem === 'metric') {
      if (height > 0 && weight > 0) {
        bmiValue = weight / Math.pow(height / 100, 2);
      }
    } else { // imperial
      if (height > 0 && weight > 0) {
        bmiValue = 703 * (weight / Math.pow(height, 2));
      }
    }
    setBmi(bmiValue);
    
    if (bmiValue === null) {
      setCategory('');
    } else if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  }, [height, weight, unitSystem]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the BMI Calculator",
    steps: [
      { title: "Select Units", description: "Choose between Metric (cm/kg) or Imperial (in/lbs) units." },
      { title: "Enter Details", description: "Input your height and weight." },
      { title: "View Your BMI", description: "The calculator instantly shows your Body Mass Index and the corresponding health category." }
    ],
    features: [
      { icon: HeartPulse, title: "Health Indicator", description: "BMI is a widely used indicator to assess whether you have a healthy body weight for your height." },
      { icon: Scale, title: "Dual Unit System", description: "Easily switch between metric and imperial units for your convenience." },
      { icon: Ruler, title: "Clear Categories", description: "Instantly see if your BMI falls into the underweight, normal, overweight, or obesity categories." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RadioGroup value={unitSystem} onValueChange={(v: UnitSystem) => setUnitSystem(v)} className="grid grid-cols-2 gap-4">
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="metric" /> Metric</Label>
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="imperial" /> Imperial</Label>
            </RadioGroup>
            <div>
              <Label htmlFor="height">Height ({unitSystem === 'metric' ? 'cm' : 'in'})</Label>
              <Input type="number" id="height" value={height} onChange={handleInputChange(setHeight)} />
            </div>
            <div>
              <Label htmlFor="weight">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Label>
              <Input type="number" id="weight" value={weight} onChange={handleInputChange(setWeight)} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Your BMI</div>
            <motion.div key={`bmi-${bmi}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl font-bold text-primary my-2">
              {bmi !== null ? bmi.toFixed(1) : 'N/A'}
            </motion.div>
            <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold">
              {category}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
