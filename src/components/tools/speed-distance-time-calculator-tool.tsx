
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Gauge, Milestone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

type SolveFor = 'speed' | 'distance' | 'time';

export default function SpeedDistanceTimeCalculatorTool() {
  const [solveFor, setSolveFor] = useState<SolveFor>('speed');
  const [speed, setSpeed] = useState<number>(60); // km/h
  const [distance, setDistance] = useState<number>(120); // km
  const [time, setTime] = useState<number>(2); // hours

  useEffect(() => {
    if (solveFor === 'speed') {
      if (time > 0) setSpeed(distance / time);
    } else if (solveFor === 'distance') {
      setDistance(speed * time);
    } else { // time
      if (speed > 0) setTime(distance / speed);
    }
  }, [speed, distance, time, solveFor]);
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Speed, Distance, Time Calculator",
    steps: [
      { title: "Select Variable to Solve", description: "Choose whether you want to calculate for Speed, Distance, or Time." },
      { title: "Enter Known Values", description: "Input the two values you know. The field for the value you're solving for will be disabled." },
      { title: "View the Result", description: "The calculator instantly computes the missing value." }
    ],
    features: [
      { icon: Gauge, title: "Calculate Speed", description: "Find the speed by providing the distance and time." },
      { icon: Milestone, title: "Calculate Distance", description: "Determine the distance travelled from the speed and time." },
      { icon: Clock, title: "Calculate Time", description: "Estimate the time taken based on the distance and speed." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>What do you want to calculate?</Label>
            <RadioGroup value={solveFor} onValueChange={(v: SolveFor) => setSolveFor(v)} className="grid grid-cols-3 gap-4">
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="speed" id="speed" /> Speed</Label>
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="distance" id="distance" /> Distance</Label>
              <Label className="border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="time" id="time" /> Time</Label>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="space-y-2">
                <Label htmlFor="distance-input">Distance (km)</Label>
                <Input type="number" id="distance-input" value={distance} onChange={handleInputChange(setDistance)} disabled={solveFor === 'distance'} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="time-input">Time (hours)</Label>
                <Input type="number" id="time-input" value={time} onChange={handleInputChange(setTime)} disabled={solveFor === 'time'} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="speed-input">Speed (km/h)</Label>
                <Input type="number" id="speed-input" value={speed} onChange={handleInputChange(setSpeed)} disabled={solveFor === 'speed'} />
            </div>
          </div>
          <div className="pt-4 text-center">
            <Label>Result</Label>
            <motion.div key={solveFor+speed+distance+time} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-2xl font-bold text-primary p-4 bg-primary/10 rounded-md border border-primary/20 mt-2">
               {solveFor === 'speed' && `Speed = ${speed.toFixed(2)} km/h`}
               {solveFor === 'distance' && `Distance = ${distance.toFixed(2)} km`}
               {solveFor === 'time' && `Time = ${time.toFixed(2)} hours`}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
