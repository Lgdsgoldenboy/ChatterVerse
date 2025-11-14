'use client';

import { useState } from 'react';
import { moderateContent, type ModerateContentOutput } from '@/ai/flows/content-moderation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Loader2, ShieldCheck } from 'lucide-react';

export default function ModerateContentPage() {
    const [content, setContent] = useState('');
    const [result, setResult] = useState<ModerateContentOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleModerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const moderationResult = await moderateContent({ content });
            setResult(moderationResult);
        } catch (err) {
            console.error('Moderation failed:', err);
            setError('An error occurred while moderating the content.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight">Content Moderation Tool</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Leverage AI to check content for policy violations.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6" />
                        Check Content
                    </CardTitle>
                    <CardDescription>
                        Paste content below to analyze it against our community guidelines.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleModerate} className="space-y-4">
                        <Textarea
                            placeholder="Enter content to moderate..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[200px]"
                            required
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <ShieldCheck className="mr-2 h-4 w-4" />
                            )}
                            Moderate
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result && (
                <Alert variant={result.isFlagged ? 'destructive' : 'default'}>
                    {result.isFlagged ? (
                        <AlertTriangle className="h-4 w-4" />
                    ) : (
                        <CheckCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                        {result.isFlagged ? 'Content Flagged' : 'Content Approved'}
                    </AlertTitle>
                    <AlertDescription>
                        <strong>Reason:</strong> {result.reason}
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
