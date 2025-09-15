'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Link, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function UrlShortenerTool() {
  const guideProps = {
    title: "About the URL Shortener",
    steps: [
      { title: "How it Works", description: "A URL shortener takes a long URL, stores it in a database, and provides a short, unique link that redirects to the original URL." },
      { title: "Requires a Backend", description: "This functionality requires a server and a database to store the links and handle the redirects. It cannot be done entirely in the browser." },
      { title: "Future Service", description: "This is a service we plan to offer in the future when the necessary backend infrastructure is in place." }
    ],
    features: [
      { icon: Link, title: "Clean Links", description: "Create short, clean links that are easy to share on social media or in print." },
      { icon: Server, title: "Reliable Redirects", description: "Our future service will ensure your shortened links are fast and reliable." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend services needed to power this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">URL Shortener</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Service Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A URL shortener requires a server and database to store and manage links, which is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
