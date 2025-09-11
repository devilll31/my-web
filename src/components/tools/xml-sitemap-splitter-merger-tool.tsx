'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, FileCog, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function XmlSitemapSplitterMergerTool() {
  const guideProps = {
    title: "About the XML Sitemap Splitter/Merger",
    steps: [
      { title: "Large File Handling", description: "Sitemaps can be very large. Splitting or merging them efficiently requires robust XML parsing, which is best handled on a server to avoid browser crashes." },
      { title: "URL & File Limits", description: "Sitemaps have limits (50,000 URLs or 50MB). A splitter needs to intelligently break up larger sitemaps into smaller, valid files and create a sitemap index file." },
      { title: "Future Update", description: "This tool is planned for a future update when server-side file processing capabilities are added." }
    ],
    features: [
      { icon: FileCog, title: "Manage Large Sitemaps", description: "The goal is to help you manage very large websites by splitting a single large sitemap into multiple smaller ones, or merging multiple sitemaps into one." },
      { icon: Server, title: "Compliance & Performance", description: "Ensures all generated sitemaps adhere to the XML sitemap protocol standards and are processed efficiently." },
      { icon: Info, title: "Stay Tuned", description: "We are developing the server-side infrastructure for this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">XML Sitemap Splitter/Merger</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires server-side processing to handle large XML files and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
