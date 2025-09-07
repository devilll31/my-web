'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Footprints, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import HowToUseGuide from '@/components/how-to-use-guide';

export default function StepCounterTool() {
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState(10000);
  const [addValue, setAddValue] = useState(100);

  useEffect(() => {
    try {
      const savedSteps = localStorage.getItem('d2ools-step-count');
      if (savedSteps) {
        setSteps(JSON.parse(savedSteps));
      }
      const savedGoal = localStorage.getItem('d2ools-step-goal');
       if (savedGoal) {
        setGoal(JSON.parse(savedGoal));
      }
    } catch(e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-step-count', JSON.stringify(steps));
    } catch(e) { console.error(e); }
  }, [steps]);
  
  useEffect(() => {
    try {
      localStorage.setItem('d2ools-step-goal', JSON.stringify(goal));
    } catch(e) { console.error(e); }
  }, [goal]);

  const progress = goal > 0 ? (steps / goal) * 100 : 0;

  const guideProps = {
    title: "How to Use the Step Counter",
    steps: [
      { title: "Set Your Goal", description: "Enter your daily step target in the 'Set Goal' input field." },
      { title: "Add Steps", description: "Use the '+' button to add steps manually. You can change the increment value." },
      { title: "Track Progress", description: "Your progress towards your daily goal is shown visually. Reset your steps for the new day." }
    ],
    features: [
      { icon: Footprints, title: "Manual Tracking", description: "A simple, manual step counter for when you don't have an automatic tracker." },
      { icon: Target, title: "Goal-Oriented", description: "Set a daily goal and visualize your progress with a progress bar to stay motivated." },
      { icon: Plus, title: "Local & Private", description: "Your step data is saved in your browser and is not uploaded anywhere, ensuring your privacy." }
    ]
  };

  return (
    <>
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Daily Step Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <Footprints className="w-16 h-16 text-primary"/>
        <div className="text-center">
          <p className="text-6xl font-bold">{steps.toLocaleString()}</p>
          <p className="text-muted-foreground">/ {goal.toLocaleString()} steps</p>
        </div>
        <div className="w-full">
            <Progress value={progress} />
        </div>
        <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={() => setSteps(s => Math.max(0, s - addValue))}><Minus /></Button>
            <Input type="number" value={addValue} onChange={e => setAddValue(parseInt(e.target.value,10) || 0)} className="w-24 text-center"/>
            <Button size="icon" variant="outline" onClick={() => setSteps(s => s + addValue)}><Plus /></Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1 space-y-1 text-center">
                <Input type="number" value={goal} onChange={e => setGoal(parseInt(e.target.value) || 10000)} className="w-full text-center" />
                <p className="text-xs text-muted-foreground">Your Goal</p>
            </div>
            <Button onClick={() => setSteps(0)} className="flex-1">Reset Steps</Button>
        </div>
         <p className="text-xs text-center text-muted-foreground pt-4">Your steps are saved in your browser.</p>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
