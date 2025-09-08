'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Server, FileWarning, Info } from "lucide-react";

export default function WebfontConverterTool() {
  const guideProps = {
    title: "About the Webfont Converter",
    steps: [
      { title: "Complex Conversion", description: "Converting font files like .ttf or .otf to web-ready formats (.woff, .woff2) is a computationally intensive task." },
      { title: "Server-Side Need", description: "This process cannot be reliably performed in the user's browser and requires dedicated server-side processing to handle the file conversion." },
      { title: "Future Update", description: "This tool is a high priority and is planned for a future update as soon as our server-side capabilities are expanded." }
    ],
    features: [
      { icon: Server, title: "Server-Side Processing", description: "Our future implementation will leverage powerful servers for fast and reliable font conversion." },
      { icon: FileWarning, title: "Client-Side Limitations", description: "We avoid client-side-only solutions for this task to ensure stability and performance for all users." },
      { icon: Info, title: "Stay Tuned", description: "We are actively working on the infrastructure to support this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Webfont Converter</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            Converting font files (like TTF, OTF, WOFF) requires complex, server-side processing that is beyond the scope of this client-side application.
          </p>
          <p className="text-muted-foreground mt-2">
            This feature is planned for a future update when server-side capabilities are added.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
