
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Folder } from 'lucide-react';
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

  // Simple markdown-to-HTML with improved styling and structure
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map(paragraph => {
        // Headings
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-2xl font-bold font-headline mt-10 mb-4">${paragraph.substring(4)}</h3>`;
        }
        // Numbered Lists for steps
        if (/^\d\./.test(paragraph)) {
            const listItems = paragraph.split('\n').map(item => {
                const stepMatch = item.match(/^(\d+\.)\s*(.*)/);
                if (stepMatch) {
                  return `<li class="mb-5 leading-relaxed"><strong class="font-semibold text-lg">${stepMatch[1]}</strong> ${stepMatch[2]}</li>`;
                }
                return '';
            }).join('');
            return `<ol class="space-y-4 mb-6">${listItems}</ol>`
        }
        // Standard paragraphs
        return `<p class="mb-6 leading-relaxed text-lg">${paragraph}</p>`;
      })
      .join('');
  };

  return (
    <div className="container mx-auto py-12 md:px-6">
      <article className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl overflow-hidden py-10 px-6 md:px-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mt-2 mb-6">{post.title}</h1>
          <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>by The D2ools Team</span>
            </div>
             <div className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              <p className="font-semibold text-primary">{post.category}</p>
            </div>
          </div>
        </header>

        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={600}
          data-ai-hint={post.aiHint}
          className="w-full h-auto rounded-xl shadow-lg mb-10"
        />

        <div 
            className="prose dark:prose-invert max-w-none text-lg"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {post.toolSlug && (
          <div className="mt-12 text-center p-8 bg-secondary/50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Ready to try it out?</h3>
            <Button asChild size="lg" className="btn-gradient group">
              <Link href={`/tools/${post.toolSlug}`}>
                <span className="text-white group-hover:text-black transition-colors duration-300">Go to the {post.category} Tool</span> <ArrowRight className="ml-2 h-5 w-5 text-white group-hover:text-black transition-colors duration-300"/>
              </Link>
            </Button>
          </div>
        )}
      </article>
    </div>
  );
}
