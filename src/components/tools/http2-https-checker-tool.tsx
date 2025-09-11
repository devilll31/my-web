'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Zap, Shield } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function Http2HttpsCheckerTool() {
  const guideProps = {
    title: "About the HTTP/2 & HTTPS Checker",
    steps: [
      { title: "Server Header Analysis", description: "Determining HTTP/2 and HTTPS support requires inspecting the response headers from a web server, which is a server-side task." },
      { title: "Reliable Checks", description: "Client-side checks can be unreliable due to proxies and browser behavior. A server-side check is definitive." },
      { title: "Future Update", description: "This tool is planned for a future update when server-side capabilities are implemented." }
    ],
    features: [
      { icon: Zap, title: "Check for HTTP/2", description: "Verify if a website supports the modern, faster HTTP/2 protocol." },
      { icon: Shield, title: "Confirm HTTPS", description: "Ensure a website is serving content securely over HTTPS." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">HTTP/2 & HTTPS Status Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to analyze a website's response headers. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
