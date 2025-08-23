
'use client';

import Link from 'next/link';
import {
  ChevronDown,
  Search,
} from 'lucide-react';
import React from 'react';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { getCategories } from '@/lib/tools-data';
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-10 w-10" />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="group text-sm font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center relative">
                  Tools <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                  <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-out"></span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[600px] p-4" align="start">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <Link href="/tools" className="block p-2 rounded-md hover:bg-accent/50 transition-colors">
                            <h4 className="font-medium text-primary">All 500+ Tools</h4>
                            <p className="text-sm text-muted-foreground">Browse all available tools categorized for your convenience.</p>
                        </Link>
                    </div>
                    <div className="col-span-2 border-b my-2"></div>
                    <h4 className="col-span-2 font-medium text-sm text-muted-foreground px-2">Categories</h4>
                    {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/tools#${category.slug}`}
                      className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
                    >
                      <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <category.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>
          <div className="flex-1 flex justify-end items-center gap-2">
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for tools..."
                className="w-full rounded-full pl-9 bg-gray-100/80 border-transparent focus:bg-white focus:border-primary/50"
              />
            </div>
            <Button className="hidden sm:inline-flex rounded-full">Sign Up</Button>
            <Button variant="ghost" className="sm:hidden"><Search className="h-5 w-5"/></Button>
            <Button variant="ghost" className="rounded-full">Log in</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
