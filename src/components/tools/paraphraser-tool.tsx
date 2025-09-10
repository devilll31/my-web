'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bot, BookOpen } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function ParaphraserTool() {
  const guideProps = {
    title: "About the AI Paraphraser",
    steps: [
      { title: "Complex AI Task", description: "Paraphrasing text while preserving its original meaning requires a sophisticated natural language understanding model." },
      { title: "Requires Advanced Models", description: "This functionality is best handled by powerful server-side AI models to ensure high-quality, coherent results." },
      { title: "Future Update", description: "This tool is planned for a future update when we expand our server-side AI capabilities." }
    ],
    features: [
      { icon: Bot, title: "Rewrite Content", description: "The goal is to help you rephrase sentences and paragraphs to avoid plagiarism and improve clarity." },
      { icon: BookOpen, title: "Maintain Meaning", description: "A high-quality paraphrasing tool must understand the nuances of language to maintain the original intent of the text." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">AI Paraphraser Tool</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires an advanced AI language model to function correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
