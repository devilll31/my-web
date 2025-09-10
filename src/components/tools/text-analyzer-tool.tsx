'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StatType = 'words' | 'characters' | 'sentences' | 'paragraphs' | 'readingTime';

const StatCard = ({ label, value, isHighlighted }: { label: string, value: string | number, isHighlighted?: boolean }) => (
  <motion.div 
    key={label}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(
        "p-4 rounded-lg text-center transition-all",
        isHighlighted ? "bg-primary/10" : "bg-secondary"
    )}
  >
    <p className={cn("text-sm", isHighlighted ? "text-primary" : "text-muted-foreground")}>{label}</p>
    <p className={cn(
        "font-bold",
        isHighlighted ? "text-5xl text-primary" : "text-3xl"
    )}>{value}</p>
  </motion.div>
);

interface TextAnalyzerToolProps {
    highlight?: 'words' | 'characters' | 'sentences';
}

export default function TextAnalyzerTool({ highlight = 'words' }: TextAnalyzerToolProps) {
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
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || (text.trim() ? 1 : 0);
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length || (text.trim() ? 1 : 0);
    const readingTimeMinutes = Math.ceil(words / 200); // Average reading speed
    const readingTime = readingTimeMinutes > 1 ? `${readingTimeMinutes} mins` : readingTimeMinutes === 1 ? '1 min' : '< 1 min';

    setStats({ words, characters, sentences, paragraphs, readingTime });
  }, [text]);

  const statOrder: StatType[] = [
    highlight,
    ...(['words', 'characters', 'sentences', 'paragraphs'] as StatType[]).filter(s => s !== highlight)
  ]

  const statMap: Record<string, {label: string, value: string | number}> = {
      words: { label: 'Words', value: stats.words },
      characters: { label: 'Characters', value: stats.characters },
      sentences: { label: 'Sentences', value: stats.sentences },
      paragraphs: { label: 'Paragraphs', value: stats.paragraphs },
      readingTime: { label: 'Estimated Reading Time', value: stats.readingTime },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <Label htmlFor="text-input" className="text-lg mb-2 block">Your Text</Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[450px] text-base"
          placeholder="Paste your text here..."
        />
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-center mb-4">Text Analysis</h3>
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {statOrder.slice(0, 4).map(key => (
                    <StatCard 
                        key={key}
                        label={statMap[key].label} 
                        value={statMap[key].value}
                        isHighlighted={key === highlight}
                    />
                ))}
            </div>
            <StatCard label="Estimated Reading Time" value={stats.readingTime} />
        </div>
      </div>
    </div>
  );
}
