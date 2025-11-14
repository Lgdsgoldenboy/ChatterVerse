'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log({ title, content, tags });
        toast({
            title: "Post Published!",
            description: "Your new post is now live for the world to see.",
        });
        setTitle('');
        setContent('');
        setTags('');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl font-bold tracking-tight mb-8 text-center">Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Masterpiece</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-lg">Post Title</Label>
                            <Input
                                id="title"
                                placeholder="The title of your post"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-lg h-12"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="cover-image" className="text-lg">Cover Image</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-lg">Content (Markdown)</Label>
                            <Textarea
                                id="content"
                                placeholder="Write your heart out... You can use Markdown for formatting."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="min-h-[400px] font-mono text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags" className="text-lg">Tags</Label>
                            <Input
                                id="tags"
                                placeholder="e.g., tech, art, productivity (comma-separated)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                        
                        <Button type="submit" size="lg" className="w-full">
                            <PlusCircle className="mr-2 h-5 w-5" /> Publish Post
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
