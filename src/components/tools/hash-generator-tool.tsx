'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Lock, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGeneratorTool() {
  const [inputText, setInputText] = useState('hello world');
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const computeHashes = async () => {
        const sha1 = await generateHash(inputText, 'SHA-1');
        const sha256 = await generateHash(inputText, 'SHA-256');
        const sha384 = await generateHash(inputText, 'SHA-384');
        const sha512 = await generateHash(inputText, 'SHA-512');
        setHashes({
            'SHA-1': sha1,
            'SHA-256': sha256,
            'SHA-384': sha384,
            'SHA-512': sha512,
        });
    };
    computeHashes();
  }, [inputText]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied hash to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the Hash Generator",
    steps: [
      { title: "Enter Text", description: "Type or paste any text into the input area." },
      { title: "View Hashes", description: "The tool automatically generates SHA-1, SHA-256, SHA-384, and SHA-512 hashes for your input." },
      { title: "Copy and Use", description: "Click the copy icon next to any hash to copy it to your clipboard for use in your applications." }
    ],
    features: [
      { icon: Lock, title: "Data Integrity", description: "Generate cryptographic hashes to verify data integrity and create secure digital signatures." },
      { icon: Hash, title: "Multiple Algorithms", description: "Supports common secure hashing algorithms like SHA-1, SHA-256, and SHA-512 for various security needs." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Hash Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="input-text">Input Text</Label>
            <Textarea 
              id="input-text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="min-h-[150px] font-mono"
            />
          </div>
          <div className="space-y-3">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo}>
                <Label>{algo}</Label>
                <div className="relative">
                  <Input value={hash} readOnly className="bg-secondary pr-10 font-mono text-xs"/>
                  <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => copyToClipboard(hash)}><Copy className="w-4 h-4"/></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
