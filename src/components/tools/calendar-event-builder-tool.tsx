
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';

export default function CalendarEventBuilderTool() {
  const [title, setTitle] = useState('Team Meeting');
  const [location, setLocation] = useState('Conference Room 1');
  const [description, setDescription] = useState('Discuss Q3 project goals.');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [endTime, setEndTime] = useState('11:00');

  const generateICS = () => {
    const formatICSDate = (date: string, time: string) => {
        const d = new Date(`${date}T${time}`);
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//D2ools//Calendar Event Generator//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@d2ools.com`,
      `DTSTAMP:${formatICSDate(new Date().toISOString().split('T')[0], new Date().toTimeString().split(' ')[0])}`,
      `DTSTART:${formatICSDate(startDate, startTime)}`,
      `DTEND:${formatICSDate(endDate, endTime)}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/ /g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Calendar Event Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
            </div>
         </div>
         <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
         <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="text-center pt-4">
            <Button onClick={generateICS}>Download .ics File</Button>
        </div>
      </CardContent>
    </Card>
  );
}
