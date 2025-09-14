
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { UploadCloud, Download, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { ArrowRightLeft } from 'lucide-react';

export default function BmpToPngTool() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'image/bmp' && file.type !== 'image/x-windows-bmp') {
          toast({ title: 'Invalid File Type', description: 'Please upload a BMP image.', variant: 'destructive' });
          return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string;
        setSourceImage(imgSrc);
        convertImage(imgSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = (imgSrc: string) => {
    const canvas = canvasRef.current;
    const img = document.createElement('img');
    img.src = imgSrc;
    img.onload = () => {
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        setConvertedImage(pngUrl);
      }
    };
  };

  const downloadImage = () => {
    if (convertedImage) {
      const link = document.createElement('a');
      link.download = 'converted-image.png';
      link.href = convertedImage;
      link.click();
    }
  };

  const guideProps = {
    title: "How to Use the BMP to PNG Converter",
    steps: [
      { title: "Upload BMP Image", description: "Select or drag and drop your BMP file into the upload area." },
      { title: "Automatic Conversion", description: "The tool instantly converts your BMP image to the PNG format." },
      { title: "Download PNG", description: "Click the download button to save your new PNG image." }
    ],
    features: [
      { icon: ArrowRightLeft, title: "Lossless Conversion", description: "Convert your BMP files to the widely-supported, high-quality PNG format." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">BMP to PNG Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-2" />
            <Label htmlFor="bmp-upload" className="mb-2 cursor-pointer text-primary hover:underline">Choose a BMP file</Label>
            <Input id="bmp-upload" type="file" onChange={handleImageUpload} accept="image/bmp,image/x-windows-bmp" className="hidden" />
            <p className="text-sm text-muted-foreground">or drag and drop it here</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-center font-semibold mb-2">Original (BMP)</h3>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                {sourceImage ? <Image src={sourceImage} alt="BMP Preview" width={200} height={200} className="max-w-full max-h-full object-contain" /> : <ImageIcon className="w-16 h-16 text-muted-foreground/50"/>}
              </div>
            </div>
             <div>
              <h3 className="text-center font-semibold mb-2">Converted (PNG)</h3>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                {convertedImage ? <Image src={convertedImage} alt="PNG Preview" width={200} height={200} className="max-w-full max-h-full object-contain" /> : <ImageIcon className="w-16 h-16 text-muted-foreground/50"/>}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={downloadImage} disabled={!convertedImage}>
              <Download className="mr-2" /> Download PNG
            </Button>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
