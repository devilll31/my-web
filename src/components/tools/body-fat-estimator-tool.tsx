'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HowToUseGuide from '@/components/how-to-use-guide';
import { PersonStanding, Ruler, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BodyFatEstimatorTool() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] =useState(175); // cm
  const [weight, setWeight] = useState(70); // kg
  const [neck, setNeck] = useState(38); // cm
  const [waist, setWaist] = useState(85); // cm
  const [hip, setHip] = useState(95); // cm, female only
  
  const [bodyFat, setBodyFat] = useState(0);

  useEffect(() => {
    let fatPercentage = 0;
    // US Navy Method
    if (gender === 'male') {
      fatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      fatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    setBodyFat(Math.max(0, fatPercentage));
  }, [gender, height, weight, neck, waist, hip]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the Body Fat Estimator",
    steps: [
      { title: "Select Gender", description: "Choose your gender as the formula differs for males and females." },
      { title: "Enter Measurements", description: "Input your height, weight, and circumference measurements in centimeters." },
      { title: "View Your Estimate", description: "The calculator provides an estimate of your body fat percentage based on the US Navy method." }
    ],
    features: [
      { icon: PersonStanding, title: "US Navy Method", description: "Uses a common and widely accepted formula to estimate body fat percentage." },
      { icon: Ruler, title: "Circumference-Based", description: "Estimates body composition using tape measurements, which can be more insightful than weight alone." },
      { icon: Percent, title: "Track Progress", description: "A useful tool for tracking changes in body composition over time." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <RadioGroup value={gender} onValueChange={(v: 'male' | 'female') => setGender(v)} className="grid grid-cols-2 gap-4">
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="male" /> Male</Label>
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="female" /> Female</Label>
            </RadioGroup>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={handleInputChange(setHeight)} /></div>
              <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={handleInputChange(setWeight)} /></div>
              <div><Label>Neck (cm)</Label><Input type="number" value={neck} onChange={handleInputChange(setNeck)} /></div>
              <div><Label>Waist (cm)</Label><Input type="number" value={waist} onChange={handleInputChange(setWaist)} /></div>
              {gender === 'female' && (
                <div className="col-span-2"><Label>Hip (cm)</Label><Input type="number" value={hip} onChange={handleInputChange(setHip)} /></div>
              )}
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
             <div className="text-lg text-muted-foreground">Estimated Body Fat</div>
            <motion.div key={bodyFat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl font-bold text-primary my-2">
              {bodyFat.toFixed(1)}%
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
