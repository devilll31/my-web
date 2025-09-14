'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function PrettifyCodeTool() {
  const guideProps = {
    title: "About the Code Prettifier",
    steps: [
      { title: "What it Does", description: "A code prettifier or beautifier takes unformatted or minified code and adds indentation and spacing to make it readable." },
      { title: "Language-Specific Parsers", description: "To correctly format code for different languages (like JavaScript, Python, Java, etc.), a dedicated parser for each language is required." },
      { title: "Future Update", description: "This complex tool is planned for a future update when we integrate a powerful, multi-language formatting library like Prettier." }
    ],
    features: [
      { icon: FileCode, title: "Multi-Language Support", description: "The goal is to support formatting for all major programming languages." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable formatting library. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Prettify Code</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable multi-language code formatter requires a server-side library and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
