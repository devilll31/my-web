'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { upscaleImage } from '@/ai/flows/image-upscaler';
import { AnimatePresence, motion } from 'framer-motion';

export default function ImageUpscalerTool() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
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
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      setOriginalImage(dataUri);
      setIsLoading(true);
      try {
        const result = await upscaleImage({ photoDataUri: dataUri });
        setProcessedImage(result.upscaledPhotoDataUri);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        toast({
          title: 'Error Upscaling Image',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'upscaled-image.png';
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
          <h3 className="mt-4 text-lg font-medium text-foreground">Drag & drop your image to upscale</h3>
          <p className="mt-1 text-sm text-muted-foreground">or</p>
          <Button className="mt-4">Choose File</Button>
          <p className="mt-2 text-xs text-muted-foreground">Your files are secure and processed locally.</p>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
          >
            <div>
              <h3 className="text-center font-semibold mb-2">Original Image</h3>
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                <Image src={originalImage} alt="Original" layout="fill" objectFit="contain" />
              </div>
            </div>
            <div>
              <h3 className="text-center font-semibold mb-2">Upscaled Image</h3>
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border bg-[url('/grid.svg')]">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-center text-white">
                      <p className="font-bold">Upscaling...</p>
                      <p className="text-sm">AI is enhancing your image.</p>
                       <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mx-auto mt-4"></div>
                    </div>
                  </div>
                )}
                {processedImage && (
                  <Image src={processedImage} alt="Upscaled" layout="fill" objectFit="contain" />
                )}
                 {!isLoading && !processedImage && (
                   <div className="absolute inset-0 flex items-center justify-center">
                     <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                   </div>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {originalImage && (
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button onClick={handleReset} variant="outline">
            <X className="mr-2" />
            Upload Another Image
          </Button>
          <Button onClick={handleDownload} disabled={!processedImage || isLoading}>
            <Download className="mr-2" />
            Download Upscaled Image
          </Button>
        </div>
      )}

      {error && (
        <p className="text-destructive text-center mt-4">{error}</p>
      )}
    </div>
  );
}
