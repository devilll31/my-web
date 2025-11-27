'use server';
/**
 * @fileOverview An AI agent that converts a PNG image to a PDF.
 *
 * - pngToPdf - A function that handles the PNG to PDF conversion.
 * - PngToPdfInput - The input type for the function.
 * - PngToPdfOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PngToPdfInputSchema = z.object({
  pngDataUri: z
    .string()
    .describe(
      "A PNG image to be converted to PDF, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PngToPdfInput = z.infer<typeof PngToPdfInputSchema>;

const PngToPdfOutputSchema = z.object({
  base64Data: z
    .string()
    .describe('The converted PDF document, as a Base64 encoded string, without the data URI prefix.'),
});
export type PngToPdfOutput = z.infer<typeof PngToPdfOutputSchema>;

export async function pngToPdf(input: PngToPdfInput): Promise<PngToPdfOutput> {
  return pngToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pngToPdfPrompt',
  input: {schema: PngToPdfInputSchema},
  output: {schema: PngToPdfOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided PNG image into a single-page PDF document.

  PNG for conversion: {{media url=pngDataUri}}
  
  Return ONLY the Base64 encoded string of the converted PDF document. Do not include the data URI prefix.`,
});

const pngToPdfFlow = ai.defineFlow(
  {
    name: 'pngToPdfFlow',
    inputSchema: PngToPdfInputSchema,
    outputSchema: PngToPdfOutputSchema,
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
