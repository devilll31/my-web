'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCog, Server, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function CsvSplitterMergerTool() {
  const guideProps = {
    title: "About the CSV Splitter/Merger",
    steps: [
      { title: "Large File Handling", description: "Splitting or merging large CSV files can consume significant memory and browser resources, making a server-side solution more reliable." },
      { title: "Streaming Required", description: "To handle very large files without crashing, the tool needs to stream data, which is better managed on a server." },
      { title: "Future Update", description: "This advanced data tool is planned for a future update when server-side file processing is implemented." }
    ],
    features: [
      { icon: FileCog, title: "Manage Large Datasets", description: "The goal is to provide a way to split massive CSV files into smaller, more manageable chunks, or merge multiple files into one." },
      { icon: Server, title: "Reliable Processing", description: "A server-side implementation will ensure even very large files can be processed without browser timeouts or crashes." },
      { icon: Info, title: "Stay Tuned", description: "We are developing the necessary server-side infrastructure for this tool. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">CSV Splitter/Merger</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires server-side processing to handle large files reliably and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
