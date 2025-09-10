
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';
import HowToUseGuide from '../how-to-use-guide';
import { BookOpen, GraduationCap, Eye } from 'lucide-react';

// Flesch-Kincaid Grade Level formula
const calculateReadability = (text: string) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 1;
  const words = text.trim().split(/\s+/).length;
  const syllables = text.toLowerCase()
    .replace(/e$/, '')
    .match(/[aeiouy]{1,2}/g)?.length || 0;

  if (words < 10) return { grade: 0 };

  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  return { grade: Math.round(grade * 10) / 10 };
};

export default function ReadabilityCheckerTool() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This sentence is easy to read. Complex sentences, however, utilize more elaborate vocabulary and structure.');
  const [readability, setReadability] = useState<{ grade: number } | null>(null);

  useEffect(() => {
    setReadability(calculateReadability(text));
  }, [text]);

  const guideProps = {
    title: "How to Use the Readability Checker",
    steps: [
      { title: "Enter Your Text", description: "Paste or type your text into the text area." },
      { title: "View the Score", description: "The tool instantly calculates the Flesch-Kincaid Grade Level, indicating the required education level to understand the text." },
      { title: "Improve Your Writing", description: "Aim for a lower grade level (around 8th grade) for general web content to ensure it's accessible to a broad audience." }
    ],
    features: [
      { icon: GraduationCap, title: "Flesch-Kincaid Grade Level", description: "Uses a standard formula to estimate the U.S. school grade level needed to comprehend your text." },
      { icon: BookOpen, title: "Write for Your Audience", description: "Ensure your content is easy to understand for your target readers, improving engagement and comprehension." },
      { icon: Eye, title: "Real-Time Analysis", description: "Get instant feedback on your text's readability as you type." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="text-input" className="text-lg mb-2 block">Your Text</Label>
          <Textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[300px] text-base"
            placeholder="Paste your text here..."
          />
        </div>
        <div className="flex items-center justify-center">
            <motion.div 
                key={readability ? readability.grade : 0}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-6 border-2 border-dashed rounded-lg"
            >
                <p className="text-lg text-muted-foreground">Flesch-Kincaid Grade Level</p>
                <p className="text-7xl font-bold text-primary my-2">
                    {readability ? readability.grade : 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                    This score indicates the American school grade level required to understand the text.
                </p>
            </motion.div>
        </div>
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
