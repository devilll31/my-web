'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { FileType, Search, Info } from "lucide-react";

export default function SitemapGeneratorTool() {
  const guideProps = {
    title: "About the Sitemap Generator",
    steps: [
      { title: "Requires Web Crawler", description: "To create an accurate XML sitemap, a tool must crawl all the pages of a website to discover all the URLs." },
      { title: "Server-Side Process", description: "This crawling process must be done from a server to handle websites of all sizes and complexities efficiently." },
      { title: "Future Update", description: "This essential SEO tool is planned for a future update when our server-side infrastructure is expanded." }
    ],
    features: [
      { icon: FileType, title: "Generate XML Sitemaps", description: "The goal is to automatically crawl your website and generate a complete XML sitemap." },
      { icon: Search, title: "Improve Indexing", description: "A sitemap helps search engines like Google discover and index all the important pages on your website more efficiently." },
      { icon: Info, title: "Stay Tuned", description: "We are actively working on the server-side components needed to power this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Sitemap Generator (XML)</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side web crawler to generate a sitemap and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}