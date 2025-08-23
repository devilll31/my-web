import Link from 'next/link';
import { ArrowRight, Check, File, Image as ImageIcon, Wand2 } from 'lucide-react';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import ToolCard from '@/components/tool-card';
import { getTools, getAllToolsByCategories, Category } from '@/lib/tools-data';
import TypingAnimation from '@/components/typing-animation';

export default function Home() {
  const allTools = getTools();
  const categoriesWithTools = getAllToolsByCategories().slice(0, 15);

  const trendingTools = allTools.filter(t => ['pdf-to-word', 'background-remover', 'image-compressor', 'pdf-to-jpg', 'merge-pdf'].includes(t.slug));
  const popularTools = allTools.filter(t => ['image-resizer', 'word-to-pdf', 'split-pdf', 'image-to-pdf', 'unlock-pdf'].includes(t.slug));
  const featuredTools = allTools.filter(t => ['image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer'].includes(t.slug));
  
  const stats = [
    { value: 'PDF Tools', label: '15+ Tools', icon: <File className="w-5 h-5 text-blue-500" /> },
    { value: 'Image Tools', label: '20+ Tools', icon: <ImageIcon className="w-5 h-5 text-purple-500" /> },
    { value: 'AI Tools', label: '5+ Tools', icon: <Wand2 className="w-5 h-5 text-pink-500" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full pt-24 pb-16 md:pt-32 md:pb-24 bg-hero-gradient overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
                  Welcome to <span className="gradient-text">D2ools</span>
                </h1>
                <TypingAnimation text="The next level of online utility tools. Access 100+ free utilities." className="mx-auto max-w-[700px] text-muted-foreground md:text-xl" />
              </div>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {stats.map((stat) => (
                  <div key={stat.value} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg shadow-sm border">
                    {stat.icon}
                    <div>
                      <p className="font-semibold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-x-4 pt-6 animate-fade-in-up animation-delay-900">
                <Button asChild size="lg" className="rounded-full text-white btn-gradient shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/tools">Explore All Tools</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-white hover:bg-gray-100 border-2 border-border text-primary shadow-lg transition-transform transform hover:scale-105">
                  <Link href="#popular-tools">Top Tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="trending-tools" className="w-full py-12 md:py-20 lg:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center mb-10 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Trending Tools</h2>
              <span className="text-sm font-bold px-2.5 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full">HOT</span>
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">Most popular tools uploaded in real-time based on user activity.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/tools">View All Trending Tools</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="popular-tools" className="w-full py-12 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center mb-10 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Most Popular Tools</h2>
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">Tools with highest user satisfaction and engagement.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/tools">View All Popular Tools</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="featured-tools" className="w-full py-12 md:py-20 lg:py-24 bg-background">
          <div className="container px-4 md:px-6">
             <div className="flex items-center justify-center mb-10 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Featured AI Tools</h2>
              <Wand2 className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">Handpicked advanced, automated, and AI capabilities.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/tools#ai-tools">View All AI Tools</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="categories" className="w-full py-12 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center mb-4 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">15 Categories, 500+ Tools</h2>
            </div>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">From PDF manipulation to image editing, we cover a vast range of needs. All our tools are free, secure, and designed to work seamlessly in your browser.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesWithTools.map((category) => (
                 <Link href={`/tools#${category.slug}`} key={category.slug} className="group block">
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-white hover:bg-gray-100/50 transition-colors hover:border-primary/50 shadow-sm">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.tools.length} Tools</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
             <div className="text-center mt-12">
              <Button asChild size="lg" className="rounded-full text-white btn-gradient">
                <Link href="/tools">View All Categories & Tools</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
