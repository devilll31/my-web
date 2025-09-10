'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2 } from 'lucide-react';
import { summarizeText } from '@/ai/flows/summarizer-tool';
import HowToUseGuide from '../how-to-use-guide';
import { AnimatePresence, motion } from 'framer-motion';

export default function SummarizerTool() {
  const [text, setText] = useState('Enter a long piece of text here to get a TLDR (Too Long; Didn\'t Read) version. The AI will read through the entire content and provide a short, easy-to-digest summary. This is useful for quickly understanding articles, reports, or long emails without spending too much time.');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast({ title: "Text is required", variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeText({ text });
      setSummary(result.summary);
    } catch (error) {
      toast({ title: "Error summarizing text", description: "Please try again later.", variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const guideProps = {
    title: "How to Use the AI Summarizer",
    steps: [
      { title: "Paste Text", description: "Enter any block of text, such as an article, report, or email." },
      { title: "Click Summarize", description: "Let the AI process the text and generate a concise summary." },
      { title: "Get the Gist", description: "Read the short summary to quickly understand the main points of the original text." }
    ],
    features: [
      { icon: Bot, title: "AI-Powered TLDR", description: "Save time by letting an AI create a 'Too Long; Didn\'t Read' version of any text." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">AI Text Summarizer (TLDR)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="min-h-[250px]"
            />
            <Textarea
              value={summary}
              readOnly
              placeholder="Summary will appear here..."
              className="min-h-[250px] bg-secondary"
            />
          </div>
          <div className="text-center">
            <Button onClick={handleSummarize} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Bot className="mr-2" />}
              {isLoading ? 'Summarizing...' : 'Summarize Text'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
