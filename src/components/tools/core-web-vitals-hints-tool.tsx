'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import HowToUseGuide from "../how-to-use-guide";
import { Gauge, PictureInPicture, Accessibility, Zap } from "lucide-react";

const vitalChecks = {
  "Largest Contentful Paint (LCP)": [
    { id: 'lcp1', text: 'Optimize images (compress, use modern formats like WebP).' },
    { id: 'lcp2', text: 'Preload the LCP image resource with `<link rel="preload">`.' },
    { id: 'lcp3', text: 'Remove unused CSS and JavaScript to reduce render-blocking resources.' },
    { id: 'lcp4', text: 'Use a Content Delivery Network (CDN) to serve assets faster.' },
  ],
  "Cumulative Layout Shift (CLS)": [
    { id: 'cls1', text: 'Include `width` and `height` attributes on all images and video elements.' },
    { id: 'cls2', text: 'Reserve space for ads and embeds with CSS `aspect-ratio` or min-height.' },
    { id: 'cls3', text: 'Avoid inserting content above existing content, except in response to user interaction.' },
    { id: 'cls4' , text: 'Ensure web fonts are loaded efficiently to prevent flashes of unstyled text (FOUT/FOIT).'},
  ],
  "First Input Delay (FID) / Interaction to Next Paint (INP)": [
    { id: 'fid1', text: 'Break up long-running JavaScript tasks into smaller chunks.' },
    { id: 'fid2', text: 'Use web workers to run JavaScript on a background thread.' },
    { id: 'fid3', text: 'Minimize main-thread work (script parsing, compilation, and execution).' },
    { id: 'fid4', text: 'Defer loading of non-critical JavaScript.' },
  ]
}

export default function CoreWebvitalsHintsTool() {
  const guideProps = {
    title: "How to Use the Core Web Vitals Helper",
    steps: [
      { title: "Review LCP Checklist", description: "Check off items to improve your Largest Contentful Paint, which measures loading performance." },
      { title: "Review CLS Checklist", description: "Address items related to Cumulative Layout Shift to improve visual stability." },
      { title: "Review FID/INP Checklist", description: "Focus on these tasks to improve your site's interactivity and responsiveness." }
    ],
    features: [
      { icon: Gauge, title: "LCP", description: "Measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds." },
      { icon: PictureInPicture, title: "CLS", description: "Measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1 or less." },
      { icon: Accessibility, title: "FID/INP", description: "Measures interactivity. Pages should have an FID of 100 milliseconds or less." },
      { icon: Zap, title: "Actionable Tips", description: "A checklist of the most common and effective ways to improve your site's Core Web Vitals scores." }
    ]
  };

  return (
    <>
      <div className="space-y-6">
        {Object.entries(vitalChecks).map(([vital, checks]) => (
          <Card key={vital}>
            <CardHeader>
              <CardTitle>{vital}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checks.map(check => (
                <div key={check.id} className="flex items-center gap-3">
                  <Checkbox id={check.id} />
                  <Label htmlFor={check.id}>{check.text}</Label>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
