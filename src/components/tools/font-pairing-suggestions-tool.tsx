'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import HowToUseGuide from '../how-to-use-guide';
import { Type, Link as LinkIcon, RefreshCw } from 'lucide-react';

const fontPairings = [
    { headline: 'Playfair Display', body: 'Source Sans Pro', link: 'https://fonts.google.com/specimen/Playfair+Display' },
    { headline: 'Montserrat', body: 'Merriweather', link: 'https://fonts.google.com/specimen/Montserrat' },
    { headline: 'Raleway', body: 'Lato', link: 'https://fonts.google.com/specimen/Raleway' },
    { headline: 'Oswald', body: 'Roboto', link: 'https://fonts.google.com/specimen/Oswald' },
    { headline: 'Poppins', body: 'Open Sans', link: 'https://fonts.google.com/specimen/Poppins' },
];

export default function FontPairingSuggestionsTool() {
  const [currentPairing, setCurrentPairing] = useState(fontPairings[0]);

  const showNextPairing = () => {
    const currentIndex = fontPairings.findIndex(p => p.headline === currentPairing.headline);
    const nextIndex = (currentIndex + 1) % fontPairings.length;
    setCurrentPairing(fontPairings[nextIndex]);
  };
  
  const guideProps = {
      title: "How to Use the Font Pairing Tool",
      steps: [
          { title: "View Suggestion", description: "The tool presents a professionally curated headline and body font pairing." },
          { title: "Get New Ideas", description: "Click 'Show Next Pairing' to cycle through different combinations for inspiration." },
          { title: "Find on Google Fonts", description: "Use the link to go directly to the Google Fonts page for the headline font to download or embed it." }
      ],
      features: [
          { icon: Type, title: "Curated Pairs", description: "Provides a set of well-regarded font combinations to ensure typographic harmony in your designs." },
          { icon: RefreshCw, title: "Inspiration Engine", description: "A quick and easy way to discover new font pairings you might not have considered." },
          { icon: LinkIcon, title: "Direct Links", description: "Conveniently links to Google Fonts so you can easily access and use the suggested fonts in your projects." }
      ]
  };

  return (
    <>
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Font Pairing Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="p-8 border rounded-lg">
          <h1 style={{ fontFamily: `'${currentPairing.headline}', serif` }} className="text-4xl mb-4">
            Headline: {currentPairing.headline}
          </h1>
          <p style={{ fontFamily: `'${currentPairing.body}', sans-serif` }} className="text-lg">
            Body: {currentPairing.body}. This is some sample text to show how the body font looks. It should be clear, legible, and complement the headline font.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
            <Button onClick={showNextPairing}>Show Next Pairing</Button>
            <Button variant="link" asChild>
                <a href={currentPairing.link} target="_blank" rel="noopener noreferrer">Get {currentPairing.headline} on Google Fonts</a>
            </Button>
        </div>
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
