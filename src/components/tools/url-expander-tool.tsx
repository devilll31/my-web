'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Link, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function UrlExpanderTool() {
  const guideProps = {
    title: "About the URL Expander",
    steps: [
      { title: "How it Works", description: "A URL expander takes a shortened URL (like bit.ly) and follows the redirects to reveal the final destination URL." },
      { title: "Requires Server Requests", description: "Due to browser security (CORS), making the necessary HTTP requests to follow redirects must be done from a server." },
      { title: "Future Update", description: "This tool is planned for a future update when our server-side capabilities are implemented." }
    ],
    features: [
      { icon: Link, title: "Preview Links Safely", description: "Check where a shortened link goes before you click on it to avoid malicious websites." },
      { icon: Server, title: "Server-Side Fetching", description: "Our future implementation will use a server to reliably trace all redirects to the final URL." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend services to power this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">URL Expander</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A URL expander requires a server-side process to follow redirects and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}