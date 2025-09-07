'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Beaker, Weight, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DensityCalculatorTool() {
  const [mass, setMass] = useState<number>(1000); // in grams
  const [volume, setVolume] = useState<number>(100); // in cm³ (mL)
  const [density, setDensity] = useState<number | null>(null);

  useEffect(() => {
    if (volume > 0) {
      setDensity(mass / volume);
    } else {
      setDensity(null);
    }
  }, [mass, volume]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  const guideProps = {
    title: "How to Use the Density Calculator",
    steps: [
      { title: "Enter Mass", description: "Input the mass of the object in grams." },
      { title: "Enter Volume", description: "Input the volume of the object in cubic centimeters (cm³)." },
      { title: "View Density", description: "The calculator instantly computes the density in g/cm³." }
    ],
    features: [
      { icon: Scale, title: "Scientific Formula", description: "Calculates density using the fundamental formula ρ = m/V." },
      { icon: Weight, title: "Mass Input", description: "Easily input the mass of your object." },
      { icon: Beaker, title: "Volume Input", description: "Input the volume to find the material's density." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="mass">Mass (grams)</Label>
              <Input type="number" id="mass" value={mass} onChange={handleInputChange(setMass)} />
            </div>
            <div>
              <Label htmlFor="volume">Volume (cm³)</Label>
              <Input type="number" id="volume" value={volume} onChange={handleInputChange(setVolume)} />
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 flex flex-col justify-center items-center border border-primary/20 text-center">
            <div className="text-lg text-muted-foreground">Density (ρ)</div>
            <motion.div
              key={density}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-5xl font-bold text-primary my-2"
            >
              {density !== null ? density.toFixed(2) : 'N/A'}
            </motion.div>
            <p className="text-muted-foreground">g/cm³</p>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
