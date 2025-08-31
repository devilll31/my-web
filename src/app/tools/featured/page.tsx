
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import { getTools } from '@/lib/tools-data';

export const metadata = {
  title: 'Top Featured Tools | D2ools',
  description: 'Explore the top 50 featured and AI-powered tools handpicked by the D2ools team.',
};

export default function FeaturedToolsPage() {
  const allTools = getTools();
  const featuredTools = allTools.filter(t => ['image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer', 'meta-description-generator', 'paraphraser', 'pdf-background-remover-ai', 'grammar-checker', 'spelling-checker', 'image-background-remover-ai', 'handwriting-ocr', 'table-ocr', 'math-ocr', 'language-detector', 'keyword-extractor', 'suggest-related-tools', 'image-watermark-remover', 'remove-image-noise', 'sharpen-image', 'image-to-text-ocr', 'pdf-to-text-ocr', 'slug-generator', 'case-converter', 'word-counter', 'character-counter', 'sentence-counter', 'reading-time-estimator', 'readability-checker', 'punctuation-fixer', 'remove-extra-spaces', 'remove-line-breaks', 'sort-lines', 'unique-lines', 'find-and-replace', 'url-extractor', 'email-extractor', 'lorem-ipsum-generator', 'hashtag-generator', 'text-diff', 'html-entities-encoder-decoder', 'base64-text-encoder-decoder', 'rot13-encoder-decoder', 'utm-builder', 'stopwords-remover', 'case-style-converter', 'diacritics-remover', 'json-escape-unescape', 'csv-escape-unescape']).slice(0, 50);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Top Featured Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our handpicked selection of the most powerful and innovative tools, including our best AI utilities.
        </p>
      </div>

      <RotatingToolCarousel tools={featuredTools} itemsPerPage={50} itemsToUpdate={8} interval={15000} tag="Featured" />
    </div>
  );
}
