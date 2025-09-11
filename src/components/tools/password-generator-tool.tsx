'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, RefreshCw, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let charset = '';
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    if (charset === '') {
        setPassword('Select at least one character type.');
        return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };
  
  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({ title: 'Password copied to clipboard!' });
    }
  };

  const guideProps = {
    title: "How to Use the Password Generator",
    steps: [
      { title: "Set Options", description: "Choose the desired length and select which character types (uppercase, lowercase, numbers, symbols) to include." },
      { title: "Generate or Refresh", description: "A strong password is automatically generated. Click the refresh button to create a new one with the same settings." },
      { title: "Copy and Use", description: "Click the copy button to securely copy the generated password to your clipboard." }
    ],
    features: [
      { icon: Lock, title: "Strong & Secure", description: "Create strong, random passwords that are difficult to guess, enhancing your online security." },
      { icon: RefreshCw, title: "Customizable", description: "Tailor the password to meet the specific requirements of any website or service by including or excluding character types." },
    ]
  };

  return (
    <>
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Password Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
            <Input value={password} readOnly className="text-2xl font-mono h-14 pr-20"/>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button size="icon" variant="ghost" onClick={generatePassword}><RefreshCw/></Button>
                <Button size="icon" variant="ghost" onClick={copyPassword}><Copy/></Button>
            </div>
        </div>
        <div className="space-y-4">
            <div>
                <Label>Length: {length}</Label>
                <Slider value={[length]} onValueChange={v => setLength(v[0])} min={8} max={64} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2"><Checkbox id="upper" checked={includeUppercase} onCheckedChange={c => setIncludeUppercase(c as boolean)}/><Label htmlFor="upper">Uppercase (A-Z)</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="lower" checked={includeLowercase} onCheckedChange={c => setIncludeLowercase(c as boolean)}/><Label htmlFor="lower">Lowercase (a-z)</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="numbers" checked={includeNumbers} onCheckedChange={c => setIncludeNumbers(c as boolean)}/><Label htmlFor="numbers">Numbers (0-9)</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="symbols" checked={includeSymbols} onCheckedChange={c => setIncludeSymbols(c as boolean)}/><Label htmlFor="symbols">Symbols (!@#$...)</Label></div>
            </div>
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
