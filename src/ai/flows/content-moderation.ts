'use server';

/**
 * @fileOverview A content moderation AI agent.
 *
 * - moderateContent - A function that handles the content moderation process.
 * - ModerateContentInput - The input type for the moderateContent function.
 * - ModerateContentOutput - The return type for the moderateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateContentInputSchema = z.object({
  content: z.string().describe('The content to be moderated.'),
});
export type ModerateContentInput = z.infer<typeof ModerateContentInputSchema>;

const ModerateContentOutputSchema = z.object({
  isFlagged: z.boolean().describe('Whether the content is flagged for violating content policy.'),
  reason: z.string().describe('The reason for flagging the content.'),
});
export type ModerateContentOutput = z.infer<typeof ModerateContentOutputSchema>;

export async function moderateContent(input: ModerateContentInput): Promise<ModerateContentOutput> {
  return moderateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateContentPrompt',
  input: {schema: ModerateContentInputSchema},
  output: {schema: ModerateContentOutputSchema},
  prompt: `You are a content moderation expert. Your task is to determine whether the given content violates the content policy.

Content Policy: Content should not be harmful, offensive, or inappropriate. It should not promote violence, hate speech, or discrimination. It should not contain sexually explicit content or exploit, abuse or endanger children. It should not promote illegal activities or violate intellectual property rights.

Content: {{{content}}}

Determine if the content violates the content policy. If it does, set isFlagged to true and provide a detailed reason. If it does not, set isFlagged to false and provide a reason why it is not flagged.
`,
});

const moderateContentFlow = ai.defineFlow(
  {
    name: 'moderateContentFlow',
    inputSchema: ModerateContentInputSchema,
    outputSchema: ModerateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
