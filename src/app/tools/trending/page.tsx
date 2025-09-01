
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import { getTools } from '@/lib/tools-data';

export const metadata = {
  title: 'Top Trending Tools | D2ools',
  description: 'Browse the top 50 trending tools on D2ools, updated in real-time based on user activity.',
};

export default function TrendingToolsPage() {
  const allTools = getTools();
  const trendingTools = allTools.filter(t => ['pdf-to-word', 'background-remover', 'image-compressor', 'json-to-csv', 'domain-availability-checker', 'emi-calculator', 'qr-code-generator', 'image-resizer', 'word-to-pdf', 'split-pdf', 'image-to-pdf', 'unlock-pdf', 'image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer', 'csv-to-excel', 'password-generator', 'image-to-text-ocr', 'json-formatter', 'sql-formatter', 'hash-generator', 'jwt-decoder', 'regex-tester', 'diff-tool', 'url-encoder-decoder', 'unix-timestamp-converter', 'cron-expression-generator', 'url-shortener', 'http-header-viewer', 'sitemap-generator', 'robots-txt-generator', 'meta-tag-analyzer', 'word-counter', 'case-converter', 'find-and-replace', 'lorem-ipsum-generator', 'slug-generator', 'text-diff', 'merge-pdf', 'compress-pdf', 'add-page-numbers-to-pdf', 'add-watermark-to-pdf', 'unlock-pdf', 'image-cropper', 'image-rotator', 'jpg-to-png', 'png-to-jpg']).slice(0, 50);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Top Trending Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The hottest tools on D2ools right now. Here are the 50 most used tools by our community.
        </p>
      </div>

      <RotatingToolCarousel tools={trendingTools} itemsPerPage={50} itemsToUpdate={20} interval={10000} tag="Trending" />
    </div>
  );
}

    