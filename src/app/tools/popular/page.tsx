
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import { getTools } from '@/lib/tools-data';

export const metadata = {
  title: 'Top Most Popular Tools | D2ools',
  description: 'Discover the top 50 most popular and highest-rated tools on D2ools, loved by our community.',
};

export default function PopularToolsPage() {
  const allTools = getTools();
  const popularTools = allTools.filter(t => ['image-resizer', 'word-to-pdf', 'split-pdf', 'image-to-pdf', 'unlock-pdf', 'pdf-to-word', 'background-remover', 'image-compressor', 'pdf-to-jpg', 'merge-pdf', 'image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer', 'csv-to-json', 'xml-to-json', 'whois-lookup', 'dns-lookup', 'url-shortener', 'domain-availability-checker', 'website-speed-test', 'sitemap-generator', 'meta-tag-analyzer', 'keyword-density-checker', 'currency-converter', 'emi-calculator', 'sip-calculator', 'income-tax-calculator', 'gst-calculator', 'unit-converter', 'bmi-calculator', 'scientific-calculator', 'json-formatter', 'hash-generator', 'regex-tester', 'password-generator', 'qr-code-generator', 'pomodoro-timer', 'time-zone-converter', 'ping-test', 'port-scanner', 'ip-geolocation-lookup', 'color-picker', 'contrast-checker', 'gradient-generator', 'image-to-text-ocr', 'language-detector', 'zip-archive-creator']).slice(0, 50);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Top Most Popular Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The community's favorite tools. Explore the 50 most popular utilities on D2ools.
        </p>
      </div>

      <RotatingToolCarousel tools={popularTools} itemsPerPage={50} itemsToUpdate={8} interval={15000} tag="Popular" />
    </div>
  );
}
