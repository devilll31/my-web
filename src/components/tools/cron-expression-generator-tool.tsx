'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Copy, Clock, Calendar } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';

export default function CronExpressionGeneratorTool() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [cronExpression, setCronExpression] = useState('* * * * *');
  const { toast } = useToast();

  useEffect(() => {
    setCronExpression(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`);
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronExpression);
    toast({ title: 'Cron expression copied!' });
  };
  
  const guideProps = {
    title: "How to Use the Cron Expression Generator",
    steps: [
      { title: "Select Intervals", description: "Use the dropdowns to choose the schedule for minute, hour, day, month, and day of the week." },
      { title: "View Expression", description: "The corresponding cron expression is generated automatically at the bottom." },
      { title: "Copy and Use", description: "Click the copy button to get the expression for use in your server or application." }
    ],
    features: [
      { icon: Clock, title: "Schedule Tasks", description: "Visually build complex cron schedules without needing to remember the exact syntax." },
    ]
  };

  const createOptions = (max: number, start = 0) => Array.from({ length: max - start + 1 }, (_, i) => String(i + start));
  const dayOfWeekOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <>
    <Card className="max-w-3xl mx-auto">
      <CardHeader><CardTitle className="text-center">Cron Expression Generator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-1"><Label>Minute</Label><Select value={minute} onValueChange={setMinute}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="*">Every (*)</SelectItem>{createOptions(59).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-1"><Label>Hour</Label><Select value={hour} onValueChange={setHour}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="*">Every (*)</SelectItem>{createOptions(23).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-1"><Label>Day (Month)</Label><Select value={dayOfMonth} onValueChange={setDayOfMonth}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="*">Every (*)</SelectItem>{createOptions(31, 1).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-1"><Label>Month</Label><Select value={month} onValueChange={setMonth}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="*">Every (*)</SelectItem>{monthOptions.map((m, i) => <SelectItem key={i+1} value={String(i+1)}>{m}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-1"><Label>Day (Week)</Label><Select value={dayOfWeek} onValueChange={setDayOfWeek}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="*">Every (*)</SelectItem>{dayOfWeekOptions.map((d, i) => <SelectItem key={i} value={String(i)}>{d}</SelectItem>)}</SelectContent></Select></div>
        </div>
        <div className="pt-4">
            <Label>Generated Cron Expression</Label>
            <div className="relative">
                <Input value={cronExpression} readOnly className="font-mono text-lg h-12"/>
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={copyToClipboard}><Copy/></Button>
            </div>
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}