'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Code, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Base64EncoderDecoderTool() {
  const [inputText, setInputText] = useState('Hello World!');
  const [outputText, setOutputText] = useState('SGVsbG8gV29ybGQh');
  const { toast } = useToast();

  const encode = () => {
    try {
      setOutputText(btoa(unescape(encodeURIComponent(inputText))));
      toast({ title: "Encoded!", description: "Text successfully encoded to Base64." });
    } catch (e) {
      toast({ title: 'Error', description: 'Could not encode text. Invalid characters detected.', variant: 'destructive'});
    }
  };
  
  const decode = () => {
    try {
      setOutputText(decodeURIComponent(escape(atob(inputText))));
      toast({ title: "Decoded!", description: "Base64 successfully decoded." });
    } catch (e) {
       toast({ title: 'Error', description: 'Could not decode text. Invalid Base64 string.', variant: 'destructive'});
    }
  };
  
  const guideProps = {
    title: "How to Use the Base64 Encoder/Decoder",
    steps: [
      { title: "Enter Text or Data", description: "Paste any string or data into the input box." },
      { title: "Encode or Decode", description: "Click 'Encode' to convert to a Base64 string, or 'Decode' to convert from Base64 back to the original data." },
      { title: "Use the Result", description: "The converted text appears in the output box, ready to be copied." }
    ],
    features: [
      { icon: Code, title: "Data Encoding", description: "Base64 is a common encoding scheme used to represent binary data in an ASCII string format, making it safe for transmission over text-based protocols." },
      { icon: Shield, title: "Safe for URLs & HTML", description: "Encode data to safely embed it within URLs or HTML data attributes without breaking the structure." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Base64 Encoder/Decoder</CardTitle>
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