'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import HowToUseGuide from '../how-to-use-guide';
import { Pilcrow, AlignRight } from 'lucide-react';

const sampleText = "This is a sample sentence. \nمرحبا بالعالم";

export default function RightToLeftLayoutTesterTool() {
  const [text, setText] = useState(sampleText);
  
  const guideProps = {
    title: "How to Use the RTL Layout Tester",
    steps: [
      { title: "Enter Text", description: "Type or paste text into the input area. Include RTL text (like Arabic or Hebrew) to see the effect." },
      { title: "Preview RTL Layout", description: "The panel on the right shows how your text will be rendered inside a container with `direction: rtl`, which is standard for right-to-left languages." },
      { title: "Check Your UI", description: "Use this to quickly test how UI components or text blocks behave in an RTL context." }
    ],
    features: [
      { icon: AlignRight, title: "Visual RTL Simulation", description: "Instantly see how your content aligns and flows in a right-to-left layout." },
      { icon: Pilcrow, title: "Mixed Content Support", description: "Works with mixed LTR and RTL text to simulate real-world localization scenarios." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader><CardTitle className="text-center">Right-to-Left (RTL) Layout Tester</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Your Text (LTR)</Label>
            <Textarea value={text} onChange={e => setText(e.target.value)} rows={8}/>
          </div>
          <div>
            <Label>RTL Preview</Label>
            <div dir="rtl" className="p-3 border rounded-md min-h-[150px] bg-secondary text-right">
              {text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
