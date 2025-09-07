
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function DecisionCoinSpinnerTool() {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setResult(Math.random() < 0.5 ? 'Heads' : 'Tails');
      setIsFlipping(false);
    }, 1000); // Animation duration
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Decision Coin</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="w-40 h-40" style={{ perspective: '1000px' }}>
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipping ? 1800 : 0 }}
                transition={{ duration: 1, ease: 'linear' }}
            >
                <div className="absolute w-full h-full flex items-center justify-center bg-yellow-400 rounded-full border-4 border-yellow-600" style={{ backfaceVisibility: 'hidden' }}>
                    <span className="text-2xl font-bold text-yellow-800">H</span>
                </div>
                 <div className="absolute w-full h-full flex items-center justify-center bg-yellow-400 rounded-full border-4 border-yellow-600" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                    <span className="text-2xl font-bold text-yellow-800">T</span>
                </div>
            </motion.div>
        </div>

        <Button onClick={flipCoin} disabled={isFlipping} size="lg">
          {isFlipping ? 'Flipping...' : 'Flip the Coin'}
        </Button>

        {result && !isFlipping && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-bold text-primary mt-4"
          >
            It's {result}!
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
