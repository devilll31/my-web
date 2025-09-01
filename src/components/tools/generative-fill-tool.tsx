
'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Download, X, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { generativeFill } from '@/ai/flows/generative-fill';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GenerativeFillTool() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    setProcessedImage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      setOriginalImage(dataUri);
    };
    reader.readAsDataURL(file);
  };
  
  const handleGenerativeFill = async () => {
    if (!originalImage || !prompt) {
      toast({
        title: 'Missing Information',
        description: 'Please upload an image and enter a prompt.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await generativeFill({ photoDataUri: originalImage, prompt });
      setProcessedImage(result.filledPhotoDataUri);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error processing image',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setPrompt('');
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'generative-fill-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full">
      {!originalImage && (
        <div
          className="w-full border-2 border-dashed border-border rounded-lg p-12 text-center bg-background/50 cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">Drag & drop your photo here</h3>
          <p className="mt-1 text-sm text-muted-foreground">or</p>
          <Button className="mt-4">Choose File</Button>
          <p className="mt-2 text-xs text-muted-foreground">Your files are secure and processed by AI.</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
        </div>
      )}
      
      <AnimatePresence>
        {originalImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <h3 className="text-center font-semibold mb-2">Original Image</h3>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                  <Image src={originalImage} alt="Original" layout="fill" objectFit="contain" />
                </div>
              </div>
              <div>
                <h3 className="text-center font-semibold mb-2">Filled Image</h3>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border bg-[url('/grid.svg')]">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                      <div className="text-center text-white">
                        <p className="font-bold">Generating...</p>
                        <p className="text-sm">AI is working its magic.</p>
                         <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mx-auto mt-4"></div>
                      </div>
                    </div>
                  )}
                  {processedImage && (
                    <Image src={processedImage} alt="Processed" layout="fill" objectFit="contain" />
                  )}
                   {!isLoading && !processedImage && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                     </div>
                   )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-4 max-w-2xl mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Input 
                    id="prompt" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Add a birthday hat on the person'" 
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Describe what you want to add or change in the image.</p>
                </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={handleReset} variant="outline">
                  <X className="mr-2" />
                  Start Over
                </Button>
                <Button onClick={handleGenerativeFill} disabled={isLoading || !prompt}>
                  <Wand2 className="mr-2" />
                  {isLoading ? 'Generating...' : 'Apply Generative Fill'}
                </Button>
                <Button onClick={handleDownload} disabled={!processedImage || isLoading}>
                  <Download className="mr-2" />
                  Download Image
                </Button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-destructive text-center mt-4">{error}</p>
      )}
    </div>
  );
}
