
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "10 Best Free AI Tools for Bloggers",
    description: "Boost your content creation process with these powerful AI tools that won't cost you a dime. From writing assistants to image generators.",
    image: "https://placehold.co/600x400.png",
    slug: "/blog/10-best-free-ai-tools-for-bloggers",
    category: "AI & Productivity",
    date: "October 26, 2023",
    aiHint: "blog content"
  },
  {
    title: "How to Convert PDF to Word on Mac, Windows, and Linux",
    description: "A comprehensive guide on converting your PDF files into editable Word documents across all major operating systems using free online tools.",
    image: "https://placehold.co/600x400.png",
    slug: "/blog/how-to-convert-pdf-to-word",
    category: "PDF Tutorials",
    date: "October 22, 2023",
    aiHint: "documents computer"
  },
  {
    title: "Why Compressing Your Images is Crucial for SEO",
    description: "Learn how optimizing your image file sizes can dramatically improve your website's loading speed and search engine ranking.",
    image: "https://placehold.co/600x400.png",
    slug: "/blog/compressing-images-for-seo",
    category: "SEO Tips",
    date: "October 18, 2023",
    aiHint: "website analytics"
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 gradient-text">D2ools Blogs</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Tips, tutorials, and insights on making the most of our free online tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <CardTitle className="text-xl font-headline mt-1">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>{post.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <Button asChild variant="link">
                <Link href={post.slug}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
