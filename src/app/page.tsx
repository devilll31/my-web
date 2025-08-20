import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TypingAnimation from '@/components/typing-animation';
import ToolCard from '@/components/tool-card';
import { getTools } from '@/lib/tools-data';

export default function Home() {
  const allTools = getTools();

  const trendingTools = allTools.slice(0, 20);
  const popularTools = allTools.slice(20, 40);
  const featuredTools = allTools.slice(40, 60);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)] dark:bg-grid-slate-700/30"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <TypingAnimation
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline"
                  text="Welcome to D2ools"
                />
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in-up animation-delay-500">
                  The next level of online utility tools. Access 500+ free utilities for PDF, files, images, and more.
                </p>
              </div>
              <div className="w-full max-w-xl space-y-2">
                 <div className="relative animate-fade-in-up animation-delay-700">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for a tool... e.g., 'PDF to Word'"
                    className="w-full pl-10 pr-4 py-3 text-lg rounded-full border-2 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-x-4 pt-4 animate-fade-in-up animation-delay-900">
                <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/tools">Explore All 500+ Tools</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-background hover:bg-accent/10 border-2 border-primary text-primary shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/tools">Top 50 Tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="trending-tools" className="w-full py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 font-headline">Top 20 Trending Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingTools.map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        <section id="popular-tools" className="w-full py-12 md:py-20 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 font-headline">Most Popular Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {popularTools.map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        <section id="featured-tools" className="w-full py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 font-headline">Featured Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredTools.map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="link" className="text-lg">
                    <Link href="/tools">
                        View All Tools
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
