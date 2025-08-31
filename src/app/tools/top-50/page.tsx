
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import { getTop50Tools } from '@/lib/tools-data';

export const metadata = {
  title: 'Top 50 Most Popular Tools | D2ools',
  description: 'Discover the top 50 most popular and highest-rated tools on D2ools, loved by our community.',
};

export default function Top50ToolsPage() {
  const top50Tools = getTop50Tools();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Top 50 Most Popular Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          The community's favorite tools. Explore the 50 most popular utilities on D2ools, ranked by usage.
        </p>
      </div>
      
      <RotatingToolCarousel tools={top50Tools} itemsPerPage={50} itemsToUpdate={10} interval={10000} tag="Popular" showRank={true} />
    </div>
  );
}
