'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { numberToWords } from '@/ai/flows/number-to-words-flow';
import { SpellCheck, Loader2 } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

export default function NumberToWordsConverterTool() {
  const [number, setNumber] = useState('12345');
  const [language, setLanguage] = useState('English');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConversion = async () => {
    const num = parseFloat(number);
    if (isNaN(num)) {
      toast({ title: 'Invalid Number', description: 'Please enter a valid number.' });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const conversionResult = await numberToWords({ number: num, language });
      setResult(conversionResult.words);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const guideProps = {
    title: "How to Use the Number to Words Converter",
    steps: [
      { title: "Enter Number", description: "Type the number you want to convert." },
      { title: "Select Language", description: "Choose the target language for the word representation." },
      { title: "Convert", description: "Click the 'Convert' button to see the number spelled out in words." }
    ],
    features: [
      { icon: SpellCheck, title: "Multiple Languages", description: "Convert numbers to words in various languages, perfect for writing checks or formal documents." }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Number to Words Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="number-input">Number</Label>
              <Input
                id="number-input"
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number..."
              />
            </div>
            <div>
              <Label htmlFor="language-select">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language-select"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleConversion} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <SpellCheck className="mr-2" />}
            {isLoading ? 'Converting...' : 'Convert to Words'}
          </Button>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-primary/10 rounded-lg text-center"
              >
                <p className="text-muted-foreground">Result</p>
                <p className="text-2xl font-bold text-primary">{result}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
