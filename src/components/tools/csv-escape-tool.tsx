'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { FileText } from 'lucide-react';

export default function CsvEscapeTool() {
  const [text, setText] = useState('This field contains a comma, and "quotes".');

  const escapeCsv = () => {
    // Basic CSV escaping: if a field contains a comma, newline, or double quote, enclose it in double quotes.
    // Also, any double quotes within the field must be escaped by another double quote.
    if (text.includes(',') || text.includes('\n') || text.includes('"')) {
      const escapedText = text.replace(/"/g, '""');
      setText(`"${escapedText}"`);
    }
  };
  
  const unescapeCsv = () => {
    if (text.startsWith('"') && text.endsWith('"')) {
      const innerText = text.substring(1, text.length - 1);
      const unescapedText = innerText.replace(/""/g, '"');
      setText(unescapedText);
    }
  };
  
  const guideProps = {
    title: "How to Use the CSV Escape/Unescape Tool",
    steps: [
      { title: "Enter Field Text", description: "Paste the text for a single CSV field into the text area." },
      { title: "Escape for CSV", description: "Click 'Escape' to wrap the field in quotes and escape internal quotes if it contains commas, newlines, or quotes." },
      { title: "Unescape from CSV", description: "Click 'Unescape' to reverse the process, removing the wrapping quotes and un-escaping internal quotes." }
    ],
    features: [
      { icon: FileText, title: "Ensure CSV Integrity", description: "Properly escape fields to ensure your CSV file is parsed correctly by applications like Excel or database importers." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">CSV Field Escape/Unescape</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px]"
            placeholder="Input/Output"
          />
          <div className="flex justify-center gap-2">
            <Button onClick={escapeCsv}>Escape <ArrowRightLeft className="ml-2"/></Button>
            <Button onClick={unescapeCsv}>Unescape <ArrowRightLeft className="ml-2"/></Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}