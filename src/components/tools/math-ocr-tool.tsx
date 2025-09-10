
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Server, FlaskConical, Info } from "lucide-react";

export default function MathOcrTool() {
  const guideProps = {
    title: "About the Math OCR Tool",
    steps: [
      { title: "Highly Specialized AI", description: "Recognizing mathematical formulas, including symbols, fractions, and equations, requires a very specific AI model (similar to LaTeX conversion)." },
      { title: "Beyond Text Recognition", description: "This is different from standard OCR as the model needs to understand mathematical syntax and structure, not just characters." },
      { title: "Future Update", description: "This advanced tool is planned for a future update when we integrate a capable mathematical recognition model." }
    ],
    features: [
      { icon: FlaskConical, title: "Formula to Text", description: "Our goal is to allow you to convert images of equations into editable text or LaTeX." },
      { icon: Server, title: "Complex Model Needed", description: "This requires a powerful AI model that is distinct from our general text extraction services." },
      { icon: Info, title: "Stay Tuned", description: "We are exploring the right models to power this feature. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Math OCR</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a specialized AI model for recognizing mathematical notations and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}

    