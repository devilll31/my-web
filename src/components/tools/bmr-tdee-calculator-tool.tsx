'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HowToUseGuide from '@/components/how-to-use-guide';
import { PersonStanding, Dumbbell, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BmrTdeeCalculatorTool() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [activityLevel, setActivityLevel] = useState(1.2);
  
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);

  useEffect(() => {
    let bmrValue = 0;
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setBmr(bmrValue);
    setTdee(bmrValue * activityLevel);
  }, [gender, age, weight, height, activityLevel]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };
  
  const guideProps = {
    title: "How to Use the BMR & TDEE Calculator",
    steps: [
      { title: "Enter Your Details", description: "Input your gender, age, weight (kg), and height (cm)." },
      { title: "Select Activity Level", description: "Choose the option that best describes your weekly exercise routine." },
      { title: "View Your Results", description: "The calculator shows your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)." }
    ],
    features: [
      { icon: Flame, title: "BMR Calculation", description: "Understand your Basal Metabolic Rate - the number of calories your body needs at rest." },
      { icon: Dumbbell, title: "TDEE Calculation", description: "Find your Total Daily Energy Expenditure to know how many calories you burn per day, including activity." },
      { icon: PersonStanding, title: "Personalized Results", description: "Get calorie estimates tailored to your body and lifestyle, essential for weight management." }
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
              <div><Label>Age</Label><Input type="number" value={age} onChange={handleInputChange(setAge)} /></div>
              <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={handleInputChange(setWeight)} /></div>
            </div>
            <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={handleInputChange(setHeight)} /></div>
            <div>
                <Label>Activity Level</Label>
                <Select value={String(activityLevel)} onValueChange={(v) => setActivityLevel(Number(v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                        <SelectItem value="1.375">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                        <SelectItem value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                        <SelectItem value="1.725">Very active (hard exercise/sports 6-7 days a week)</SelectItem>
                        <SelectItem value="1.9">Extra active (very hard exercise/physical job)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center gap-6">
            <div>
                <div className="text-lg text-muted-foreground">Basal Metabolic Rate (BMR)</div>
                <motion.div key={`bmr-${bmr}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold text-primary my-1">{bmr.toFixed(0)} kcal/day</motion.div>
            </div>
            <div>
                <div className="text-lg text-muted-foreground">Total Daily Energy Expenditure (TDEE)</div>
                <motion.div key={`tdee-${tdee}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold text-primary my-1">{tdee.toFixed(0)} kcal/day</motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
