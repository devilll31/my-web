'use client';

import Link from 'next/link';
import { ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';
import React, { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { getCategories, getTop50Tools } from '@/lib/tools-data';
import { Button } from '@/components/ui/button';
import UniversalSearch from '@/components/universal-search';

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode, className?:string }) => (
  <Link
    href={href}
    className={cn("group text-sm font-medium transition-colors text-foreground/70 hover:text-foreground relative", className)}
  >
    <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
    </span>
    <span
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
            background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)), transparent 80%)',
            filter: 'blur(10px)',
        }}>
    </span>
  </Link>
);

export default function Header() {
  const [isToolsPopoverOpen, setIsToolsPopoverOpen] = useState(false);
  const categories = getCategories();
  const topTools = getTop50Tools().slice(0, 20);

  const categoriesCol1 = categories.slice(0, 9);
  const categoriesCol2 = categories.slice(9);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                <Logo className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            
            <Popover open={isToolsPopoverOpen} onOpenChange={setIsToolsPopoverOpen}>
                <PopoverTrigger 
                  asChild
                  onMouseEnter={() => setIsToolsPopoverOpen(true)}
                  onMouseLeave={() => setIsToolsPopoverOpen(false)}
                >
                <div className="group text-sm font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center gap-1 p-2 cursor-pointer relative">
                    <span className="relative">
                      Tools <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 inline transition duration-200 group-data-[state=open]:rotate-180" />
                      <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </span>
                     <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                            background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)), transparent 80%)',
                            filter: 'blur(10px)',
                        }}>
                    </span>
                </div>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-screen max-w-5xl p-6" 
                  align="start"
                  onMouseEnter={() => setIsToolsPopoverOpen(true)}
                  onMouseLeave={() => setIsToolsPopoverOpen(false)}
                >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative -top-3">
                    <div className="md:col-span-1">
                        <div className="relative -top-1">
                            <h3 className="font-bold text-lg mb-2 text-foreground">Top 50 Tools</h3>
                            <Link href="/tools/top-50" className="group block mb-4">
                                <p className="text-sm font-semibold text-primary group-hover:underline">Most popular tools</p>
                                <p className="text-xs text-muted-foreground">Most popular and frequently used tools by our users. <ExternalLink className="inline-block h-3 w-3" /></p>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-1">
                           <div className="relative">
                            <div className="flex flex-col gap-0 pr-4">
                                {topTools.map((tool, index) => (
                                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group tool-link block text-xs text-muted-foreground transition-colors p-1 rounded-md">
                                    <span className="flex items-center gap-2">
                                        <span className="text-xs w-5 text-center font-mono text-muted-foreground/70">{index + 1}.</span>
                                        <span className="tool-link-text">{tool.name}</span>
                                    </span>
                                    </Link>
                                ))}
                            </div>
                           </div>
                           <div className="mt-4">
                                <Button asChild size="sm" className="rounded-full group btn-gradient">
                                  <Link href="/tools/top-50"><span className="text-white group-hover:text-black transition-colors duration-300">View All Top 50 Tools</span> <ArrowRight className="ml-2 h-4 w-4 text-white group-hover:text-black transition-colors duration-300" /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="relative -top-1">
                            <h3 className="font-bold text-lg mb-2 text-foreground">Tool Categories</h3>
                             <Link href="/tools" className="group block mb-4">
                                <p className="text-sm font-semibold text-primary group-hover:underline">All tools by Category</p>
                                <p className="text-xs text-muted-foreground">Browse 500+ tools organized by category. <ExternalLink className="inline-block h-3 w-3" /></p>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex flex-col gap-2">
                                {categoriesCol1.map((category) => (
                                <Link
                                    key={category.name}
                                    href={`/tools#${category.slug}`}
                                    className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 transition-colors"
                                >
                                    <div className="p-2 rounded-md" style={{ backgroundColor: `hsla(${category.color}, 80%, 60%, 0.25)` }}>
                                        <category.icon className="h-5 w-5" style={{ color: `hsl(${category.color})` }}/>
                                    </div>
                                    <div>
                                    <p className="font-medium text-sm">{category.name}</p>
                                    </div>
                                </Link>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {categoriesCol2.map((category) => (
                                <Link
                                    key={category.name}
                                    href={`/tools#${category.slug}`}
                                    className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 transition-colors"
                                >
                                    <div className="p-2 rounded-md" style={{ backgroundColor: `hsla(${category.color}, 80%, 60%, 0.25)`}}>
                                    <category.icon className="h-5 w-5" style={{ color: `hsl(${category.color})` }} />
                                    </div>
                                    <div>
                                    <p className="font-medium text-sm">{category.name}</p>
                                    </div>
                                </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    </div>
                </PopoverContent>
            </Popover>

            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            </nav>
        </div>
        <div className="flex flex-1 justify-end">
             <UniversalSearch />
        </div>
      </div>
    </header>
  );
}
