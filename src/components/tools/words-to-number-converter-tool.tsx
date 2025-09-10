'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Server, FileWarning, Info } from "lucide-react";

export default function WordsToNumberConverterTool() {
  const guideProps = {
    title: "About the Words to Number Converter",
    steps: [
      { title: "Complex AI Task", description: "Accurately converting written words to numbers, especially in multiple languages, is a complex Natural Language Processing task." },
      { title: "Server-Side Need", description: "This functionality requires a powerful AI model running on a server and cannot be reliably handled in the browser." },
      { title: "Future Update", description: "This tool is planned for a future update when server-side capabilities are expanded." }
    ],
    features: [
      { icon: Server, title: "Server-Side Processing", description: "Our future implementation will leverage powerful servers for fast and reliable conversion." },
      { icon: FileWarning, title: "Client-Side Limitations", description: "We avoid client-side-only solutions for this task to ensure stability and performance." },
      { icon: Info, title: "Stay Tuned", description: "We are actively working on the infrastructure to support this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Words to Number Converter</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            Converting natural language words into numbers is a complex AI task that requires server-side processing.
          </p>
          <p className="text-muted-foreground mt-2">
            This feature is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
