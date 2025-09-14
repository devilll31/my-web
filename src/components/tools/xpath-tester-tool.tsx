'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Search, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function XpathTesterTool() {
  const guideProps = {
    title: "About the XPath Tester",
    steps: [
      { title: "What it Does", description: "XPath is a query language for selecting nodes from an XML document. This tool would allow you to test XPath expressions against XML data." },
      { title: "Requires an XML Parser", description: "To work reliably, this tool needs a dedicated XML DOM parser and an XPath evaluation engine." },
      { title: "Future Update", description: "This developer tool is planned for a future update when we integrate a robust XML processing library." }
    ],
    features: [
      { icon: FileCode, title: "Query XML Documents", description: "Easily navigate and extract data from complex XML documents using XPath expressions." },
      { icon: Search, title: "Live Testing", description: "The goal is to provide an interactive environment to see the results of your XPath queries in real-time." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable parsing library for this feature. Thank you!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">XPath Tester</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable XPath tester requires a dedicated XML parsing engine and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
