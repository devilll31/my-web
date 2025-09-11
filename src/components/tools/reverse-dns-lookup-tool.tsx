'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Network, HelpCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function ReverseDnsLookupTool() {
  const guideProps = {
    title: "About the Reverse DNS Lookup Tool",
    steps: [
      { title: "Server-Side API Required", description: "Performing a Reverse DNS (PTR) lookup requires querying DNS servers, which is best handled by a backend service." },
      { title: "Specialized Query", description: "This involves a specific type of DNS query for an IP address to find its associated domain name." },
      { title: "Future Update", description: "This tool is planned for a future update alongside other DNS and networking utilities." }
    ],
    features: [
      { icon: Network, title: "IP to Domain", description: "Find the hostname associated with a given IP address, useful for network diagnostics and security analysis." },
      { icon: HelpCircle, title: "Troubleshooting Tool", description: "Essential for network administrators to verify PTR records and troubleshoot email delivery issues." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Reverse DNS Lookup</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side DNS query engine to function and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
