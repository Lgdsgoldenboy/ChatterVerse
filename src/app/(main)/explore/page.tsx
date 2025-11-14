import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post-card";
import { mockPosts } from "@/lib/mock-data";
import { Search } from "lucide-react";

const categories = ["All", "Technology", "Art", "Science", "Lifestyle"];

export default function ExplorePage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center gap-4">
                <h1 className="font-headline text-4xl font-bold tracking-tight">Explore Content</h1>
                <p className="max-w-xl text-center text-muted-foreground">
                    Discover articles, stories, and insights from our community of writers.
                </p>
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for posts, tags, or authors..." className="pl-10" />
                </div>
            </div>

            <Tabs defaultValue="All" className="w-full">
                <div className="flex justify-center">
                    <TabsList>
                        {categories.map(category => (
                            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {categories.map(category => (
                    <TabsContent key={category} value={category}>
                        <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                            {mockPosts
                                .filter(post => category === "All" || post.category === category)
                                .map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            }
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
