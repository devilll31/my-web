'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Code, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function HtmlEntitiesEncoderDecoderTool() {
  const [inputText, setInputText] = useState('<p>This is a "test" & it\'s working!</p>');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();

  const encode = () => {
    // This is a client-side only way to do it without extra libraries
    const element = document.createElement('div');
    element.innerText = inputText;
    setOutputText(element.innerHTML);
    toast({ title: 'Encoded!', description: 'Text converted to HTML entities.' });
  };
  
  const decode = () => {
    // This is a client-side only way to do it without extra libraries
    const element = document.createElement('div');
    element.innerHTML = inputText;
    setOutputText(element.textContent || '');
    toast({ title: 'Decoded!', description: 'HTML entities converted to text.' });
  };

  const guideProps = {
    title: "How to Use the HTML Entities Encoder/Decoder",
    steps: [
      { title: "Enter Text", description: "Paste your string or HTML into the input box." },
      { title: "Encode or Decode", description: "Click 'Encode' to convert characters like <, >, & to their HTML entities (e.g., &lt;, &gt;, &amp;). Click 'Decode' to convert them back." },
      { title: "Use the Result", description: "The converted text appears in the output box, ready to be copied." }
    ],
    features: [
      { icon: Code, title: "Safe HTML Display", description: "Encode text to safely display it as code on a webpage without it being rendered as HTML." },
      { icon: Shield, title: "Prevent XSS", description: "Encoding user-generated content before displaying it is a key step in preventing Cross-Site Scripting (XSS) attacks." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">HTML Entities Encoder/Decoder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
            placeholder="Input"
          />
          <div className="flex justify-center gap-2">
            <Button onClick={encode}>Encode <ArrowRightLeft className="ml-2"/></Button>
            <Button onClick={decode}>Decode <ArrowRightLeft className="ml-2"/></Button>
          </div>
          <Textarea 
            value={outputText}
            readOnly
            className="min-h-[150px] bg-secondary"
            placeholder="Output"
          />
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
