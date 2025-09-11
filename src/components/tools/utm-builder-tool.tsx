'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';

export default function UtmBuilderTool() {
  const [url, setUrl] = useState('https://d2ools.com');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('summer_sale');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [finalUrl, setFinalUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    try {
      const base = new URL(url);
      if (source) base.searchParams.set('utm_source', source);
      if (medium) base.searchParams.set('utm_medium', medium);
      if (campaign) base.searchParams.set('utm_campaign', campaign);
      if (term) base.searchParams.set('utm_term', term);
      if (content) base.searchParams.set('utm_content', content);
      setFinalUrl(base.toString());
    } catch (e) {
      setFinalUrl('Invalid base URL');
    }
  }, [url, source, medium, campaign, term, content]);
  
  const copyUrl = () => {
    navigator.clipboard.writeText(finalUrl);
    toast({ title: 'UTM URL copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the UTM Builder",
    steps: [
      { title: "Enter Base URL", description: "Start with the webpage URL you want to link to." },
      { title: "Fill in Parameters", description: "Add your campaign source, medium, and name. Term and content are optional but recommended." },
      { title: "Copy the Final URL", description: "The tool generates a complete URL with all your UTM parameters, ready to be used in your marketing campaigns." }
    ],
    features: [
      { icon: Link2, title: "Track Your Campaigns", description: "Create URLs with UTM parameters to accurately track the performance of your marketing campaigns in analytics platforms like Google Analytics." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">UTM Builder for URLs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL *</Label>
              <Input id="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Campaign Source *</Label>
              <Input id="source" value={source} onChange={e => setSource(e.target.value)} placeholder="e.g., google, newsletter" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medium">Campaign Medium *</Label>
              <Input id="medium" value={medium} onChange={e => setMedium(e.target.value)} placeholder="e.g., cpc, email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign Name *</Label>
              <Input id="campaign" value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="e.g., summer_sale" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Campaign Term</Label>
              <Input id="term" value={term} onChange={e => setTerm(e.target.value)} placeholder="(keywords)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Campaign Content</Label>
              <Input id="content" value={content} onChange={e => setContent(e.target.value)} placeholder="(ad name)" />
            </div>
          </div>
           <div className="space-y-2 pt-4">
            <Label>Generated URL</Label>
            <div className="relative">
              <Input value={finalUrl} readOnly className="bg-secondary pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={copyUrl}><Copy className="w-4 h-4"/></Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}