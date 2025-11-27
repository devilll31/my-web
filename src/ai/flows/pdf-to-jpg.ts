'use server';
/**
 * @fileOverview An AI agent that converts a PDF to a JPG image.
 *
 * - pdfToJpg - A function that handles the PDF to JPG conversion.
 * - PdfToJpgInput - The input type for the function.
 * - PdfToJpgOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PdfToJpgInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to be converted to JPG, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PdfToJpgInput = z.infer<typeof PdfToJpgInputSchema>;

const PdfToJpgOutputSchema = z.object({
  base64Data: z
    .string()
    .describe('The converted JPG image, as a Base64 encoded string, without the data URI prefix.'),
});
export type PdfToJpgOutput = z.infer<typeof PdfToJpgOutputSchema>;

export async function pdfToJpg(input: PdfToJpgInput): Promise<PdfToJpgOutput> {
  return pdfToJpgFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToJpgPrompt',
  input: {schema: PdfToJpgInputSchema},
  output: {schema: PdfToJpgOutputSchema},
  prompt: `You are a document conversion expert. Convert the first page of the provided PDF file into a high-quality JPG image.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return ONLY the Base64 encoded string of the converted JPG image. Do not include the data URI prefix.`,
});

const pdfToJpgFlow = ai.defineFlow(
  {
    name: 'pdfToJpgFlow',
    inputSchema: PdfToJpgInputSchema,
    outputSchema: PdfToJpgOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return a valid JPG file.');
    }
    return output;
  }
);
