
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Lock, FileWarning, Info } from "lucide-react";

export default function IdCardOcrRedactorTool() {
  const guideProps = {
    title: "About the ID Card OCR Redactor",
    steps: [
      { title: "Sensitive Information", description: "ID cards contain personally identifiable information (PII) that must be handled with extreme care." },
      { title: "Complex AI Task", description: "Accurately identifying and redacting specific fields (like name, date of birth, ID number) requires a sophisticated AI model trained for this purpose." },
      { title: "Future Update", description: "Due to the security and complexity involved, this tool is planned for a future update with a secure processing environment." }
    ],
    features: [
      { icon: Lock, title: "Privacy Focused", description: "Our goal is to help you protect your privacy by redacting sensitive data from images of ID cards before you share them." },
      { icon: FileWarning, title: "Intelligent Redaction", description: "The future version of this tool will use AI to automatically find and block out sensitive fields, not just random parts of the image." },
      { icon: Info, title: "Stay Tuned", description: "We are working on the infrastructure needed to provide this tool securely. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">ID Card OCR Redactor</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires advanced AI and a secure environment to handle sensitive ID card data. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}

    