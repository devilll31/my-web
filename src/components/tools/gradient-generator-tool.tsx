'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GradientGeneratorTool() {
  const [color1, setColor1] = useState('#558bcf');
  const [color2, setColor2] = useState('#ffab40');
  const [angle, setAngle] = useState(90);
  const { toast } = useToast();

  const gradientCss = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  
  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    toast({ title: 'Copied CSS to clipboard!' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Color 1</Label>
            <Input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-full h-12" />
            <Input value={color1} onChange={e => setColor1(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Color 2</Label>
            <Input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-full h-12" />
            <Input value={color2} onChange={e => setColor2(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Angle ({angle}°)</Label>
            <Slider value={[angle]} onValueChange={val => setAngle(val[0])} min={0} max={360} step={1} />
          </div>
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <div className="w-full h-80 rounded-lg" style={{ background: gradientCss }} />
        <Card>
          <CardContent className="p-4">
            <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto relative">
              <code>background: {gradientCss};</code>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyCss}>
                <Copy className="w-4 h-4"/>
              </Button>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
