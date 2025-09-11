'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Calendar, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function DomainAgeCheckerTool() {
  const guideProps = {
    title: "About the Domain Age Checker",
    steps: [
        { title: "WHOIS API Needed", description: "Determining a domain's age requires fetching its registration date from a WHOIS database, which is a server-side task." },
        { title: "Data Parsing", description: "The raw WHOIS data needs to be parsed on a server to accurately extract the creation date." },
        { title: "Future Update", description: "This tool is planned for a future update when server-side WHOIS lookup capabilities are implemented." }
    ],
    features: [
        { icon: Calendar, title: "Check Registration Date", description: "The goal is to find out how old a domain is, which can be a factor in SEO and domain authority." },
        { icon: Info, title: "Quick & Simple", description: "A valuable tool for SEO professionals and domain investors to quickly assess a domain's history." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Domain Age Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side WHOIS API connection to function correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
