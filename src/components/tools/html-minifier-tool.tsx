'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function HtmlMinifierTool() {
  const guideProps = {
    title: "About the HTML Minifier",
    steps: [
      { title: "What it Does", description: "Minifying HTML removes unnecessary characters like whitespace, comments, and line breaks to reduce the file size." },
      { title: "Complex Parsing", description: "Safely minifying HTML without breaking the page structure requires a robust HTML parser, not just simple text replacement." },
      { title: "Future Update", description: "This tool is planned for a future update when we integrate a reliable server-side HTML parsing library." }
    ],
    features: [
      { icon: FileCode, title: "Reduce File Size", description: "Minimizing HTML can lead to faster page load times and reduced bandwidth usage." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the backend infrastructure to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">HTML Minifier</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable HTML minifier requires a server-side parser to function correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
