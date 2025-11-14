import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Edit3, Heart, TrendingUp, Search, ShieldCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Edit3 className="h-8 w-8 text-accent-foreground" />,
    title: 'Create & Publish',
    description: 'Use our rich, markdown-enabled editor to write and publish your stories, enhanced with images and videos.',
  },
  {
    icon: <Search className="h-8 w-8 text-accent-foreground" />,
    title: 'Discover Content',
    description: 'Explore a personalized feed based on your interests. Search, browse, and filter to find your next favorite author.',
  },
  {
    icon: <Heart className="h-8 w-8 text-accent-foreground" />,
    title: 'Engage & Interact',
    description: 'Connect with a community of readers and writers. Like, comment, and bookmark posts to join the conversation.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-accent-foreground" />,
    title: 'Track Your Analytics',
    description: 'Understand your audience with detailed analytics on views, likes, comments, and more.',
  },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-landing')!;

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary/20 py-20 md:py-32">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Welcome to ChatterVerse
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Your new heaven for words. A space for authors to create and readers to explore rich, text-based content without the noise.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Button asChild size="lg" className="group">
                <Link href="/auth/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/explore">
                  Explore Content
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 w-full md:h-auto md:p-12">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="rounded-lg object-cover shadow-2xl"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why ChatterVerse?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Everything you need to write, publish, and grow your audience, all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="pt-2 text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial/Quote Section */}
      <section className="bg-primary/20 py-16 sm:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <blockquote className="mx-auto max-w-3xl text-center">
                <p className="font-headline text-2xl font-medium text-foreground sm:text-3xl">"ChatterVerse has rekindled my love for writing. It's a platform that truly values the written word."</p>
                <footer className="mt-6">
                    <div className="font-body text-base text-muted-foreground">- Alex Doe, Bestselling Author</div>
                </footer>
            </blockquote>
        </div>
      </section>
    </div>
  );
}
