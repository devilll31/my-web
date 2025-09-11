'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Search, CheckCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function DomainAvailabilityCheckerTool() {
  const guideProps = {
    title: "About the Domain Availability Checker",
    steps: [
      { title: "Server-Side API Required", description: "Checking domain availability requires connecting to domain registrars' APIs, which must be done from a secure server." },
      { title: "Real-time Checks", description: "This tool needs to perform real-time lookups to provide accurate availability information." },
      { title: "Future Update", description: "This tool is planned for a future update when server-side capabilities are added." }
    ],
    features: [
      { icon: Search, title: "Instant Search", description: "The goal is to allow you to instantly check if your desired domain name is available for registration." },
      { icon: CheckCircle, title: "Find Your Perfect Domain", description: "A crucial first step for starting any new website or online business." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Domain Availability Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side connection to domain registrar APIs to check availability in real-time. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
