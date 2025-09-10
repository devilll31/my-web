
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Replace, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function FindReplaceTool() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [findText, setFindText] = useState('fox');
  const [replaceText, setReplaceText] = useState('cat');
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const handleReplace = () => {
    if (!findText) return;
    const regex = new RegExp(findText, 'g');
    const matches = text.match(regex);
    setCount(matches ? matches.length : 0);
    const newText = text.replace(regex, replaceText);
    setText(newText);
  };
  
  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the Find & Replace Tool",
    steps: [
      { title: "Enter Your Text", description: "Paste the text you want to modify into the main text area." },
      { title: "Define Terms", description: "Enter the word or phrase you want to find and the text you want to replace it with." },
      { title: "Replace All", description: "Click 'Replace All' to perform the replacement. The tool will also tell you how many instances were replaced." }
    ],
    features: [
      { icon: Replace, title: "Bulk Replacement", description: "Save time by replacing all occurrences of a word or phrase in your text with a single click." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Find & Replace</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="min-h-[200px]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="find-text">Find</Label>
            <Input id="find-text" value={findText} onChange={e => setFindText(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="replace-text">Replace with</Label>
            <Input id="replace-text" value={replaceText} onChange={e => setReplaceText(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-center gap-2">
            <Button onClick={handleReplace}><Replace className="mr-2"/> Replace All</Button>
             <Button onClick={copyToClipboard} variant="outline">
                <Copy className="mr-2"/> Copy Result
            </Button>
        </div>
        {count > 0 && <p className="text-center text-sm text-muted-foreground">{count} instance(s) replaced.</p>}
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
