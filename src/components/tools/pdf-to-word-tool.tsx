
'use client';

import { useState, useRef } from 'react';
import { FileUp, Download, X, Loader2, CheckCircle, ArrowLeft, Share2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { pdfToWord } from '@/ai/flows/pdf-to-word';
import { AnimatePresence, motion } from 'framer-motion';

export default function PdfToWordTool() {
  const [originalFile, setOriginalFile] = useState<{ name: string; dataUri: string } | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
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
    if (file.type !== 'application/pdf') {
      toast({ title: 'Invalid File Type', description: 'Please upload a PDF file.', variant: 'destructive' });
      return;
    }
    setError(null);
    setConvertedFile(null);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      setOriginalFile({ name: file.name, dataUri });
      try {
        const result = await pdfToWord({ pdfDataUri: dataUri });
        if (!result || !result.wordDataUri) {
          throw new Error('Conversion failed: The service did not return a file.');
        }
        setConvertedFile(result.wordDataUri);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        toast({ title: 'Error Converting File', description: errorMessage, variant: 'destructive' });
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
    setOriginalFile(null);
    setConvertedFile(null);
    setError(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = () => {
    if (convertedFile && originalFile) {
      const link = document.createElement('a');
      link.href = convertedFile;
      const originalName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.'));
      link.download = `${originalName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (convertedFile && originalFile) {
      try {
        // Convert data URI to Blob
        const parts = convertedFile.split(',');
        const mimeType = parts[0].match(/:(.*?);/)?.[1];
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mimeType });
        
        const originalName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.'));
        const file = new File([blob], `${originalName}.docx`, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Converted Word File',
            text: `Here is the converted file: ${file.name}`,
            files: [file],
          });
        } else {
          toast({ title: 'Sharing Not Supported', description: 'Your browser does not support sharing files.' });
        }
      } catch (e) {
        toast({ title: 'Sharing Failed', description: 'Could not share the file.', variant: 'destructive' });
      }
    }
  };


  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!originalFile ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div
              className="relative w-full border-2 border-dashed border-primary/50 rounded-2xl p-12 text-center bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center justify-center text-primary">
                <FileUp className="h-16 w-16 mb-4 text-primary/80" />
                <Button size="lg" className="btn-gradient text-white font-bold text-lg px-8 py-6">
                  Choose PDF file
                </Button>
                <p className="mt-4 text-muted-foreground">or drop PDF here</p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="application/pdf"
            />
             <div className="mt-8 text-center">
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Convert your PDF files to editable Word documents online for free. Our tool requires no sign-up and adds no watermarks.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Convert PDFs to Word documents quickly and easily</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Accessible on Mac, Windows, and mobile</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Secure and private processing</span>
                    </div>
                </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <p className="text-xl font-semibold">Converting your file...</p>
                <p className="text-muted-foreground mt-1">{originalFile.name}</p>
              </div>
            )}

            {!isLoading && convertedFile && (
               <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-2xl font-bold">Conversion complete!</p>
                  <p className="text-muted-foreground mt-1">Your file is ready to download.</p>
                  <p className="font-semibold mt-4 text-lg bg-primary/10 text-primary px-4 py-2 rounded-lg">{originalFile.name.replace(/\.pdf$/i, '.docx')}</p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button size="lg" onClick={handleReset} variant="outline">
                        <ArrowLeft />
                        Back
                     </Button>
                     <Button size="lg" onClick={handleShare} variant="outline">
                        <Share2 />
                        Share
                     </Button>
                     <Button size="lg" onClick={handleDownload} className="btn-gradient text-white">
                        <Download />
                        Download DOCX
                     </Button>
                      <Button size="lg" onClick={handleReset} variant="outline">
                        <X />
                        Convert Another File
                    </Button>
                    <Button size="lg" onClick={handleReset} variant="destructive">
                        <Trash2 />
                        Delete
                    </Button>
                  </div>
              </div>
            )}
            
            {!isLoading && error && (
              <div className="flex flex-col items-center justify-center p-12 bg-destructive/10 rounded-2xl border border-destructive/50 text-destructive">
                <X className="h-16 w-16 mb-4" />
                <p className="text-2xl font-bold">Conversion Failed</p>
                <p className="mt-1 max-w-md">{error}</p>
                 <Button size="lg" onClick={handleReset} variant="destructive" className="mt-8">
                    Try Again
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
