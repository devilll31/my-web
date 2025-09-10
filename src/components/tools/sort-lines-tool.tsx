
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { SortAsc, SortDesc, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function SortLinesTool() {
  const [text, setText] = useState('Charlie\nAlice\nBob\nDavid');
  const { toast } = useToast();

  const handleSort = (direction: 'asc' | 'desc') => {
    const lines = text.split('\n');
    lines.sort((a, b) => direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
    setText(lines.join('\n'));
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the Sort Lines Tool",
    steps: [
      { title: "Enter Your List", description: "Paste or type a list of items, with each item on a new line." },
      { title: "Choose Sort Order", description: "Click 'A-Z' to sort alphabetically or 'Z-A' to sort in reverse." },
      { title: "Copy the Sorted List", description: "The text area updates instantly with your sorted list, ready to copy." }
    ],
    features: [
      { icon: SortAsc, title: "Alphabetical Sorting", description: "Quickly organize any list of text lines in alphabetical order." },
      { icon: SortDesc, title: "Reverse Sorting", description: "Easily reverse the order of your list for any purpose." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Sort Lines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text with each item on a new line..."
          className="min-h-[250px]"
        />
        <div className="flex justify-center gap-2">
          <Button onClick={() => handleSort('asc')}>
            <SortAsc className="mr-2" /> Sort A-Z
          </Button>
          <Button onClick={() => handleSort('desc')}>
            <SortDesc className="mr-2" /> Sort Z-A
          </Button>
          <Button onClick={copyToClipboard} variant="outline">
            <Copy className="mr-2" /> Copy
          </Button>
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
