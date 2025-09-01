
'use client';

import { useState, useRef, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, Download, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function ImageCompressorTool() {
  const [originalImage, setOriginalImage] = useState<{ src: string; size: number; name: string } | null>(null);
  const [processedImage, setProcessedImage] = useState<{ src: string; size: number; } | null>(null);
  const [quality, setQuality] = useState(80);
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
      setOriginalImage({ src: dataUri, size: file.size, name: file.name });
    };
    reader.readAsDataURL(file);
  };
  
  const handleCompress = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setProcessedImage(null);

    try {
      const image = document.createElement('img');
      image.src = originalImage.src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }
        ctx.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            throw new Error('Failed to create blob from canvas');
          }
          const compressedSrc = URL.createObjectURL(blob);
          setProcessedImage({ src: compressedSrc, size: blob.size });
          setIsLoading(false);
        }, 'image/jpeg', quality / 100);
      };
      image.onerror = () => {
        throw new Error('Failed to load image for compression');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error Compressing Image',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [originalImage, quality, toast]);
  
  // Automatically compress when image or quality changes
  useEffect(() => {
    if (originalImage) {
      handleCompress();
    }
  }, [originalImage, quality, handleCompress]);


  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setIsLoading(false);
    setQuality(80);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage.src;
      const originalName = originalImage?.name || 'compressed-image';
      const extensionIndex = originalName.lastIndexOf('.');
      const nameWithoutExt = extensionIndex > -1 ? originalName.substring(0, extensionIndex) : originalName;
      link.download = `${nameWithoutExt}-compressed.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionPercentage = originalImage && processedImage ? Math.round(((originalImage.size - processedImage.size) / originalImage.size) * 100) : 0;

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
          <h3 className="mt-4 text-lg font-medium text-foreground">Drag & drop your image here</h3>
          <p className="mt-1 text-sm text-muted-foreground">or</p>
          <Button className="mt-4">Choose File</Button>
          <p className="mt-2 text-xs text-muted-foreground">Your files are secure and processed locally in your browser.</p>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
          >
            <div>
              <h3 className="text-center font-semibold mb-2">Original Image</h3>
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                <Image src={originalImage.src} alt="Original" layout="fill" objectFit="contain" />
              </div>
              <div className="text-center text-sm font-medium mt-2">{formatFileSize(originalImage.size)}</div>
            </div>
            <div>
              <h3 className="text-center font-semibold mb-2">Compressed Image</h3>
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border bg-muted/30">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-center text-white">
                      <p className="font-bold">Compressing...</p>
                       <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mx-auto mt-4"></div>
                    </div>
                  </div>
                )}
                {processedImage && (
                  <Image src={processedImage.src} alt="Processed" layout="fill" objectFit="contain" />
                )}
                 {!isLoading && !processedImage && (
                   <div className="absolute inset-0 flex items-center justify-center">
                     <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                   </div>
                 )}
              </div>
              <div className="text-center text-sm font-medium mt-2">{processedImage ? formatFileSize(processedImage.size) : '-'}</div>
            </div>

            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="quality" className="flex items-center gap-2 mb-2">
                                    <Settings className="w-4 h-4" />
                                    <span>Compression Quality ({quality}%)</span>
                                </Label>
                                <Slider
                                    id="quality"
                                    min={1}
                                    max={100}
                                    step={1}
                                    value={[quality]}
                                    onValueChange={(value) => setQuality(value[0])}
                                    disabled={isLoading}
                                />
                            </div>
                            {processedImage && (
                                <div className="text-center font-bold text-lg text-green-600">
                                    {`Compressed by ${compressionPercentage}%`}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={handleReset} variant="outline">
                  <X className="mr-2" />
                  Start Over
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
