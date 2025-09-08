'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { Eye, Droplet, Code } from 'lucide-react';


export default function GlassmorphismGeneratorTool() {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(0.2);
  const [color, setColor] = useState('#ffffff');
  const { toast } = useToast();

  const glassCss = {
    background: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${transparency})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };

  const cssString = `background: ${glassCss.background};\nbackdrop-filter: ${glassCss.backdropFilter};\n-webkit-backdrop-filter: ${glassCss.WebkitBackdropFilter};\nborder-radius: ${glassCss.borderRadius};\nborder: ${glassCss.border};`;

  const copyCss = () => {
    navigator.clipboard.writeText(cssString);
    toast({ title: 'Copied CSS to clipboard!' });
  };
  
  const guideProps = {
      title: "How to Use the Glassmorphism Generator",
      steps: [
          { title: "Adjust Settings", description: "Use the sliders to control the blur and transparency levels of the glass effect." },
          { title: "Pick a Color", description: "Choose a base color for the glass to give it a subtle tint." },
          { title: "Copy the CSS", description: "Click the copy button to get the generated CSS code for your project." }
      ],
      features: [
          { icon: Eye, title: "Visual Control", description: "Instantly see the effect of your changes on the preview element." },
          { icon: Droplet, title: "Customizable Tint", description: "Easily adjust the color and transparency to match your design's aesthetic." },
          { icon: Code, title: "Ready-to-Use CSS", description: "Generates clean, cross-browser compatible CSS, including the necessary `-webkit-` prefix for `backdrop-filter`." }
      ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Blur ({blur}px)</Label>
            <Slider value={[blur]} onValueChange={v => setBlur(v[0])} min={0} max={20} />
          </div>
          <div className="space-y-2">
            <Label>Transparency ({transparency.toFixed(2)})</Label>
            <Slider value={[transparency]} onValueChange={v => setTransparency(v[0])} min={0} max={1} step={0.01} />
          </div>
           <div className="space-y-2">
            <Label>Color</Label>
            <Input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-12"/>
          </div>
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <div className="w-full h-80 rounded-lg flex items-center justify-center" style={{ background: "url('https://picsum.photos/600/400') center/cover" }}>
            <div className="w-3/4 h-3/4" style={glassCss as React.CSSProperties}/>
        </div>
        <Card>
          <CardContent className="p-4">
            <pre className="text-sm p-3 bg-muted rounded-md overflow-x-auto relative">
              <code>{cssString}</code>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyCss}><Copy className="w-4 h-4"/></Button>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
