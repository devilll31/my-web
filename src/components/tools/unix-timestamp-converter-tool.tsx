'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';

export default function UnixTimestampConverterTool() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [humanDate, setHumanDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const date = new Date(timestamp * 1000);
    setHumanDate(date.toLocaleString());
  }, [timestamp]);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(parseInt(e.target.value) || 0);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const date = new Date(e.target.value);
      if (!isNaN(date.getTime())) {
          setTimestamp(Math.floor(date.getTime() / 1000));
          setHumanDate(e.target.value);
      }
    } catch(err) {
      // Ignore invalid date inputs
    }
  };
  
  const guideProps = {
    title: "How to Use the Unix Timestamp Converter",
    steps: [
      { title: "Enter a Value", description: "Type a Unix timestamp (seconds since epoch) or a human-readable date string." },
      { title: "Instant Conversion", description: "The other field will automatically update with the converted value." },
      { title: "Use for Development", description: "A quick tool for developers working with timestamps and date objects." }
    ],
    features: [
      { icon: ArrowRightLeft, title: "Two-Way Conversion", description: "Seamlessly convert from timestamps to dates and back again." },
    ]
  };

  return (
    <>
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Unix Timestamp Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="timestamp">Unix Timestamp (seconds)</Label>
          <Input id="timestamp" type="number" value={timestamp} onChange={handleTimestampChange} />
        </div>
        <div className="flex justify-center"><ArrowRightLeft /></div>
        <div className="space-y-2">
          <Label htmlFor="human-date">Human-Readable Date</Label>
          <Input id="human-date" type="text" value={humanDate} onChange={handleDateChange} />
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
