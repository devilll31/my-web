'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Key, RotateCw } from 'lucide-react';

export default function Rot13EncoderDecoderTool() {
  const [text, setText] = useState('Why did the chicken cross the road?');

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() <= 'm' ? 13 : -13)
      );
    });
  };

  const handleConvert = () => {
    setText(rot13(text));
  };
  
  const guideProps = {
    title: "How to Use the ROT13 Encoder/Decoder",
    steps: [
      { title: "Enter Text", description: "Paste any text into the input box." },
      { title: "Click Convert", description: "Click the 'Convert' button to apply the ROT13 cipher. Clicking it again will decode the text back to the original." },
      { title: "Simple Cipher", description: "ROT13 is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet." }
    ],
    features: [
      { icon: Key, title: "Simple Obfuscation", description: "A fun and simple way to hide text, often used in online forums to hide spoilers, punchlines, or puzzle solutions." },
      { icon: RotateCw, title: "Reversible Cipher", description: "Applying the ROT13 cipher twice to a piece of text will restore it to its original form." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">ROT13 Encoder/Decoder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px]"
            placeholder="Input/Output"
          />
          <div className="flex justify-center gap-2">
            <Button onClick={handleConvert}>Convert <ArrowRightLeft className="ml-2"/></Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
