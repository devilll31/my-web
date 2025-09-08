'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { UploadCloud, Download } from 'lucide-react';
import Image from 'next/image';
import HowToUseGuide from '../how-to-use-guide';
import { Image as ImageIcon, Code } from 'lucide-react';


export default function FaviconGeneratorTool() {
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSourceImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const downloadFavicon = (size: number) => {
        const canvas = canvasRef.current;
        const img = document.createElement('img');
        img.src = sourceImage!;
        img.onload = () => {
            if(canvas) {
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, size, size);
                const link = document.createElement('a');
                link.download = `favicon-${size}x${size}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        }
    }

    const guideProps = {
        title: "How to Use the Favicon Generator",
        steps: [
            { title: "Upload Your Image", description: "Choose a square image to serve as the base for your favicon." },
            { title: "Preview the Favicon", description: "See a preview of how your image will look as a small icon." },
            { title: "Download Sizes", description: "Download your favicon in various standard PNG sizes (16x16, 32x32, etc.) suitable for web use." }
        ],
        features: [
            { icon: ImageIcon, title: "Simple PNG Generation", description: "Quickly generate standard PNG favicons from any image." },
            { icon: Code, title: "Web Ready", description: "Creates favicons in the sizes most commonly used by modern browsers." },
            { icon: Download, title: "Multiple Sizes", description: "Download the favicon sizes you need with a single click." }
        ]
    };

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle>1. Upload Your Image</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <Input type="file" onChange={handleImageUpload} accept="image/*" />
                    {sourceImage && (
                        <div className="p-4 border rounded-lg">
                            <p className="text-center font-semibold mb-2">Preview</p>
                            <Image src={sourceImage} alt="Preview" width={128} height={128} className="mx-auto" />
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>2. Download Favicons</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">Click to download the generated PNG favicons.</p>
                    <Button onClick={() => downloadFavicon(16)} disabled={!sourceImage} className="w-full justify-between"><span>16x16 Favicon</span><Download/></Button>
                    <Button onClick={() => downloadFavicon(32)} disabled={!sourceImage} className="w-full justify-between"><span>32x32 Favicon</span><Download/></Button>
                    <Button onClick={() => downloadFavicon(48)} disabled={!sourceImage} className="w-full justify-between"><span>48x48 Favicon</span><Download/></Button>
                    <Button onClick={() => downloadFavicon(180)} disabled={!sourceImage} className="w-full justify-between"><span>180x180 Apple Touch Icon</span><Download/></Button>
                </CardContent>
            </Card>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <HowToUseGuide {...guideProps} />
        </>
    );
}
