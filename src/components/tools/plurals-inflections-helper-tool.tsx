
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Book, FileWarning, Info } from "lucide-react";

export default function PluralsInflectionsHelperTool() {
  const guideProps = {
    title: "About the Plurals & Inflections Helper",
    steps: [
      { title: "Complex Language Rules", description: "Correctly handling plurals and inflections (e.g., goose -> geese, run -> running) is a complex Natural Language Processing (NLP) task." },
      { title: "Requires AI/ML Model", description: "This functionality needs a sophisticated language model that understands grammar rules, which is best handled on a server." },
      { title: "Future Update", description: "This AI-powered tool is planned for a future update when we expand our server-side NLP capabilities." }
    ],
    features: [
      { icon: Book, title: "Grammar Assistance", description: "The goal is to provide developers and writers with a quick way to get correct plural and inflectional forms of words." },
      { icon: FileWarning, title: "Irregular Forms", description: "A robust tool must correctly handle irregular plurals and verb conjugations, which requires a large dictionary or an AI model." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the AI infrastructure to support this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Plurals & Inflections Helper</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a complex language model to handle grammar rules correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}

    