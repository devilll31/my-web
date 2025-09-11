'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Share2, Code, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function OpenGraphGeneratorTool() {
  const guideProps = {
    title: "About the Open Graph Tag Generator",
    steps: [
      { title: "What it Does", description: "This tool will help you create the necessary HTML <meta> tags for the Open Graph protocol." },
      { title: "Enhance Social Sharing", description: "Open Graph tags control how your content appears when shared on social media platforms like Facebook, LinkedIn, and Twitter, specifying the title, description, and image." },
      { title: "Future Update", description: "A form-based generator for these tags is planned for a future update to make the process easier." }
    ],
    features: [
      { icon: Share2, title: "Improve Social Previews", description: "Ensure your shared links look professional and appealing, which can increase click-through rates." },
      { icon: Code, title: "Easy Tag Generation", description: "The future tool will provide a simple form to generate all necessary OG tags without writing HTML manually." },
      { icon: Info, title: "Stay Tuned", description: "We are working on building the user interface for this generator. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Open Graph Tag Generator</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A user-friendly form for generating Open Graph meta tags is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
