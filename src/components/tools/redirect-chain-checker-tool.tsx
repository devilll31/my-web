'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Link, Server, Info } from "lucide-react";

export default function RedirectChainCheckerTool() {
  const guideProps = {
    title: "About the Redirect Chain Checker",
    steps: [
      { title: "Server-Side Requests", description: "To check for redirect chains, a server must make HTTP requests and follow the 'Location' headers of 301/302 responses." },
      { title: "Browser Limitations", description: "Browsers automatically follow redirects, making it impossible to trace the chain from the client-side alone." },
      { title: "Future Update", description: "This tool is planned for a future update when server-side HTTP request capabilities are added." }
    ],
    features: [
      { icon: Link, title: "Identify Redirects", description: "Find and visualize long or unnecessary redirect chains that can slow down your site and harm SEO." },
      { icon: Server, title: "Improve Crawl Budget", description: "Fixing redirect chains helps search engine bots crawl your site more efficiently." },
      { icon: Info, title: "Stay Tuned", description: "We are actively working on the infrastructure needed for this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Redirect Chain Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to follow HTTP redirects and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}