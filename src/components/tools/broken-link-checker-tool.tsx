'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Link2Off, Search, Info } from "lucide-react";

export default function BrokenLinkCheckerTool() {
  const guideProps = {
    title: "About the Broken Link Checker",
    steps: [
      { title: "Website Crawling", description: "To find broken links, a tool needs to 'crawl' a website by starting at one page, finding all links, and then visiting those links to check their status." },
      { title: "Server-Intensive Task", description: "This is a resource-intensive process that must be run from a powerful server to avoid being blocked and to handle many pages efficiently." },
      { title: "Future Update", description: "This advanced tool is planned for a future update when we implement server-side crawling capabilities." }
    ],
    features: [
      { icon: Link2Off, title: "Find 404 Errors", description: "Automatically scan your website to find and report all broken links (404 errors) that harm user experience and SEO." },
      { icon: Search, title: "Improve SEO", description: "Fixing broken links is a key part of technical SEO maintenance that helps search engines crawl and rank your site." },
      { icon: Info, title: "Stay Tuned", description: "We are building the necessary infrastructure to bring you this powerful tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Broken Link Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side web crawler to function and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}