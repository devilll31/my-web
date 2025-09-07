
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, differenceInDays, addYears, parseISO } from 'date-fns';

interface Birthday {
  id: number;
  name: string;
  date: string; // YYYY-MM-DD
}

export default function BirthdayReminderTool() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');

  // Load from localStorage on component mount
  useEffect(() => {
    try {
      const savedBirthdays = localStorage.getItem('d2ools-birthday-reminder');
      if (savedBirthdays) {
        setBirthdays(JSON.parse(savedBirthdays));
      }
    } catch (e) { console.error("Could not load birthdays from localStorage", e); }
  }, []);

  // Save to localStorage whenever birthdays change
  useEffect(() => {
    try {
      localStorage.setItem('d2ools-birthday-reminder', JSON.stringify(birthdays));
    } catch (e) { console.error("Could not save birthdays to localStorage", e); }
  }, [birthdays]);

  const addBirthday = () => {
    if (newName.trim() === '' || !newDate) return;
    const newBirthday: Birthday = {
      id: Date.now(),
      name: newName.trim(),
      date: newDate,
    };
    setBirthdays([...birthdays, newBirthday]);
    setNewName('');
    setNewDate('');
  };

  const removeBirthday = (id: number) => {
    setBirthdays(birthdays.filter(b => b.id !== id));
  };
  
  const getUpcomingBirthdays = () => {
    const today = new Date();
    today.setHours(0,0,0,0);

    return birthdays.map(b => {
        const birthDate = parseISO(b.date);
        let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
            nextBirthday = addYears(nextBirthday, 1);
        }
        const daysUntil = differenceInDays(nextBirthday, today);
        return { ...b, daysUntil };
    }).sort((a,b) => a.daysUntil - b.daysUntil);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Birthday Reminder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 p-4 border rounded-lg">
          <Input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
          />
          <Input 
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Button onClick={addBirthday}><PlusCircle className="mr-2"/>Add</Button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Upcoming Birthdays:</h3>
          <AnimatePresence>
            {getUpcomingBirthdays().map(b => (
                <motion.div 
                    key={b.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-4 p-3 bg-background rounded-lg"
                >
                    <Gift className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                        <p className="font-bold">{b.name}</p>
                        <p className="text-sm text-muted-foreground">{format(parseISO(b.date), 'MMMM d')}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-primary">{b.daysUntil === 0 ? "Today!" : `${b.daysUntil} days`}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeBirthday(b.id)}>
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
