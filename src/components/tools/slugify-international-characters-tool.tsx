
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";
import { Link, FileWarning, Info } from "lucide-react";

export default function SlugifyInternationalCharactersTool() {
  const guideProps = {
    title: "About Slugify International Characters",
    steps: [
      { title: "Complex Unicode Handling", description: "Converting international characters (like 'é', 'ü', 'ñ') into URL-safe slugs ('e', 'u', 'n') requires a robust library for Unicode transliteration." },
      { title: "Client-Side Limitations", description: "While basic replacements are possible, a comprehensive solution that handles all languages correctly is complex to maintain in a browser environment." },
      { title: "Future Update", description: "This tool is planned for a future update to ensure it works reliably for a wide range of international characters." }
    ],
    features: [
      { icon: Link, title: "SEO-Friendly URLs", description: "The goal of this tool is to help you create clean, readable, and SEO-friendly URLs from any title, regardless of the language." },
      { icon: FileWarning, title: "Unicode Normalization", description: "A proper implementation needs to handle various Unicode normalization forms to be accurate." },
      { icon: Info, title: "Stay Tuned", description: "We are working on a reliable implementation. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Slugify International Characters</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            This tool requires a comprehensive Unicode library to handle all character conversions correctly and is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}

    