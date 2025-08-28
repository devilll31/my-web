
import ToolCard from '@/components/tool-card';
import { getTools } from '@/lib/tools-data';

export const metadata = {
  title: 'Top 50 Featured Tools | D2ools',
  description: 'Explore the top 50 featured and AI-powered tools handpicked by the D2ools team.',
};

export default function FeaturedToolsPage() {
  const allTools = getTools();
  const featuredTools = allTools.filter(t => t.slug.includes('-ai')).slice(0, 50);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Top 50 Featured Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our handpicked selection of the most powerful and innovative tools, including our best AI utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {featuredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} tag="Featured" />
        ))}
      </div>
    </div>
  );
}

    