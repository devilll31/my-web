
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Eraser, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function RemoveExtraSpacesTool() {
  const [text, setText] = useState('This   has   a lot    of extra   spaces.');
  const { toast } = useToast();

  const handleRemoveSpaces = () => {
    const newText = text.replace(/\s+/g, ' ').trim();
    setText(newText);
  };
  
  const copyToClipboard = () => {
      if(!text) return;
      navigator.clipboard.writeText(text);
      toast({title: 'Copied to clipboard!'});
  };

  const guideProps = {
    title: "How to Use the Extra Space Remover",
    steps: [
      { title: "Paste Your Text", description: "Enter the text you want to clean up into the text area." },
      { title: "Remove Spaces", description: "Click the 'Remove Extra Spaces' button to instantly remove duplicate spaces and trim leading/trailing whitespace." },
      { title: "Copy the Clean Text", description: "Use the copy button to get your perfectly formatted text." }
    ],
    features: [
        { icon: Eraser, title: "Clean Up Text", description: "A simple one-click tool to fix text with inconsistent or accidental extra spacing." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Remove Extra Spaces</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste text here..."
          className="min-h-[250px]"
        />
        <div className="flex justify-center gap-2">
            <Button onClick={handleRemoveSpaces}>
                <Eraser className="mr-2"/> Remove Extra Spaces
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
