'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Smartphone, Search, Info } from "lucide-react";

export default function MobileFriendlyTestTool() {
  const guideProps = {
    title: "About the Mobile-Friendly Test",
    steps: [
      { title: "API Integration", description: "A reliable mobile-friendly test typically uses an external API, like Google's, to render and analyze a webpage from a mobile perspective." },
      { title: "Server-Side Request", description: "This process involves a server making a request to the API to get the test results, which cannot be done directly from the user's browser." },
      { title: "Future Update", description: "This tool is planned for a future update when we integrate with a mobile testing API." }
    ],
    features: [
      { icon: Smartphone, title: "Check Mobile Usability", description: "The goal is to help you determine if your website is easy to use on mobile devices, a critical factor for SEO." },
      { icon: Search, title: "Improve Rankings", description: "Mobile-friendliness is a key ranking signal for search engines like Google." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the API integration to bring you this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Mobile-Friendly Test</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires integration with a server-side API to test mobile-friendliness and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}