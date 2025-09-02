
import { getToolBySlug, getTools, getToolsByCategory, getToolsByOtherCategories } from '@/lib/tools-data';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import ImageBackgroundRemoverTool from '@/components/tools/image-background-remover-tool';
import ImageUpscalerTool from '@/components/tools/image-upscaler-tool';
import FaceRetouchTool from '@/components/tools/face-retouch-tool';
import GenerativeFillTool from '@/components/tools/generative-fill-tool';
import ImageCompressorTool from '@/components/tools/image-compressor-tool';
import PdfToWordTool from '@/components/tools/pdf-to-word-tool';
import WordToPdfTool from '@/components/tools/word-to-pdf-tool';
import PdfToExcelTool from '@/components/tools/pdf-to-excel-tool';
import ExcelToPdfTool from '@/components/tools/excel-to-pdf-tool';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const tools = getTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return {
      title: 'Tool Not Found'
    }
  }

  return {
    title: `${tool.name} | D2ools`,
    description: tool.description,
  }
}

const ToolComponent = ({ slug }: { slug: string }) => {
  switch (slug) {
    case 'image-background-remover-ai':
      return <ImageBackgroundRemoverTool />;
    case 'image-upscaler-ai':
      return <ImageUpscalerTool />;
    case 'face-retouch-ai':
      return <FaceRetouchTool />;
    case 'generative-fill-ai':
      return <GenerativeFillTool />;
    case 'image-compressor':
        return <ImageCompressorTool />;
    case 'pdf-to-word':
      return <PdfToWordTool />;
    case 'word-to-pdf':
      return <WordToPdfTool />;
    case 'pdf-to-excel':
      return <PdfToExcelTool />;
    case 'excel-to-pdf':
      return <ExcelToPdfTool />;
    // Other tools will be added here
    default:
      return (
        <div className="w-full border-2 border-dashed border-border rounded-lg p-12 text-center bg-background/50">
          <h3 className="text-lg font-medium text-foreground">Tool interface coming soon!</h3>
          <p className="mt-1 text-sm text-muted-foreground">This tool is under construction.</p>
        </div>
      );
  }
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    notFound();
  }

  const relatedTools = getToolsByCategory(tool.category).filter(t => t.slug !== tool.slug);
  const suggestedTools = getToolsByOtherCategories(tool.category);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">{tool.name}</CardTitle>
              <CardDescription className="text-lg">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading tool...</div>}>
                <ToolComponent slug={params.slug} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>How to use {tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Upload your file using the panel.</li>
                        <li>Adjust settings if available.</li>
                        <li>Click the process button.</li>
                        <li>Download your resulting file.</li>
                    </ol>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Why use our tool?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ Free to use, no account needed.</p>
                    <p>✓ Fast and reliable processing.</p>
                    <p>✓ Secure and private.</p>
                </CardContent>
            </Card>
        </div>
      </div>
      
      {relatedTools.length > 0 && (
        <div className="mt-16">
           <div className="bg-secondary/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 font-headline">
              Related Tools
            </h2>
            <RotatingToolCarousel tools={relatedTools} itemsPerPage={10} itemsToUpdate={10} interval={10000}/>
          </div>
        </div>
      )}

      {suggestedTools.length > 0 && (
        <div className="mt-16">
          <div className="bg-secondary/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 font-headline">
              Suggested Tools
            </h2>
            <RotatingToolCarousel tools={suggestedTools} itemsPerPage={10} itemsToUpdate={10} interval={10000}/>
          </div>
        </div>
      )}
    </div>
  );
}
