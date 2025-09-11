'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import HowToUseGuide from "../how-to-use-guide";
import { Image, Accessibility, Search } from "lucide-react";

const altTextChecks = [
  { id: 'alt1', text: 'Does every `<img>` tag have an `alt` attribute?', crucial: true },
  { id: 'alt2', text: 'Is the `alt` text descriptive and concise, explaining the image content and function?', crucial: true },
  { id: 'alt3', text: 'For decorative images, is the `alt` attribute present but empty (alt="")?', crucial: false },
  { id: 'alt4', text: 'Does the alt text avoid starting with "Image of..." or "Picture of..."?', crucial: false },
  { id: 'alt5', text: 'If the image is a link, does the alt text describe the link\'s destination?', crucial: true },
  { id: 'alt6', text: 'Are important keywords included naturally, without keyword stuffing?', crucial: false },
];

export default function ImageAltAuditorTool() {
  const guideProps = {
    title: "How to Use the Image ALT Auditor Checklist",
    steps: [
      { title: "Review Your Website", description: "Manually inspect the images on your webpage." },
      { title: "Use the Checklist", description: "For each image, go through the checklist to ensure you're following best practices for ALT text." },
      { title: "Improve Accessibility & SEO", description: "Update your `alt` attributes based on the checklist to improve your site for both users and search engines." }
    ],
    features: [
      { icon: Accessibility, title: "Web Accessibility", description: "ALT text is essential for screen reader users to understand the content of images on a page." },
      { icon: Search, title: "Image SEO", description: "Descriptive ALT text helps search engines understand what your images are about, improving your chances of ranking in image searches." },
      { icon: Image, title: "Actionable Best Practices", description: "A simple checklist covering the most important rules for writing effective ALT text." }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Image ALT Text Auditor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {altTextChecks.map(check => (
                <div key={check.id} className="flex items-start gap-3 p-3 border rounded-md">
                    <Checkbox id={check.id} className="mt-1"/>
                    <Label htmlFor={check.id} className="text-sm">{check.text}</Label>
                </div>
            ))}
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
