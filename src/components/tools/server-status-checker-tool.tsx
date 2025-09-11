'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Wifi, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function ServerStatusCheckerTool() {
  const guideProps = {
    title: "About the Server Status Checker",
    steps: [
      { title: "HTTP Head Request", description: "To check a server's status, a tool makes a quick HTTP request to the URL and reads the status code from the response (e.g., 200 OK, 404 Not Found, 503 Service Unavailable)." },
      { title: "Server-Side Reliability", description: "Making this request from a server is more reliable than from a browser, as it avoids client-side network issues and CORS restrictions." },
      { title: "Future Update", description: "This tool is planned for a future update when our server-side HTTP request capabilities are implemented." }
    ],
    features: [
      { icon: Wifi, title: "Check Website Uptime", description: "Allows you to quickly check if a website is online and what its HTTP status code is." },
      { icon: Server, title: "Diagnostics Tool", description: "An essential utility for developers and site owners to quickly diagnose if a website is down for everyone or just them." },
      { icon: Info, title: "Stay Tuned", description: "We are building the necessary backend services to power this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Server Status Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to make reliable HTTP requests and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
