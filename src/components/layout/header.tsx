
'use client';

import Link from 'next/link';
import {
  ChevronDown,
  Search,
  ArrowRight
} from 'lucide-react';
import React from 'react';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { getCategories, getTop50Tools } from '@/lib/tools-data';
import { Button } from '@/components/ui/button';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group text-sm font-medium transition-colors text-foreground/70 hover:text-foreground relative"
  >
    {children}
    <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-out"></span>
  </Link>
);

export default function Header() {
  const categories = getCategories();
  const topTools = getTop50Tools().slice(0, 20);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2 flex-shrink-0">
          <Logo className="h-8 w-auto" />
        </Link>
        <div className="flex flex-1 items-center justify-start space-x-4 md:space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="group text-sm font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center relative">
                  Tools <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                  <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-out"></span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[700px] p-4" align="start">
                <div className="grid grid-cols-2 gap-x-8">
                  <div>
                     <h3 className="font-bold text-lg mb-4 text-foreground">Top 50 Tools</h3>
                     <div className="space-y-2">
                       {topTools.map(tool => (
                         <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{tool.name}</Link>
                       ))}
                     </div>
                     <Button asChild variant="link" className="p-0 h-auto mt-4">
                       <Link href="/tools/top-50">View All Top 50 Tools <ArrowRight className="ml-2 h-4 w-4" /></Link>
                     </Button>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-foreground">Tool Categories</h3>
                    <div className="grid grid-cols-1 gap-y-2">
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
        <div className="flex-1 flex justify-end items-center gap-2">
            <div className="relative w-full max-w-lg hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools... (e.g., 'PDF to Word', 'Image Resizer')"
                className="w-full rounded-full pl-9 bg-gray-100/80 border-transparent focus:bg-white focus:border-primary/50"
              />
            </div>
             <Button variant="ghost" className="sm:hidden"><Search className="h-5 w-5"/></Button>
        </div>
      </div>
    </header>
  );
}
