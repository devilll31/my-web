'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { FileCode, Search, Info } from "lucide-react";

export default function MetaTagAnalyzerTool() {
  const guideProps = {
    title: "About the Meta Tag Analyzer",
    steps: [
      { title: "Requires URL Fetching", description: "To analyze a page's meta tags (like title, description, keywords), a tool needs to fetch the HTML content of the URL." },
      { title: "Server-Side for Reliability", description: "Fetching external URLs from the client-side can be blocked by CORS policies. A server-side request is more reliable." },
      { title: "Future Update", description: "This tool is planned for a future update when server-side URL fetching is implemented." }
    ],
    features: [
      { icon: FileCode, title: "Analyze On-Page SEO", description: "The goal is to let you enter a URL and see its key meta tags, helping you optimize your on-page SEO." },
      { icon: Search, title: "SERP Preview", description: "A complete version would show how your title and meta description will likely appear in Google search results." },
      { icon: Info, title: "Stay Tuned", description: "We're working on the necessary backend services to make this tool available. Thank you!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Meta Tag Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a server-side process to fetch and analyze website content, and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}