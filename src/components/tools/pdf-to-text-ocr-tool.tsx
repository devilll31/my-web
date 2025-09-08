'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Loader2, Copy, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { pdfToText } from '@/ai/flows/pdf-to-text-flow';
import HowToUseGuide from '../how-to-use-guide';

export default function PdfToTextOcrTool() {
  const [fileName, setFileName] = useState<string | null>(null);
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
    if (file.type !== 'application/pdf') {
      toast({ title: 'Invalid File Type', description: 'Please upload a PDF file.', variant: 'destructive' });
      return;
    }
    
    setError(null);
    setExtractedText('');
    setIsLoading(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      try {
        const result = await pdfToText({ pdfDataUri: dataUri });
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
    setFileName(null);
    setExtractedText('');
    setError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const guideProps = {
    title: "How to Use the PDF to Text (OCR) Tool",
    steps: [
      { title: "Upload a PDF", description: "Drag and drop or select a PDF file, including scanned documents." },
      { title: "AI-Powered OCR", description: "Our AI will process the entire PDF and extract all readable text." },
      { title: "Copy Your Text", description: "The extracted text will appear in the text box, ready for you to copy and use." }
    ],
    features: [
      { icon: FileText, title: "Make PDFs Searchable", description: "Convert non-searchable, scanned PDFs into fully editable and searchable text documents." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div
          className="w-full h-full min-h-[250px] border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 relative overflow-hidden p-4"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {!fileName && (
            <div className="text-center text-muted-foreground cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="mx-auto h-12 w-12" />
              <p className="mt-2">Drag & drop or click to upload PDF</p>
            </div>
          )}
          {fileName && (
            <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-primary" />
                <p className="mt-2 font-semibold">{fileName}</p>
                <Button onClick={handleReset} variant="link" className="mt-2">Choose a different file</Button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
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
      <HowToUseGuide {...guideProps} />
    </>
  );
}
