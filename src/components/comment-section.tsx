import type { Comment } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface CommentSectionProps {
    comments: Comment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
    return (
        <section className="space-y-8">
            <h2 className="font-headline text-2xl font-bold">Comments ({comments.length})</h2>
            
            <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold">Join the conversation</h3>
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/seed/currentUser/100/100" />
                        <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <form className="flex-grow space-y-2">
                        <Textarea placeholder="Write a comment..." />
                        <Button className="float-right">
                            <Send className="mr-2 h-4 w-4" /> Post Comment
                        </Button>
                    </form>
                </div>
            </div>

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} data-ai-hint={comment.author.avatarHint} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{comment.author.name}</p>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-muted-foreground">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
