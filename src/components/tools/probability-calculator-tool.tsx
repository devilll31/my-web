'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Dice5, Percent, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProbabilityCalculatorTool() {
  const [favorableOutcomes, setFavorableOutcomes] = useState<number>(1);
  const [totalOutcomes, setTotalOutcomes] = useState<number>(6);
  const [probability, setProbability] = useState<number | null>(null);

  useEffect(() => {
    if (totalOutcomes > 0 && favorableOutcomes <= totalOutcomes) {
      setProbability((favorableOutcomes / totalOutcomes) * 100);
    } else {
      setProbability(null);
    }
  }, [favorableOutcomes, totalOutcomes]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Probability Calculator",
    steps: [
      { title: "Enter Favorable Outcomes", description: "Input the number of outcomes you are interested in." },
      { title: "Enter Total Outcomes", description: "Input the total number of possible outcomes." },
      { title: "View Probability", description: "The calculator instantly computes the probability as a percentage." }
    ],
    features: [
      { icon: Dice5, title: "Simple Events", description: "Easily calculate the probability of a single event occurring." },
      { icon: Percent, title: "Percentage Result", description: "Displays the probability clearly as a percentage for easy interpretation." },
      { icon: CheckCircle, title: "Instant Calculation", description: "Results update in real-time as you enter your values." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="favorable">Number of Favorable Outcomes</Label>
              <Input type="number" id="favorable" value={favorableOutcomes} onChange={handleInputChange(setFavorableOutcomes)} />
            </div>
            <div>
              <Label htmlFor="total">Total Number of Possible Outcomes</Label>
              <Input type="number" id="total" value={totalOutcomes} onChange={handleInputChange(setTotalOutcomes)} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Probability</div>
            <motion.div
              key={probability}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-6xl font-bold text-primary my-2"
            >
              {probability !== null ? probability.toFixed(2) + '%' : 'N/A'}
            </motion.div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
