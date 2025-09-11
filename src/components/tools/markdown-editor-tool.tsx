'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';

// A very basic markdown to HTML converter for preview purposes.
// For a full-featured version, a dedicated library like 'marked' or 'react-markdown' would be used.
const basicMarkdownToHtml = (text: string) => {
    return text
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/(\n<li>.*<\/li>)/gim, '<ul>$1\n</ul>')
        .replace(/<\/ul>\n<ul>/gim, '')
        .replace(/\n/g, '<br />');
};

export default function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState('# Hello, Markdown!\n\nThis is a *simple* live editor.\n\n- Write Markdown on the left\n- See the HTML preview on the right\n\n**Have fun!**');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader><CardTitle>Markdown</CardTitle></CardHeader>
        <CardContent>
          <Textarea 
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="min-h-[400px] font-mono"
            placeholder="Type your Markdown here..."
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent>
            <div 
                className="prose dark:prose-invert min-h-[400px] p-4 border rounded-md bg-secondary"
                dangerouslySetInnerHTML={{ __html: basicMarkdownToHtml(markdown) }}
            />
        </CardContent>
      </Card>
    </div>
  );
}
