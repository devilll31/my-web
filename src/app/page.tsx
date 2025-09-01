
import Link from 'next/link';
import { ArrowRight, Check, Star, Wand2, Users, FileText, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllToolsByCategories, Category, getTools, getCategoryBySlug } from '@/lib/tools-data';
import TypingAnimation from '@/components/typing-animation';
import Slogan from '@/components/slogan';
import ToolCard from '@/components/tool-card';
import RotatingToolCarousel from '@/components/rotating-tool-carousel';

export default function Home() {
  const allTools = getTools();
  const categoriesWithTools = getAllToolsByCategories().slice(0, 15);

  const trendingTools = allTools.filter(t => ['pdf-to-word', 'background-remover', 'image-compressor', 'json-to-csv', 'domain-availability-checker', 'emi-calculator', 'qr-code-generator', 'image-resizer', 'word-to-pdf', 'split-pdf', 'image-to-pdf', 'unlock-pdf', 'image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer', 'csv-to-excel', 'password-generator', 'image-to-text-ocr']).slice(0, 20);
  const popularTools = allTools.filter(t => ['image-resizer', 'word-to-pdf', 'split-pdf', 'image-to-pdf', 'unlock-pdf', 'pdf-to-word', 'background-remover', 'image-compressor', 'pdf-to-jpg', 'merge-pdf', 'image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer', 'csv-to-json', 'xml-to-json', 'whois-lookup', 'dns-lookup', 'url-shortener']).slice(0, 20);
  const featuredTools = allTools.filter(t => ['image-upscaler-ai', 'face-retouch-ai', 'generative-fill-ai', 'blog-title-generator', 'summarizer', 'meta-description-generator', 'paraphraser', 'pdf-background-remover-ai', 'grammar-checker', 'spelling-checker', 'image-background-remover-ai', 'handwriting-ocr', 'table-ocr', 'math-ocr', 'language-detector', 'keyword-extractor', 'suggest-related-tools', 'image-watermark-remover', 'remove-image-noise', 'sharpen-image']).slice(0, 20);
  
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
        <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-20 bg-hero-gradient overflow-hidden">
          <div className="container px-4 md:px-6 relative text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
                   <TypingAnimation
                      text="Welcome to D2ools"
                      className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline inline-block gradient-text"
                      isLooping={true}
                  />
                </h1>
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
                    <Link href="/tools/top-50"><Star className="mr-2 text-yellow-400" /> <span className="text-white group-hover:text-black transition-colors duration-300">Top 50 Tools</span></Link>
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
            <div className="flex items-center justify-center mb-10 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Top 20 Trending Tools</h2>
              <span className="text-sm font-bold px-2.5 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full">HOT</span>
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">Most popular tools uploaded in real-time based on user activity.</p>
            <RotatingToolCarousel tools={trendingTools} itemsPerPage={20} itemsToUpdate={10} interval={10000} tag="Trending" showRank={true} />
            <div className="text-center mt-12">
              <Button asChild className="rounded-full group btn-gradient">
                <Link href="/tools/trending"><span className="text-white group-hover:text-black transition-colors duration-300">View All Trending Tools</span></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="popular-tools" className="w-full py-8 md:py-12 bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center mb-10 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Top 20 Most Popular Tools</h2>
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">Tools with highest user satisfaction and engagement.</p>
            <RotatingToolCarousel tools={popularTools} itemsPerPage={20} itemsToUpdate={10} interval={10000} tag="Popular" showRank={true} />
            <div className="text-center mt-12">
               <Button asChild className="rounded-full group btn-gradient">
                <Link href="/tools/popular"><span className="text-white group-hover:text-black transition-colors duration-300">View All Popular Tools</span></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="featured-tools" className="w-full py-8 md:py-12 bg-background">
          <div className="container px-4 md:px-6">
             <div className="flex items-center justify-center mb-10 gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center font-headline">Top 20 Featured Tools</h2>
              <Wand2 className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-center text-muted-foreground max-w-xl mx-auto mb-10">Handpicked advanced, automated, and AI capabilities.</p>
            <RotatingToolCarousel tools={featuredTools} itemsPerPage={20} itemsToUpdate={10} interval={10000} tag="Featured" showRank={true} />
            <div className="text-center mt-12">
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
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">From PDF manipulation to image editing, we cover a vast range of needs. All our tools are free, secure, and designed to work seamlessly in your browser.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categoriesWithTools.map((category) => {
                 const catDetails = getCategoryBySlug(category.slug);
                 if (!catDetails) return null;
                 return (
                   <Link href={`/tools#${category.slug}`} key={category.slug} className="group block">
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white hover:bg-gray-100/50 transition-colors hover:border-primary/50 shadow-sm h-full" style={{ '--category-color': `hsl(${catDetails.color})` } as React.CSSProperties}>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `hsla(${catDetails.color}, 70%, 50%, 0.15)`}}>
                        <category.icon className="h-6 w-6" style={{ color: `hsl(${catDetails.color}, 70%, 50%)` }} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.tools.length} Tools</p>
                      </div>
                      <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                )
              })}
            </div>
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

