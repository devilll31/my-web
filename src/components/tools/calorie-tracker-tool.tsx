'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Flame } from 'lucide-react';
import HowToUseGuide from '@/components/how-to-use-guide';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
}

export default function CalorieTrackerTool() {
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { id: 1, name: 'Breakfast', calories: 450 },
    { id: 2, name: 'Lunch', calories: 600 },
  ]);
  const [nextId, setNextId] = useState(3);
  
  const [totalCalories, setTotalCalories] = useState(0);
  const [remainingCalories, setRemainingCalories] = useState(0);

  useEffect(() => {
    const total = foodItems.reduce((sum, item) => sum + item.calories, 0);
    setTotalCalories(total);
    setRemainingCalories(calorieGoal - total);
  }, [foodItems, calorieGoal]);

  const handleItemChange = (id: number, field: 'name' | 'calories', value: string | number) => {
    setFoodItems(foodItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setFoodItems([...foodItems, { id: nextId, name: '', calories: 0 }]);
    setNextId(nextId + 1);
  };

  const removeItem = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };
  
  const guideProps = {
    title: "How to Use the Calorie Tracker",
    steps: [
      { title: "Set Your Goal", description: "Input your daily calorie target." },
      { title: "Log Your Meals", description: "Add each food item or meal you consume along with its calorie count." },
      { title: "Track Your Progress", description: "The tool shows your total intake and how many calories you have left for the day." }
    ],
    features: [
      { icon: Flame, title: "Simple Tracking", description: "An easy, straightforward way to log and monitor your daily calorie intake." },
      { icon: PlusCircle, title: "Dynamic List", description: "Add or remove food items as you go through your day." },
      { icon: Flame, title: "Progress Bar", description: "Visualize your calorie consumption against your daily goal with a simple progress bar." }
    ]
  };

  const progressPercentage = calorieGoal > 0 ? (totalCalories / calorieGoal) * 100 : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline">Log Your Meals</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence>
            {foodItems.map(item => (
                <motion.div key={item.id} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex gap-2">
                    <Input value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} placeholder="e.g., Apple" />
                    <Input type="number" value={item.calories || ''} onChange={(e) => handleItemChange(item.id, 'calories', Number(e.target.value))} className="w-40" placeholder="Calories" />
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={foodItems.length <= 1}><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                </motion.div>
            ))}
            </AnimatePresence>
            <Button variant="outline" onClick={addItem} className="w-full mt-2"><PlusCircle className="mr-2" /> Add Item</Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader><CardTitle className="text-center text-2xl font-headline">Daily Summary</CardTitle></CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center text-center gap-6">
             <div>
                <Label>Daily Calorie Goal</Label>
                <Input type="number" value={calorieGoal} onChange={(e) => setCalorieGoal(Number(e.target.value))} className="w-40 mx-auto mt-1"/>
             </div>
             <div>
                <p className="text-lg text-muted-foreground">Total Calories Consumed</p>
                <motion.div key={`total-${totalCalories}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold text-primary">{totalCalories}</motion.div>
             </div>
             <div>
                <p className="text-lg text-muted-foreground">Remaining Calories</p>
                <motion.div key={`rem-${remainingCalories}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold text-primary">{remainingCalories}</motion.div>
             </div>
              <div>
                  <Progress value={progressPercentage} className="mt-2" />
                  <p className="text-sm font-bold mt-1">{progressPercentage.toFixed(0)}% of goal</p>
              </div>
          </CardContent>
        </Card>
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
