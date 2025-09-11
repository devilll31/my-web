'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AppWindow, FileJson, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function FaviconsAppManifestGeneratorTool() {
  const guideProps = {
    title: "About the Favicons & App Manifest Generator",
    steps: [
      { title: "Complex Image Resizing", description: "Generating the dozens of required icon sizes for different platforms (iOS, Android, Windows) and creating a PWA manifest is a complex process." },
      { title: "Server-Side Processing Needed", description: "Reliably resizing images and creating a valid `manifest.json` file is best handled by a server-side tool." },
      { title: "Future Update", description: "This comprehensive tool is planned for a future update to ensure reliability and correctness." }
    ],
    features: [
      { icon: AppWindow, title: "One-Click PWA Assets", description: "The goal is to upload one image and get all the necessary favicon sizes and a `manifest.json` file for your Progressive Web App." },
      { icon: FileJson, title: "Manifest Generation", description: "Automatically creates a `manifest.json` file with the correct paths and icon references." },
      { icon: Info, title: "Stay Tuned", description: "We are building the necessary server-side image processing capabilities for this tool. Thank you!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Favicons & App Manifest Generator</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            Generating a full set of favicons and an app manifest requires complex server-side image processing and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
