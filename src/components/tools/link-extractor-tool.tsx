'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Link, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function LinkExtractorTool() {
  const guideProps = {
    title: "About the Link Extractor Tool",
    steps: [
      { title: "Requires Web Page Crawling", description: "To extract all links from a live webpage, a tool must fetch the page's HTML content and parse it." },
      { title: "Server-Side Fetching Needed", description: "Fetching external URLs from a user's browser is often blocked by security policies (CORS). A reliable implementation requires a server-side request." },
      { title: "Future SEO Suite Update", description: "This tool is part of our advanced SEO suite and is planned for a future update." }
    ],
    features: [
      { icon: Link, title: "Extract All Links", description: "The goal is to enter a URL and get a list of all internal and external links found on that page." },
      { icon: Server, title: "Site Auditing", description: "An essential tool for SEO audits to analyze a website's internal linking structure and external links." },
      { icon: Info, title: "Stay Tuned", description: "We are developing the necessary server-side infrastructure to power this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Link Extractor (from URL)</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to fetch and analyze website content. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
