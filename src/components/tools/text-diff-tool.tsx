'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Rows, Columns } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function TextDiffTool() {
  const guideProps = {
    title: "About the Text Diff Tool",
    steps: [
      { title: "Complex Algorithm", description: "Comparing two blocks of text to highlight differences requires a sophisticated diffing algorithm (like the one used by Git)." },
      { title: "Requires Specialized Library", description: "Implementing a visual and accurate diff viewer is a complex front-end task that requires a dedicated library for performance and accuracy." },
      { title: "Future Update", description: "This tool is planned for a future update to ensure it provides a high-quality, reliable comparison experience." }
    ],
    features: [
      { icon: Rows, title: "Side-by-Side View", description: "Our goal is to provide a clear, side-by-side comparison of two texts, highlighting additions and deletions." },
      { icon: Columns, title: "Track Changes", description: "Perfect for writers, editors, and developers to easily track changes between different versions of a document or code file." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Text Difference Checker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a complex diffing library to be implemented correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
