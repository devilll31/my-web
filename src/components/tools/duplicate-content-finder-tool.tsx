'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Copy, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function DuplicateContentFinderTool() {
  const guideProps = {
    title: "About the Duplicate Content Finder",
    steps: [
      { title: "Comprehensive Site Crawl", description: "Finding duplicate content requires crawling an entire website and comparing the content of each page." },
      { title: "Server-Intensive Analysis", description: "This is a resource-heavy task that needs to run on a powerful server to analyze large websites efficiently." },
      { title: "Future SEO Suite Update", description: "This tool is part of our advanced SEO suite and is planned for a future update with the necessary server-side capabilities." }
    ],
    features: [
      { icon: Copy, title: "Identify Duplicates", description: "The goal is to crawl your website and identify pages with identical or very similar content." },
      { icon: Server, title: "Improve SEO Health", description: "Fixing duplicate content issues helps search engines understand which page to rank and consolidates link equity." },
      { icon: Info, title: "Stay Tuned", description: "We are developing the backend infrastructure required to power this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Canonical/Duplicate Content Finder</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side web crawler to find duplicate content across a website and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
