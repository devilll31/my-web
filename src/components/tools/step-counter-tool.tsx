'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Footprints } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
    } catch(e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-step-count', JSON.stringify(steps));
    } catch(e) { console.error(e); }
  }, [steps]);

  const progress = goal > 0 ? (steps / goal) * 100 : 0;

  return (
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
        <div className="flex gap-4">
            <Button onClick={() => setSteps(0)}>Reset Steps</Button>
            <Button variant="secondary" onClick={() => setGoal(g => g === 10000 ? 8000 : 10000)}>Set Goal ({goal})</Button>
        </div>
         <p className="text-xs text-center text-muted-foreground pt-4">Your steps are saved in your browser.</p>
      </CardContent>
    </Card>
  );
}
