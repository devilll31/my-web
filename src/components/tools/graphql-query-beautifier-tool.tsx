'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function GraphqlQueryBeautifierTool() {
  const guideProps = {
    title: "About the GraphQL Query Beautifier",
    steps: [
      { title: "What it Does", description: "A GraphQL beautifier takes a compact or messy query and formats it with proper indentation for readability." },
      { title: "Requires a Parser", description: "To safely format a GraphQL query without breaking its syntax, a dedicated language parser is necessary." },
      { title: "Future Update", description: "This developer tool is planned for a future update when we integrate a reliable GraphQL parsing library." }
    ],
    features: [
      { icon: FileCode, title: "Improve Readability", description: "Make complex GraphQL queries easier to read, debug, and share with your team." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable parsing library for this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">GraphQL Query Beautifier</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable GraphQL formatter requires a server-side parser and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
