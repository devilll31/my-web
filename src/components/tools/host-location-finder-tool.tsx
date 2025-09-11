'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Globe, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function HostLocationFinderTool() {
  const guideProps = {
    title: "About the Host Location Finder",
    steps: [
      { title: "IP Geolocation API", description: "To find a server's physical location, the tool must first get the server's IP address (via DNS) and then query an IP geolocation database." },
      { title: "Server-Side Integration", description: "These lookups require server-side API integrations for reliability and access to up-to-date geolocation data." },
      { title: "Future Update", description: "This tool is planned for a future update when these server-side services are integrated." }
    ],
    features: [
      { icon: Server, title: "Find Server Location", description: "Enter a domain name to find out the physical location of the server hosting the website." },
      { icon: Globe, title: "Global Insights", description: "Useful for understanding where a website's infrastructure is located, which can impact speed and data residency." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating the necessary APIs to bring you this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Host Location Finder</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires server-side DNS and geolocation API lookups to function and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
