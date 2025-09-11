'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { UploadCloud, Download, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import HowToUseGuide from '../how-to-use-guide';
import { Crop, AspectRatio } from 'lucide-react';

export default function ImageResizerTool() {
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [keepAspectRatio, setKeepAspectRatio] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.onload = () => {
                    setOriginalDimensions({ width: img.width, height: img.height });
                    setWidth(img.width);
                    setHeight(img.height);
                    setSourceImage(event.target?.result as string);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    useEffect(() => {
        if (keepAspectRatio && originalDimensions.width > 0) {
            const aspectRatio = originalDimensions.width / originalDimensions.height;
            setHeight(Math.round(width / aspectRatio));
        }
    }, [width, keepAspectRatio, originalDimensions]);

    useEffect(() => {
        if (keepAspectRatio && originalDimensions.height > 0) {
            const aspectRatio = originalDimensions.width / originalDimensions.height;
            setWidth(Math.round(height * aspectRatio));
        }
    }, [height, keepAspectRatio, originalDimensions]);

    const downloadResizedImage = () => {
        if (!sourceImage || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = sourceImage;
        img.onload = () => {
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            const link = document.createElement('a');
            link.download = 'resized-image.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    }
    
    const guideProps = {
        title: "How to Use the Image Resizer",
        steps: [
            { title: "Upload an Image", description: "Choose the image you want to resize." },
            { title: "Set New Dimensions", description: "Enter your desired width and height. Toggle 'Keep Aspect Ratio' to prevent distortion." },
            { title: "Download Your Image", description: "Click the download button to save your newly resized image." }
        ],
        features: [
            { icon: Crop, title: "Custom Dimensions", description: "Easily resize any image to the exact pixel dimensions you need." },
            { icon: AspectRatio, title: "Maintain Aspect Ratio", description: "Optionally lock the aspect ratio to scale your image without stretching or squishing it." },
        ]
    };

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle>1. Upload & Configure</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <Input type="file" onChange={handleImageUpload} accept="image/*" />
                    {sourceImage && (
                        <>
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Width</Label><Input type="number" value={width} onChange={e => setWidth(parseInt(e.target.value))} /></div>
                            <div><Label>Height</Label><Input type="number" value={height} onChange={e => setHeight(parseInt(e.target.value))} /></div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <input type="checkbox" id="aspect-ratio" checked={keepAspectRatio} onChange={e => setKeepAspectRatio(e.target.checked)} />
                           <Label htmlFor="aspect-ratio">Keep aspect ratio</Label>
                        </div>
                        <Button onClick={downloadResizedImage} className="w-full"><Download className="mr-2"/> Download Resized Image</Button>
                        </>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>2. Preview</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-center bg-muted/50 p-4 min-h-[300px]">
                    {sourceImage ? (
                        <Image src={sourceImage} alt="Preview" width={width} height={height} style={{maxWidth: '100%', maxHeight: '280px', objectFit: 'contain'}}/>
                    ) : (
                        <div className="text-center text-muted-foreground"><ImageIcon className="mx-auto w-12 h-12 mb-2"/>Upload an image to see the preview.</div>
                    )}
                </CardContent>
            </Card>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <HowToUseGuide {...guideProps} />
        </>
    );
}
