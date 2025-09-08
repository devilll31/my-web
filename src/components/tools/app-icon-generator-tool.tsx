'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import HowToUseGuide from '../how-to-use-guide';
import { Smartphone, Image as ImageIcon } from 'lucide-react';

const AppIconPreview = ({ src, platform }: { src: string, platform: 'iOS' | 'Android' }) => {
    const isIOS = platform === 'iOS';
    const borderRadius = isIOS ? '22.5%' : '50%';
    return (
        <div className="text-center">
            <p className="font-semibold">{platform}</p>
            <div className="mx-auto mt-2 w-24 h-24 bg-gray-200" style={{ borderRadius }}>
                <Image src={src} alt={`${platform} preview`} width={96} height={96} style={{ borderRadius, objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
        </div>
    )
}

export default function AppIconGeneratorTool() {
    const [sourceImage, setSourceImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSourceImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const guideProps = {
        title: "How to Use the App Icon Previewer",
        steps: [
            { title: "Upload Your Image", description: "Choose a square image you'd like to use for your app icon." },
            { title: "Preview for iOS & Android", description: "The tool instantly shows you how your icon will look with the standard iOS and Android masks (rounded square and circle)." },
            { title: "Refine Your Design", description: "Use this preview as a guide to refine your source image. This tool is for visualization only and does not generate asset bundles." }
        ],
        features: [
            { icon: Smartphone, title: "Platform Preview", description: "See how your design adapts to the different icon shapes required by iOS and Android." },
            { icon: ImageIcon, title: "Visual Feedback", description: "A quick and easy way to check your app icon design without needing to build it into an app first." },
        ]
    };

    return (
        <>
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader><CardTitle className="text-center">App Icon Previewer</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <Input type="file" onChange={handleImageUpload} accept="image/*" />
                {sourceImage ? (
                     <div className="grid grid-cols-2 gap-4 pt-4">
                        <AppIconPreview src={sourceImage} platform="iOS" />
                        <AppIconPreview src={sourceImage} platform="Android" />
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground p-8">Upload an image to see the previews.</div>
                )}
            </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">Note: This is a preview tool. It does not generate the full set of required app icon files.</p>
        <HowToUseGuide {...guideProps} />
        </>
    );
}
