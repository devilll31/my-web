'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import HowToUseGuide from '../how-to-use-guide';
import { Pilcrow, Code } from 'lucide-react';

// A very basic markdown to HTML converter for preview purposes.
// For a full-featured version, a dedicated library like 'marked' or 'react-markdown' would be used.
const basicMarkdownToHtml = (text: string) => {
    let html = text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/`([^`]*)`/gim, '<code>$1</code>')
        .replace(/\n/g, '<br />';

    // Handle lists
    html = html.replace(/((<li>.*<\/li>)+)/g, '<ul>$1</ul>');
    html = html.replace(/<\/ul><br \/><ul>/g, '');
    
    return html;
};

export default function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState('# Hello, Markdown!\n\nThis is a *simple* live editor.\n\n- Write Markdown on the left\n- See the HTML preview on the right\n\n**Have fun!**');
  
  const guideProps = {
      title: "How to Use the Markdown Editor",
      steps: [
          { title: "Write Markdown", description: "Use the left panel to write text using Markdown syntax (e.g., # for headings, * for lists)." },
          { title: "Live Preview", description: "The right panel instantly renders a preview of how your Markdown will look as HTML." },
          { title: "Copy or Continue", description: "Use this as a scratchpad or to quickly check your Markdown syntax." }
      ],
      features: [
          { icon: Pilcrow, title: "Simple Formatting", description: "A quick and easy way to write and preview formatted text using the popular Markdown syntax." },
          { icon: Code, title: "Developer & Writer Tool", description: "Perfect for drafting documentation, blog posts, or notes before putting them into a CMS." },
      ]
  };

  return (
    <>
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
    <HowToUseGuide {...guideProps} />
    </>
  );
}
