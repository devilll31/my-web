'use server';
/**
 * @fileOverview An AI agent that converts a PDF to a PNG image.
 *
 * - pdfToPng - A function that handles the PDF to PNG conversion.
 * - PdfToPngInput - The input type for the function.
 * - PdfToPngOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const PdfToPngInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to be converted to PNG, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PdfToPngInput = z.infer<typeof PdfToPngInputSchema>;
export type PdfToPngOutput = z.infer<typeof FileOutputSchema>;

export async function pdfToPng(input: PdfToPngInput): Promise<PdfToPngOutput> {
  return pdfToPngFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToPngPrompt',
  input: {schema: PdfToPngInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a document conversion expert. Convert the first page of the provided PDF file into a high-quality PNG image.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return ONLY the Base64 encoded string of the converted PNG image. Do not include the data URI prefix.`,
});

const pdfToPngFlow = ai.defineFlow(
  {
    name: 'pdfToPngFlow',
    inputSchema: PdfToPngInputSchema,
    outputSchema: FileOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return a valid PNG file.');
    }
    return output;
  }
);
