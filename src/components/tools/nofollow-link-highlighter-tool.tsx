'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Link, Eye, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function NofollowLinkHighlighterTool() {
  const guideProps = {
    title: "About Nofollow/Follow Link Highlighters",
    steps: [
      { title: "How it Works", description: "A nofollow link highlighter is typically a browser extension that injects CSS onto a live webpage to visually distinguish `rel=\"nofollow\"` links from standard (dofollow) links." },
      { title: "Browser Extension Functionality", description: "Due to its nature of modifying live web pages, this functionality is best suited for a browser extension rather than a standalone web tool." },
      { title: "Informational Purpose", description: "This page serves to explain the concept. A full browser-based tool for external sites is not feasible here due to security restrictions." }
    ],
    features: [
      { icon: Link, title: "Understand Link Equity", description: "Learn to identify 'nofollow' links, which typically do not pass PageRank, an important concept in SEO." },
      { icon: Eye, title: "Visual Identification", description: "The goal of such tools is to make it easy to see at a glance which links on a page are marked as nofollow." },
      { icon: Info, title: "Consider Extensions", description: "For this functionality, we recommend looking for a dedicated SEO browser extension from a trusted source." }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Nofollow/Follow Link Highlighter</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">This is an Informational Tool</h3>
          <p className="text-muted-foreground mt-2">
            Highlighting links on external websites requires a browser extension. This tool is a guide to understand the concept.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
