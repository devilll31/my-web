'use client';

import { useState, useRef } from 'react';
import { FileUp, Download, X, Loader2, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { pdfToHtml } from '@/ai/flows/pdf-to-html';
import { AnimatePresence, motion } from 'framer-motion';
import HowToUseGuide from '../how-to-use-guide';

export default function PdfToHtmlTool() {
  const [originalFile, setOriginalFile] = useState<{ name: string; dataUri: string } | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
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
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
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
        const result = await pdfToHtml({ pdfDataUri: dataUri });
        const dataUriResult = 'data:text/html;base64,' + result.base64Data;
        setConvertedFile(dataUriResult);
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = () => {
    if (convertedFile && originalFile) {
      const link = document.createElement('a');
      link.href = convertedFile;
      const originalName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.'));
      link.download = `${originalName}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const guideProps = {
    title: "How to Convert PDF to HTML",
    steps: [
      { title: "Upload PDF", description: "Select or drag and drop your PDF document." },
      { title: "Automatic Conversion", description: "The tool automatically converts your PDF into a structured HTML file." },
      { title: "Download HTML", description: "Download your new HTML file, ready to be viewed in a browser or edited." }
    ],
    features: [
      { icon: FileText, title: "Web-Ready Content", description: "Convert your PDF content into a standard HTML format, making it ready for the web." }
    ]
  };

  return (
    <>
      <div className="w-full">
        <AnimatePresence mode="wait">
          {!originalFile ? (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div
                className="relative w-full border-2 border-dashed border-primary/50 rounded-2xl p-12 text-center bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex flex-col items-center justify-center text-primary">
                  <FileUp className="h-16 w-16 mb-4 text-primary/80" />
                  <Button size="lg" className="btn-gradient text-white font-bold text-lg px-8 py-6">Choose PDF file</Button>
                  <p className="mt-4 text-muted-foreground">or drop PDF here</p>
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl"><Loader2 className="h-16 w-16 animate-spin text-primary mb-4" /><p className="text-xl font-semibold">Converting...</p><p className="text-muted-foreground mt-1">{originalFile.name}</p></div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center p-12 bg-destructive/10 rounded-2xl border border-destructive/50 text-destructive"><X className="h-16 w-16 mb-4" /><p className="text-2xl font-bold">Conversion Failed</p><p className="mt-1 max-w-md">{error}</p><Button size="lg" onClick={handleReset} variant="destructive" className="mt-8">Try Again</Button></div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl"><CheckCircle className="h-16 w-16 text-green-500 mb-4" /><p className="text-2xl font-bold">Conversion Complete!</p><p className="font-semibold mt-4 text-lg bg-primary/10 text-primary px-4 py-2 rounded-lg">{originalFile.name.replace(/\.pdf$/i, '.html')}</p><div className="mt-8 flex flex-wrap justify-center gap-4"><Button size="lg" onClick={handleDownload} className="btn-gradient text-white"><Download className="mr-2" />Download HTML</Button><Button size="lg" onClick={handleReset} variant="outline"><X className="mr-2" />Convert Another</Button></div></div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
