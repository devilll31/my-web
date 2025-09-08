'use server';
/**
 * @fileOverview An AI agent that performs OCR on a PDF to extract text.
 *
 * - pdfToText - A function that handles the PDF OCR process.
 * - PdfToTextInput - The input type for the function.
 * - PdfToTextOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PdfToTextInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document to extract text from, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PdfToTextInput = z.infer<typeof PdfToTextInputSchema>;

const PdfToTextOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the PDF.'),
});
export type PdfToTextOutput = z.infer<typeof PdfToTextOutputSchema>;

export async function pdfToText(input: PdfToTextInput): Promise<PdfToTextOutput> {
  return pdfToTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToTextPrompt',
  input: {schema: PdfToTextInputSchema},
  output: {schema: PdfToTextOutputSchema},
  prompt: `Perform OCR on the provided PDF document and extract all text content.

  PDF for OCR: {{media url=pdfDataUri}}`,
});

const pdfToTextFlow = ai.defineFlow(
  {
    name: 'pdfToTextFlow',
    inputSchema: PdfToTextInputSchema,
    outputSchema: PdfToTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to extract text from the PDF.');
    }
    return output;
  }
);
