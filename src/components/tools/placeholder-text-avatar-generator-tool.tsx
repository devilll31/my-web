'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Copy, User, Pilcrow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default function PlaceholderTextAvatarGeneratorTool() {
  const [initials, setInitials] = useState('JD');
  const [textLength, setTextLength] = useState(1); // in paragraphs
  const { toast } = useToast();

  const generateText = () => {
      return Array(textLength).fill(loremIpsum).join('\n\n');
  }

  const copyText = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({ title: 'Copied to clipboard!' });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2"><Pilcrow/><CardTitle>Placeholder Text</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label>Number of Paragraphs</Label>
                <Input type="number" value={textLength} onChange={e => setTextLength(parseInt(e.target.value, 10) || 1)} min="1" />
            </div>
            <Textarea value={generateText()} readOnly rows={8}/>
            <Button onClick={() => copyText(generateText())} className="w-full"><Copy className="mr-2"/>Copy Text</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2"><User/><CardTitle>Placeholder Avatar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label>Initials</Label>
                <Input value={initials} onChange={e => setInitials(e.target.value.substring(0, 2).toUpperCase())} maxLength={2} />
            </div>
            <div className="flex justify-center p-4">
                <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-center text-sm text-muted-foreground">This uses the Radix UI Avatar component. No image is generated.</p>
        </CardContent>
      </Card>
    </div>
  );
}
