'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Server, Zap, Info } from "lucide-react";

export default function WebsiteSpeedTestTool() {
  const guideProps = {
    title: "About the Website Speed Test",
    steps: [
      { title: "Complex Analysis", description: "A comprehensive speed test involves loading a webpage in a controlled environment (like Google's PageSpeed Insights) to measure metrics like LCP, FID, and CLS." },
      { title: "Server-Side Infrastructure", description: "This requires significant server-side infrastructure to run browser instances, which is beyond the scope of a simple client-side tool." },
      { title: "Future Update", description: "This tool is planned for a future update, potentially by integrating with a third-party API like Google PageSpeed." }
    ],
    features: [
      { icon: Zap, title: "Performance Metrics", description: "The goal is to provide detailed performance metrics to help you identify and fix speed bottlenecks on your website." },
      { icon: Server, title: "Actionable Insights", description: "A good speed test tool doesn't just show numbers; it provides actionable recommendations for improvement." },
      { icon: Info, title: "Stay Tuned", description: "We are actively exploring the best way to bring this valuable tool to you. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Website Speed Test</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            Performing a comprehensive website speed test requires a complex server-side infrastructure and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}