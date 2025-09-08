
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Info } from "lucide-react";

export default function UnicodeGraphemeSplitterTool() {
  const guideProps = {
    title: "About the Unicode Grapheme Splitter",
    steps: [
      { title: "Complex Unicode Task", description: "Correctly splitting grapheme clusters (like an emoji with a skin-tone modifier) requires the `Intl.Segmenter` API." },
      { title: "Browser Compatibility", description: "This is a modern browser feature and is not yet universally supported, which could lead to inconsistent results for users." },
      { title: "Future Update", description: "This tool is planned for a future update when browser support for `Intl.Segmenter` is more widespread." }
    ],
    features: [
      { icon: Info, title: "Stay Tuned", description: "We are actively working on providing this feature once it's reliable for all users. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Unicode Grapheme Splitter</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool relies on a modern browser feature (`Intl.Segmenter`) that is not yet universally supported. It will be implemented in a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
