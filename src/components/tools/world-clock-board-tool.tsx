'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import { format, toZonedTime } from 'date-fns-tz';

const timezones = Intl.supportedValuesOf('timeZone');

const ClockCard = ({ timezone, onRemove }: { timezone: string, onRemove: (tz: string) => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const zonedTime = toZonedTime(time, timezone);
  const formattedTime = format(zonedTime, 'HH:mm:ss', { timeZone: timezone });
  const formattedDate = format(zonedTime, 'MMM d, yyyy', { timeZone: timezone });

  return (
    <Card className="text-center relative">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg truncate">{timezone.replace(/_/g, ' ')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold font-mono text-primary">{formattedTime}</div>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
        <Button size="icon" variant="ghost" className="absolute top-1 right-1" onClick={() => onRemove(timezone)}>
            <Trash2 className="w-4 h-4 text-destructive"/>
        </Button>
      </CardContent>
    </Card>
  );
};


export default function WorldClockBoardTool() {
  const defaultTimezones = [
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    'America/New_York', 
    'Europe/London', 
    'Asia/Tokyo'
  ];
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [newTz, setNewTz] = useState('Asia/Kolkata');
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem('d2ools-world-clocks');
      if (saved) {
        setSelectedTimezones(JSON.parse(saved));
      } else {
        setSelectedTimezones([...new Set(defaultTimezones)]); // remove duplicates
      }
    } catch (e) { console.error(e) }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-world-clocks', JSON.stringify(selectedTimezones));
    } catch (e) { console.error(e) }
  }, [selectedTimezones]);

  const addTimezone = () => {
    if (newTz && !selectedTimezones.includes(newTz)) {
        setSelectedTimezones([...selectedTimezones, newTz]);
    }
  };

  const removeTimezone = (tzToRemove: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz !== tzToRemove));
  };

  return (
    <div className="w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {selectedTimezones.map(tz => (
                <ClockCard key={tz} timezone={tz} onRemove={removeTimezone} />
            ))}
        </div>
        <Card>
            <CardContent className="p-4 flex gap-2">
                <Select value={newTz} onValueChange={setNewTz}>
                    <SelectTrigger><SelectValue placeholder="Add timezone..."/></SelectTrigger>
                    <SelectContent>{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
                </Select>
                <Button onClick={addTimezone}><PlusCircle className="mr-2"/> Add Clock</Button>
            </CardContent>
        </Card>
        <p className="text-xs text-center text-muted-foreground pt-4">Your selected clocks are saved in your browser.</p>
    </div>
  );
}
