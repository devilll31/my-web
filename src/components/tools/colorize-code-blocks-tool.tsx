'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Code, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function ColorizeCodeBlocksTool() {
  const guideProps = {
    title: "About the Code Colorizer",
    steps: [
      { title: "What it Does", description: "This tool would take a block of code and wrap it in HTML with syntax highlighting, similar to libraries like Prism.js or highlight.js." },
      { title: "Complex Parsing", description: "To accurately highlight code, a language-specific parser is required to understand keywords, variables, and syntax. This is complex to implement for many languages." },
      { title: "Future Update", description: "This developer tool is planned for a future update when we integrate a robust, server-side syntax highlighting library." }
    ],
    features: [
      { icon: Code, title: "Improve Readability", description: "Syntax highlighting makes code much easier to read and understand on websites and blogs." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable highlighting library. Thank you!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Colorize Code Blocks</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable code colorizer requires a server-side syntax highlighting library and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
