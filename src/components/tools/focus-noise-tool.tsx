
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const noisePrompts = [
  { name: 'Rainy Day', prompt: "Imagine a gentle rain tapping against your window. You're cozy inside, focused on your work. The rhythmic sound creates a perfect, calming backdrop, washing away distractions." },
  { name: 'Coffee Shop', prompt: "You're in a bustling coffee shop. The low hum of conversations, the clinking of cups, and the gentle hiss of the espresso machine create a vibrant, energetic atmosphere that keeps you alert and productive." },
  { name: 'Library', prompt: "Picture yourself in a grand, quiet library. You hear the soft rustle of turning pages, the distant cough, and the gentle creak of wooden chairs. This scholarly silence helps you concentrate deeply." },
  { name: 'Campfire', prompt: "Imagine sitting by a crackling campfire at night. The sound of the fire, the chirping of crickets, and the vast, quiet wilderness around you create a primal sense of peace and focus." }
];

export default function FocusNoiseTool() {
  const [activePrompt, setActivePrompt] = useState(noisePrompts[0]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Focus Noise Prompts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {noisePrompts.map(prompt => (
                <Button 
                    key={prompt.name}
                    variant={activePrompt.name === prompt.name ? 'default' : 'outline'}
                    onClick={() => setActivePrompt(prompt)}
                >
                    {prompt.name}
                </Button>
            ))}
        </div>
        <div className="p-6 bg-secondary/50 rounded-lg min-h-[150px] flex items-center justify-center">
            <p className="text-center text-muted-foreground italic">{activePrompt.prompt}</p>
        </div>
        <p className="text-xs text-center text-muted-foreground">Read a prompt and imagine the sounds to help you focus. No actual audio is played.</p>
      </CardContent>
    </Card>
  );
}
