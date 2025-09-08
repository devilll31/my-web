
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Info } from "lucide-react";

export default function CsvLanguageColumnsMergerTool() {
  const guideProps = {
    title: "About the CSV Language Columns Merger",
    steps: [
      { title: "Complex Data Task", description: "Merging language columns in a CSV (e.g., 'product_en', 'product_es') into a single structured format (like JSON) is a complex data transformation task." },
      { title: "Requires Robust Parsing", description: "This requires a powerful client-side CSV parser and data manipulation logic." },
      { title: "Future Update", description: "This localization utility is planned for a future update." }
    ],
    features: [
      { icon: Info, title: "Stay Tuned", description: "We are actively working on adding this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">CSV Language Columns Merger</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This advanced data tool for localization is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
