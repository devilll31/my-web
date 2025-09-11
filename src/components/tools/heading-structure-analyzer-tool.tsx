'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import HowToUseGuide from '../how-to-use-guide';
import { Heading1, Heading2, Heading3, Pilcrow, Baseline } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heading {
  level: number;
  text: string;
}

const sampleHtml = `<h1>Main Title</h1>
<h2>Section 1</h2>
<h3>Subsection 1.1</h3>
<h2>Section 2</h2>
<h3>Subsection 2.1</h3>
<h3>Subsection 2.2</h3>`;

export default function HeadingStructureAnalyzerTool() {
  const [html, setHtml] = useState(sampleHtml);
  const [headings, setHeadings] = useState<Heading[]>([]);

  const analyzeHeadings = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const extracted: Heading[] = Array.from(headingElements).map(h => ({
      level: parseInt(h.tagName.substring(1), 10),
      text: h.textContent || '',
    }));
    setHeadings(extracted);
  };

  useState(analyzeHeadings);
  
  const guideProps = {
    title: "How to Use the Heading Structure Analyzer",
    steps: [
      { title: "Paste HTML", description: "Enter the HTML source code of a webpage into the text area." },
      { title: "Analyze Structure", description: "Click the 'Analyze Headings' button to see a visual representation of your H1-H6 heading hierarchy." },
      { title: "Check for Issues", description: "Use the visual tree to quickly spot issues like skipped heading levels (e.g., an H1 followed by an H3) or multiple H1 tags." }
    ],
    features: [
      { icon: Pilcrow, title: "SEO & Accessibility", description: "Proper heading structure is crucial for both SEO and for screen reader users to navigate your content." },
      { icon: Baseline, title: "Visual Hierarchy", description: "Get an instant, indented view of your content's structure, making it easy to understand the document outline." },
    ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader><CardTitle>HTML Input</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste your HTML here..."
            className="min-h-[300px] font-mono"
          />
          <button onClick={analyzeHeadings} className="w-full bg-primary text-primary-foreground h-10 px-8 rounded-md">Analyze Headings</button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Heading Structure</CardTitle></CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-secondary min-h-[300px] space-y-2">
            <AnimatePresence>
                {headings.map((heading, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center"
                        style={{ paddingLeft: `${(heading.level - 1) * 20}px` }}
                    >
                      <span className="font-bold text-muted-foreground mr-2">H{heading.level}</span>
                      <span className="truncate">{heading.text}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
