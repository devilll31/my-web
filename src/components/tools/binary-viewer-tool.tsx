'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { FileCode } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Label } from '../ui/label';

function arrayBufferToBinary(buffer: ArrayBuffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(2).padStart(8, '0'))
        .join(' ');
}

export default function BinaryViewerTool() {
  const [binaryContent, setBinaryContent] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        setBinaryContent(arrayBufferToBinary(buffer));
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
  const guideProps = {
    title: "How to Use the Binary Viewer",
    steps: [
      { title: "Upload a File", description: "Choose any file from your computer." },
      { title: "View Binary Content", description: "The tool reads the file and displays its content as a sequence of binary digits (bits)." },
      { title: "Analyze the Data", description: "Use the binary view for low-level data analysis, debugging, or educational purposes." }
    ],
    features: [
      { icon: FileCode, title: "Low-Level Data Inspection", description: "See the fundamental bits and bytes that make up any file." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Binary Viewer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <Label>Upload File</Label>
            <Input type="file" onChange={handleFileChange} />
        </div>
        <Textarea value={binaryContent} readOnly placeholder="Binary content will appear here..." className="min-h-[300px] font-mono"/>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
