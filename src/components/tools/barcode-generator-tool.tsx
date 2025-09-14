'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import Barcode from 'react-barcode';
import HowToUseGuide from '../how-to-use-guide';
import { Barcode as BarcodeIcon, Printer, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formats = ['CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 'ITF14', 'MSI', 'pharmacode'];

export default function BarcodeGeneratorTool() {
  const [value, setValue] = useState('D2ools.com');
  const [format, setFormat] = useState('CODE128');

  const handlePrint = () => {
    const svgElement = document.getElementById('barcode-svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const printWindow = window.open('', '', 'height=400,width=800');
      printWindow?.document.write('<html><head><title>Print Barcode</title></head><body>');
      printWindow?.document.write(svgData);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
      printWindow?.close();
    }
  };
  
  const guideProps = {
    title: "How to Use the Barcode Generator",
    steps: [
      { title: "Enter Data", description: "Input the text or numbers you want to encode in the barcode." },
      { title: "Select Format", description: "Choose the barcode format that suits your needs (e.g., CODE128 for general use, UPC/EAN for retail)." },
      { title: "Print or Save", description: "Use the 'Print' button to print your barcode. You can also save it as a PDF from the print dialog." }
    ],
    features: [
      { icon: FileText, title: "Multiple Formats", description: "Supports a wide range of common barcode standards for various industries." },
      { icon: Printer, title: "Print-Ready", description: "Generates a clean, scalable SVG barcode that is perfect for printing." },
    ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Barcode Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label>Data</Label>
                <Input value={value} onChange={e => setValue(e.target.value)} />
            </div>
             <div>
                <Label>Format</Label>
                <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                        {formats.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handlePrint} className="w-full"><Printer className="mr-2"/>Print Barcode</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center p-4 bg-white rounded-md">
            {value ? <Barcode id="barcode-svg" value={value} format={format} /> : <p className="text-muted-foreground">Enter data to see barcode</p>}
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
