'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

function hexToHsl(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c/2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { [r,g,b] = [c,x,0] }
  else if (60 <= h && h < 120) { [r,g,b] = [x,c,0] }
  else if (120 <= h && h < 180) { [r,g,b] = [0,c,x] }
  else if (180 <= h && h < 240) { [r,g,b] = [0,x,c] }
  else if (240 <= h && h < 300) { [r,g,b] = [x,0,c] }
  else if (300 <= h && h < 360) { [r,g,b] = [c,0,x] }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const ColorSwatch = ({ title, colors }: { title: string, colors: string[] }) => {
    const { toast } = useToast();
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied!', description: `${text} copied to clipboard.` });
    };

    return (
        <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="flex gap-2">
                {colors.map(color => (
                    <div key={color} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => copyToClipboard(color)}>
                        <div className="w-16 h-16 rounded-md border" style={{ backgroundColor: color }}/>
                        <p className="text-xs font-mono">{color}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function PaletteHarmoniesTool() {
  const [baseColor, setBaseColor] = useState('#558bcf');
  const { h, s, l } = hexToHsl(baseColor);
  
  const complementary = [baseColor, hslToHex((h + 180) % 360, s, l)];
  const analogous = [hslToHex((h + 330) % 360, s, l), baseColor, hslToHex((h + 30) % 360, s, l)];
  const triadic = [baseColor, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Color Palette Harmonies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label>Base Color</Label>
            <div className="flex gap-4">
                 <Input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} className="w-16 h-12 p-1"/>
                 <Input value={baseColor} onChange={e => setBaseColor(e.target.value)} />
            </div>
        </div>
        <div className="space-y-4">
            <ColorSwatch title="Complementary" colors={complementary}/>
            <ColorSwatch title="Analogous" colors={analogous}/>
            <ColorSwatch title="Triadic" colors={triadic}/>
        </div>
      </CardContent>
    </Card>
  );
}
