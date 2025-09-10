
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bot, BookOpen } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function PunctuationFixerTool() {
  const guideProps = {
    title: "About the Punctuation Fixer",
    steps: [
      { title: "Complex AI Task", description: "Automatically fixing punctuation (like adding missing commas or correcting misplaced periods) requires a sophisticated AI that understands sentence structure and context." },
      { title: "Beyond Simple Rules", description: "This is more complex than simple text replacement and needs a true language model to be effective and avoid introducing new errors." },
      { title: "Future AI Update", description: "This tool is planned for a future update when we integrate more advanced, server-side natural language processing capabilities." }
    ],
    features: [
      { icon: Bot, title: "AI-Powered Corrections", description: "The goal is to provide AI-driven suggestions to automatically correct common punctuation mistakes." },
      { icon: BookOpen, title: "Improve Readability", description: "Proper punctuation is key to clear and professional writing. This tool will help you clean up your text quickly." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Punctuation Fixer</CardTitle>
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
