'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const landmarks = [
  { id: 'banner', name: '<header>', description: 'The main header of the document, typically containing the site logo, title, and primary navigation.' },
  { id: 'navigation', name: '<nav>', description: 'Contains navigational links to major sections of the site or page.' },
  { id: 'main', name: '<main>', description: 'The main content of the document. There should only be one per page.' },
  { id: 'complementary', name: '<aside>', description: 'Content that is tangentially related to the main content, like a sidebar.' },
  { id: 'contentinfo', name: '<footer>', description: 'Contains information about the parent document, such as copyright, author, and links to related documents.' },
  { id: 'search', name: 'role="search"', description: 'A section containing search functionality for the site.' },
  { id: 'form', name: '<form>', description: 'A section containing form controls. Use an `aria-label` or `aria-labelledby` if there are multiple forms.' },
  { id: 'region', name: '<section>', description: 'A generic region. Must have an accessible name (e.g., `aria-labelledby`) to be useful.' },
];

export default function AccessibilityLandmarksCheckerTool() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Web Accessibility Landmarks Checklist</CardTitle>
        <p className="text-center text-muted-foreground">Use this checklist to ensure your web pages are structured with proper ARIA landmarks for screen readers.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {landmarks.map(landmark => (
          <div key={landmark.id} className="flex items-start gap-3 p-4 border rounded-lg">
            <Checkbox id={landmark.id} className="mt-1" />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={landmark.id} className="text-base font-semibold">{landmark.name}</Label>
                <p className="text-sm text-muted-foreground">{landmark.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
