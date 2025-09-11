'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Type, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DiacriticsRemoverTool() {
  const [text, setText] = useState('déjà vu, jalapeño, crème brûlée, façade');
  const { toast } = useToast();

  const removeDiacritics = () => {
    // Unicode normalization to separate base characters from combining marks
    const newText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setText(newText);
    toast({ title: 'Accents Removed!', description: 'All diacritical marks have been stripped from the text.' });
  };
  
  const guideProps = {
    title: "How to Use the Accent/Diacritics Remover",
    steps: [
      { title: "Enter Text", description: "Paste text containing accented characters (like é, ü, ñ) into the text area." },
      { title: "Click Remove", description: "Click the 'Remove Accents' button to convert all accented characters to their basic Latin equivalents." },
      { title: "Use Clean Text", description: "Your text is now simplified and can be used where special characters are not supported." }
    ],
    features: [
      { icon: Type, title: "Normalize Text", description: "A simple way to clean up text for systems that do not support diacritics or for creating URL slugs and identifiers." },
      { icon: Globe, title: "International Support", description: "Uses Unicode normalization to handle a wide range of accented characters from various languages." },
    ]
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Accent/Diacritics Remover</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px]"
            placeholder="Input text with accents..."
          />
          <div className="text-center">
            <Button onClick={removeDiacritics}><Wand2 className="mr-2"/> Remove Accents</Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
