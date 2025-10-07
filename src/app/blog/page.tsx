'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, ListFilter } from "lucide-react";
import { Suspense, useState, useMemo } from 'react';
import { getBlogPosts, getBlogCategories } from "@/lib/blog-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const allPosts = useMemo(() => getBlogPosts(), []);
  const categories = useMemo(() => getBlogCategories(), []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline gradient-text">D2ools blogs</h1>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Tips, tutorials, and insights from the D2ools team on how to master our suite of 500+ free online tools.
        </p>
      </div>

      <div className="mb-12 max-w-3xl mx-auto">
        <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
                type="search"
                placeholder="Search blog posts..."
                className="w-full rounded-full pl-12 pr-40 py-3 text-lg bg-background/50 border-2 focus:bg-white focus:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg focus:shadow-xl outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="rounded-full btn-gradient-filter group text-white">
                            <ListFilter className="mr-2 text-white group-hover:text-black transition-colors duration-300"/>
                            <span className="text-white group-hover:text-black transition-colors duration-300">
                                {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className="-my-1">
                            <DropdownMenuRadioItem value="all" className="category-item">All Categories</DropdownMenuRadioItem>
                            {categories.map(cat => (
                                <DropdownMenuRadioItem key={cat.slug} value={cat.name} className="category-item">{cat.name}</DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </div>

      <Suspense fallback={<div className="text-center">Loading posts...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPosts.map((post) => (
                <Card key={post.slug} className="flex flex-col overflow-hidden group">
                    <div className="overflow-hidden">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={400}
                          data-ai-hint={post.aiHint}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    </div>
                    <CardHeader>
                      <p className="text-sm text-primary font-medium">{post.category}</p>
                      <CardTitle className="text-xl font-headline mt-1 h-14 overflow-hidden">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="line-clamp-3">{post.summary}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                      <Button asChild variant="link">
                          <Link href={`/blog/${post.slug}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold">No Blog Posts Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
