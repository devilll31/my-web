'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import HowToUseGuide from '../how-to-use-guide';
import { QrCode, Printer, FileText } from 'lucide-react';

export default function PrintableQrPosterCreatorTool() {
  const [title, setTitle] = useState('Scan Me!');
  const [description, setDescription] = useState('Point your camera at the QR code to open the link.');
  const [url, setUrl] = useState('https://d2ools.com');
  const printRef = useRef<HTMLDivElement>(null);

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (printContent) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow?.document.write('<html><head><title>Print QR Poster</title>');
        printWindow?.document.write('<style>body { font-family: sans-serif; text-align: center; } .qr-code { max-width: 80%; height: auto; } h1 { font-size: 2.5rem; margin: 0.5em 0; } p { font-size: 1.2rem; color: #555; }</style>');
        printWindow?.document.write('</head><body >');
        printWindow?.document.write(printContent);
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.focus();
        printWindow?.print();
        printWindow?.close();
    }
  };
  
  const guideProps = {
    title: "How to Use the QR Poster Creator",
    steps: [
      { title: "Enter Details", description: "Add a title, description, and the URL you want the QR code to link to." },
      { title: "Preview Poster", description: "See a live preview of your printable QR code poster." },
      { title: "Print Your Poster", description: "Click the 'Print Poster' button to open your browser's print dialog and print your poster." }
    ],
    features: [
      { icon: QrCode, title: "Instant QR Generation", description: "Creates a QR code for your URL on the fly." },
      { icon: FileText, title: "Customizable Text", description: "Add a custom title and description to provide context for your QR code." },
      { icon: Printer, title: "Print-Ready", description: "Generates a simple, clean layout that is perfect for printing and displaying." }
    ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Poster Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div><Label>Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div><Label>Description</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} /></div>
            <div><Label>URL for QR Code</Label><Input value={url} onChange={e => setUrl(e.target.value)} /></div>
            <Button onClick={handlePrint} className="w-full"><Printer className="mr-2"/> Print Poster</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent>
            <div ref={printRef} className="p-4 border rounded-lg text-center">
                <h1>{title}</h1>
                <Image src={qrApiUrl} alt="Generated QR Code" width={300} height={300} className="mx-auto my-4 qr-code" data-ai-hint="QR code" />
                <p>{description}</p>
            </div>
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
