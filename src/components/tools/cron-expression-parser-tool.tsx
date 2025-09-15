'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function CronExpressionParserTool() {
  const guideProps = {
    title: "About the Cron Expression Parser",
    steps: [
      { title: "What it Does", description: "A cron parser takes a cron string and translates it into a human-readable description and calculates future run times." },
      { title: "Complex Logic", description: "Correctly parsing all cron syntax variations and calculating next run dates (considering timezones and DST) requires a robust library." },
      { title: "Future Update", description: "This tool is planned for a future update when a reliable cron parsing library is integrated." }
    ],
    features: [
      { icon: FileCode, title: "Debug Schedules", description: "Verify that your cron expressions are written correctly and will run at the expected times." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable parsing library. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Cron Expression Parser</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable cron parser requires a server-side library to handle complex date calculations and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
