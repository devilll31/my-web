'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Crop, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function ImageCropperTool() {
  const guideProps = {
    title: "About the Image Cropper Tool",
    steps: [
      { title: "Complex UI", description: "A user-friendly image cropper requires a complex interactive UI with a cropper box, which is a significant development effort." },
      { title: "Future Update", description: "This tool is planned for a future update to ensure a high-quality, intuitive cropping experience." }
    ],
    features: [
      { icon: Crop, title: "Visual Cropping", description: "The goal is to allow users to visually select and crop a specific area of an image." },
      { icon: Info, title: "Stay Tuned", description: "We are working on building a great cropping component. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Image Cropper</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A user-friendly image cropper with a visual interface is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
