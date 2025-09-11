'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Database, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function WhoisLookupTool() {
  const guideProps = {
    title: "About the WHOIS Lookup Tool",
    steps: [
        { title: "Server-Side API Required", description: "A WHOIS lookup involves querying a distributed database of domain registration information, which must be done from a server." },
        { title: "Rate Limiting", description: "WHOIS servers have strict rate limits, so requests must be managed through a centralized server to avoid being blocked." },
        { title: "Future Update", description: "This tool is planned for a future update when server-side capabilities are added." }
    ],
    features: [
        { icon: Database, title: "Domain Ownership", description: "Look up registration details for any domain, including registrar, creation date, and expiration date." },
        { icon: Info, title: "Essential for Research", description: "A fundamental tool for cybersecurity professionals, domain investors, and network administrators." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">WHOIS Lookup</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side connection to WHOIS databases and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
