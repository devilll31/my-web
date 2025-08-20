import { getToolBySlug, getTools } from '@/lib/tools-data';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import SuggestedTools from '@/components/suggested-tools';

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


export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  const allTools = getTools();

  if (!tool) {
    notFound();
  }

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
              <div className="w-full border-2 border-dashed border-border rounded-lg p-12 text-center bg-background/50">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium text-foreground">Drag & drop your files here</h3>
                <p className="mt-1 text-sm text-muted-foreground">or</p>
                <Button className="mt-4">
                  Choose Files
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                    Your files are secure and processed locally.
                </p>
              </div>
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
      <div className="mt-16">
        <SuggestedTools currentToolName={tool.name} allTools={allTools} />
      </div>
    </div>
  );
}
