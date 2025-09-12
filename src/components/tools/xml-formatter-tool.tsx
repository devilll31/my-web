'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function XmlFormatterTool() {
  const guideProps = {
    title: "About the XML Formatter",
    steps: [
      { title: "What it Does", description: "Formatting or 'beautifying' XML adds indentation and line breaks to make it human-readable." },
      { title: "Requires a Parser", description: "To correctly format XML without breaking its structure, a proper XML parser is needed. Simple text manipulation is not reliable." },
      { title: "Future Update", description: "This tool is planned for a future update when a robust server-side XML parsing library is integrated." }
    ],
    features: [
      { icon: FileCode, title: "Improve Readability", description: "Turn minified or messy XML into a well-structured, indented format that's easy to read and debug." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend necessary to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">XML Formatter/Beautifier</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable XML formatter requires a server-side parser to function correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
