'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Loader2, Palette, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { extractPaletteFromImage } from '@/ai/flows/palette-extractor-from-image';
import HowToUseGuide from '../how-to-use-guide';
import { Check, Copy } from 'lucide-react';

export default function PaletteGeneratorFromImageTool() {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setError(null);
    setPalette([]);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      setImage(dataUri);
      try {
        const result = await extractPaletteFromImage({ photoDataUri: dataUri });
        setPalette(result.palette);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(msg);
        toast({ title: 'Error', description: msg, variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: `${text} copied to clipboard.` });
  };
  
  const guideProps = {
      title: "How to Use the Palette Generator",
      steps: [
          { title: "Upload an Image", description: "Drag and drop an image or click to select a file from your device." },
          { title: "AI Analysis", description: "Our AI will analyze the image to identify the most prominent and harmonious colors." },
          { title: "Copy Palette Colors", description: "Click on any of the generated color hex codes to copy them to your clipboard." }
      ],
      features: [
          { icon: Upload, title: "Easy Upload", description: "A simple drag-and-drop interface makes it easy to get started." },
          { icon: Palette, title: "Harmonious Palettes", description: "The AI is trained to extract color palettes that are visually appealing and work well together." },
          { icon: Copy, title: "One-Click Copy", description: "Quickly grab the hex codes you need for your design projects." }
      ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div
        className="w-full aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 relative overflow-hidden"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {!image && (
          <div className="text-center text-muted-foreground cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="mx-auto h-12 w-12" />
            <p className="mt-2">Drag & drop or click to upload an image</p>
          </div>
        )}
        {image && <Image src={image} alt="Uploaded" layout="fill" objectFit="contain" />}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Extracted Color Palette</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-primary"/>
          </div>
        ) : error ? (
            <p className="text-destructive">{error}</p>
        ) : palette.length > 0 ? (
          <div className="flex flex-col gap-2">
            <AnimatePresence>
            {palette.map((color, index) => (
              <motion.div
                key={color}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-2 rounded-lg bg-secondary cursor-pointer hover:bg-secondary/80"
                onClick={() => copyToClipboard(color)}
              >
                <div className="w-10 h-10 rounded-md" style={{ backgroundColor: color }} />
                <span className="font-mono font-semibold">{color}</span>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-muted-foreground h-48 flex items-center justify-center">Upload an image to see the generated palette.</p>
        )}
      </div>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
