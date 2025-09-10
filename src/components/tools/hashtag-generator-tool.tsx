'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bot, Hash } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function HashtagGeneratorTool() {
  const guideProps = {
    title: "About the AI Hashtag Generator",
    steps: [
      { title: "Contextual Understanding", description: "Generating relevant and trending hashtags requires an AI that understands the content and current social media trends." },
      { title: "Requires AI Models", description: "This functionality is best handled by server-side AI models that can access up-to-date information and analyze content effectively." },
      { title: "Future Update", description: "This tool is planned for a future update when we expand our server-side AI capabilities for social media." }
    ],
    features: [
      { icon: Bot, title: "Boost Engagement", description: "The goal of this tool is to help you find the most effective hashtags to increase the reach and engagement of your social media posts." },
      { icon: Hash, title: "Trend Analysis", description: "A powerful hashtag generator needs to analyze current trends to suggest tags that will perform well." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">AI Hashtag Generator</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires an advanced AI model to generate relevant hashtags and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
