'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, FileText, Globe } from 'lucide-react';
import { generateMetaDescription } from '@/ai/flows/meta-description-generator';
import HowToUseGuide from '../how-to-use-guide';
import { AnimatePresence, motion } from 'framer-motion';

export default function MetaDescriptionGeneratorTool() {
  const [content, setContent] = useState('This blog post discusses the various benefits of remote work, including improved work-life balance, reduced commute times, and access to a global talent pool.');
  const [keywords, setKeywords] = useState('remote work, work from home, benefits');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!content || !keywords) {
      toast({ title: "Content and keywords are required", variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setGeneratedDesc('');
    try {
      const result = await generateMetaDescription({ content, keywords });
      setGeneratedDesc(result.metaDescription);
    } catch (error) {
      toast({ title: "Error generating description", description: "Please try again later.", variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const guideProps = {
    title: "How to Use the AI Meta Description Generator",
    steps: [
      { title: "Paste Content", description: "Provide the main content or summary of your webpage." },
      { title: "Enter Keywords", description: "List the main keywords you are targeting for this page." },
      { title: "Generate Description", description: "The AI will generate a concise, SEO-friendly meta description under 160 characters." }
    ],
    features: [
      { icon: Bot, title: "AI-Powered SEO", description: "Create compelling meta descriptions that improve click-through rates from search results." },
      { icon: Globe, title: "Optimize for Search", description: "Helps you craft the perfect snippet to represent your page on Google and other search engines." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">AI Meta Description Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="content">Page Content / Summary</Label>
            <Textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste the main text from your page here..."
              rows={6}
            />
          </div>
          <div>
            <Label htmlFor="keywords">Target Keywords</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="e.g., 'digital marketing, SEO tips'"
            />
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Bot className="mr-2" />}
            {isLoading ? 'Generating...' : 'Generate Meta Description'}
          </Button>
          <AnimatePresence>
            {generatedDesc && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-primary/10 rounded-lg"
              >
                <Label>Generated Meta Description ({generatedDesc.length} characters)</Label>
                <p className="text-primary font-medium">{generatedDesc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
