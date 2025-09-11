'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Copy, Globe, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

interface HreflangEntry {
  id: number;
  url: string;
  langCode: string;
}

export default function HreflangGeneratorTool() {
  const [entries, setEntries] = useState<HreflangEntry[]>([
    { id: 1, url: 'https://example.com/en/page', langCode: 'en' },
    { id: 2, url: 'https://example.com/es/page', langCode: 'es' },
  ]);
  const [xDefault, setXDefault] = useState('https://example.com/en/page');
  const { toast } = useToast();

  const addEntry = () => {
    setEntries([...entries, { id: Date.now(), url: '', langCode: '' }]);
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
  };
  
  const updateEntry = (id: number, field: 'url' | 'langCode', value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };
  
  const generatedTags = entries
    .map(e => `<link rel="alternate" hreflang="${e.langCode}" href="${e.url}" />`)
    .join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${xDefault}" />`;

  const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedTags);
      toast({title: 'Hreflang tags copied to clipboard!'});
  }

  const guideProps = {
    title: "How to Use the Hreflang Generator",
    steps: [
      { title: "Add URLs and Language Codes", description: "For each version of a page, enter its full URL and the correct language-country code (e.g., 'en-US', 'es-ES')." },
      { title: "Set a Default", description: "Specify a default URL for users whose language/region doesn't match any of the specified versions." },
      { title: "Generate and Copy", description: "The tool generates the correct HTML <link> tags. Copy and paste them into the <head> section of all page versions." }
    ],
    features: [
      { icon: Globe, title: "International SEO", description: "Correctly implement hreflang tags to signal to search engines which language and region you are targeting for each page." },
      { icon: Link, title: "Prevent Duplicate Content", description: "Helps search engines understand the relationship between different language versions of your content, avoiding duplicate content issues." },
    ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Versions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {entries.map(entry => (
            <div key={entry.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon" onClick={() => removeEntry(entry.id)} disabled={entries.length <= 1}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                </div>
                <div><Label>URL</Label><Input value={entry.url} onChange={e => updateEntry(entry.id, 'url', e.target.value)} placeholder="https://example.com/en/"/></div>
                <div><Label>Language Code</Label><Input value={entry.langCode} onChange={e => updateEntry(entry.id, 'langCode', e.target.value)} placeholder="e.g., en-us"/></div>
            </div>
          ))}
          <Button variant="outline" onClick={addEntry}><PlusCircle className="mr-2"/> Add URL</Button>
           <div>
            <Label>x-default URL</Label>
            <Input value={xDefault} onChange={e => setXDefault(e.target.value)} placeholder="Default URL for other languages"/>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Hreflang Tags</CardTitle>
            <Button onClick={copyToClipboard}><Copy className="mr-2"/> Copy Tags</Button>
        </CardHeader>
        <CardContent>
          <Textarea readOnly value={generatedTags} className="min-h-[300px] bg-secondary font-mono text-sm"/>
           <p className="text-xs text-muted-foreground mt-2">Paste these tags into the &lt;head&gt; section of your HTML on all page versions.</p>
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}