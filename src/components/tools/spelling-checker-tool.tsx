
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { SpellCheck, Pilcrow, Bot } from "lucide-react";

export default function SpellingCheckerTool() {
  const guideProps = {
    title: "About the Spelling Checker",
    steps: [
      { title: "Complex NLP Task", description: "A high-quality spell checker requires a large dictionary and context-aware AI to distinguish between errors and correct words." },
      { title: "Server-Side Processing", description: "For accuracy and to handle various languages, this functionality is best performed on a server with access to powerful language models." },
      { title: "Future Update", description: "This tool is planned for a future AI-powered update to ensure reliable and contextually aware spell-checking." }
    ],
    features: [
      { icon: Bot, title: "AI-Powered Suggestions", description: "The future version will provide intelligent suggestions for misspelled words." },
      { icon: SpellCheck, title: "Context-Aware", description: "It will understand the context of your sentences to avoid flagging correct words as errors (e.g., 'their' vs. 'there')." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Spelling Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable spelling checker requires advanced AI and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
