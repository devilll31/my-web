'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Key, FileJson } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

function safeJsonParse(str: string) {
    try {
        return JSON.stringify(JSON.parse(str), null, 2);
    } catch (e) {
        return "Invalid JSON";
    }
}

export default function JwtDecoderTool() {
  const [jwt, setJwt] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!jwt) {
        setHeader('');
        setPayload('');
        setSignature('');
        setError('');
        return;
    }
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT structure. A JWT must have three parts separated by dots.');
      setHeader('');
      setPayload('');
      setSignature('');
      return;
    }
    
    setError('');
    try {
      const decodedHeader = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
      setHeader(safeJsonParse(decodedHeader));
    } catch(e) {
      setHeader('Invalid Base64 in Header');
    }
    
    try {
      const decodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      setPayload(safeJsonParse(decodedPayload));
    } catch(e) {
      setPayload('Invalid Base64 in Payload');
    }
    
    setSignature(parts[2]);
  }, [jwt]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the JWT Decoder",
    steps: [
      { title: "Paste Your Token", description: "Enter a JSON Web Token (JWT) into the input area." },
      { title: "View Decoded Data", description: "The tool automatically decodes and displays the Header and Payload sections of the token." },
      { title: "Inspect the Signature", description: "The signature part of the token is also displayed, though this tool does not perform signature verification." }
    ],
    features: [
      { icon: FileJson, title: "Debug Tokens", description: "Quickly inspect the contents of a JWT to debug authentication and authorization issues in your application." },
      { icon: Key, title: "Client-Side Decoding", description: "All decoding happens in your browser, ensuring your sensitive tokens are never sent to a server." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">JWT Decoder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jwt-input">Encoded JWT</Label>
            <Textarea
              id="jwt-input"
              value={jwt}
              onChange={e => setJwt(e.target.value)}
              className="min-h-[100px] font-mono text-xs"
              placeholder="Paste your JWT here..."
            />
          </div>
          {error && <p className="text-destructive text-center text-sm">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Header</Label>
                <div className={cn("relative p-2 bg-red-900/10 rounded-md min-h-[150px]", {'bg-red-500/10': header.startsWith('Invalid')})}>
                    <pre className="text-xs font-mono text-red-400 whitespace-pre-wrap">{header}</pre>
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => copyToClipboard(header)}><Copy className="w-4 h-4"/></Button>
                </div>
            </div>
             <div className="space-y-2">
                <Label>Payload</Label>
                 <div className={cn("relative p-2 bg-blue-900/10 rounded-md min-h-[150px]", {'bg-red-500/10': payload.startsWith('Invalid')})}>
                    <pre className="text-xs font-mono text-blue-400 whitespace-pre-wrap">{payload}</pre>
                     <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => copyToClipboard(payload)}><Copy className="w-4 h-4"/></Button>
                </div>
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label>Signature</Label>
                 <div className="relative p-2 bg-purple-900/10 rounded-md">
                    <pre className="text-xs font-mono text-purple-400 whitespace-pre-wrap truncate">{signature}</pre>
                    <Button size="icon" variant="ghost" className="absolute top-1/2 -translate-y-1/2 right-2" onClick={() => copyToClipboard(signature)}><Copy className="w-4 h-4"/></Button>
                </div>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">Note: This tool decodes the JWT but does not verify the signature. Do not trust the payload without verification.</p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
