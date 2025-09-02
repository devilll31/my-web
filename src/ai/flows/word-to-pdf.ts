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

const WordToPdfInputSchema = z.object({
  wordDataUri: z
    .string()
    .describe(
      "A Word document (.docx) to be converted to PDF, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type WordToPdfInput = z.infer<typeof WordToPdfInputSchema>;

const WordToPdfOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe('The converted PDF document, as a data URI.'),
});
export type WordToPdfOutput = z.infer<typeof WordToPdfOutputSchema>;

export async function wordToPdf(input: WordToPdfInput): Promise<WordToPdfOutput> {
  return wordToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wordToPdfPrompt',
  input: {schema: WordToPdfInputSchema},
  output: {schema: WordToPdfOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided Word document into a PDF file.

  Preserve the exact formatting, layout, fonts, and images of the original document.

  Word document for conversion: {{media url=wordDataUri}}
  
  Return the converted PDF document as a data URI.`,
});

const wordToPdfFlow = ai.defineFlow(
  {
    name: 'wordToPdfFlow',
    inputSchema: WordToPdfInputSchema,
    outputSchema: WordToPdfOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.pdfDataUri) {
      throw new Error('Conversion failed: The service did not return a valid PDF file.');
    }
    return output;
  }
);
