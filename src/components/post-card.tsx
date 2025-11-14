import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Eye } from 'lucide-react';

import type { Post } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Card className={cn('overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1', className)}>
        <Link href={`/posts/${post.slug}`} className="block">
            <div className="relative h-48 w-full">
                <Image
                src={post.coverImage.imageUrl}
                alt={post.coverImage.description}
                fill
                className="object-cover"
                data-ai-hint={post.coverImage.imageHint}
                />
                <Badge variant="secondary" className="absolute right-2 top-2">{post.category}</Badge>
            </div>
        </Link>
        <CardHeader>
            <Link href={`/posts/${post.slug}`}>
                <CardTitle className="font-headline text-xl leading-snug hover:text-primary-foreground/80">
                    {post.title}
                </CardTitle>
            </Link>
            <div className="flex items-center pt-2">
                <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint={post.author.avatarHint} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-2 text-sm">
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent>
             <p className="text-sm text-muted-foreground line-clamp-3">
                {post.content.replace(/#/g, '').split('\n').find(line => line.length > 10) || 'No description available.'}
             </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.stats.comments}</span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.stats.views}</span>
            </div>
        </CardFooter>
    </Card>
  );
}
