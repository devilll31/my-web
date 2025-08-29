
import ToolCard from '@/components/tool-card';
import { getTools } from '@/lib/tools-data';

export const metadata = {
  title: 'Top Trending Tools | D2ools',
  description: 'Browse the top 50 trending tools on D2ools, updated in real-time based on user activity.',
};

export default function TrendingToolsPage() {
  const allTools = getTools();
  const trendingTools = allTools.filter(t => ['pdf-to-word', 'background-remover', 'image-compressor', 'pdf-to-jpg', 'merge-pdf', 'image-resizer', 'word-to-pdf', 'split-pdf', 'image-to-pdf', 'unlock-pdf', 'image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer', 'csv-to-excel', 'json-to-csv', 'qr-code-generator', 'password-generator', 'image-to-text-ocr' ]).slice(0, 50);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Top Trending Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The hottest tools on D2ools right now. Here are the 50 most used tools by our community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {trendingTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} tag="Trending" />
        ))}
      </div>
    </div>
  );
}
