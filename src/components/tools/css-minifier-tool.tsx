'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function CssMinifierTool() {
  const guideProps = {
    title: "About the CSS Minifier",
    steps: [
      { title: "What it Does", description: "Minifying CSS removes unnecessary characters like whitespace, comments, and line breaks to reduce the file size." },
      { title: "Complex Parsing", description: "Safely minifying CSS without breaking styles requires a robust CSS parser, not just simple text replacement." },
      { title: "Future Update", description: "This tool is planned for a future update when we integrate a reliable server-side CSS parsing library." }
    ],
    features: [
      { icon: FileCode, title: "Reduce File Size", description: "Minimizing CSS can lead to faster page load times and reduced bandwidth usage." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the backend infrastructure to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">CSS Minifier</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable CSS minifier requires a server-side parser to function correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
