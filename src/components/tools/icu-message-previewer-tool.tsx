'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Info } from "lucide-react";

export default function IcuMessagePreviewerTool() {
  const guideProps = {
    title: "About the ICU Message Previewer",
    steps: [
      { title: "Specialized Formatting", description: "ICU (International Components for Unicode) message formatting is a standard for writing translatable strings with complex pluralization and gender rules." },
      { title: "Requires Parser", description: "Correctly parsing and previewing these messages requires a dedicated ICU message format parser." },
      { title: "Future Update", description: "This developer-focused tool is planned for a future update." }
    ],
    features: [
      { icon: Info, title: "Stay Tuned", description: "We are actively working on adding this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">ICU Message Previewer</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This specialized developer tool requires an ICU message format parser and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
