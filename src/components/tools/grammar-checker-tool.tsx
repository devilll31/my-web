
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { BookOpen, Pilcrow, Bot } from "lucide-react";

export default function GrammarCheckerTool() {
  const guideProps = {
    title: "About the Grammar Checker",
    steps: [
      { title: "Complex AI Task", description: "Checking grammar involves understanding sentence structure, context, and complex linguistic rules, which requires a sophisticated AI model." },
      { title: "Server-Side Processing", description: "Reliable grammar correction cannot be performed solely in the browser and needs a powerful server-side AI to analyze the text." },
      { title: "Future Update", description: "This tool is planned for a future update when we integrate advanced natural language processing capabilities." }
    ],
    features: [
      { icon: Bot, title: "AI-Powered Corrections", description: "Our goal is to provide AI-driven suggestions to fix grammatical errors, improve clarity, and enhance your writing." },
      { icon: BookOpen, title: "Beyond Spelling", description: "This tool will go beyond simple spell-checking to address issues with tense, punctuation, sentence structure, and style." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Grammar Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable grammar checker requires advanced AI and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
