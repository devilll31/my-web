'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Link, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function LinkHealthCheckerTool() {
  const guideProps = {
    title: "About the Link Health Checker",
    steps: [
      { title: "How it Works", description: "This tool would take a list of URLs and make an HTTP request to each one to check its status code (e.g., 200 OK, 404 Not Found)." },
      { title: "Server-Side Requests", description: "Making bulk HTTP requests from a browser is unreliable due to CORS and rate limits. This must be done from a server." },
      { title: "Future Update", description: "This bulk-processing tool is planned for a future update when we implement server-side crawling capabilities." }
    ],
    features: [
      { icon: Link, title: "Bulk URL Checking", description: "Check the status of hundreds of URLs at once to quickly find broken or redirected links." },
      { icon: Server, title: "Content & SEO Audits", description: "An essential tool for content migration projects and SEO audits to ensure all links are healthy." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend infrastructure to power this tool efficiently. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Link Health Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This bulk-checking tool requires a server-side process to function reliably and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
