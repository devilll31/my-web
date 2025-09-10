'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Info } from "lucide-react";

export default function RegexAccentInsensitiveHelperTool() {
  const guideProps = {
    title: "About the Regex Accent-Insensitive Helper",
    steps: [
      { title: "Complex Unicode Logic", description: "Creating regular expressions that correctly handle all Unicode character variants (like 'e', 'é', 'ê') requires complex character class generation." },
      { title: "High Risk of Errors", description: "A simple implementation could easily miss characters or create invalid regex. This tool requires a robust library to be truly useful." },
      { title: "Future Update", description: "This tool is planned for a future update to ensure it is accurate and reliable." }
    ],
    features: [
      { icon: Info, title: "Stay Tuned", description: "We are actively working on a robust implementation. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Regex Accent-Insensitive Helper</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a specialized library to correctly handle Unicode character classes for regular expressions. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
