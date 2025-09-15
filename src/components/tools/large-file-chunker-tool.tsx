'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCog, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function LargeFileChunkerTool() {
  const guideProps = {
    title: "About the Large File Chunker",
    steps: [
      { title: "What it Does", description: "This tool is designed to split a very large file into smaller, more manageable 'chunks' directly in your browser without uploading it." },
      { title: "Browser Limitations", description: "While possible, processing very large files (multiple gigabytes) can be slow and memory-intensive in a browser, potentially leading to crashes." },
      { title: "Future Update", description: "A more robust version of this tool using advanced web APIs is planned for a future update to ensure stability and performance." }
    ],
    features: [
      { icon: FileCog, title: "Manage Large Files", description: "The goal is to provide a way to break down large files for easier uploading or processing in environments with file size limits." },
      { icon: Server, title: "Client-Side Processing", description: "The entire process happens in your browser, ensuring your data remains private and is never sent to a server." },
      { icon: Info, title: "Stay Tuned", description: "We are working on a reliable implementation. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Large File Chunker</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires advanced browser APIs for handling large files reliably and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
