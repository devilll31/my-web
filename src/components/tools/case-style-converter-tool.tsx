'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Code2, CaseSensitive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function CaseStyleConverterTool() {
  const [text, setText] = useState('hello world example');
  const { toast } = useToast();

  const toCamelCase = (str: string) => str.replace(/[-_ ](.)/g, (_, c) => c.toUpperCase());
  const toSnakeCase = (str: string) => str.replace(/[ -]/g, '_').toLowerCase();
  const toKebabCase = (str: string) => str.replace(/[ _]/g, '-').toLowerCase();
  const toPascalCase = (str: string) => str.replace(/(^|[-_ ])(.)/g, (_, __, c) => c.toUpperCase());

  const cases = {
    'camelCase': toCamelCase(text),
    'snake_case': toSnakeCase(text),
    'kebab-case': toKebabCase(text),
    'PascalCase': toPascalCase(text),
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: 'Copied to clipboard!' });
  };

  const guideProps = {
    title: "How to Use the Case Style Converter",
    steps: [
      { title: "Enter Text", description: "Type a variable name or any string into the input field." },
      { title: "View Conversions", description: "The tool automatically converts your input into common programming case styles: camelCase, snake_case, kebab-case, and PascalCase." },
      { title: "Copy and Use", description: "Click the copy icon next to any converted style to use it in your code." }
    ],
    features: [
      { icon: Code2, title: "For Developers", description: "Quickly convert variable or file names to the case style required by your project's coding standards." },
      { icon: CaseSensitive, title: "Multiple Styles", description: "Supports the most common case styles used in various programming languages and frameworks." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Programming Case Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Input value={text} onChange={e => setText(e.target.value)} />
          </div>
          <div className="space-y-3 pt-4">
            {Object.entries(cases).map(([caseName, value]) => (
              <div key={caseName}>
                <Label>{caseName}</Label>
                <div className="relative">
                  <Input value={value} readOnly className="bg-secondary pr-10 font-mono"/>
                  <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => copyToClipboard(value)}><Copy className="w-4 h-4"/></Button>
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
