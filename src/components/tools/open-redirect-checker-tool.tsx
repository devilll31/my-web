'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Link, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function OpenRedirectCheckerTool() {
  const guideProps = {
    title: "About the Open Redirect Checker",
    steps: [
      { title: "What it Checks", description: "This tool would test a URL for open redirect vulnerabilities, where an attacker can use your domain to redirect users to a malicious site." },
      { title: "Server-Side Requests", description: "Securely and reliably testing for this vulnerability requires making server-side HTTP requests to check for unexpected 'Location' headers." },
      { title: "Future Security Tool", description: "This security tool is planned for a future update when our server-side infrastructure is expanded." }
    ],
    features: [
      { icon: Link, title: "Identify Vulnerabilities", description: "Help developers and security professionals find and fix open redirect vulnerabilities on their websites." },
      { icon: Server, title: "Protect Your Users", description: "Prevent your website from being used in phishing attacks." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the infrastructure to provide this security tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Open Redirect Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This security tool requires a server-side process to check for vulnerabilities and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
