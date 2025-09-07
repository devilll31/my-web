'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BorderRadiusVisualizerTool() {
  const [topLeft, setTopLeft] = useState(30);
  const [topRight, setTopRight] = useState(30);
  const [bottomRight, setBottomRight] = useState(30);
  const [bottomLeft, setBottomLeft] = useState(30);
  const { toast } = useToast();

  const borderRadiusValue = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const copyCss = () => {
    navigator.clipboard.writeText(`border-radius: ${borderRadiusValue};`);
    toast({ title: 'Copied CSS to clipboard!' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Controls</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Top Left ({topLeft}px)</Label>
            <Slider value={[topLeft]} onValueChange={v => setTopLeft(v[0])} max={150} />
          </div>
          <div className="space-y-2">
            <Label>Top Right ({topRight}px)</Label>
            <Slider value={[topRight]} onValueChange={v => setTopRight(v[0])} max={150} />
          </div>
          <div className="space-y-2">
            <Label>Bottom Right ({bottomRight}px)</Label>
            <Slider value={[bottomRight]} onValueChange={v => setBottomRight(v[0])} max={150} />
          </div>
          <div className="space-y-2">
            <Label>Bottom Left ({bottomLeft}px)</Label>
            <Slider value={[bottomLeft]} onValueChange={v => setBottomLeft(v[0])} max={150} />
          </div>
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <div className="w-full h-80 flex items-center justify-center">
            <div className="w-72 h-72 bg-primary" style={{ borderRadius: borderRadiusValue }}/>
        </div>
        <Card>
          <CardContent className="p-4">
            <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto relative">
              <code>border-radius: {borderRadiusValue};</code>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyCss}><Copy className="w-4 h-4"/></Button>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
