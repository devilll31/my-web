'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};


export default function SlugGeneratorTool() {
  const [text, setText] = useState('My Awesome Blog Post Title!');
  const [slug, setSlug] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setSlug(slugify(text));
  }, [text]);

  const copyToClipboard = () => {
    if(!slug) return;
    navigator.clipboard.writeText(slug);
    toast({title: 'Slug copied to clipboard!'});
  };

  const guideProps = {
    title: "How to Use the Slug Generator",
    steps: [
      { title: "Enter Your Title", description: "Type in your blog post title or any string you want to convert into a URL-friendly slug." },
      { title: "Get Instant Slug", description: "The tool automatically generates a clean, lowercase, hyphenated slug in real-time." },
      { title: "Copy and Use", description: "Click the copy button to get the generated slug for your CMS or web framework." }
    ],
    features: [
      { icon: Link, title: "SEO-Friendly URLs", description: "Create clean, readable, and SEO-friendly URLs from any text, improving your search engine ranking." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">URL Slug Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title-input">Text / Title</Label>
            <Input id="title-input" value={text} onChange={e => setText(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="slug-output">Generated Slug</Label>
            <div className="relative">
                <Input id="slug-output" value={slug} readOnly className="bg-secondary" />
                 <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={copyToClipboard}><Copy className="w-4 h-4"/></Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
