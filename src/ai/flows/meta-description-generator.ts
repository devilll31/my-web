'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating meta descriptions for blog posts and tool pages.
 *
 * It includes:
 * - `generateMetaDescription` -  A function that calls the metaDescriptionGeneratorFlow with the input and returns the output.
 * - `MetaDescriptionGeneratorInput` - The input type for the generateMetaDescription function.
 * - `MetaDescriptionGeneratorOutput` - The return type for the generateMetaDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MetaDescriptionGeneratorInputSchema = z.object({
  content: z.string().describe('The content of the blog post or tool page.'),
  keywords: z.string().describe('Relevant keywords for the content.'),
});
export type MetaDescriptionGeneratorInput = z.infer<
  typeof MetaDescriptionGeneratorInputSchema
>;

const MetaDescriptionGeneratorOutputSchema = z.object({
  metaDescription: z
    .string()
    .describe('The generated meta description for the content.'),
});

export type MetaDescriptionGeneratorOutput = z.infer<
  typeof MetaDescriptionGeneratorOutputSchema
>;

export async function generateMetaDescription(
  input: MetaDescriptionGeneratorInput
): Promise<MetaDescriptionGeneratorOutput> {
  return metaDescriptionGeneratorFlow(input);
}

const metaDescriptionPrompt = ai.definePrompt({
  name: 'metaDescriptionPrompt',
  input: {schema: MetaDescriptionGeneratorInputSchema},
  output: {schema: MetaDescriptionGeneratorOutputSchema},
  prompt: `You are an SEO specialist tasked with generating compelling meta descriptions for web pages.
  Your goal is to create a meta description that accurately summarizes the content and entices users to click on the search result.
  The meta description should be concise, no more than 160 characters, and include relevant keywords.

  Content: {{{content}}}
  Keywords: {{{keywords}}}

  Meta Description:`, // Keep the prompt as concise as possible.
});

const metaDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'metaDescriptionGeneratorFlow',
    inputSchema: MetaDescriptionGeneratorInputSchema,
    outputSchema: MetaDescriptionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await metaDescriptionPrompt(input);
    return output!;
  }
);
