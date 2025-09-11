'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Code, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Base64TextEncoderDecoderTool() {
  const [inputText, setInputText] = useState('Hello World!');
  const [outputText, setOutputText] = useState('SGVsbG8gV29ybGQh');
  const { toast } = useToast();

  const encode = () => {
    try {
      setOutputText(btoa(inputText));
    } catch (e) {
      toast({ title: 'Error', description: 'Could not encode text. Invalid characters detected.', variant: 'destructive'});
    }
  };
  
  const decode = () => {
    try {
      setOutputText(atob(inputText));
    } catch (e) {
       toast({ title: 'Error', description: 'Could not decode text. Invalid Base64 string.', variant: 'destructive'});
    }
  };
  
  const guideProps = {
    title: "How to Use the Base64 Text Encoder/Decoder",
    steps: [
      { title: "Enter Text", description: "Paste any string into the input box." },
      { title: "Encode or Decode", description: "Click 'Encode' to convert to a Base64 string, or 'Decode' to convert from Base64 back to regular text." },
      { title: "Use the Result", description: "The converted text appears in the output box, ready to be copied." }
    ],
    features: [
      { icon: Lock, title: "Data Encoding", description: "Base64 is a common encoding scheme used to represent binary data in an ASCII string format." },
      { icon: Code, title: "Developer Utility", description: "Useful for developers working with APIs, data URIs, or any system that transmits data as text." }
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Base64 Text Encoder/Decoder</CardTitle>
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