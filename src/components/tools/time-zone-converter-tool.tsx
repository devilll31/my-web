'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { format, zonedTimeToUtc, toZonedTime } from 'date-fns-tz';

const timezones = Intl.supportedValuesOf('timeZone');

const TimezoneRow = ({ baseTime, baseTz, thisTz, onRemove }: { baseTime: Date, baseTz: string, thisTz: string, onRemove: () => void }) => {
    if(!baseTime || isNaN(baseTime.getTime())) return null;

    const localTime = toZonedTime(baseTime, thisTz);
    
    return (
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center p-3 bg-secondary/30 rounded-lg">
            <p className="font-medium">{thisTz.replace(/_/g, ' ')}</p>
            <p className="text-2xl font-semibold">{format(localTime, 'HH:mm', { timeZone: thisTz })}</p>
            <Button size="icon" variant="ghost" onClick={onRemove}><Trash2 className="w-4 h-4 text-destructive"/></Button>
        </div>
    );
}


export default function TimeZoneConverterTool() {
  const [baseTimezone, setBaseTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [baseDate, setBaseDate] = useState(new Date());
  const [targetTimezones, setTargetTimezones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [newTz, setNewTz] = useState('Asia/Kolkata');

  const addTimezone = () => {
    if (newTz && !targetTimezones.includes(newTz)) {
        setTargetTimezones([...targetTimezones, newTz]);
    }
  }

  const removeTimezone = (tzToRemove: string) => {
    setTargetTimezones(targetTimezones.filter(tz => tz !== tzToRemove));
  }
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(baseDate);
    newDate.setHours(hours, minutes);
    setBaseDate(newDate);
  }

  return (
    <div className="w-full mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">My Local Time</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full"><Label>Timezone</Label><Select value={baseTimezone} onValueChange={setBaseTimezone}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>)}</SelectContent></Select></div>
            <div className="flex-1 w-full"><Label>Time</Label><Input type="time" value={format(baseDate, 'HH:mm')} onChange={handleTimeChange}/></div>
        </CardContent>
      </Card>

      <Card>
         <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">Converted Times</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            {targetTimezones.map(tz => (
                <TimezoneRow key={tz} baseTime={baseDate} baseTz={baseTimezone} thisTz={tz} onRemove={() => removeTimezone(tz)} />
            ))}
            <div className="flex gap-2 pt-4 border-t">
                <Select value={newTz} onValueChange={setNewTz}>
                    <SelectTrigger><SelectValue placeholder="Add timezone..."/></SelectTrigger>
                    <SelectContent>{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
                </Select>
                <Button onClick={addTimezone}><PlusCircle className="mr-2"/> Add</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
