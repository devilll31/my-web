
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function ChecklistMakerTool() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, text: 'Task 1: Plan the project', completed: true },
    { id: 2, text: 'Task 2: Design the UI', completed: false },
    { id: 3, text: 'Task 3: Develop features', completed: false },
  ]);
  const [newItemText, setNewItemText] = useState('');
  
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('d2ools-checklist');
      if (savedItems) setItems(JSON.parse(savedItems));
    } catch (e) { console.error(e) }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-checklist', JSON.stringify(items));
    } catch (e) { console.error(e) }
  }, [items]);

  const addItem = () => {
    if (newItemText.trim() === '') return;
    const newItem: ChecklistItem = {
      id: Date.now(),
      text: newItemText.trim(),
      completed: false,
    };
    setItems([...items, newItem]);
    setNewItemText('');
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const completedCount = items.filter(item => item.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Checklist Maker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new item..."
            onKeyDown={e => e.key === 'Enter' && addItem()}
          />
          <Button onClick={addItem}><PlusCircle className="mr-2"/> Add</Button>
        </div>
        
        <div className="space-y-1">
            <p className="text-sm font-medium">{completedCount} / {items.length} completed</p>
            <Progress value={progress} />
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 p-3 bg-background rounded-lg"
              >
                <Checkbox
                  id={`item-${item.id}`}
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                />
                <label
                  htmlFor={`item-${item.id}`}
                  className={`flex-1 text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {item.text}
                </label>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="text-xs text-center text-muted-foreground pt-4">Your checklist is saved in your browser.</p>
      </CardContent>
    </Card>
  );
}
