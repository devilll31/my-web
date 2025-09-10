
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Filter, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function UniqueLinesTool() {
  const [text, setText] = useState('Apple\nBanana\nApple\nOrange\nBanana');
  const { toast } = useToast();

  const handleDedupe = () => {
    const lines = text.split('\n');
    const uniqueLines = [...new Set(lines)];
    setText(uniqueLines.join('\n'));
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the Unique Lines Tool",
    steps: [
      { title: "Paste Your List", description: "Enter a list of items, with each item on a new line. The list can contain duplicates." },
      { title: "Remove Duplicates", description: "Click the 'Remove Duplicates' button to instantly process the list and keep only the unique lines." },
      { title: "Copy Your Clean List", description: "Use the copy button to get your deduplicated list." }
    ],
    features: [
      { icon: Filter, title: "Deduplicate Lists", description: "Quickly and easily remove all duplicate entries from any text list, leaving only the unique items." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Unique Lines (Deduplicator)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text with each item on a new line..."
          className="min-h-[250px]"
        />
        <div className="flex justify-center gap-2">
          <Button onClick={handleDedupe}>
            <Filter className="mr-2" /> Remove Duplicates
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
