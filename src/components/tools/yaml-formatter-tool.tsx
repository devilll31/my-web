'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function YamlFormatterTool() {
  const guideProps = {
    title: "About the YAML Formatter",
    steps: [
      { title: "What it Does", description: "A YAML formatter ensures that your YAML data has correct indentation and structure." },
      { title: "Requires a Parser", description: "Safely formatting YAML without breaking its structure requires a proper parser." },
      { title: "Future Update", description: "This tool is planned for a future update when a reliable YAML library is integrated." }
    ],
    features: [
      { icon: FileCode, title: "Ensure Correct Indentation", description: "Fix common YAML issues related to spacing and indentation, which are critical for its syntax." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable parsing library. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">YAML Formatter</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable YAML formatter requires a server-side parser and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
