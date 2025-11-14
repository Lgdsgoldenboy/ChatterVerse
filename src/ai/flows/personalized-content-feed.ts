'use server';

/**
 * @fileOverview Personalized content feed generator.
 *
 * This file defines a Genkit flow that generates a personalized content feed for a user
 * based on their reading history and interests.
 *
 * - generatePersonalizedFeed - The function to generate the personalized content feed.
 * - PersonalizedFeedInput - The input type for the generatePersonalizedFeed function.
 * - PersonalizedFeedOutput - The output type for the generatePersonalizedFeed function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFeedInputSchema = z.object({
  userReadingHistory: z
    .array(z.string())
    .describe('List of article titles the user has read.'),
  userInterests: z.array(z.string()).describe('List of user interests.'),
  availableArticles: z
    .array(z.string())
    .describe('List of available article titles.'),
});
export type PersonalizedFeedInput = z.infer<typeof PersonalizedFeedInputSchema>;

const PersonalizedFeedOutputSchema = z.object({
  recommendedArticles: z
    .array(z.string())
    .describe('List of recommended article titles for the user.'),
});
export type PersonalizedFeedOutput = z.infer<typeof PersonalizedFeedOutputSchema>;

export async function generatePersonalizedFeed(
  input: PersonalizedFeedInput
): Promise<PersonalizedFeedOutput> {
  return personalizedFeedFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeedPrompt',
  input: {schema: PersonalizedFeedInputSchema},
  output: {schema: PersonalizedFeedOutputSchema},
  prompt: `You are a content recommendation expert. Based on the user's reading history and interests, recommend articles from the available articles list.

User Reading History:
{{#each userReadingHistory}}
- {{this}}
{{/each}}

User Interests:
{{#each userInterests}}
- {{this}}
{{/each}}

Available Articles:
{{#each availableArticles}}
- {{this}}
{{/each}}

Recommended Articles:
`, // Intentionally left blank, the LLM will generate content here
});

const personalizedFeedFlow = ai.defineFlow(
  {
    name: 'personalizedFeedFlow',
    inputSchema: PersonalizedFeedInputSchema,
    outputSchema: PersonalizedFeedOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
