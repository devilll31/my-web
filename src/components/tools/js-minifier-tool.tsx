'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function JsMinifierTool() {
  const guideProps = {
    title: "About the JS Minifier/Uglifier",
    steps: [
      { title: "What it Does", description: "Minifying and uglifying JavaScript removes whitespace and shortens variable names to drastically reduce file size." },
      { title: "Complex Parsing", description: "This is a very complex process that requires a full JavaScript parser (like Babel or Terser) to avoid breaking the code's logic." },
      { title: "Future Update", description: "This tool is planned for a future update when we integrate a reliable server-side JavaScript processing pipeline." }
    ],
    features: [
      { icon: FileCode, title: "Optimize for Production", description: "Minifying JavaScript is a standard practice for making web applications faster." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the backend infrastructure to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">JS Minifier/Uglifier</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable JavaScript minifier requires a server-side parser and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
