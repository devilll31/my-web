'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Code } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { ScrollArea } from '../ui/scroll-area';

export default function RegexTesterTool() {
  const [regex, setRegex] = useState('\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b');
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState('Contact us at support@example.com or for sales, reach out to sales.team@example.co.uk.');
  const [error, setError] = useState<string | null>(null);

  const matches = useMemo(() => {
    try {
      const re = new RegExp(regex, flags);
      setError(null);
      return testString.match(re) || [];
    } catch (e: any) {
      setError(e.message);
      return [];
    }
  }, [regex, flags, testString]);
  
  const guideProps = {
    title: "How to Use the Regex Tester",
    steps: [
      { title: "Enter Your Regex", description: "Type your regular expression into the pattern field. Add any flags (like 'g' for global or 'i' for case-insensitive) in the flags field." },
      { title: "Provide Test String", description: "Paste the text you want to test your regular expression against." },
      { title: "View Matches", description: "The tool will instantly run the regex and display all matching results in the 'Matches' panel." }
    ],
    features: [
      { icon: Search, title: "Live Validation", description: "Get real-time feedback on your regular expressions as you type, including error messages for invalid patterns." },
      { icon: Code, title: "Developer Utility", description: "An essential tool for developers and data analysts for building, testing, and debugging regular expressions." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Regex Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="regex-pattern">Regular Expression</Label>
              <Input 
                id="regex-pattern"
                value={regex}
                onChange={e => setRegex(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="w-24 space-y-2">
              <Label htmlFor="regex-flags">Flags</Label>
              <Input 
                id="regex-flags"
                value={flags}
                onChange={e => setFlags(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="test-string">Test String</Label>
              <Textarea
                id="test-string"
                value={testString}
                onChange={e => setTestString(e.target.value)}
                className="min-h-[200px] font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label>Matches ({matches.length})</Label>
              <ScrollArea className="h-[200px] w-full rounded-md border p-2 bg-secondary">
                {matches.length > 0 ? (
                    matches.map((match, i) => (
                        <div key={i} className="p-2 text-sm font-mono truncate hover:bg-background rounded-md">
                           {match}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-8">No matches found.</div>
                )}
            </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
