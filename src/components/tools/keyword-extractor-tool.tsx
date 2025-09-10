'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bot, Tags } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function KeywordExtractorTool() {
  const guideProps = {
    title: "About the AI Keyword Extractor",
    steps: [
      { title: "Complex AI Task", description: "Identifying the most relevant keywords and topics from a block of text requires natural language processing (NLP) to understand context and importance." },
      { title: "Requires Advanced Models", description: "This functionality is best handled by powerful server-side AI models that can analyze semantic meaning." },
      { title: "Future Update", description: "This tool is planned for a future update when we expand our server-side NLP capabilities." }
    ],
    features: [
      { icon: Bot, title: "Automated Tagging", description: "The goal is to help you automatically identify the main themes and keywords in your text for better SEO and content organization." },
      { icon: Tags, title: "Content Analysis", description: "Quickly understand the core topics of any document without having to read it in its entirety." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">AI Keyword Extractor</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires an advanced NLP model to function correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
