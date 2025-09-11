'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import HowToUseGuide from '../how-to-use-guide';
import { Search, Eye, Edit } from 'lucide-react';

export default function SerpSnippetPreviewTool() {
  const [title, setTitle] = useState('D2ools - The Next Level of Online Utility Tools');
  const [metaDescription, setMetaDescription] = useState('Access 500+ free utilities for PDF, files, images, and more. The ultimate toolkit for all your digital needs.');
  const [url, setUrl] = useState('https://d2ools.com');

  const guideProps = {
    title: "How to Use the SERP Snippet Preview Tool",
    steps: [
      { title: "Enter Your Content", description: "Fill in your page's Title Tag, Meta Description, and URL." },
      { title: "See the Live Preview", description: "The preview panel on the right instantly shows you how your page will likely appear in Google's search results." },
      { title: "Optimize for Clicks", description: "Adjust your title and description to be compelling and within the recommended character limits to maximize click-through rate." }
    ],
    features: [
      { icon: Search, title: "Google Preview", description: "Get a realistic simulation of how your webpage will appear on a Google Search Engine Results Page (SERP)." },
      { icon: Edit, title: "Optimize Meta Tags", description: "Craft the perfect title and description to attract more visitors from search." },
      { icon: Eye, title: "Visual Feedback", description: "Instantly see how your copy fits within Google's typical display limits, helping you avoid truncated text." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Content Editor</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title Tag ({title.length})</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="meta">Meta Description ({metaDescription.length})</Label>
              <Textarea id="meta" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={5}/>
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input id="url" value={url} onChange={e => setUrl(e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>SERP Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="p-4 bg-background rounded-lg border">
                <p className="text-sm text-[#202124] dark:text-[#bdc1c6] truncate">{url}</p>
                <h3 className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] font-medium hover:underline truncate">{title}</h3>
                <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">{metaDescription}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
