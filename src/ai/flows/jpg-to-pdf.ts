'use server';
/**
 * @fileOverview An AI agent that converts a JPG image to a PDF.
 *
 * - jpgToPdf - A function that handles the JPG to PDF conversion.
 * - JpgToPdfInput - The input type for the function.
 * - JpgToPdfOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JpgToPdfInputSchema = z.object({
  jpgDataUri: z
    .string()
    .describe(
      "A JPG image to be converted to PDF, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type JpgToPdfInput = z.infer<typeof JpgToPdfInputSchema>;

const JpgToPdfOutputSchema = z.object({
  base64Data: z
    .string()
    .describe('The converted PDF document, as a Base64 encoded string, without the data URI prefix.'),
});
export type JpgToPdfOutput = z.infer<typeof JpgToPdfOutputSchema>;

export async function jpgToPdf(input: JpgToPdfInput): Promise<JpgToPdfOutput> {
  return jpgToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jpgToPdfPrompt',
  input: {schema: JpgToPdfInputSchema},
  output: {schema: JpgToPdfOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided JPG image into a single-page PDF document.

  JPG for conversion: {{media url=jpgDataUri}}
  
  Return ONLY the Base64 encoded string of the converted PDF document. Do not include the data URI prefix.`,
});

const jpgToPdfFlow = ai.defineFlow(
  {
    name: 'jpgToPdfFlow',
    inputSchema: JpgToPdfInputSchema,
    outputSchema: JpgToPdfOutputSchema,
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
