
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Lock, FileWarning, Info } from "lucide-react";

export default function PassportMrzReaderTool() {
  const guideProps = {
    title: "About the Passport/MRZ Reader Tool",
    steps: [
      { title: "Sensitive Data", description: "Processing passports and Machine-Readable Zones (MRZ) involves highly sensitive personal information." },
      { title: "Security & Compliance", description: "Implementing this feature requires robust security measures and compliance with data protection regulations, which are beyond the scope of a client-side application." },
      { title: "Future Consideration", description: "Due to the security implications, this tool is under consideration and would require a secure server environment to be implemented safely." }
    ],
    features: [
      { icon: Lock, title: "Security First", description: "We prioritize your privacy and security. Tools handling sensitive documents like passports will only be built with the highest security standards." },
      { icon: FileWarning, title: "Complex OCR", description: "MRZ reading is a specialized form of OCR that must be extremely accurate to be useful." },
      { icon: Info, title: "Stay Tuned", description: "We are evaluating the best way to offer such tools securely in the future. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Passport/MRZ Reader</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Consideration</h3>
          <p className="text-muted-foreground mt-2">
            Due to the high security and privacy requirements for handling passport data, this tool is under careful consideration and is not yet available.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}

    