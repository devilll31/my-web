'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { transliterateText } from '@/ai/flows/transliteration-flow';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

const scripts = ["Latin", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam"];

export default function TransliterationTool() {
  const [inputText, setInputText] = useState('namaste');
  const [sourceScript, setSourceScript] = useState('Latin');
  const [targetScript, setTargetScript] = useState('Devanagari');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTransliteration = async () => {
    if (!inputText.trim()) {
      toast({ title: 'Input required', description: 'Please enter some text to transliterate.' });
      return;
    }
    setIsLoading(true);
    setOutputText('');
    try {
      const result = await transliterateText({ text: inputText, sourceScript, targetScript });
      setOutputText(result.transliteratedText);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const swapScripts = () => {
    setSourceScript(targetScript);
    setTargetScript(sourceScript);
  }

  const guideProps = {
    title: "How to Use the Transliteration Tool",
    steps: [
      { title: "Enter Text", description: "Type or paste the text you want to convert." },
      { title: "Select Scripts", description: "Choose the source script (the script you are typing in) and the target script." },
      { title: "Transliterate", description: "Click the button to see the phonetic conversion of your text in the target script." }
    ],
    features: [
      { icon: ArrowRightLeft, title: "Phonetic Conversion", description: "Convert text from one writing system to another based on phonetic similarity, like typing 'namaste' to get 'नमस्ते'." }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Transliteration Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={sourceScript} onValueChange={setSourceScript}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{scripts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button onClick={swapScripts} size="icon" variant="ghost" className="self-end"><ArrowRightLeft/></Button>
            <div className="space-y-2">
              <Label>To</Label>
              <Select value={targetScript} onValueChange={setTargetScript}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{scripts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
           <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text here..."
                className="min-h-[100px]"
            />
          <Button onClick={handleTransliteration} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <ArrowRightLeft className="mr-2" />}
            {isLoading ? 'Processing...' : 'Transliterate'}
          </Button>
           <AnimatePresence>
            {outputText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-primary/10 rounded-lg text-center"
              >
                <p className="text-muted-foreground">Result</p>
                <p className="text-2xl font-bold text-primary">{outputText}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
