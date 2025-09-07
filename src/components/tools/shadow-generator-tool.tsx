'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

export default function ShadowGeneratorTool() {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(5);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.5);
  const [inset, setInset] = useState(false);
  const { toast } = useToast();

  const shadowCss = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;

  const copyCss = () => {
    navigator.clipboard.writeText(`box-shadow: ${shadowCss};`);
    toast({ title: 'Copied CSS to clipboard!' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Shadow Controls</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Horizontal Offset ({hOffset}px)</Label>
            <Slider value={[hOffset]} onValueChange={v => setHOffset(v[0])} min={-50} max={50} />
          </div>
          <div className="space-y-2">
            <Label>Vertical Offset ({vOffset}px)</Label>
            <Slider value={[vOffset]} onValueChange={v => setVOffset(v[0])} min={-50} max={50} />
          </div>
          <div className="space-y-2">
            <Label>Blur Radius ({blur}px)</Label>
            <Slider value={[blur]} onValueChange={v => setBlur(v[0])} min={0} max={100} />
          </div>
          <div className="space-y-2">
            <Label>Spread Radius ({spread}px)</Label>
            <Slider value={[spread]} onValueChange={v => setSpread(v[0])} min={-50} max={50} />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <Input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-10"/>
          </div>
          <div className="space-y-2">
            <Label>Opacity ({opacity.toFixed(2)})</Label>
            <Slider value={[opacity]} onValueChange={v => setOpacity(v[0])} min={0} max={1} step={0.01} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="inset" checked={inset} onCheckedChange={c => setInset(c as boolean)} />
            <Label htmlFor="inset">Inset Shadow</Label>
          </div>
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <div className="w-full h-80 rounded-lg bg-muted flex items-center justify-center">
            <div className="w-48 h-48 bg-card rounded-lg" style={{ boxShadow: shadowCss }}/>
        </div>
        <Card>
          <CardContent className="p-4">
            <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto relative">
              <code>box-shadow: {shadowCss};</code>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyCss}><Copy className="w-4 h-4"/></Button>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
