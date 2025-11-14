import { PersonalizedFeed } from './personalized-feed';

export default function HomePage() {

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Your Personalized Feed</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Articles and stories curated just for you based on your interests and reading history.
        </p>
      </div>
      <PersonalizedFeed />
    </div>
  );
}
