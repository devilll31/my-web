'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function WebfontConverterTool() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Webfont Converter</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold">Tool Under Development</h3>
        <p className="text-muted-foreground mt-2">
          Converting font files (like TTF, OTF, WOFF) requires complex, server-side processing that is beyond the scope of this client-side application.
        </p>
        <p className="text-muted-foreground mt-2">
          This feature is planned for a future update when server-side capabilities are added.
        </p>
      </CardContent>
    </Card>
  );
}
