
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';

interface Habit {
  id: number;
  name: string;
  completed: boolean[];
}

export default function HabitTrackerTool() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Exercise', completed: Array(7).fill(false) },
    { id: 2, name: 'Read for 15 minutes', completed: Array(7).fill(false) },
  ]);
  const [newHabitName, setNewHabitName] = useState('');

  // Client-side state hydration
  useEffect(() => {
    try {
      const savedHabits = localStorage.getItem('d2ools-habit-tracker');
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      }
    } catch (error) {
      console.error("Could not load habits from localStorage", error);
    }
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem('d2ools-habit-tracker', JSON.stringify(habits));
    } catch (error) {
       console.error("Could not save habits to localStorage", error);
    }
  }, [habits]);

  const addHabit = () => {
    if (newHabitName.trim() === '') return;
    const newHabit: Habit = {
      id: Date.now(),
      name: newHabitName.trim(),
      completed: Array(7).fill(false),
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
  };

  const toggleCompletion = (habitId: number, dayIndex: number) => {
    setHabits(
      habits.map(habit =>
        habit.id === habitId
          ? { ...habit, completed: habit.completed.map((c, i) => (i === dayIndex ? !c : c)) }
          : habit
      )
    );
  };

  const removeHabit = (habitId: number) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };
  
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card className="w-full mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Weekly Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Enter a new habit..."
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
          />
          <Button onClick={addHabit}><PlusCircle className="mr-2"/>Add</Button>
        </div>

        <div className="space-y-2">
           <div className="grid grid-cols-[1fr_repeat(7,minmax(0,1fr))_auto] gap-2 items-center">
                <Label className="font-semibold text-center">Habit</Label>
                {daysOfWeek.map(day => <Label key={day} className="font-semibold text-center">{day}</Label>)}
                <div></div>
            </div>
            <AnimatePresence>
                {habits.map(habit => (
                    <motion.div 
                        key={habit.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-[1fr_repeat(7,minmax(0,1fr))_auto] gap-2 items-center p-2 rounded-lg bg-background"
                    >
                        <p className="font-medium truncate pr-2">{habit.name}</p>
                        {habit.completed.map((isCompleted, dayIndex) => (
                        <div key={dayIndex} className="flex justify-center">
                            <Checkbox 
                                checked={isCompleted}
                                onCheckedChange={() => toggleCompletion(habit.id, dayIndex)} 
                            />
                        </div>
                        ))}
                        <Button variant="ghost" size="icon" onClick={() => removeHabit(habit.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
         <p className="text-xs text-center text-muted-foreground pt-4">Your data is saved in your browser and is not sent to our servers.</p>
      </CardContent>
    </Card>
  );
}
