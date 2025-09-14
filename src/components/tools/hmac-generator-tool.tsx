'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Key, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

async function generateHmac(text: string, secret: string, algorithm: HashAlgorithm): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(text);
    
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algorithm },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HmacGeneratorTool() {
  const [inputText, setInputText] = useState('hello world');
  const [secret, setSecret] = useState('my-secret-key');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [hmac, setHmac] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const computeHmac = async () => {
        if (!inputText || !secret) {
            setHmac('');
            return;
        }
        const result = await generateHmac(inputText, secret, algorithm);
        setHmac(result);
    };
    computeHmac();
  }, [inputText, secret, algorithm]);

  const copyToClipboard = () => {
    if (!hmac) return;
    navigator.clipboard.writeText(hmac);
    toast({ title: 'HMAC copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the HMAC Generator",
    steps: [
      { title: "Enter Data & Key", description: "Provide the message data and a secret key." },
      { title: "Select Algorithm", description: "Choose the hashing algorithm (SHA-256 is recommended)." },
      { title: "Copy the HMAC", description: "The tool generates the HMAC signature, which you can copy for use in verifying message authenticity." }
    ],
    features: [
      { icon: Key, title: "Message Authentication", description: "Generate a Hash-based Message Authentication Code (HMAC) to verify both the integrity and authenticity of a message." },
      { icon: Hash, title: "Secure Hashing", description: "Uses a secret key in combination with a cryptographic hash function (like SHA-256) to create a secure signature." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">HMAC Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-text">Message / Data</Label>
            <Textarea 
              id="input-text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="min-h-[150px] font-mono"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="secret-key">Secret Key</Label>
                <Input id="secret-key" value={secret} onChange={e => setSecret(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Algorithm</Label>
                <Select value={algorithm} onValueChange={(v: HashAlgorithm) => setAlgorithm(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SHA-256">SHA-256</SelectItem>
                        <SelectItem value="SHA-1">SHA-1</SelectItem>
                        <SelectItem value="SHA-512">SHA-512</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Generated HMAC</Label>
            <div className="relative">
              <Input value={hmac} readOnly className="bg-secondary pr-10 font-mono text-xs h-12"/>
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={copyToClipboard}><Copy className="w-4 h-4"/></Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
