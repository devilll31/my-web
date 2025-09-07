
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Sigma, X } from 'lucide-react';
import { motion } from 'framer-motion';

type Vector = { x: number; y: number; z: number };

const VectorInput = ({ vector, setVector, name }: { vector: Vector; setVector: (v: Vector) => void; name: string }) => {
  const handleInputChange = (axis: 'x' | 'y' | 'z', value: string) => {
    setVector({ ...vector, [axis]: parseFloat(value) || 0 });
  };

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <h3 className="font-semibold text-center">{name}</h3>
      <div className="flex gap-2 items-center">
        <Input type="number" value={vector.x} onChange={e => handleInputChange('x', e.target.value)} placeholder="x" className="text-center" />
        <Input type="number" value={vector.y} onChange={e => handleInputChange('y', e.target.value)} placeholder="y" className="text-center" />
        <Input type="number" value={vector.z} onChange={e => handleInputChange('z', e.target.value)} placeholder="z" className="text-center" />
      </div>
    </div>
  );
};

export default function VectorCalculatorTool() {
  const [vectorA, setVectorA] = useState<Vector>({ x: 1, y: 2, z: 3 });
  const [vectorB, setVectorB] = useState<Vector>({ x: 4, y: 5, z: 6 });
  const [dotProduct, setDotProduct] = useState<number>(0);
  const [crossProduct, setCrossProduct] = useState<Vector>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Dot Product: (A.x * B.x) + (A.y * B.y) + (A.z * B.z)
    setDotProduct(vectorA.x * vectorB.x + vectorA.y * vectorB.y + vectorA.z * vectorB.z);

    // Cross Product
    setCrossProduct({
      x: vectorA.y * vectorB.z - vectorA.z * vectorB.y,
      y: vectorA.z * vectorB.x - vectorA.x * vectorB.z,
      z: vectorA.x * vectorB.y - vectorA.y * vectorB.x,
    });
  }, [vectorA, vectorB]);

  const guideProps = {
    title: "How to Use the Vector Calculator",
    steps: [
      { title: "Enter Vector A", description: "Input the x, y, and z components for the first vector." },
      { title: "Enter Vector B", description: "Input the x, y, and z components for the second vector." },
      { title: "View Results", description: "The calculator instantly computes both the dot product (a scalar) and the cross product (a new vector) of the two vectors." }
    ],
    features: [
      { icon: Sigma, title: "Dot Product", description: "Calculate the dot product, essential for finding the angle between vectors and projecting one vector onto another." },
      { icon: X, title: "Cross Product", description: "Calculate the cross product to find a vector that is perpendicular to the two original vectors." },
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <VectorInput vector={vectorA} setVector={setVectorA} name="Vector A" />
            <VectorInput vector={vectorB} setVector={setVectorB} name="Vector B" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-muted-foreground">Dot Product (A · B)</h3>
              <motion.div key={`dot-${dotProduct}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold text-primary mt-2">
                {dotProduct.toFixed(4)}
              </motion.div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-muted-foreground">Cross Product (A x B)</h3>
              <motion.div key={JSON.stringify(crossProduct)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-primary mt-2">
                &#123; {crossProduct.x.toFixed(2)}, {crossProduct.y.toFixed(2)}, {crossProduct.z.toFixed(2)} &#125;
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
