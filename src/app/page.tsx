import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, CheckCircle, Clock, Search, Upload, Users, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ToolCard from '@/components/tool-card';
import { getTools } from '@/lib/tools-data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Home() {
  const allTools = getTools();

  const trendingTools = allTools.slice(0, 10);
  const popularTools = allTools.slice(10, 20);
  const featuredTools = allTools.slice(20, 30);
  const stats = [
    { value: '100+', label: 'Total Tools', icon: <Zap className="w-8 h-8" /> },
    { value: '100K+', label: 'Happy Users', icon: <Users className="w-8 h-8" /> },
    { value: '500K+', label: 'Files Processed', icon: <Upload className="w-8 h-8" /> },
    { value: '99.9%', label: 'Uptime', icon: <Clock className="w-8 h-8" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)] dark:bg-grid-slate-700/30"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">Welcome to D2ools</h1>
                <p className="mx-auto max-w-[700px] text-accent md:text-xl animate-fade-in-up animation-delay-500">
                  The next level of online utility tools. Access 100+ free utilities for PDF, files, images, and more.
                </p>
              </div>
              <div className="space-x-4 pt-4 animate-fade-in-up animation-delay-900">
                <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/tools">Explore All Tools</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-background hover:bg-accent/10 border-2 border-primary text-primary shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/tools">Top 50 Tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-20 lg:py-24 gradient-bg text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">100% Free Online Tools. No signup</h2>
            </div>
            <div className="mt-10">
              <Carousel opts={{ loop: true, align: 'start' }}>
                <CarouselContent>
                  <CarouselItem className="basis-auto">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>All Tools</span>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-auto">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>No Registration</span>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-auto">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Secure Processing</span>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-auto">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>High Quality</span>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-auto">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Fast & Easy</span>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="text-primary-foreground"/>
                <CarouselNext className="text-primary-foreground"/>
              </Carousel>
            </div>
          </div>
        </section>


        <section id="trending-tools" className="w-full py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-2 font-headline">Top 10 Trending Tools</h2>
            <p className="text-center text-muted-foreground mb-10">Most popular tools uploaded in real-time based on user activity.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        <section id="popular-tools" className="w-full py-12 md:py-20 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-2 font-headline">Most Popular Tools</h2>
             <p className="text-center text-muted-foreground mb-10">Tools with highest user satisfaction and engagement.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        <section id="featured-tools" className="w-full py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-2 font-headline">Featured Tools</h2>
             <p className="text-center text-muted-foreground mb-10">Handpicked advanced, automated, and AI capabilities.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredTools.map((tool) => (
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
        
        <section className="w-full py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center text-primary mb-2">{stat.icon}</div>
                  <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 lg:py-24 gradient-bg text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to boost your productivity?</h2>
                <p className="max-w-2xl mx-auto">Join thousands of users who trust D2ools for their daily tasks. All tools are free, secure and require no registration.</p>
                <div className="flex justify-center gap-4">
                  <Button asChild size="lg" variant="secondary" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Link href="/tools">Browse All 100+ Tools</Link>
                  </Button>
                   <Button asChild size="lg" variant="outline" className="rounded-full text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Link href="/blog">Read Our Guides</Link>
                  </Button>
                </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
