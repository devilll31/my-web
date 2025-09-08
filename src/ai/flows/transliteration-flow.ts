'use server';
/**
 * @fileOverview An AI agent that transliterates text from a source script to a target script.
 *
 * - transliterateText - A function that handles the transliteration.
 * - TransliterateTextInput - The input type for the function.
 * - TransliterateTextOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransliterateTextInputSchema = z.object({
  text: z.string().describe('The text to transliterate.'),
  sourceScript: z.string().describe('The source script (e.g., "Latin", "Devanagari").'),
  targetScript: z.string().describe('The target script (e.g., "Devanagari", "Latin").'),
});
export type TransliterateTextInput = z.infer<typeof TransliterateTextInputSchema>;

const TransliterateTextOutputSchema = z.object({
  transliteratedText: z.string().describe('The text after transliteration.'),
});
export type TransliterateTextOutput = z.infer<typeof TransliterateTextOutputSchema>;

export async function transliterateText(input: TransliterateTextInput): Promise<TransliterateTextOutput> {
  return transliterationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'transliterationPrompt',
  input: {schema: TransliterateTextInputSchema},
  output: {schema: TransliterateTextOutputSchema},
  prompt: `Transliterate the following text from the source script to the target script. Transliteration is the phonetic conversion of text from one script to another.

Source Text: {{{text}}}
Source Script: {{{sourceScript}}}
Target Script: {{{targetScript}}}
`,
});

const transliterationFlow = ai.defineFlow(
  {
    name: 'transliterationFlow',
    inputSchema: TransliterateTextInputSchema,
    outputSchema: TransliterateTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to transliterate text.');
    }
    return output;
  }
);
