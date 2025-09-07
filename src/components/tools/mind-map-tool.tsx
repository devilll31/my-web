
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function MindMapTool() {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg border-border/50">
       <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Basic Mind Map</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Coming Soon!</AlertTitle>
          <AlertDescription>
            This basic mind mapping tool is currently under construction. Please check back later!
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
