
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { CaseSensitive, Pilcrow, Trash } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { useToast } from '@/hooks/use-toast';

export default function CaseConverterTool() {
  const [inputText, setInputText] = useState('The quick brown fox jumps over the lazy dog.');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();

  const handleConvert = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    let result = '';
    switch (type) {
      case 'upper':
        result = inputText.toUpperCase();
        break;
      case 'lower':
        result = inputText.toLowerCase();
        break;
      case 'title':
        result = inputText.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'sentence':
        result = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        break;
    }
    setOutputText(result);
  };
  
  const copyToClipboard = () => {
    if(!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast({title: 'Copied to clipboard!'});
  }

  const guideProps = {
      title: "How to Use the Case Converter",
      steps: [
          { title: "Enter Text", description: "Type or paste your text into the input area." },
          { title: "Choose a Case", description: "Click one of the buttons (e.g., 'UPPERCASE', 'Title Case') to convert your text." },
          { title: "Copy the Result", description: "Your converted text appears in the output box, ready to be copied." }
      ],
      features: [
          { icon: CaseSensitive, title: "Multiple Formats", description: "Easily switch between uppercase, lowercase, title case, and sentence case." },
          { icon: Pilcrow, title: "Quick & Easy", description: "A simple and fast tool for all your text case conversion needs." },
      ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Case Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Input Text"
              className="min-h-[200px]"
            />
            <Textarea
              value={outputText}
              readOnly
              placeholder="Output Text"
              className="min-h-[200px] bg-secondary"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <Button onClick={() => handleConvert('upper')}>UPPERCASE</Button>
            <Button onClick={() => handleConvert('lower')}>lowercase</Button>
            <Button onClick={() => handleConvert('title')}>Title Case</Button>
            <Button onClick={() => handleConvert('sentence')}>Sentence case</Button>
          </div>
           <div className="flex justify-center gap-2">
            <Button onClick={copyToClipboard} variant="outline">Copy Output</Button>
            <Button onClick={() => {setInputText(''); setOutputText('');}} variant="destructive"><Trash className="mr-2"/>Clear</Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
