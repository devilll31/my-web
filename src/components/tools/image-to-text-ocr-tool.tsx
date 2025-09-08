'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Loader2, Copy, ScanText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { imageToText } from '@/ai/flows/image-to-text-flow';
import HowToUseGuide from '../how-to-use-guide';

export default function ImageToTextOcrTool() {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
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
    setExtractedText('');
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      setImage(dataUri);
      try {
        const result = await imageToText({ photoDataUri: dataUri });
        setExtractedText(result.extractedText);
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
  
  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the Image to Text (OCR) Tool",
    steps: [
      { title: "Upload an Image", description: "Drag and drop or select an image file containing text." },
      { title: "AI-Powered OCR", description: "Our AI will process the image and extract any readable text." },
      { title: "Copy Your Text", description: "The extracted text will appear in the text box, ready for you to copy and use." }
    ],
    features: [
      { icon: ScanText, title: "Digitize Documents", description: "Quickly convert photos of documents, receipts, or notes into editable text." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div
          className="w-full aspect-video border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 relative overflow-hidden"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {!image && (
            <div className="text-center text-muted-foreground cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="mx-auto h-12 w-12" />
              <p className="mt-2">Drag & drop or click to upload</p>
            </div>
          )}
          {image && <Image src={image} alt="Uploaded" layout="fill" objectFit="contain" />}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>
        
        <div className="relative">
          <Textarea
            value={isLoading ? "Extracting text..." : (error || extractedText)}
            readOnly
            className="min-h-[250px] bg-secondary"
            placeholder="Extracted text will appear here..."
          />
          {extractedText && (
            <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyToClipboard}>
              <Copy className="w-4 h-4"/>
            </Button>
          )}
        </div>
      </div>
      {image && 
        <div className="text-center mt-4">
            <Button onClick={handleReset} variant="outline"><X className="mr-2"/>Clear and Start Over</Button>
        </div>
      }
      <HowToUseGuide {...guideProps} />
    </>
  );
}
