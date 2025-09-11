'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Server, Lock, ShieldCheck } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function SslCertificateCheckerTool() {
  const guideProps = {
    title: "About the SSL Certificate Checker",
    steps: [
      { title: "Requires Server Connection", description: "Checking an SSL/TLS certificate involves making a direct connection to the server on port 443, which cannot be done from a user's browser due to security restrictions." },
      { title: "Certificate Chain Analysis", description: "A proper check involves validating the entire certificate chain, which is a server-side process." },
      { title: "Future Update", description: "This tool is planned for a future update when server-side capabilities are implemented." }
    ],
    features: [
      { icon: ShieldCheck, title: "Verify Encryption", description: "Check the validity, issuer, and expiration date of any website's SSL certificate." },
      { icon: Lock, title: "Security Auditing", description: "An essential tool for web developers and system administrators to ensure websites are secure and properly configured." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">SSL Certificate Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to connect to web servers and inspect SSL certificates. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
