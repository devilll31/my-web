'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import Image from 'next/image';
import HowToUseGuide from '../how-to-use-guide';
import { AspectRatio, Crop, Share2 } from 'lucide-react';

const bannerSizes = {
  'facebook': { width: 820, height: 312, name: 'Facebook Cover' },
  'twitter': { width: 1500, height: 500, name: 'Twitter Header' },
  'linkedin': { width: 1128, height: 191, name: 'LinkedIn Banner' },
  'youtube': { width: 2560, height: 1440, name: 'YouTube Channel Art' },
};

export default function SocialMediaBannerResizerTool() {
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [platform, setPlatform] = useState<keyof typeof bannerSizes>('twitter');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setSourceImage(event.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const downloadResizedImage = () => {
        const canvas = canvasRef.current;
        const img = document.createElement('img');
        img.src = sourceImage!;
        img.onload = () => {
            if (canvas) {
                const { width, height } = bannerSizes[platform];
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                // Simple center crop logic
                const imgAspectRatio = img.width / img.height;
                const canvasAspectRatio = width / height;
                let sx, sy, sWidth, sHeight;
                if (imgAspectRatio > canvasAspectRatio) {
                    sHeight = img.height;
                    sWidth = sHeight * canvasAspectRatio;
                    sx = (img.width - sWidth) / 2;
                    sy = 0;
                } else {
                    sWidth = img.width;
                    sHeight = sWidth / canvasAspectRatio;
                    sy = (img.height - sHeight) / 2;
                    sx = 0;
                }
                ctx?.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);

                const link = document.createElement('a');
                link.download = `${platform}-banner.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        }
    }
    
     const guideProps = {
        title: "How to Use the Social Media Banner Resizer",
        steps: [
            { title: "Upload an Image", description: "Choose a high-quality image that you want to use as a banner." },
            { title: "Select a Platform", description: "Choose the social media platform you're creating a banner for from the dropdown." },
            { title: "Download Your Banner", description: "Click the download button to get your image, automatically resized and center-cropped for the selected platform." }
        ],
        features: [
            { icon: Share2, title: "Preset Sizes", description: "Includes standard banner dimensions for popular platforms like Facebook, Twitter, and LinkedIn." },
            { icon: Crop, title: "Automatic Cropping", description: "Intelligently center-crops your image to fit the required aspect ratio, saving you time." },
            { icon: AspectRatio, title: "Perfect Fit", description: "A quick and easy way to ensure your social media profiles look professional." }
        ]
    };

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
                <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div><Label>1. Upload Image</Label><Input type="file" onChange={handleImageUpload} accept="image/*"/></div>
                    <div>
                        <Label>2. Select Platform</Label>
                        <Select value={platform} onValueChange={(v) => setPlatform(v as keyof typeof bannerSizes)}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                {Object.entries(bannerSizes).map(([key, { name }]) => (
                                    <SelectItem key={key} value={key}>{name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={downloadResizedImage} disabled={!sourceImage} className="w-full">
                        <Download className="mr-2"/> Download Banner
                    </Button>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                 <CardHeader><CardTitle>Preview ({bannerSizes[platform].name})</CardTitle></CardHeader>
                 <CardContent>
                     <div className="p-4 border rounded-lg bg-muted flex items-center justify-center" style={{aspectRatio: `${bannerSizes[platform].width}/${bannerSizes[platform].height}`}}>
                        {sourceImage ? (
                            <Image src={sourceImage} alt="Preview" layout="fill" style={{objectFit: 'cover'}}/>
                        ) : (
                            <span>Upload an image to see a preview</span>
                        )}
                     </div>
                 </CardContent>
            </Card>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <HowToUseGuide {...guideProps} />
        </>
    );
}
