'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Loader2, Download, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { businessCardOcr } from '@/ai/flows/business-card-ocr-flow';
import HowToUseGuide from '../how-to-use-guide';

export default function BusinessCardOcrTool() {
  const [image, setImage] = useState<string | null>(null);
  const [vcfData, setVcfData] = useState<string | null>(null);
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
    setVcfData(null);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      setImage(dataUri);
      try {
        const result = await businessCardOcr({ photoDataUri: dataUri });
        setVcfData(result.vcfData);
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

  const handleDownload = () => {
    if (!vcfData) return;
    const blob = new Blob([vcfData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setImage(null);
    setVcfData(null);
    setError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }
  
  const guideProps = {
    title: "How to Use the Business Card Scanner",
    steps: [
      { title: "Upload Card Image", description: "Upload a clear photo of a business card." },
      { title: "AI Extraction", description: "Our AI will scan the card and extract contact details like name, email, and phone number." },
      { title: "Download VCF", description: "Download a VCF (Virtual Contact File) that you can directly import into your phone or email client." }
    ],
    features: [
      { icon: User, title: "Automated Contact Creation", description: "Save time by automatically converting physical business cards into digital contacts." }
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
              <p className="mt-2">Drag & drop or click to upload business card</p>
            </div>
          )}
          {image && <Image src={image} alt="Uploaded Business Card" layout="fill" objectFit="contain" />}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={isLoading ? 'loading' : (vcfData ? 'success' : 'idle')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center p-6 h-full bg-secondary/30 rounded-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4"/>
                <p className="font-semibold">Extracting contact info...</p>
              </>
            ) : error ? (
                <>
                    <X className="w-12 h-12 text-destructive mb-4" />
                    <p className="font-semibold">Extraction Failed</p>
                    <p className="text-sm text-destructive">{error}</p>
                    <Button onClick={handleReset} variant="destructive" className="mt-4">Try Again</Button>
                </>
            ) : vcfData ? (
              <>
                <User className="w-12 h-12 text-green-500 mb-4" />
                <p className="font-semibold">Contact Extracted!</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleReset} variant="outline">Scan Another</Button>
                  <Button onClick={handleDownload}><Download className="mr-2"/>Download .vcf File</Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Upload an image to start</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
