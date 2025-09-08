'use server';
/**
 * @fileOverview An AI agent that converts a number into its word representation.
 *
 * - numberToWords - A function that handles the conversion.
 * - NumberToWordsInput - The input type for the function.
 * - NumberToWordsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NumberToWordsInputSchema = z.object({
  number: z.number().describe('The number to convert to words.'),
  language: z.string().describe('The target language for the word representation (e.g., "English", "Hindi").'),
});
export type NumberToWordsInput = z.infer<typeof NumberToWordsInputSchema>;

const NumberToWordsOutputSchema = z.object({
  words: z.string().describe('The number spelled out in words.'),
});
export type NumberToWordsOutput = z.infer<typeof NumberToWordsOutputSchema>;

export async function numberToWords(input: NumberToWordsInput): Promise<NumberToWordsOutput> {
  return numberToWordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'numberToWordsPrompt',
  input: {schema: NumberToWordsInputSchema},
  output: {schema: NumberToWordsOutputSchema},
  prompt: `Convert the following number into words in the specified language.

Number: {{{number}}}
Language: {{{language}}}

Spell out the number clearly.`,
});

const numberToWordsFlow = ai.defineFlow(
  {
    name: 'numberToWordsFlow',
    inputSchema: NumberToWordsInputSchema,
    outputSchema: NumberToWordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to convert number to words.');
    }
    return output;
  }
);
