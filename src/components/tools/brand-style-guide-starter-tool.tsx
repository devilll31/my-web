'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import HowToUseGuide from '@/components/how-to-use-guide';
import { Palette, Type, Brush } from 'lucide-react';

const ColorSwatch = ({ color, name }: { color: string, name: string }) => (
    <div className="text-center">
        <div className="w-24 h-24 rounded-lg mx-auto mb-2 border" style={{ backgroundColor: color }} />
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{color}</p>
    </div>
)

export default function BrandStyleGuideStarterTool() {
  const [brandName, setBrandName] = useState('My Awesome Brand');
  const [primaryColor, setPrimaryColor] = useState('#558bcf');
  const [secondaryColor, setSecondaryColor] = useState('#ffab40');
  const [neutralColor, setNeutralColor] = useState('#f0f4f8');
  const [headlineFont, setHeadlineFont] = useState('Inter');
  const [bodyFont, setBodyFont] = useState('Inter');
  
  const guideProps = {
      title: "How to Use the Brand Style Guide Starter",
      steps: [
          { title: "Enter Brand Details", description: "Fill in your brand name, select your primary, secondary, and neutral colors using the color pickers." },
          { title: "Choose Fonts", description: "Specify the font families you want to use for headlines and body text." },
          { title: "Preview Your Guide", description: "The right panel provides a live preview of your basic brand style guide, which you can use as a starting point." }
      ],
      features: [
          { icon: Palette, title: "Color Palette", description: "Visually define your brand's core color scheme." },
          { icon: Type, title: "Typography Set", description: "Establish a consistent look and feel with defined headline and body fonts." },
          { icon: Brush, title: "Quick Prototyping", description: "A simple tool to quickly prototype a brand's visual identity for presentations or initial client discussions." }
      ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Brand Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div><Label>Brand Name</Label><Input value={brandName} onChange={e => setBrandName(e.target.value)} /></div>
            <div><Label>Primary Color</Label><Input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-full"/></div>
            <div><Label>Secondary Color</Label><Input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-full"/></div>
            <div><Label>Neutral Color</Label><Input type="color" value={neutralColor} onChange={e => setNeutralColor(e.target.value)} className="w-full"/></div>
            <div><Label>Headline Font</Label><Input value={headlineFont} onChange={e => setHeadlineFont(e.target.value)} placeholder="e.g., Poppins" /></div>
            <div><Label>Body Font</Label><Input value={bodyFont} onChange={e => setBodyFont(e.target.value)} placeholder="e.g., Lato" /></div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader><CardTitle>Brand Style Guide Preview</CardTitle></CardHeader>
        <CardContent className="space-y-8 p-8 border rounded-lg" style={{ backgroundColor: neutralColor }}>
          <h1 className="text-4xl font-bold border-b pb-4" style={{ fontFamily: headlineFont, color: primaryColor }}>{brandName}</h1>
          
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: headlineFont, color: secondaryColor }}>Colors</h2>
            <div className="grid grid-cols-3 gap-4">
                <ColorSwatch color={primaryColor} name="Primary" />
                <ColorSwatch color={secondaryColor} name="Secondary" />
                <ColorSwatch color={neutralColor} name="Neutral" />
            </div>
          </div>
          
           <div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: headlineFont, color: secondaryColor }}>Typography</h2>
            <div className="space-y-2">
                <p className="text-lg" style={{ fontFamily: headlineFont }}>Headline Font: {headlineFont}</p>
                <p style={{ fontFamily: bodyFont }}>Body Font: {bodyFont}</p>
                 <p className="text-sm" style={{ fontFamily: bodyFont }}>This is some sample body text to demonstrate the font in action. It should be clear and legible.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
