'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import HowToUseGuide from '../how-to-use-guide';
import { Waves, CircleDot, Code } from 'lucide-react';

const generateBlob = (complexity: number, contrast: number): string => {
  const numPoints = 6 + Math.floor(complexity * 6);
  const angleStep = (Math.PI * 2) / numPoints;
  const rad = 100;

  const points = Array.from({ length: numPoints }, (_, i) => {
    const angle = i * angleStep;
    const pull = rad * 0.75 + (Math.random() - 0.5) * rad * 0.5 * contrast;
    const x = Math.cos(angle) * pull + 150;
    const y = Math.sin(angle) * pull + 150;
    return { x, y };
  });

  const path = points.map((p, i) => {
    const next = points[(i + 1) % numPoints];
    const midX = (p.x + next.x) / 2;
    const midY = (p.y + next.y) / 2;
    if (i === 0) return `M ${p.x} ${p.y} Q ${p.x} ${p.y} ${midX} ${midY}`;
    return `T ${midX} ${midY}`;
  }).join(' ') + ' Z';
  
  return path;
};

export default function SvgWaveBlobGeneratorTool() {
  const [shape, setShape] = useState<'wave' | 'blob'>('wave');
  const [complexity, setComplexity] = useState(0.5);
  const [contrast, setContrast] = useState(0.5);
  const [color, setColor] = useState('#558bcf');
  const [key, setKey] = useState(0); // to force re-render on randomize
  const { toast } = useToast();
  
  const svgPath = useMemo(() => {
    if (shape === 'blob') {
      return generateBlob(complexity, contrast);
    }
    const points = Array.from({ length: Math.floor(complexity * 10) + 5 }, (_, i) => {
      const x = (i / (Math.floor(complexity * 10) + 4)) * 300;
      const y = 150 + Math.sin(i * contrast * 2) * 50;
      return `${x},${y}`;
    }).join(' ');
    return `M 0 150 C ${points} L 300 300 L 0 300 Z`;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, complexity, contrast, key]);
  
  const svgString = `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath}" fill="${color}"></path></svg>`;

  const copySvg = () => {
    navigator.clipboard.writeText(svgString);
    toast({ title: 'Copied SVG code to clipboard!' });
  };
  
  const randomize = () => setKey(k => k + 1);
  
  const guideProps = {
      title: "How to Use the SVG Wave & Blob Generator",
      steps: [
          { title: "Choose a Shape", description: "Select whether you want to generate a wave or a blob." },
          { title: "Customize", description: "Use the sliders to adjust the complexity and contrast (or sharpness) of the shape. Pick a color to fill it." },
          { title: "Copy the SVG", description: "Click the copy button to get the full SVG code, ready to be embedded in your website or design file." }
      ],
      features: [
          { icon: Waves, title: "Organic Shapes", description: "Create beautiful, organic-looking waves and blobs to add a modern touch to your designs." },
          { icon: CircleDot, title: "Randomize", description: "Not sure where to start? Use the 'Randomize' button to generate new and unique blob shapes." },
          { icon: Code, title: "Vector & Scalable", description: "The output is in SVG format, meaning it's a vector that can be scaled to any size without losing quality." }
      ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Controls</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={shape} onValueChange={(v) => setShape(v as 'wave' | 'blob')} className="grid grid-cols-2 gap-4">
            <Label className="border rounded-md p-2 text-center cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="wave" className="sr-only"/>Wave</Label>
            <Label className="border rounded-md p-2 text-center cursor-pointer has-[:checked]:border-primary"><RadioGroupItem value="blob" className="sr-only"/>Blob</Label>
          </RadioGroup>
          <div className="space-y-2">
            <Label>Complexity ({complexity.toFixed(2)})</Label>
            <Slider value={[complexity]} onValueChange={v => setComplexity(v[0])} min={0} max={1} step={0.01} />
          </div>
          <div className="space-y-2">
            <Label>Contrast/Sharpness ({contrast.toFixed(2)})</Label>
            <Slider value={[contrast]} onValueChange={v => setContrast(v[0])} min={0} max={1} step={0.01} />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <Input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-10"/>
          </div>
          <Button onClick={randomize} variant="outline" className="w-full">Randomize</Button>
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <div className="w-full h-96 rounded-lg bg-muted flex items-center justify-center p-4">
            <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d={svgPath} fill={color}></path>
            </svg>
        </div>
        <Card>
          <CardContent className="p-4">
            <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto relative max-h-40">
              <code>{svgString}</code>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copySvg}><Copy className="w-4 h-4"/></Button>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
