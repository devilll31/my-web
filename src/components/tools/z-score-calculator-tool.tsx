
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Sigma, BarChart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ZScoreCalculatorTool() {
  const [dataPoint, setDataPoint] = useState<number>(85);
  const [mean, setMean] = useState<number>(70);
  const [stdDev, setStdDev] = useState<number>(10);
  const [zScore, setZScore] = useState<number | null>(null);

  useEffect(() => {
    if (stdDev > 0) {
      const score = (dataPoint - mean) / stdDev;
      setZScore(score);
    } else {
      setZScore(null);
    }
  }, [dataPoint, mean, stdDev]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Z-Score Calculator",
    steps: [
      { title: "Enter Data Point", description: "Input the individual data point (X) you want to evaluate." },
      { title: "Provide Population Stats", description: "Enter the mean (μ) and standard deviation (σ) of the population." },
      { title: "View the Z-Score", description: "The calculator instantly shows the Z-score, indicating how many standard deviations the data point is from the mean." }
    ],
    features: [
      { icon: Sigma, title: "Standardize Scores", description: "Calculate the Z-score to understand how a specific data point compares to the rest of a dataset." },
      { icon: BarChart, title: "Statistical Analysis", description: "A fundamental tool for hypothesis testing and comparing scores from different normal distributions." },
      { icon: CheckCircle, title: "Instant & Accurate", description: "Get immediate and precise Z-score calculations for your statistical needs." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="dataPoint">Data Point (X)</Label>
              <Input type="number" id="dataPoint" value={dataPoint} onChange={handleInputChange(setDataPoint)} />
            </div>
            <div>
              <Label htmlFor="mean">Population Mean (μ)</Label>
              <Input type="number" id="mean" value={mean} onChange={handleInputChange(setMean)} />
            </div>
            <div>
              <Label htmlFor="stdDev">Population Standard Deviation (σ)</Label>
              <Input type="number" id="stdDev" value={stdDev} onChange={handleInputChange(setStdDev)} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Z-Score</div>
            <motion.div
              key={zScore}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-5xl font-bold text-primary my-2"
            >
              {zScore !== null ? zScore.toFixed(4) : 'N/A'}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
