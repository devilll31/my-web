
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDuration, intervalToDuration } from 'date-fns';

export default function TimeDurationCalculatorTool() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [endTime, setEndTime] = useState('17:00');
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    try {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date' || end < start) {
        setDuration("Invalid date or time range");
        return;
      }

      const dur = intervalToDuration({ start, end });
      setDuration(formatDuration(dur, {
        format: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']
      }));
    } catch {
      setDuration("Invalid input");
    }
  }, [startDate, startTime, endDate, endTime]);

  const guideProps = {
    title: "How to Use the Time Duration Calculator",
    steps: [
      { title: "Set Start Time", description: "Select the starting date and time." },
      { title: "Set End Time", description: "Select the ending date and time." },
      { title: "View the Duration", description: "The calculator instantly computes the total duration between the two points in time, broken down into years, months, days, hours, and minutes." }
    ],
    features: [
      { icon: Calendar, title: "Date & Time", description: "Calculates duration across both dates and times for precise measurements." },
      { icon: Clock, title: "Human Readable", description: "Presents the result in a clear, human-readable format (e.g., '2 days 8 hours 30 minutes')." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-2 border p-4 rounded-lg">
                <h3 className="font-semibold text-center">Start Time</h3>
                <Label htmlFor="start-date">Date</Label>
                <Input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <Label htmlFor="start-time">Time</Label>
                <Input type="time" id="start-time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </div>
            <div className="space-y-2 border p-4 rounded-lg">
                <h3 className="font-semibold text-center">End Time</h3>
                <Label htmlFor="end-date">Date</Label>
                <Input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                <Label htmlFor="end-time">Time</Label>
                <Input type="time" id="end-time" value={endTime} onChange={e => setEndTime(e.target.value)} />
            </div>
          </div>
          <div className="mt-6">
             <Label>Calculated Duration</Label>
             <motion.div key={duration} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-2xl font-bold text-primary p-4 bg-primary/10 rounded-md border border-primary/20 mt-2 text-center">
               {duration || 'Calculating...'}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
