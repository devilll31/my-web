'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function XmlValidatorTool() {
  const guideProps = {
    title: "About the XML Validator",
    steps: [
      { title: "What it Does", description: "An XML validator checks your XML data to ensure it is well-formed and follows all syntax rules." },
      { title: "Requires a Parser", description: "Validation requires a strict XML parser to check for things like properly closed tags, correct nesting, and valid characters." },
      { title: "Future Update", description: "This tool is planned for a future update when a robust server-side XML validation library is integrated." }
    ],
    features: [
      { icon: FileCode, title: "Ensure Correctness", description: "Verify that your XML is syntactically correct before using it in an application to prevent parsing errors." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend necessary to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">XML Validator</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable XML validator requires a server-side parser to function correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
