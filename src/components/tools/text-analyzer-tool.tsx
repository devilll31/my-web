
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';

const StatCard = ({ label, value }: { label: string, value: string | number }) => (
  <motion.div 
    key={label}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="p-4 bg-secondary rounded-lg text-center"
  >
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </motion.div>
);

export default function TextAnalyzerTool() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is a sample sentence.');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: '0 min'
  });

  useEffect(() => {
    const characters = text.length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 0;
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;
    const readingTimeMinutes = Math.ceil(words / 200); // Average reading speed
    const readingTime = readingTimeMinutes > 0 ? `${readingTimeMinutes} min` : '< 1 min';

    setStats({ words, characters, sentences, paragraphs, readingTime });
  }, [text]);

  return (
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Text Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Words" value={stats.words} />
          <StatCard label="Characters" value={stats.characters} />
          <StatCard label="Sentences" value={stats.sentences} />
          <StatCard label="Paragraphs" value={stats.paragraphs} />
        </div>
         <div className="pt-4">
            <StatCard label="Estimated Reading Time" value={stats.readingTime} />
         </div>
      </div>
    </div>
  );
}
