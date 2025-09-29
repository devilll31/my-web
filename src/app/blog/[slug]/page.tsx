
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Blog Post Not Found'
    }
  }

  return {
    title: `${post.title} | D2ools Blog`,
    description: post.summary,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Simple markdown-to-HTML
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-2xl font-bold font-headline mt-8 mb-4">${paragraph.substring(4)}</h3>`;
        }
        if (paragraph.startsWith('1. ') || paragraph.startsWith('-  ')) {
            const listItems = paragraph.split('\n').map(item => `<li class="mb-2">${item.replace(/^(1\. |-  )\s*/, '')}</li>`).join('');
            return `<ol class="list-decimal list-inside space-y-2 mb-4">${listItems}</ol>`
        }
        return `<p class="mb-4 leading-relaxed">${paragraph}</p>`;
      })
      .join('');
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-primary font-semibold">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mt-2 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <span>by The D2ools Team</span>
          </div>
        </header>

        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={600}
          data-ai-hint={post.aiHint}
          className="w-full h-auto rounded-lg shadow-lg mb-8"
        />

        <div 
            className="prose dark:prose-invert max-w-none text-lg"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {post.toolSlug && (
          <div className="mt-12 text-center p-8 bg-secondary/50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Ready to try it out?</h3>
            <Button asChild size="lg" className="btn-gradient text-white">
              <Link href={`/tools/${post.toolSlug}`}>
                Go to the {post.category} Tool <ArrowRight className="ml-2 h-5 w-5"/>
              </Link>
            </Button>
          </div>
        )}
      </article>
    </div>
  );
}
