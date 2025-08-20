'use server';

/**
 * @fileOverview Blog Title Generator AI agent.
 *
 * - generateBlogTitle - A function that generates a blog title.
 * - GenerateBlogTitleInput - The input type for the generateBlogTitle function.
 * - GenerateBlogTitleOutput - The return type for the generateBlogTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogTitleInputSchema = z.object({
  topic: z.string().describe('The topic of the blog.'),
});
export type GenerateBlogTitleInput = z.infer<typeof GenerateBlogTitleInputSchema>;

const GenerateBlogTitleOutputSchema = z.object({
  title: z.string().describe('The generated blog title.'),
});
export type GenerateBlogTitleOutput = z.infer<typeof GenerateBlogTitleOutputSchema>;

export async function generateBlogTitle(input: GenerateBlogTitleInput): Promise<GenerateBlogTitleOutput> {
  return generateBlogTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogTitlePrompt',
  input: {schema: GenerateBlogTitleInputSchema},
  output: {schema: GenerateBlogTitleOutputSchema},
  prompt: `You are an expert blog title generator. Your goal is to create an attention-grabbing blog title based on the topic provided.

Topic: {{{topic}}}`,
});

const generateBlogTitleFlow = ai.defineFlow(
  {
    name: 'generateBlogTitleFlow',
    inputSchema: GenerateBlogTitleInputSchema,
    outputSchema: GenerateBlogTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
