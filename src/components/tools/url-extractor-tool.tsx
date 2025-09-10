
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Link, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { ScrollArea } from '../ui/scroll-area';

export default function UrlExtractorTool() {
  const [text, setText] = useState('Check out these cool sites: https://d2ools.com and http://example.com. You can also visit ftp://files.server.com.');
  const { toast } = useToast();

  const extractedUrls = useMemo(() => {
    const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
    const urls = text.match(urlRegex) || [];
    return [...new Set(urls)]; // Return unique URLs
  }, [text]);

  const copyToClipboard = () => {
    if (extractedUrls.length === 0) return;
    const allUrls = extractedUrls.join('\n');
    navigator.clipboard.writeText(allUrls);
    toast({ title: 'Copied all URLs to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the URL Extractor",
    steps: [
      { title: "Paste Your Text", description: "Enter any block of text that contains URLs into the input area." },
      { title: "View Extracted URLs", description: "The tool automatically finds and lists all unique URLs from your text in the results panel." },
      { title: "Copy the List", description: "Click the copy button to get a clean, new-line-separated list of all the URLs." }
    ],
    features: [
      { icon: Link, title: "Find All Links", description: "Quickly pull out all hyperlinks from a document, email, or webpage source code." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">URL Extractor</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste text containing URLs here..."
          className="min-h-[300px]"
        />
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Extracted URLs ({extractedUrls.length})</h3>
                <Button onClick={copyToClipboard} variant="outline" size="sm"><Copy className="mr-2"/>Copy All</Button>
            </div>
            <ScrollArea className="h-[280px] w-full rounded-md border p-2 bg-secondary">
                {extractedUrls.length > 0 ? (
                    extractedUrls.map((url, i) => (
                        <div key={i} className="p-2 text-sm truncate hover:bg-background rounded-md">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">{url}</a>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-8">No URLs found.</div>
                )}
            </ScrollArea>
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
