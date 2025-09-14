'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileJson, Search, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function JsonpathTesterTool() {
  const guideProps = {
    title: "About the JSONPath Tester",
    steps: [
      { title: "What it Does", description: "JSONPath is a query language for JSON, similar to XPath for XML. This tool would let you test JSONPath expressions against a JSON document." },
      { title: "Requires a Parser", description: "To work correctly, this tool needs a dedicated JSONPath parsing engine to interpret the expressions and traverse the JSON data." },
      { title: "Future Update", description: "This developer tool is planned for a future update when we integrate a reliable JSONPath library." }
    ],
    features: [
      { icon: FileJson, title: "Query JSON Data", description: "Easily navigate and extract data from complex JSON documents using a simple expression language." },
      { icon: Search, title: "Live Testing", description: "The goal is to provide an interactive environment where you can see the results of your JSONPath queries in real-time." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable parsing library for this feature. Thank you!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">JSONPath Tester</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable JSONPath tester requires a dedicated parsing library and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
