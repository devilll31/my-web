'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2 } from 'lucide-react';
import { generateBlogTitle } from '@/ai/flows/blog-title-generator';
import HowToUseGuide from '../how-to-use-guide';
import { AnimatePresence, motion } from 'framer-motion';

export default function BlogTitleGeneratorTool() {
  const [topic, setTopic] = useState('The benefits of remote work');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic) {
      toast({ title: "Topic is required", variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setGeneratedTitle('');
    try {
      const result = await generateBlogTitle({ topic });
      setGeneratedTitle(result.title);
    } catch (error) {
      toast({ title: "Error generating title", description: "Please try again later.", variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const guideProps = {
    title: "How to Use the AI Blog Title Generator",
    steps: [
      { title: "Enter a Topic", description: "Provide a topic or a few keywords about your blog post." },
      { title: "Generate Title", description: "Click the button to let the AI generate a creative and catchy title." },
      { title: "Use or Refine", description: "Use the generated title as-is or as inspiration for your own." }
    ],
    features: [
      { icon: Bot, title: "AI-Powered Creativity", description: "Leverage AI to overcome writer's block and create engaging headlines that capture attention." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">AI Blog Title Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="topic">Blog Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g., 'The future of AI in marketing'"
            />
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Bot className="mr-2" />}
            {isLoading ? 'Generating...' : 'Generate Title'}
          </Button>
          <AnimatePresence>
            {generatedTitle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-primary/10 rounded-lg text-center"
              >
                <p className="text-muted-foreground">Generated Title</p>
                <p className="text-2xl font-bold text-primary">{generatedTitle}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
