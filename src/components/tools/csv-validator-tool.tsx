'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCheck, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function CsvValidatorTool() {
  const guideProps = {
    title: "About the CSV Validator",
    steps: [
      { title: "What it Does", description: "A CSV validator checks if a file follows the CSV standard, ensuring it has consistent columns, proper escaping, and no structural errors." },
      { title: "Complex File Parsing", description: "Validating large CSV files efficiently and accurately requires a robust streaming parser, which is best handled on a server." },
      { title: "Future Update", description: "This tool is planned for a future update to provide reliable validation for CSV files of any size." }
    ],
    features: [
      { icon: FileCheck, title: "Ensure Data Integrity", description: "Validate your CSV files before importing them into a database or application to prevent errors." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend necessary to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">CSV Validator</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable CSV validator for large files requires a server-side parser and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
