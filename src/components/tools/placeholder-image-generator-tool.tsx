'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Copy, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function PlaceholderImageGeneratorTool() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [text, setText] = useState('600x400');
  const [bgColor, setBgColor] = useState('#cccccc');
  const [textColor, setTextColor] = useState('#333333');
  const { toast } = useToast();

  const imageUrl = `https://placehold.co/${width}x${height}/${bgColor.substring(1)}/${textColor.substring(1)}?text=${encodeURIComponent(text)}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    toast({ title: 'Image URL copied to clipboard!' });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div><Label>Width</Label><Input type="number" value={width} onChange={e => setWidth(parseInt(e.target.value, 10))} /></div>
             <div><Label>Height</Label><Input type="number" value={height} onChange={e => setHeight(parseInt(e.target.value, 10))} /></div>
          </div>
           <div><Label>Text</Label><Input value={text} onChange={e => setText(e.target.value)} /></div>
           <div className="grid grid-cols-2 gap-4">
            <div><Label>Background</Label><Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="h-10"/></div>
            <div><Label>Text Color</Label><Input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="h-10"/></div>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader><CardTitle>Preview & URL</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg flex justify-center items-center h-64">
                <Image src={imageUrl} alt="Placeholder" width={width} height={height} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
            </div>
            <div className="relative">
                <Input value={imageUrl} readOnly />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={copyUrl}><Copy className="w-4 h-4"/></Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
