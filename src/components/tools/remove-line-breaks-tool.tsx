
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Eraser, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function RemoveLineBreaksTool() {
  const [text, setText] = useState('This is line one.\nThis is line two.\nAnd this is line three.');
  const { toast } = useToast();

  const handleRemoveLineBreaks = () => {
    // Replaces one or more newline characters with a single space
    const newText = text.replace(/(\r\n|\n|\r)+/g, ' ').trim();
    setText(newText);
  };
  
  const copyToClipboard = () => {
      if(!text) return;
      navigator.clipboard.writeText(text);
      toast({title: 'Copied to clipboard!'});
  };

  const guideProps = {
    title: "How to Use the Line Break Remover",
    steps: [
      { title: "Paste Your Text", description: "Enter the text with line breaks that you want to consolidate." },
      { title: "Remove Breaks", description: "Click the 'Remove Line Breaks' button to join all lines into a single paragraph." },
      { title: "Copy the Result", description: "Use the copy button to get your reformatted text." }
    ],
    features: [
        { icon: Eraser, title: "Consolidate Paragraphs", description: "Quickly convert text from emails or documents with awkward line breaks into a clean, single paragraph." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Remove Line Breaks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste text here..."
          className="min-h-[250px]"
        />
        <div className="flex justify-center gap-2">
            <Button onClick={handleRemoveLineBreaks}>
                <Eraser className="mr-2"/> Remove Line Breaks
            </Button>
            <Button onClick={copyToClipboard} variant="outline">
                <Copy className="mr-2"/> Copy
            </Button>
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
