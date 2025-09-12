'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCode, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function TomlFormatterTool() {
  const guideProps = {
    title: "About the TOML Formatter",
    steps: [
      { title: "What it Does", description: "A TOML formatter standardizes the structure of TOML (Tom's Obvious, Minimal Language) configuration files." },
      { title: "Requires a Parser", description: "Correctly formatting TOML requires a specific parser for its syntax." },
      { title: "Future Update", description: "This developer tool is planned for a future update when a reliable TOML library is integrated." }
    ],
    features: [
      { icon: FileCode, title: "Standardize Config Files", description: "Ensure your TOML files are consistently formatted and easy to read." },
      { icon: Info, title: "Stay Tuned", description: "We are working on integrating a reliable parsing library. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">TOML Formatter</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable TOML formatter requires a server-side parser and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
