
'use client';

import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileUp,
  Loader2,
  CheckCircle,
  Download,
  X as XIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast'; 
import { cn } from '@/lib/utils';
import { wordToPdf } from '@/ai/flows/word-to-pdf'; 

type Stage = 'idle' | 'processing' | 'success' | 'error';

const ACCEPTED_MIME = new Set<string>([
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const ACCEPTED_EXTS = ['.doc', '.docx'];

function isValidWordFile(file: File) {
  const name = file.name.toLowerCase();
  const hasValidExt = ACCEPTED_EXTS.some((ext) => name.endsWith(ext));
  const hasValidMime = ACCEPTED_MIME.has(file.type);
  // Some browsers may report empty type for local files; allow by extension.
  return hasValidExt || hasValidMime;
}

async function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export default function WordToPdfTool() {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const [stage, setStage] = useState<Stage>('idle');
  const [fileName, setFileName] = useState<string>('');
  const [pdfDataUri, setPdfDataUri] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const resetAll = () => {
    setStage('idle');
    setFileName('');
    setPdfDataUri('');
    setErrorMsg('');
  };

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!isValidWordFile(file)) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a .doc or .docx file.',
          variant: 'destructive',
        });
        return;
      }

      try {
        setErrorMsg('');
        setStage('processing');
        setFileName(file.name);

        const wordDataUri = await fileToDataUri(file);

        const result = await wordToPdf({ wordDataUri });

        if (!result?.pdfDataUri) {
          throw new Error('Empty response from converter.');
        }

        setPdfDataUri(result.pdfDataUri);
        setStage('success');
      } catch (err: any) {
        setErrorMsg(err?.message || 'Unknown error occurred.');
        setStage('error');
      }
    },
    [toast]
  );

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;
    handleFiles(dt.files);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const onChooseClick = () => {
    inputRef.current?.click();
  };

  const newPdfName = fileName
    ? fileName.replace(/\.(doc|docx)$/i, '') + '.pdf'
    : 'converted.pdf';

  return (
    <Card className="border border-primary/30">
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                className={cn(
                  'rounded-2xl border-2 border-dashed border-primary/50',
                  'p-10 flex flex-col items-center justify-center text-center gap-4',
                  'bg-muted/40'
                )}
              >
                <FileUp className="h-12 w-12 opacity-70" />
                <div className="space-y-2">
                  <Button
                    onClick={onChooseClick}
                    className="btn-gradient px-6"
                    aria-label="Choose Word file"
                  >
                    Choose Word file
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    or drop Word file here
                  </div>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <FeatureItem text="Perfect formatting preservation" />
                <FeatureItem text="Secure and private processing" />
              </div>
            </motion.div>
          )}

          {stage === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center gap-3 py-14"
            >
              <Loader2 className="h-8 w-8 animate-spin" />
              <div className="text-lg font-medium">Converting your file...</div>
              <div className="text-sm text-muted-foreground">{fileName}</div>
            </motion.div>
          )}

          {stage === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4 py-10"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
              <div className="text-xl font-semibold">Conversion complete!</div>
              <div className="text-sm text-muted-foreground">{newPdfName}</div>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={pdfDataUri}
                  download={newPdfName}
                  className="inline-flex"
                >
                  <Button className="btn-gradient">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </a>
                <Button variant="outline" onClick={resetAll}>
                  <XIcon className="mr-2 h-4 w-4" />
                  Convert Another File
                </Button>
              </div>
            </motion.div>
          )}

          {stage === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <XIcon className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Conversion Failed</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {errorMsg || 'An unexpected error occurred.'}
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" onClick={resetAll}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <div className="text-sm">{text}</div>
    </div>
  );
}
