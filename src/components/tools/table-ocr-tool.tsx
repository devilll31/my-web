
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Server, FileWarning, Info } from "lucide-react";

export default function TableOcrTool() {
  const guideProps = {
    title: "About the Table OCR Tool",
    steps: [
      { title: "Complex AI Task", description: "Extracting structured table data (rows and columns) from an image or PDF is a highly complex AI challenge." },
      { title: "Requires Specialized Model", description: "This functionality needs a specialized AI model trained specifically for table detection and extraction, which is different from standard text OCR." },
      { title: "Future Update", description: "This advanced tool is planned for a future update when the appropriate AI models are integrated." }
    ],
    features: [
      { icon: Server, title: "Structured Data Extraction", description: "Our future implementation aims to convert images of tables into usable data formats like CSV or JSON." },
      { icon: FileWarning, title: "Beyond Simple OCR", description: "Unlike basic OCR, table OCR must understand the layout and relationships between cells, rows, and columns." },
      { icon: Info, title: "Stay Tuned", description: "We are actively exploring the models required for this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Table OCR</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a specialized AI model for structured table extraction and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}

    