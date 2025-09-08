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
import { Layers, Lightbulb, Code } from 'lucide-react';


export default function NeumorphismGeneratorTool() {
  const [size, setSize] = useState(200);
  const [radius, setRadius] = useState(50);
  const [distance, setDistance] = useState(20);
  const [intensity, setIntensity] = useState(0.15);
  const [blur, setBlur] = useState(60);
  const [bgColor, setBgColor] = useState('#e0e0e0');
  const { toast } = useToast();

  const neumorphismCSS = {
    borderRadius: `${radius}px`,
    background: bgColor,
    boxShadow: `${distance}px ${distance}px ${blur}px #bebebe, -${distance}px -${distance}px ${blur}px #ffffff`,
  };
  
  const cssString = `border-radius: ${neumorphismCSS.borderRadius};\nbackground: ${neumorphismCSS.background};\nbox-shadow: ${neumorphismCSS.boxShadow};`;

  const copyCss = () => {
    navigator.clipboard.writeText(cssString);
    toast({ title: 'Copied CSS to clipboard!' });
  };
  
  const guideProps = {
      title: "How to Use the Neumorphism Generator",
      steps: [
          { title: "Adjust Properties", description: "Use the sliders to control the size, radius, shadow distance, and blur." },
          { title: "Choose Background Color", description: "Select a background color. Neumorphism works best with light, off-white, or grayish colors." },
          { title: "Copy the CSS", description: "Click the copy button to get the generated CSS code for your project." }
      ],
      features: [
          { icon: Layers, title: "Soft UI", description: "Create the popular 'soft UI' or Neumorphism effect where elements extrude from the background." },
          { icon: Lightbulb, title: "Interactive Controls", description: "Visually tune the shadow properties to achieve the perfect soft, plastic-like aesthetic for your components." },
          { icon: Code, title: "Ready-to-Use CSS", description: "Generates the complex `box-shadow` property needed for the effect, ready to be pasted into your code." }
      ]
  };
  
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Size ({size}px)</Label>
            <Slider value={[size]} onValueChange={v => setSize(v[0])} min={50} max={300} />
          </div>
          <div className="space-y-2">
            <Label>Radius ({radius}px)</Label>
            <Slider value={[radius]} onValueChange={v => setRadius(v[0])} min={0} max={150} />
          </div>
          <div className="space-y-2">
            <Label>Distance ({distance}px)</Label>
            <Slider value={[distance]} onValueChange={v => setDistance(v[0])} min={1} max={50} />
          </div>
          <div className="space-y-2">
            <Label>Blur ({blur}px)</Label>
            <Slider value={[blur]} onValueChange={v => setBlur(v[0])} min={0} max={100} />
          </div>
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-12"/>
          </div>
        </CardContent>
      </Card>
      <div className="md:col-span-2 space-y-4">
        <div className="w-full h-96 rounded-lg flex items-center justify-center" style={{ background: bgColor }}>
            <div style={{ ...neumorphismCSS, width: `${size}px`, height: `${size}px` } as React.CSSProperties}/>
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
