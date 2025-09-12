'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Link, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function UrlEncoderDecoderTool() {
  const [inputText, setInputText] = useState('https://example.com/search?q=special characters & spaces');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();

  const encode = () => {
    setOutputText(encodeURIComponent(inputText));
    toast({ title: 'Encoded!', description: 'URL has been percent-encoded.' });
  };
  
  const decode = () => {
    try {
      setOutputText(decodeURIComponent(inputText));
      toast({ title: 'Decoded!', description: 'URL has been decoded.' });
    } catch (e) {
       toast({ title: 'Error', description: 'Could not decode URL. Invalid encoding detected.', variant: 'destructive'});
    }
  };
  
  const guideProps = {
    title: "How to Use the URL Encoder/Decoder",
    steps: [
      { title: "Enter URL or Text", description: "Paste a URL or any string into the input box." },
      { title: "Encode or Decode", description: "Click 'Encode' to convert special characters into percent-encoding (e.g., a space becomes %20). Click 'Decode' to convert them back." },
      { title: "Use the Result", description: "The converted URL appears in the output box, ready to be used." }
    ],
    features: [
      { icon: Link, title: "Safe for URLs", description: "Ensure your URLs are safe for transmission and won't be broken by special characters like spaces, ampersands, or question marks." },
      { icon: Shield, title: "Valid Query Parameters", description: "Properly encode data that you want to pass as query parameters in a URL." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">URL Encoder/Decoder</CardTitle>
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
