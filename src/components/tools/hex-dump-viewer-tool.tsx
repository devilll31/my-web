'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { FileUp, FileCode } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';

function arrayBufferToHex(buffer: ArrayBuffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');
}

export default function HexDumpViewerTool() {
  const [hexContent, setHexContent] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        setHexContent(arrayBufferToHex(buffer));
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
  const guideProps = {
    title: "How to Use the Hex Dump Viewer",
    steps: [
      { title: "Upload a File", description: "Choose any file from your computer." },
      { title: "View Hex Content", description: "The tool will read the file and display its raw byte content in hexadecimal format." },
      { title: "Analyze the Data", description: "Use the hex dump for debugging, reverse engineering, or understanding file structures." }
    ],
    features: [
      { icon: FileCode, title: "Raw Byte Analysis", description: "Inspect the underlying bytes of any file, essential for developers and security researchers." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Hex Dump Viewer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <Label>Upload File</Label>
            <Input type="file" onChange={handleFileChange} />
        </div>
        <Textarea value={hexContent} readOnly placeholder="Hex content will appear here..." className="min-h-[300px] font-mono"/>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}