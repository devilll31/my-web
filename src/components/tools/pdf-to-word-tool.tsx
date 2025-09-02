
'use client';

import { useState, useRef } from 'react';
import { FileText, Download, X, Loader2, CheckCircle, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { pdfToWord } from '@/ai/flows/pdf-to-word';
import { AnimatePresence, motion } from 'framer-motion';

const ConversionIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4H34L44 14V40H14V4Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M13.9999 40H44V54L34 64H14L4 54V40H13.9999Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M34 4V14H44" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M4 40V54H14" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M44 54H34V64" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M22 22H36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M22 30H36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 30L58 22L50 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 42L58 50L50 58" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


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
                <h3 className="text-2xl font-bold text-foreground">Choose a PDF file</h3>
                <p className="mt-2 text-muted-foreground">or drop it here</p>
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
              <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl shadow-lg border">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <p className="text-xl font-semibold">Converting your file...</p>
                <p className="text-muted-foreground mt-1">{originalFile.name}</p>
              </div>
            )}

            {!isLoading && convertedFile && (
               <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl shadow-lg border">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-2xl font-bold">Conversion complete!</p>
                  <p className="text-muted-foreground mt-1">Your file is ready to download.</p>
                  <p className="font-semibold mt-4 text-lg bg-primary/10 text-primary px-4 py-2 rounded-lg">{originalFile.name.replace(/\.pdf$/i, '.docx')}</p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                     <Button size="lg" onClick={handleDownload} className="btn-gradient text-white">
                        <Download className="mr-2" />
                        Download DOCX
                     </Button>
                     <Button size="lg" onClick={handleReset} variant="outline">
                        <X className="mr-2" />
                        Convert Another File
                    </Button>
                  </div>
              </div>
            )}
            
            {!isLoading && error && (
              <div className="flex flex-col items-center justify-center p-12 bg-destructive/10 rounded-2xl shadow-lg border border-destructive/50 text-destructive">
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
