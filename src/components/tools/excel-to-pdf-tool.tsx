
'use client';

import { useState, useRef } from 'react';
import { UploadCloud, FileText, Download, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { excelToPdf } from '@/ai/flows/excel-to-pdf';
import { AnimatePresence, motion } from 'framer-motion';

export default function ExcelToPdfTool() {
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
    const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
     if (!validTypes.includes(file.type)) {
      toast({ title: 'Invalid File Type', description: 'Please upload an Excel file (.xls, .xlsx).', variant: 'destructive' });
      return;
    }
    setError(null);
    setConvertedFile(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      setOriginalFile({ name: file.name, dataUri });
      setIsLoading(true);
      try {
        const result = await excelToPdf({ excelDataUri: dataUri });
        setConvertedFile(result.pdfDataUri);
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
      link.download = `${originalName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full">
      {!originalFile && (
        <div
          className="w-full border-2 border-dashed border-border rounded-lg p-12 text-center bg-background/50 cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">Drag & drop your Excel file here</h3>
          <p className="mt-1 text-sm text-muted-foreground">or</p>
          <Button className="mt-4">Choose File</Button>
          <p className="mt-2 text-xs text-muted-foreground">Supports .xls and .xlsx files.</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
      )}
      
      <AnimatePresence>
        {originalFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
          >
            <div className="flex flex-col items-center p-4 border rounded-lg">
                <FileText className="h-16 w-16 text-green-500" />
                <p className="mt-2 text-sm font-semibold truncate" title={originalFile.name}>{originalFile.name}</p>
                <p className="text-xs text-muted-foreground">Original Excel</p>
            </div>
            
            <div className="flex justify-center">
              {isLoading ? (
                  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
              ) : (
                  <ArrowRight className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/20">
                <FileText className="h-16 w-16 text-red-500" />
                <p className="mt-2 text-sm font-semibold truncate">{convertedFile ? originalFile.name.replace(/\.xlsx?$/i, '.pdf') : '...'}</p>
                <p className="text-xs text-muted-foreground">Converted PDF</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {originalFile && (
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button onClick={handleReset} variant="outline">
            <X className="mr-2" />
            Convert Another File
          </Button>
          <Button onClick={handleDownload} disabled={!convertedFile || isLoading}>
            <Download className="mr-2" />
            Download PDF
          </Button>
        </div>
      )}

      {error && (
        <p className="text-destructive text-center mt-4">{error}</p>
      )}
    </div>
  );
}
