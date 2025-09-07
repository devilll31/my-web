
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BreakReminderTool() {
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        toast({
          title: "Time for a break!",
          description: `It has been ${minutes} minutes. Stretch your legs!`,
        });
      }, minutes * 60 * 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, toast]);
  
  const toggleReminder = () => {
    setIsActive(!isActive);
    if (!isActive) {
        toast({
            title: "Reminder Set!",
            description: `We'll remind you to take a break in ${minutes} minutes.`
        });
    } else {
        toast({
            title: "Reminder Canceled",
            variant: "destructive"
        });
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Break Reminder</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="text-center">
            <p className="text-muted-foreground">Remind me to take a break every:</p>
            <div className="flex justify-center items-baseline gap-2 mt-2">
                <input 
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 text-4xl font-bold bg-transparent text-center focus:outline-none"
                    disabled={isActive}
                />
                <span className="text-2xl text-muted-foreground">minutes</span>
            </div>
        </div>
        <Button onClick={toggleReminder} size="lg" className="w-48">
          {isActive ? <BellOff className="mr-2" /> : <Bell className="mr-2" />}
          {isActive ? 'Stop Reminder' : 'Start Reminder'}
        </Button>
      </CardContent>
    </Card>
  );
}
