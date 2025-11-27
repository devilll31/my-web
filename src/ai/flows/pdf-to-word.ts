'use server';
/**
 * @fileOverview An AI agent that converts PDF to Word.
 *
 * - pdfToWord - A function that handles the PDF to Word conversion process.
 * - PdfToWordInput - The input type for the pdfToWord function.
 * - PdfToWordOutput - The return type for the pdfToWord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PdfToWordInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to be converted to Word, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type PdfToWordInput = z.infer<typeof PdfToWordInputSchema>;

const PdfToWordOutputSchema = z.object({
  wordDataUri: z
    .string()
    .describe('The converted Word document, as a data URI.'),
});
export type PdfToWordOutput = z.infer<typeof PdfToWordOutputSchema>;

export async function pdfToWord(input: PdfToWordInput): Promise<PdfToWordOutput> {
  return pdfToWordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToWordPrompt',
  input: {schema: PdfToWordInputSchema},
  output: {schema: PdfToWordOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided PDF file into a Microsoft Word (.docx) document.

  Maintain the original formatting, layout, text, and images as closely as possible.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return the converted Word document as a data URI.`,
});

const pdfToWordFlow = ai.defineFlow(
  {
    name: 'pdfToWordFlow',
    inputSchema: PdfToWordInputSchema,
    outputSchema: PdfToWordOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.wordDataUri) {
      throw new Error('Conversion failed: The service did not return a valid Word file.');
    }
    return output;
  }
);
