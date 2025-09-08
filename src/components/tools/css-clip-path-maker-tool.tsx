'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const shapes = {
  circle: 'circle(50% at 50% 50%)',
  ellipse: 'ellipse(50% 50% at 50% 50%)',
  triangle: 'polygon(50% 0, 0 100%, 100% 100%)',
  rhombus: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  message: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)',
};

export default function CssClipPathMakerTool() {
  const [shape, setShape] = useState<keyof typeof shapes>('circle');
  const { toast } = useToast();

  const clipPathValue = shapes[shape];

  const copyCss = () => {
    navigator.clipboard.writeText(`clip-path: ${clipPathValue};`);
    toast({ title: 'Copied CSS to clipboard!' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Shape</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Select value={shape} onValueChange={(v) => setShape(v as keyof typeof shapes)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(shapes).map(s => (
                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <div className="w-full h-80 flex items-center justify-center bg-muted rounded-lg">
          <div className="w-64 h-64 bg-primary" style={{ clipPath: clipPathValue }} />
        </div>
        <Card>
          <CardContent className="p-4">
            <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto relative">
              <code>clip-path: {clipPathValue};</code>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyCss}><Copy className="w-4 h-4" /></Button>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
