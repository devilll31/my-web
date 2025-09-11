'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileSearch, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function KeywordDensityCheckerTool() {
  const guideProps = {
    title: "About the Keyword Density Checker",
    steps: [
      { title: "Requires Web Page Content", description: "To analyze keyword density, the tool must first fetch the full text content of a live web page." },
      { title: "Server-Side Fetching", description: "Fetching external URLs from the client-side is unreliable due to browser security policies (CORS). This must be done from a server." },
      { title: "Future SEO Suite Update", description: "This tool is part of our advanced SEO suite and is planned for a future update with server-side capabilities." }
    ],
    features: [
      { icon: FileSearch, title: "Analyze Keyword Usage", description: "The goal is to enter a URL and a keyword to see how frequently that keyword appears relative to the total word count." },
      { icon: Server, title: "SEO Optimization", description: "Helps you analyze and optimize your content for target keywords without overstuffing, which can harm rankings." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the backend infrastructure to power this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Keyword Density Checker</CardTitle>
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
