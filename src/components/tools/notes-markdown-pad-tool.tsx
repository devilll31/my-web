
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';

const defaultText = `# My Notes

This is a simple Markdown pad. Your notes are saved locally in your browser.

- List item 1
- List item 2

**Bold text** and *italic text*.
`;

export default function NotesMarkdownPadTool() {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('d2ools-markdown-pad');
      if (savedNotes) {
        setNotes(savedNotes);
      } else {
        setNotes(defaultText);
      }
    } catch(e) {
      console.error(e);
      setNotes(defaultText);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-markdown-pad', notes);
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  return (
    <Card className="w-full mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Markdown Notes Pad</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[50vh] font-mono text-sm"
          placeholder="Start typing your notes here..."
        />
        <p className="text-xs text-center text-muted-foreground pt-4">Your notes are automatically saved in your browser.</p>
      </CardContent>
    </Card>
  );
}
