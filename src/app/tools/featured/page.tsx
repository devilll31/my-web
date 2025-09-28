
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import { getTools } from '@/lib/tools-data';

export const metadata = {
  title: 'Top Featured Tools | D2ools',
  description: 'Explore the top 50 featured and AI-powered tools handpicked by the D2ools team.',
};

export default function FeaturedToolsPage() {
  const allTools = getTools();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 gradient-text">Top Featured Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our handpicked selection of the most powerful and innovative tools, including our best AI utilities.
        </p>
      </div>

      <RotatingToolCarousel tools={allTools} itemsPerPage={50} itemsToUpdate={20} interval={10000} tag="Featured" />
    </div>
  );
}

    
