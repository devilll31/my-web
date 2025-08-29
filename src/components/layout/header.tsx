'use client';

import Link from 'next/link';
import {
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { getCategories, getTop50Tools } from '@/lib/tools-data';
import { Button } from '@/components/ui/button';
import UniversalSearch from '@/components/universal-search';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group text-sm font-medium transition-colors text-foreground/70 hover:text-foreground relative"
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
  const categories = getCategories();
  const topTools = getTop50Tools().slice(0, 20);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-x-8">
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                <Logo className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            
            <Popover>
                <PopoverTrigger asChild>
                <button className="group text-sm font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center relative">
                    <span className="relative">
                        Tools <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </span>
                    <span 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                            background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)), transparent 80%)',
                            filter: 'blur(10px)',
                        }}>
                    </span>
                </button>
                </PopoverTrigger>
                <PopoverContent className="w-screen max-w-4xl p-4" align="start">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-5">
                        <h3 className="font-bold text-lg mb-4 text-foreground">Top 50 Tools</h3>
                        <div className="grid grid-cols-1 gap-2">
                        {topTools.map(tool => (
                            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors p-1 rounded-md hover:bg-muted">{tool.name}</Link>
                        ))}
                        </div>
                        <Button asChild variant="link" className="p-0 h-auto mt-4">
                        <Link href="/tools/top-50">View All Top 50 Tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                    <div className="md:col-span-7">
                        <h3 className="font-bold text-lg mb-4 text-foreground">Tool Categories</h3>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/tools#${category.slug}`}
                            className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent/10 transition-colors"
                        >
                            <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <category.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <div>
                            <p className="font-medium text-sm">{category.name}</p>
                            </div>
                        </Link>
                        ))}
                        </div>
                    </div>
                    </div>
                </PopoverContent>
            </Popover>

            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            </nav>
        </div>
        <div className="flex items-center">
            <UniversalSearch />
        </div>
      </div>
    </header>
  );
}
