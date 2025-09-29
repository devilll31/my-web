
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from 'react';
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-data";

export default function BlogPage() {
  const blogPosts = getBlogPosts();
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 gradient-text">The D2ools Blog</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Tips, tutorials, and insights from the D2ools team on how to master our suite of 500+ free online tools.
        </p>
      </div>
      <Suspense fallback={<div className="text-center">Loading posts...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogPosts.map((post) => (
                <Card key={post.slug} className="flex flex-col overflow-hidden group">
                    <div className="overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        data-ai-hint={post.aiHint}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    </div>
                    <CardHeader>
                    <p className="text-sm text-primary font-medium">{post.category}</p>
                    <CardTitle className="text-xl font-headline mt-1 h-14 overflow-hidden">{post.title}</CardTitle>
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
      </Suspense>
    </div>
  );
}
