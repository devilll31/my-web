'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Mail, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { ScrollArea } from '../ui/scroll-area';

export default function EmailExtractorTool() {
  const [text, setText] = useState('Contact us at support@example.com or for sales, reach out to sales.team@example.co.uk.');
  const { toast } = useToast();

  const extractedEmails = useMemo(() => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const emails = text.match(emailRegex) || [];
    return [...new Set(emails)];
  }, [text]);

  const copyToClipboard = () => {
    if (extractedEmails.length === 0) return;
    const allEmails = extractedEmails.join('\n');
    navigator.clipboard.writeText(allEmails);
    toast({ title: 'Copied all emails to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the Email Extractor",
    steps: [
      { title: "Paste Your Text", description: "Enter any block of text that contains email addresses into the input area." },
      { title: "View Extracted Emails", description: "The tool automatically finds and lists all unique email addresses from your text." },
      { title: "Copy the List", description: "Click the copy button to get a clean, new-line-separated list of all the emails." }
    ],
    features: [
      { icon: Mail, title: "Find All Addresses", description: "Quickly pull out all email addresses from a document, webpage, or block of text." },
    ]
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Email Extractor</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste text containing email addresses here..."
          className="min-h-[300px]"
        />
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Extracted Emails ({extractedEmails.length})</h3>
                <Button onClick={copyToClipboard} variant="outline" size="sm"><Copy className="mr-2"/>Copy All</Button>
            </div>
            <ScrollArea className="h-[280px] w-full rounded-md border p-2 bg-secondary">
                {extractedEmails.length > 0 ? (
                    extractedEmails.map((email, i) => (
                        <div key={i} className="p-2 text-sm truncate hover:bg-background rounded-md">
                           {email}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-8">No emails found.</div>
                )}
            </ScrollArea>
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
