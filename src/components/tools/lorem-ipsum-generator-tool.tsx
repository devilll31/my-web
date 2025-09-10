'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Pilcrow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default function LoremIpsumGeneratorTool() {
  const [paragraphs, setParagraphs] = useState(3);
  const [generatedText, setGeneratedText] = useState('');
  const { toast } = useToast();

  const generateText = () => {
    const text = Array(paragraphs).fill(lorem).join('\n\n');
    setGeneratedText(text);
  };
  
  const copyToClipboard = () => {
    if(!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    toast({title: 'Copied to clipboard!'});
  }

  const guideProps = {
      title: "How to Use the Lorem Ipsum Generator",
      steps: [
          { title: "Set Paragraphs", description: "Enter the number of Lorem Ipsum paragraphs you need." },
          { title: "Generate Text", description: "Click the 'Generate' button to create the placeholder text." },
          { title: "Copy and Use", description: "The generated text appears in the text box, ready to be copied and used in your designs." }
      ],
      features: [
          { icon: Pilcrow, title: "Standard Placeholder", description: "Quickly generate standard Lorem Ipsum text, the design industry's default placeholder content." },
      ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Lorem Ipsum Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
                <div className="flex-1">
                    <Label htmlFor="paragraphs">Number of Paragraphs</Label>
                    <Input id="paragraphs" type="number" value={paragraphs} onChange={e => setParagraphs(parseInt(e.target.value, 10) || 1)} min="1"/>
                </div>
                <Button onClick={generateText}>Generate</Button>
            </div>
            <Textarea value={generatedText} readOnly placeholder="Generated text will appear here..." className="min-h-[250px]" />
            <Button onClick={copyToClipboard} variant="outline" className="w-full" disabled={!generatedText}>
                <Copy className="mr-2"/> Copy Text
            </Button>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
