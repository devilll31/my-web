'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Layers, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

const shadowStyles = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
};

export default function UiComponentShadowTokensTool() {
    const { toast } = useToast();

    const copyToClipboard = (cssVar: string, value: string) => {
        const css = `${cssVar}: ${value};`;
        navigator.clipboard.writeText(css);
        toast({ title: 'Copied CSS Variable', description: css });
    }

    const cssVariables = Object.entries(shadowStyles).map(([key, value]) => `--shadow-${key}: ${value};`).join('\n');

    const copyAll = () => {
        navigator.clipboard.writeText(`:root {\n${cssVariables}\n}`);
        toast({ title: 'Copied all shadow tokens!'});
    }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <span>UI Component Shadow Tokens</span>
            <Button onClick={copyAll}><Copy className="mr-2"/> Copy All</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(shadowStyles).map(([name, shadow]) => (
          <div key={name} className="grid grid-cols-3 items-center gap-4">
            <div className="p-4 bg-muted rounded-lg flex justify-center items-center">
              <div className="w-20 h-20 bg-card rounded-lg" style={{ boxShadow: shadow }}/>
            </div>
            <div className="col-span-2 space-y-1">
                <p className="font-mono text-sm font-semibold">--shadow-{name}</p>
                <div className="relative">
                    <Input value={shadow} readOnly className="pr-10"/>
                    <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => copyToClipboard(`--shadow-${name}`, shadow)}><Copy className="w-4 h-4"/></Button>
                </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
