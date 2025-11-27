'use server';
/**
 * @fileOverview An AI agent that converts Word to PDF.
 *
 * - wordToPdf - A function that handles the Word to PDF conversion process.
 * - WordToPdfInput - The input type for the wordToPdf function.
 * - WordToPdfOutput - The return type for the wordToPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const WordToPdfInputSchema = z.object({
  htmlContent: z
    .string()
    .describe(
      "The HTML content of the Word document to be converted to PDF."
    ),
});
export type WordToPdfInput = z.infer<typeof WordToPdfInputSchema>;
export type WordToPdfOutput = z.infer<typeof FileOutputSchema>;

export async function wordToPdf(input: WordToPdfInput): Promise<WordToPdfOutput> {
  return wordToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wordToPdfPrompt',
  input: {schema: WordToPdfInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided HTML content into a high-quality PDF file.

  Preserve the original formatting, fonts, tables, and layout as closely as possible. The resulting PDF should be print-ready.

  HTML content for conversion: {{{htmlContent}}}
  
  Return ONLY the Base64 encoded string of the converted PDF document. Do not include the data URI prefix.`,
});

const wordToPdfFlow = ai.defineFlow(
  {
    name: 'wordToPdfFlow',
    inputSchema: WordToPdfInputSchema,
    outputSchema: FileOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return a valid PDF file.');
    }
    return output;
  }
);
