'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function XmlMinifierTool() {
  const guideProps = {
    title: "About the XML Minifier",
    steps: [
      { title: "What it Does", description: "Minifying XML removes unnecessary whitespace and line breaks to reduce the file size." },
      { title: "Requires a Parser", description: "To safely minify XML without corrupting the data, a proper XML parser is required." },
      { title: "Future Update", description: "This tool is planned for a future update when a robust server-side XML parsing library is integrated." }
    ],
    features: [
      { icon: FileCode, title: "Reduce File Size", description: "Make your XML files smaller for faster transmission and reduced bandwidth." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend necessary to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">XML Minifier</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable XML minifier requires a server-side parser and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
