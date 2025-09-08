'use server';
/**
 * @fileOverview An AI agent that detects the language of a given text.
 *
 * - detectLanguage - A function that handles the language detection process.
 * - DetectLanguageInput - The input type for the function.
 * - DetectLanguageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectLanguageInputSchema = z.object({
  text: z.string().describe('The text to analyze.'),
});
export type DetectLanguageInput = z.infer<typeof DetectLanguageInputSchema>;

const DetectLanguageOutputSchema = z.object({
  languageName: z.string().describe('The detected language name (e.g., "English", "Spanish").'),
  languageCode: z.string().describe('The ISO 639-1 code for the detected language (e.g., "en", "es").'),
});
export type DetectLanguageOutput = z.infer<typeof DetectLanguageOutputSchema>;

export async function detectLanguage(input: DetectLanguageInput): Promise<DetectLanguageOutput> {
  return detectLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectLanguagePrompt',
  input: {schema: DetectLanguageInputSchema},
  output: {schema: DetectLanguageOutputSchema},
  prompt: `Detect the language of the following text. Provide the full language name and its ISO 639-1 code.

Text: {{{text}}}`,
});

const detectLanguageFlow = ai.defineFlow(
  {
    name: 'detectLanguageFlow',
    inputSchema: DetectLanguageInputSchema,
    outputSchema: DetectLanguageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to detect language.');
    }
    return output;
  }
);
