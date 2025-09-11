'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Ruler, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function PageSizeCheckerTool() {
  const guideProps = {
    title: "About the Page Size Checker",
    steps: [
      { title: "Requires Page Crawling", description: "To accurately determine the total size of a webpage (including all assets like images, CSS, and JS), a tool needs to crawl the page and its resources." },
      { title: "Server-Side Operation", description: "This is a server-intensive task that cannot be performed from the client's browser. It requires fetching the main HTML and all linked assets." },
      { title: "Future Performance Suite", description: "This tool is part of our planned website performance suite and will be implemented in a future update." }
    ],
    features: [
      { icon: Ruler, title: "Measure Page Weight", description: "The goal is to enter a URL and get a detailed breakdown of the page's total size, which is a key factor in loading speed." },
      { icon: Server, title: "Performance Optimization", description: "By identifying large assets, you can optimize your page for faster load times and a better user experience." },
      { icon: Info, title: "Stay Tuned", description: "We are developing the server-side infrastructure needed for this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Page Size Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side web crawler to accurately measure the total size of a webpage and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
