import Link from 'next/link';
import { ArrowRight, Check, Star, Wand2, Users, FileText, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllToolsByCategories, Category, getTools, getCategoryBySlug } from '@/lib/tools-data';
import Slogan from '@/components/slogan';
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import HeroAnimation from '@/components/hero-animation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const allTools = getTools();
  const categoriesWithTools = getAllToolsByCategories().slice(0, 15);
  
  const stats = [
    { value: '500+ Tools', label: 'Premium Quality', icon: <Star className="w-6 h-6 text-primary" /> },
    { value: '100k+ Users', label: 'Trusted Worldwide', icon: <Users className="w-6 h-6 text-primary" /> },
    { value: '100% Free', label: 'No Limits', icon: <Zap className="w-6 h-6 text-primary" /> },
  ];

  const features = [
      { text: '100% Secure', icon: <ShieldCheck className="w-5 h-5 text-orange-400" /> },
      { text: 'Lightning Fast', icon: <Star className="w-5 h-5 text-orange-400" /> },
      { text: 'No Registration', icon: <FileText className="w-5 h-5 text-orange-400" /> },
      { text: 'Mobile Friendly', icon: <Smartphone className="w-5 h-5 text-orange-400" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full pt-28 pb-12 md:pt-32 md:pb-16 bg-hero-gradient overflow-hidden">
          <div className="container px-4 md:px-6 relative text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-6 w-full max-w-4xl">
                <HeroAnimation />
                <div className="mb-8 pb-4">
                  <Slogan 
                    text="The next level of online utility tools. Access 500+ free utilities for PDF, files, images, and more."
                    className="gradient-text"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
              {stats.map((stat) => (
                <div key={stat.value} className="p-4 rounded-full shadow-lg flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="p-2.5 bg-primary/10 rounded-full">{stat.icon}</div>
                  <div className="text-left">
                    <p className="font-semibold text-base text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-700">
                <Button asChild size="lg" className="rounded-full group btn-gradient shadow-lg">
                    <Link href="/tools"><span className="text-white group-hover:text-black transition-colors duration-300">Explore All 500+ Tools</span> <ArrowRight className="ml-2 text-white group-hover:text-black transition-colors duration-300" /></Link>
                </Button>
                <Button asChild size="lg" className="rounded-full group btn-gradient shadow-lg">
                    <Link href="/tools/top-50">
                        <Star className="mr-2 text-white group-hover:text-black transition-colors duration-300" /> 
                        <span className="text-white group-hover:text-black transition-colors duration-300">Top 50 Tools</span>
                    </Link>
                </Button>
            </div>

            <div className="mt-12 animate-fade-in-up animation-delay-900">
                <p className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Trusted by professionals worldwide</p>
                <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-8">
                    {features.map((feature) => (
                        <div key={feature.text} className="flex items-center gap-2.5 text-sm font-medium">
                            {feature.icon}
                            <span className="text-gray-600">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
        <section id="trending-tools" className="w-full py-8 md:py-12 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center mb-2 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Top 20 Trending Tools</h2>
              <span className="text-sm font-bold px-2.5 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full">HOT</span>
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">Most popular tools uploaded in real-time based on user activity.</p>
            <RotatingToolCarousel tools={allTools} itemsPerPage={20} itemsToUpdate={10} interval={10000} tag="Trending" showRank={true} />
            <div className="text-center mt-10">
              <Button asChild className="rounded-full group btn-gradient">
                <Link href="/tools/trending"><span className="text-white group-hover:text-black transition-colors duration-300">View All Trending Tools</span></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="popular-tools" className="w-full py-8 md:py-12 bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center mb-2 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Top 20 Most Popular Tools</h2>
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">Tools with highest user satisfaction and engagement.</p>
            <RotatingToolCarousel tools={allTools} itemsPerPage={20} itemsToUpdate={10} interval={10000} tag="Popular" showRank={true} />
            <div className="text-center mt-10">
               <Button asChild className="rounded-full group btn-gradient">
                <Link href="/tools/popular"><span className="text-white group-hover:text-black transition-colors duration-300">View All Popular Tools</span></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="featured-tools" className="w-full py-8 md:py-12 bg-background">
          <div className="container px-4 md:px-6">
             <div className="flex items-center justify-center mb-2 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Top 20 Featured Tools</h2>
              <Wand2 className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">Handpicked advanced, automated, and AI capabilities.</p>
            <RotatingToolCarousel tools={allTools} itemsPerPage={20} itemsToUpdate={10} interval={10000} tag="Featured" showRank={true} />
            <div className="text-center mt-10">
               <Button asChild className="rounded-full group btn-gradient">
                <Link href="/tools/featured"><span className="text-white group-hover:text-black transition-colors duration-300">View All Featured Tools</span></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="categories" className="w-full py-12 md:py-16 bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center mb-4 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">15 Categories, 500+ Tools</h2>
            </div>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">From PDF manipulation to image editing, we cover a vast range of needs. All our tools are free, secure, and designed to work seamlessly in your browser.</p>
            <Accordion type="single" collapsible className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {categoriesWithTools.map((category, categoryIndex) => {
                  const catDetails = getCategoryBySlug(category.slug);
                  if (!catDetails) return null;
                  return (
                    <AccordionItem value={category.slug} key={category.slug} className="border bg-card rounded-lg shadow-sm">
                      <AccordionTrigger className="text-lg text-left font-semibold p-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded-md" style={{ backgroundColor: `hsla(${catDetails.color}, 80%, 60%, 0.25)` }}>
                              <category.icon className="w-5 h-5" style={{ color: `hsl(${catDetails.color})` }} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.tools.length} Tools</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <ul className="space-y-2 text-sm max-h-60 overflow-y-auto">
                          {category.tools.map((tool, toolIndex) => (
                            <li key={tool.slug} className="flex items-start">
                              <span className="text-muted-foreground w-6 text-right mr-2">{toolIndex + 1}.</span>
                              <Link href={`/tools/${tool.slug}`} className="flex-1 text-muted-foreground hover:text-primary hover:underline">
                                {tool.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )})}
              </div>
            </Accordion>
             <div className="text-center mt-12">
              <Button asChild size="lg" className="rounded-full group btn-gradient">
                <Link href="/tools"><span className="text-white group-hover:text-black transition-colors duration-300">Browse All Categories</span></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
