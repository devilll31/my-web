'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Clock, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function UptimeMonitorTool() {
  const guideProps = {
    title: "About the Uptime Monitor",
    steps: [
      { title: "Continuous Monitoring", description: "A true uptime monitor requires a backend service to 'ping' or check your website at regular intervals (e.g., every 5 minutes)." },
      { title: "Requires a Backend Service", description: "This functionality cannot be achieved from a user's browser alone. It needs a persistent, server-side process." },
      { title: "Advanced Feature", description: "This is an advanced service that we plan to offer in the future as part of our premium tool suite." }
    ],
    features: [
      { icon: Server, title: "24/7 Monitoring", description: "The goal is to provide a service that constantly checks if your website is online and accessible." },
      { icon: Clock, title: "Instant Alerts", description: "A complete uptime monitor would send you alerts via email or SMS the moment your site goes down." },
      { icon: Info, title: "Stay Tuned", description: "We are building the necessary backend infrastructure to provide this reliable service. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Uptime Monitor</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Service Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable uptime monitor requires a 24/7 server-side service and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
