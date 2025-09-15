'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, FileJson, Copy } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';

export default function JsonFormatterTool() {
  const [jsonInput, setJsonInput] = useState('{"name":"John Doe","age":30,"isStudent":false,"courses":[{"name":"History","credits":3},{"name":"Math","credits":4}]}');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
      setError('');
      toast({title: 'JSON Formatted!'});
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message);
      setFormattedJson('');
      toast({title: 'Error', description: 'Invalid JSON format.', variant: 'destructive'});
    }
  };
  
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setError('');
      toast({title: 'JSON Minified!'});
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message);
      setFormattedJson('');
      toast({title: 'Error', description: 'Invalid JSON format.', variant: 'destructive'});
    }
  };

  const copyToClipboard = () => {
    if(!formattedJson) return;
    navigator.clipboard.writeText(formattedJson);
    toast({title: 'Copied to clipboard!'});
  }

  const guideProps = {
      title: "How to Use the JSON Formatter/Validator",
      steps: [
          { title: "Paste JSON", description: "Enter your JSON data into the input text area." },
          { title: "Format or Minify", description: "Click 'Format' to beautify the JSON for readability, or 'Minify' to compress it. The tool also validates the JSON structure." },
          { title: "Copy the Result", description: "Your formatted or minified JSON appears in the output box, ready to be copied." }
      ],
      features: [
          { icon: FileJson, title: "Beautify & Minify", description: "Easily switch between human-readable and compact JSON formats." },
          { icon: Bot, title: "Validate Syntax", description: "Instantly checks if your JSON is well-formed and reports any syntax errors." },
      ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">JSON Formatter, Validator & Minifier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here"
              className="min-h-[300px] font-mono"
            />
            <Textarea
              value={formattedJson}
              readOnly
              placeholder="Result will appear here"
              className="min-h-[300px] bg-secondary font-mono"
            />
          </div>
          {error && <p className="text-destructive text-center text-sm">{error}</p>}
          <div className="flex justify-center gap-2">
            <Button onClick={formatJson}>Format / Validate</Button>
            <Button onClick={minifyJson}>Minify</Button>
            <Button onClick={copyToClipboard} variant="outline"><Copy className="mr-2"/>Copy Result</Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
