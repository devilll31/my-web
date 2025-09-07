
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';

export default function RandomNamePickerTool() {
  const [names, setNames] = useState('Alice\nBob\nCharlie\nDavid');
  const [pickedName, setPickedName] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const pickRandomName = () => {
    const nameList = names.split('\n').filter(n => n.trim() !== '');
    if (nameList.length === 0) {
      setPickedName(null);
      return;
    }
    
    setIsPicking(true);
    setPickedName(null);
    
    let picks = 0;
    const interval = setInterval(() => {
        setPickedName(nameList[Math.floor(Math.random() * nameList.length)]);
        picks++;
        if (picks > 15) { // Run for ~1.5 seconds
            clearInterval(interval);
            setIsPicking(false);
        }
    }, 100);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Random Name Picker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <Label htmlFor="name-list">Enter names (one per line)</Label>
            <Textarea
                id="name-list"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                className="min-h-[200px] mt-2"
            />
        </div>
        <div className="text-center">
            <Button onClick={pickRandomName} disabled={isPicking}>
                <Shuffle className="mr-2"/>
                {isPicking ? 'Picking...' : 'Pick a Name'}
            </Button>
        </div>
        <div className="pt-4 text-center min-h-[80px] flex items-center justify-center">
            <AnimatePresence>
            {pickedName && (
                 <motion.div
                    key={pickedName}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="text-4xl font-bold text-primary p-4 bg-primary/10 rounded-lg border border-primary/20"
                >
                    {pickedName}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
