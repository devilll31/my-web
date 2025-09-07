'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShoppingItem {
  id: number;
  name: string;
  checked: boolean;
}

export default function ShoppingListMakerTool() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('d2ools-shopping-list');
      if (savedItems) setItems(JSON.parse(savedItems));
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-shopping-list', JSON.stringify(items));
    } catch (e) { console.error(e); }
  }, [items]);

  const addItem = () => {
    if (newItemName.trim() === '') return;
    const newItem: ShoppingItem = { id: Date.now(), name: newItemName.trim(), checked: false };
    setItems([...items, newItem]);
    setNewItemName('');
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearChecked = () => {
    setItems(items.filter(item => !item.checked));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Shopping List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="e.g., Milk, Bread, Eggs..."
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
          />
          <Button onClick={addItem}><PlusCircle className="mr-2"/>Add</Button>
        </div>
        <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
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
                  checked={item.checked}
                  onCheckedChange={() => toggleItem(item.id)}
                />
                <label
                  htmlFor={`item-${item.id}`}
                  className={`flex-1 text-sm ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                >
                  {item.name}
                </label>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="pt-4 border-t">
          <Button variant="outline" onClick={clearChecked} className="w-full">
            Clear Checked Items
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground pt-2">Your list is saved in your browser.</p>
      </CardContent>
    </Card>
  );
}
