'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Twitter, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function TwitterCardValidatorTool() {
  const guideProps = {
    title: "About the Twitter Card Validator",
    steps: [
      { title: "What it Does", description: "A validator tool fetches a URL and simulates how Twitter's crawler will see it to generate a card preview." },
      { title: "Requires Server-Side Crawling", description: "This process must be done from a server to accurately mimic Twitter's bot and bypass client-side restrictions like CORS." },
      { title: "Future Update", description: "This tool is planned for a future update when we implement server-side URL fetching and rendering." }
    ],
    features: [
      { icon: Twitter, title: "Preview Your Card", description: "The goal is to enter a URL and see exactly how it will appear when shared on Twitter, including the title, description, and image." },
      { icon: Server, title: "Debug Sharing Issues", description: "Helps you troubleshoot why your Twitter cards might not be appearing correctly by showing what the crawler sees." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend infrastructure required to power this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Twitter Card Validator</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side web crawler to accurately preview Twitter Cards and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
