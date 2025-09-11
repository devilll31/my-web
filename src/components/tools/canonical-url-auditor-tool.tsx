'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function CanonicalUrlAuditorTool() {
  const guideProps = {
    title: "About the Canonical URL Auditor",
    steps: [
      { title: "URL Crawling Required", description: "Auditing canonical tags across a website requires a crawler to visit multiple pages and inspect their HTML <head> sections." },
      { title: "Server-Side Operation", description: "This is a server-intensive task that cannot be performed from the client's browser due to security and performance limitations." },
      { title: "Future SEO Suite Update", description: "This tool is planned for a future update as part of our advanced SEO tool suite." }
    ],
    features: [
      { icon: FileCode, title: "Identify Canonical Issues", description: "The goal is to crawl a site and report on pages with missing, incorrect, or conflicting canonical tags." },
      { icon: Server, title: "Prevent Duplicate Content", description: "Proper canonicalization is crucial for signaling the master version of a page to search engines, preventing duplicate content penalties." },
      { icon: Info, title: "Stay Tuned", description: "We are developing the backend infrastructure required to power this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Canonical URL Auditor</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side web crawler to audit canonical tags across a website and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
