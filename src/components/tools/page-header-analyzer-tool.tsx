'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function PageHeaderAnalyzerTool() {
  const guideProps = {
    title: "About the Page Header Analyzer",
    steps: [
      { title: "HTTP Header Inspection", description: "This tool needs to make a request to a URL and inspect the HTTP response headers (e.g., Status Code, Content-Type, Cache-Control)." },
      { title: "Requires Server-Side Request", description: "Due to browser security policies (CORS), these requests must be made from a server, not from the client's browser." },
      { title: "Future Update", description: "This networking utility is planned for a future update when server-side HTTP capabilities are added." }
    ],
    features: [
      { icon: FileCode, title: "Debug and Analyze", description: "Allows developers and SEOs to inspect critical HTTP headers to debug caching issues, server configurations, and redirects." },
      { icon: Server, title: "Server-Side Reliability", description: "A server-based check ensures accurate and complete header information is retrieved." },
      { icon: Info, title: "Stay Tuned", description: "We are building the necessary backend services to power this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Page Header Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to make HTTP requests and analyze response headers. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
