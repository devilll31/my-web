
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Info } from "lucide-react";

export default function EmojiStripperNormalizerTool() {
  const guideProps = {
    title: "About the Emoji Stripper/Normalizer",
    steps: [
      { title: "Complex Regex", description: "Reliably identifying and stripping all Unicode emoji characters, including their variants, requires complex regular expressions." },
      { title: "Future Update", description: "This tool is planned for a future update to ensure it is robust and handles all edge cases correctly." }
    ],
    features: [
      { icon: Info, title: "Stay Tuned", description: "We are actively working on a reliable implementation. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Emoji Stripper/Normalizer</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a complex regular expression library to handle all emoji variations correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
