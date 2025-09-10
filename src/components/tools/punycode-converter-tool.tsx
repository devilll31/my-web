'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Server, FileWarning, Info } from "lucide-react";

export default function PunycodeConverterTool() {
  const guideProps = {
    title: "About the Punycode Converter",
    steps: [
      { title: "Specialized Algorithm", description: "Punycode is a specific encoding syntax used for Internationalized Domain Names (IDNs). Implementing it correctly requires a dedicated library." },
      { title: "Not a Standard API", description: "Unlike other formatters, Punycode conversion is not a standard, built-in browser API, making a client-side version less reliable." },
      { title: "Future Update", description: "This tool is planned for a future update to ensure a robust and correct implementation." }
    ],
    features: [
      { icon: Info, title: "Stay Tuned", description: "We are actively working on the infrastructure to support this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Punycode Converter</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a specific encoding library to be implemented reliably.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
