
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
}

export default function GoalTrackerTool() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: 'Save for Vacation', target: 50000, current: 15000 },
    { id: 2, name: 'Read 20 Books', target: 20, current: 5 },
  ]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  
  // Client-side state hydration
  useEffect(() => {
    try {
      const savedGoals = localStorage.getItem('d2ools-goal-tracker');
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      }
    } catch (error) {
      console.error("Could not load goals from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-goal-tracker', JSON.stringify(goals));
    } catch (error) {
      console.error("Could not save goals to localStorage", error);
    }
  }, [goals]);

  const addGoal = () => {
    if (newGoalName.trim() === '' || !newGoalTarget) return;
    const newGoal: Goal = {
      id: Date.now(),
      name: newGoalName.trim(),
      target: parseFloat(newGoalTarget),
      current: 0,
    };
    setGoals([...goals, newGoal]);
    setNewGoalName('');
    setNewGoalTarget('');
  };

  const updateGoal = (id: number, newCurrent: number) => {
    setGoals(
      goals.map(goal =>
        goal.id === id
          ? { ...goal, current: Math.min(Math.max(0, newCurrent), goal.target) }
          : goal
      )
    );
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };
  
  return (
    <Card className="w-full mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Goal Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 p-4 border rounded-lg">
          <Input 
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
            placeholder="New Goal Name (e.g., Run a Marathon)"
          />
          <Input 
            type="number"
            value={newGoalTarget}
            onChange={(e) => setNewGoalTarget(e.target.value)}
            placeholder="Target (e.g., 42 for km)"
          />
          <Button onClick={addGoal}><PlusCircle className="mr-2"/>Add Goal</Button>
        </div>

        <div className="space-y-4">
            <AnimatePresence>
                {goals.map(goal => {
                    const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
                    return (
                        <motion.div 
                            key={goal.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-4 space-y-3 rounded-lg bg-background border"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{goal.name}</p>
                                    <p className="text-sm text-muted-foreground">{goal.current.toLocaleString()} / {goal.target.toLocaleString()}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeGoal(goal.id)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                            <Progress value={progress} />
                            <div className="flex items-center gap-2">
                                <Label htmlFor={`update-${goal.id}`} className="text-sm">Update Progress:</Label>
                                <Input 
                                  id={`update-${goal.id}`}
                                  type="number"
                                  value={goal.current}
                                  onChange={(e) => updateGoal(goal.id, parseFloat(e.target.value) || 0)}
                                  className="w-32 h-8"
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
        <p className="text-xs text-center text-muted-foreground pt-4">Your data is saved in your browser and is not sent to our servers.</p>
      </CardContent>
    </Card>
  );
}
