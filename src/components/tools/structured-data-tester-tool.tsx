'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Code, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function StructuredDataTesterTool() {
  const guideProps = {
    title: "About the Structured Data (Schema) Tester",
    steps: [
      { title: "What it Does", description: "This tool will help you validate the structured data (like JSON-LD or Microdata) on your webpage to ensure it's correctly implemented for search engines." },
      { title: "Requires URL Fetching & Parsing", description: "To test structured data, a tool must fetch a URL's HTML, extract the schema markup, and validate it against schema.org standards. This is a complex server-side task." },
      { title: "Future SEO Suite Update", description: "This advanced tool is planned for a future update as part of our comprehensive SEO tool suite." }
    ],
    features: [
      { icon: Code, title: "Validate Your Schema", description: "Ensure your rich snippets are correctly configured to appear in search results for products, articles, events, and more." },
      { icon: Server, title: "Rich Snippet Preview", description: "The goal is to provide a preview of how your structured data might appear in Google search results." },
      { icon: Info, title: "Stay Tuned", description: "We are developing the necessary server-side parsing and validation logic for this tool. Thank you!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Structured Data (Schema) Tester</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to fetch and validate structured data from a URL. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
