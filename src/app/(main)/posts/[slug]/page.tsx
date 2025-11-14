import { notFound } from 'next/navigation';
import Image from 'next/image';
import { mockPosts } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, MessageCircle, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/comment-section';
import { Card } from '@/components/ui/card';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = mockPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  // Basic markdown to HTML
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="font-headline text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="font-headline text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="font-headline text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
      });
  };

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <div className="flex justify-center gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.avatarHint} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
            </div>
            <span>&middot;</span>
            <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
      </header>

      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src={post.coverImage.imageUrl}
          alt={post.coverImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={post.coverImage.imageHint}
        />
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none font-body text-lg">
        {renderContent(post.content)}
      </div>

      <Separator className="my-12" />

      <div className="flex justify-between items-center mb-12">
        <p className="text-muted-foreground">Enjoy this article?</p>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="group rounded-full transition-colors duration-300 hover:bg-pink-100 hover:text-pink-600">
                <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
            </Button>
            <Button variant="outline" size="icon" className="group rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600">
                <Bookmark className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
            </Button>
            <Button variant="outline" size="icon" className="group rounded-full transition-colors duration-300 hover:bg-green-100 hover:text-green-600">
                <Share2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" />
            </Button>
        </div>
      </div>

      <CommentSection comments={post.comments} />

    </article>
  );
}
