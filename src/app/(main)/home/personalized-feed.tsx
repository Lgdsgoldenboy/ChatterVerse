'use client';

import { useEffect, useState } from 'react';
import { generatePersonalizedFeed } from '@/ai/flows/personalized-content-feed';
import { mockPosts } from '@/lib/mock-data';
import { PostCard } from '@/components/post-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export function PersonalizedFeed() {
  const [recommendedPosts, setRecommendedPosts] = useState<typeof mockPosts>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeed() {
      try {
        setIsLoading(true);
        // In a real app, user data would be fetched from your backend
        const userInput = {
          userReadingHistory: ['The Rise of Quantum Computing'],
          userInterests: ['AI', 'Art', 'Technology', 'Space'],
          availableArticles: mockPosts.map(p => p.title),
        };

        const result = await generatePersonalizedFeed(userInput);
        
        const filteredPosts = mockPosts.filter(p => result.recommendedArticles.includes(p.title));
        setRecommendedPosts(filteredPosts.length > 0 ? filteredPosts : mockPosts.slice(0, 2)); // Fallback to show some posts
      } catch (err) {
        console.error('Failed to generate personalized feed:', err);
        setError('Could not load your personalized feed. Showing latest posts instead.');
        setRecommendedPosts(mockPosts);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {error && (
         <Alert variant="destructive" className="mb-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
