'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import HowToUseGuide from '../how-to-use-guide';
import { Filter, Bot, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Basic list of English stopwords
const stopwords = new Set(['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']);

export default function StopwordsRemoverTool() {
  const [inputText, setInputText] = useState('This is a sample sentence to demonstrate the removal of common stopwords.');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();

  const removeStopwords = () => {
    const words = inputText.toLowerCase().split(/\s+/);
    const filteredWords = words.filter(word => !stopwords.has(word.replace(/[.,!?;:]/g, '')));
    setOutputText(filteredWords.join(' '));
    toast({ title: 'Stopwords Removed!', description: `Filtered out common words.` });
  };

  const guideProps = {
    title: "How to Use the Stopwords Remover",
    steps: [
      { title: "Enter Text", description: "Paste the text you want to process." },
      { title: "Click Remove", description: "Click the 'Remove Stopwords' button to filter out common English stopwords." },
      { title: "Get Keywords", description: "The output will be the more significant keywords from your text, which can be useful for topic analysis or SEO." }
    ],
    features: [
      { icon: Filter, title: "Keyword Analysis", description: "A basic tool for natural language processing (NLP) to filter out noise and identify key terms in a body of text." },
      { icon: BrainCircuit, title: "Core NLP Task", description: "Stopword removal is a fundamental step in many text analysis and machine learning workflows." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Stopwords Remover</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px]"
              placeholder="Input Text"
            />
             <Textarea
              value={outputText}
              readOnly
              className="min-h-[200px] bg-secondary"
              placeholder="Output without stopwords"
            />
          </div>
          <div className="text-center">
            <Button onClick={removeStopwords}>Remove Stopwords</Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
