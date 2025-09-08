'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { detectLanguage } from '@/ai/flows/language-detector-flow';
import { Languages, Loader2 } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function LanguageDetectorTool() {
  const [text, setText] = useState('Hello, world! Comment ça va?');
  const [result, setResult] = useState<{ languageName: string; languageCode: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDetection = async () => {
    if (!text.trim()) {
      toast({ title: 'Input required', description: 'Please enter some text to detect the language.' });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const detectionResult = await detectLanguage({ text });
      setResult(detectionResult);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const guideProps = {
    title: "How to Use the Language Detector",
    steps: [
      { title: "Enter Text", description: "Type or paste any text into the input area." },
      { title: "Detect Language", description: "Click the 'Detect Language' button." },
      { title: "View Result", description: "The tool will display the detected language name and its ISO code." }
    ],
    features: [
      { icon: Languages, title: "Multilingual Support", description: "Our AI can identify a wide variety of languages from around the world." }
    ]
  };
  
  return (
    <>
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle className="text-center">Language Detector</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to detect its language..."
                className="min-h-[150px] text-lg"
            />
            <Button onClick={handleDetection} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Languages className="mr-2" />}
                {isLoading ? 'Detecting...' : 'Detect Language'}
            </Button>
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-primary/10 rounded-lg text-center"
                    >
                        <p className="text-muted-foreground">Detected Language</p>
                        <p className="text-2xl font-bold text-primary">{result.languageName} ({result.languageCode})</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
