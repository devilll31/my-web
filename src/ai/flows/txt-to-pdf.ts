'use server';
/**
 * @fileOverview An AI agent that converts a TXT file to a PDF.
 *
 * - txtToPdf - A function that handles the TXT to PDF conversion.
 * - TxtToPdfInput - The input type for the function.
 * - TxtToPdfOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const TxtToPdfInputSchema = z.object({
  txtDataUri: z
    .string()
    .describe(
      "A TXT file to be converted to PDF, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type TxtToPdfInput = z.infer<typeof TxtToPdfInputSchema>;
export type TxtToPdfOutput = z.infer<typeof FileOutputSchema>;

export async function txtToPdf(input: TxtToPdfInput): Promise<TxtToPdfOutput> {
  return txtToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'txtToPdfPrompt',
  input: {schema: TxtToPdfInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided plain text file into a simple, readable PDF document.

  Preserve all line breaks and paragraph spacing from the original text.

  TXT file for conversion: {{media url=txtDataUri}}
  
  Return ONLY the Base64 encoded string of the converted PDF document. Do not include the data URI prefix.`,
});

const txtToPdfFlow = ai.defineFlow(
  {
    name: 'txtToPdfFlow',
    inputSchema: TxtToPdfInputSchema,
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
