'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Copy, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Color {
  id: number;
  name: string;
  hex: string;
}

export default function CssVariablePaletteExporterTool() {
  const [colors, setColors] = useState<Color[]>([
    { id: 1, name: 'primary', hex: '#558bcf' },
    { id: 2, name: 'accent', hex: '#ffab40' },
    { id: 3, name: 'background', hex: '#f0f4f8' },
  ]);
  const { toast } = useToast();

  const addColor = () => setColors([...colors, { id: Date.now(), name: 'new-color', hex: '#000000' }]);
  const removeColor = (id: number) => setColors(colors.filter(c => c.id !== id));
  const updateColor = (id: number, field: 'name' | 'hex', value: string) => {
    setColors(colors.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  
  const cssOutput = `:root {\n${colors.map(c => `  --color-${c.name}: ${c.hex};`).join('\n')}\n}`;
  
  const copyCss = () => {
      navigator.clipboard.writeText(cssOutput);
      toast({title: "CSS Variables copied!"});
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Color Palette</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {colors.map(color => (
            <div key={color.id} className="flex items-center gap-2">
              <Input value={color.name} onChange={e => updateColor(color.id, 'name', e.target.value.replace(/\s+/g, '-'))} placeholder="Variable Name" />
              <Input type="color" value={color.hex} onChange={e => updateColor(color.id, 'hex', e.target.value)} className="w-16 h-10 p-1"/>
              <Input value={color.hex} onChange={e => updateColor(color.id, 'hex', e.target.value)} />
              <Button size="icon" variant="ghost" onClick={() => removeColor(color.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
            </div>
          ))}
          <Button onClick={addColor} variant="outline" className="w-full"><PlusCircle className="mr-2"/>Add Color</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>CSS Output</CardTitle>
            <Button onClick={copyCss}><Copy className="mr-2"/>Copy CSS</Button>
        </CardHeader>
        <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>{cssOutput}</code></pre>
        </CardContent>
      </Card>
    </div>
  );
}
