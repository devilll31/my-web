'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw, Fingerprint } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function UuidGeneratorTool() {
  const [uuid, setUuid] = useState('');
  const { toast } = useToast();

  const generateUuid = () => {
    // crypto.randomUUID() is a modern, secure way to generate v4 UUIDs in the browser.
    setUuid(crypto.randomUUID());
  };
  
  // Generate a UUID on component mount
  useEffect(() => {
    generateUuid();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid);
    toast({ title: 'UUID copied to clipboard!' });
  };

  const guideProps = {
    title: "How to Use the UUID Generator",
    steps: [
      { title: "Generate UUID", description: "A unique version 4 UUID is automatically generated when you load the tool." },
      { title: "Refresh for New ID", description: "Click the refresh button to generate a new, unique ID at any time." },
      { title: "Copy and Use", description: "Click the copy button to get the UUID for use in your databases, code, or any other application." }
    ],
    features: [
      { icon: Fingerprint, title: "Universally Unique", description: "Generate standard Version 4 UUIDs (Universally Unique Identifiers) for your development needs." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">UUID Generator (v4)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input value={uuid} readOnly className="text-lg font-mono h-12 pr-20 text-center"/>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                <Button size="icon" variant="ghost" onClick={generateUuid}><RefreshCw/></Button>
                <Button size="icon" variant="ghost" onClick={copyToClipboard}><Copy/></Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
