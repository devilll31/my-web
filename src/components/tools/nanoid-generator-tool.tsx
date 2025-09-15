'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw, Fingerprint } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

// Basic client-side NanoID-like generator.
const generateNanoId = (size = 21) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
    let id = '';
    for (let i = 0; i < size; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
};

export default function NanoIdGeneratorTool() {
  const [size, setSize] = useState(21);
  const [nanoId, setNanoId] = useState('');
  const { toast } = useToast();

  const generateNewId = () => {
    setNanoId(generateNanoId(size));
  };
  
  useEffect(() => {
    generateNewId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(nanoId);
    toast({ title: 'NanoID copied to clipboard!' });
  };

  const guideProps = {
    title: "How to Use the NanoID Generator",
    steps: [
      { title: "Set Size", description: "Choose the desired length for your ID." },
      { title: "Generate ID", description: "A unique, URL-friendly ID is automatically generated. Click refresh to get a new one." },
      { title: "Copy and Use", description: "Click the copy button to get the NanoID for your application." }
    ],
    features: [
      { icon: Fingerprint, title: "Compact & URL-Friendly", description: "Generate short, unique, URL-safe identifiers, perfect for web applications." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">NanoID Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input value={nanoId} readOnly className="text-lg font-mono h-12 pr-20 text-center"/>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                <Button size="icon" variant="ghost" onClick={generateNewId}><RefreshCw/></Button>
                <Button size="icon" variant="ghost" onClick={copyToClipboard}><Copy/></Button>
            </div>
          </div>
           <div className="space-y-2">
            <Label>ID Length: {size}</Label>
            <Slider value={[size]} onValueChange={v => setSize(v[0])} min={8} max={36}/>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
