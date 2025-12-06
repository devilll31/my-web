'use server';
/**
 * @fileOverview An AI agent that converts PDF to EPUB.
 *
 * - pdfToEpub - A function that handles the PDF to EPUB conversion process.
 * - PdfToEpubInput - The input type for the function.
 * - PdfToEpubOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const PdfToEpubInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to be converted to EPUB, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PdfToEpubInput = z.infer<typeof PdfToEpubInputSchema>;
export type PdfToEpubOutput = z.infer<typeof FileOutputSchema>;

export async function pdfToEpub(input: PdfToEpubInput): Promise<PdfToEpubOutput> {
  return pdfToEpubFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToEpubPrompt',
  input: {schema: PdfToEpubInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided PDF file into an EPUB eBook.

  Ensure the text flows correctly and chapters are preserved if possible. The resulting EPUB should be readable on all standard e-readers.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return ONLY the Base64 encoded string of the converted EPUB document. Do not include the data URI prefix.`,
});

const pdfToEpubFlow = ai.defineFlow(
  {
    name: 'pdfToEpubFlow',
    inputSchema: PdfToEpubInputSchema,
    outputSchema: FileOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return a valid EPUB file.');
    }
    return output;
  }
);
