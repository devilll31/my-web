'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';

// Function to calculate luminance
function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Function to parse hex color and get RGB
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export default function ContrastCheckerTool() {
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#558bcf');

  const textRgb = hexToRgb(textColor);
  const bgRgb = hexToRgb(bgColor);

  let contrast = 0;
  if (textRgb && bgRgb) {
    const lum1 = getLuminance(textRgb.r, textRgb.g, textRgb.b);
    const lum2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    contrast = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  }

  const aaPass = contrast >= 4.5;
  const aaaPass = contrast >= 7;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>WCAG Contrast Checker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-8 rounded-lg mb-6 text-center" style={{ backgroundColor: bgColor, color: textColor }}>
          <h2 className="text-4xl font-bold">The quick brown fox jumps over the lazy dog.</h2>
          <p className="mt-2 text-lg">Contrast Ratio: {contrast.toFixed(2)}:1</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-12"/>
            <Input value={textColor} onChange={e => setTextColor(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-12"/>
            <Input value={bgColor} onChange={e => setBgColor(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className={`p-4 rounded-lg ${aaPass ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-bold text-lg">AA Level</h3>
            {aaPass ? <CheckCircle className="w-8 h-8 mx-auto text-green-600"/> : <XCircle className="w-8 h-8 mx-auto text-red-600"/>}
            <p className="text-sm mt-1">{aaPass ? 'Pass' : 'Fail'}</p>
          </div>
          <div className={`p-4 rounded-lg ${aaaPass ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-bold text-lg">AAA Level</h3>
            {aaaPass ? <CheckCircle className="w-8 h-8 mx-auto text-green-600"/> : <XCircle className="w-8 h-8 mx-auto text-red-600"/>}
            <p className="text-sm mt-1">{aaaPass ? 'Pass' : 'Fail'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
