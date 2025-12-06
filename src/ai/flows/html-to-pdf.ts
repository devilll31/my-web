'use server';
/**
 * @fileOverview An AI agent that converts HTML to PDF.
 *
 * - htmlToPdf - A function that handles the HTML to PDF conversion process.
 * - HtmlToPdfInput - The input type for the function.
 * - HtmlToPdfOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const HtmlToPdfInputSchema = z.object({
  htmlContent: z
    .string()
    .describe(
      "The HTML content to be converted to PDF."
    ),
});
export type HtmlToPdfInput = z.infer<typeof HtmlToPdfInputSchema>;
export type HtmlToPdfOutput = z.infer<typeof FileOutputSchema>;

export async function htmlToPdf(input: HtmlToPdfInput): Promise<HtmlToPdfOutput> {
  return htmlToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'htmlToPdfPrompt',
  input: {schema: HtmlToPdfInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided HTML content into a single, well-structured PDF document.

  Preserve the original formatting, layout, text, and images as closely as possible.

  HTML for conversion: {{{htmlContent}}}
  
  Return ONLY the Base64 encoded string of the converted PDF document. Do not include the data URI prefix.`,
});

const htmlToPdfFlow = ai.defineFlow(
  {
    name: 'htmlToPdfFlow',
    inputSchema: HtmlToPdfInputSchema,
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
