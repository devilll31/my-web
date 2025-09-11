'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Zap, ShieldCheck, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function AmpValidatorHelperTool() {
  const guideProps = {
    title: "About the AMP Validator Helper",
    steps: [
      { title: "What is AMP?", description: "AMP (Accelerated Mobile Pages) is an open-source framework designed to help create fast-loading mobile web pages." },
      { title: "Validation is Key", description: "To get the benefits of AMP (like potential caching by Google), your page must be valid AMP HTML. This requires checking it against the official AMP validator." },
      { title: "How to Validate", description: "You can validate by adding '#development=1' to your URL, using the AMP Validator browser extension, or using the official online validator." }
    ],
    features: [
      { icon: Zap, title: "Speed up Your Site", description: "Learn about AMP to create lightning-fast mobile experiences for your users." },
      { icon: ShieldCheck, title: "Official Validator", description: "We always recommend using the official AMP Project validators to ensure your pages are compliant." },
      { icon: Info, title: "Future Tool", description: "An automated tool that integrates with the official validator is planned for a future update." }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">AMP Validator Helper</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">This is an Informational Tool</h3>
          <p className="text-muted-foreground mt-2">
            A full AMP validator requires integration with Google's APIs. Use the guide below to learn how to validate your AMP pages correctly.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
