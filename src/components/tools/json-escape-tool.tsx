'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Code } from 'lucide-react';

export default function JsonEscapeTool() {
  const [text, setText] = useState('{"message": "This is a string with a \\"quote\\" and a newline\\ncharacter."}');

  const escapeJson = () => {
    // Escaping a string to be embedded in another JSON string
    setText(JSON.stringify(text));
  };
  
  const unescapeJson = () => {
    try {
      // Unescaping a string that was previously stringified
      setText(JSON.parse(text));
    } catch(e) {
      alert("Invalid JSON string to unescape.");
    }
  };
  
  const guideProps = {
    title: "How to Use the JSON Escape/Unescape Tool",
    steps: [
      { title: "Enter Text", description: "Paste a string into the text area." },
      { title: "Escape for JSON", description: "Click 'Escape' to convert special characters (like quotes, backslashes, newlines) into their escaped versions, making the string safe to embed inside another JSON value." },
      { title: "Unescape from JSON", description: "Click 'Unescape' to reverse the process, turning the escaped sequences back into their original characters." }
    ],
    features: [
      { icon: Code, title: "Embed Strings Safely", description: "Crucial for when you need to place a string that itself contains special characters (or is a JSON string) as a value within another JSON object." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">JSON Escape/Unescape</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px]"
            placeholder="Input/Output"
          />
          <div className="flex justify-center gap-2">
            <Button onClick={escapeJson}>Escape <ArrowRightLeft className="ml-2"/></Button>
            <Button onClick={unescapeJson}>Unescape <ArrowRightLeft className="ml-2"/></Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}