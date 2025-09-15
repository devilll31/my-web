
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { UploadCloud, Download, Image as ImageIcon, Eye } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { Slider } from '@/components/ui/slider';

export default function BlurImageTool() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [blurAmount, setBlurAmount] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  useEffect(() => {
    if (!sourceImage || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');
    img.src = sourceImage;
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if(ctx) {
            ctx.filter = `blur(${blurAmount}px)`;
            ctx.drawImage(img, 0, 0);
        }
    }
  }, [sourceImage, blurAmount]);
  
  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'blurred-image.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
      toast({title: "Image downloaded!"});
    }
  };

  const guideProps = {
    title: "How to Use the Image Blur Tool",
    steps: [
      { title: "Upload an Image", description: "Select or drag and drop your image file into the upload area." },
      { title: "Adjust Blur", description: "Use the slider to set your desired level of blur. The preview will update instantly." },
      { title: "Download Image", description: "Click the download button to save your new blurred image." }
    ],
    features: [
      { icon: Eye, title: "Artistic Effects", description: "Create artistic blur effects for backgrounds or to add focus to your photos." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Image Blur Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!sourceImage ? (
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                <UploadCloud className="w-12 h-12 text-muted-foreground mb-2" />
                <Label htmlFor="bmp-upload" className="mb-2 cursor-pointer text-primary hover:underline">Choose an image</Label>
                <Input id="bmp-upload" type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                <p className="text-sm text-muted-foreground">or drag and drop it here</p>
            </div>
          ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Original</Label>
                        <div className="mt-2 h-64 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                           <Image src={sourceImage} alt="Original Preview" width={300} height={300} className="max-w-full max-h-full object-contain" />
                        </div>
                    </div>
                     <div>
                        <Label>Blurred Preview</Label>
                        <div className="mt-2 h-64 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                           <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
                        </div>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Blur Amount: {blurAmount}px</Label>
                    <Slider value={[blurAmount]} onValueChange={(v) => setBlurAmount(v[0])} min={0} max={25} step={1} />
                </div>
                <div className="text-center">
                    <Button onClick={downloadImage}><Download className="mr-2" /> Download Blurred Image</Button>
                </div>
            </>
          )}
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}

