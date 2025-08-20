'use server';
/**
 * @fileOverview An AI-powered PDF background remover flow.
 *
 * - pdfBackgroundRemoverAi - A function that removes the background from a PDF document using AI.
 * - PdfBackgroundRemoverAiInput - The input type for the pdfBackgroundRemoverAi function.
 * - PdfBackgroundRemoverAiOutput - The return type for the pdfBackgroundRemoverAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PdfBackgroundRemoverAiInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PdfBackgroundRemoverAiInput = z.infer<typeof PdfBackgroundRemoverAiInputSchema>;

const PdfBackgroundRemoverAiOutputSchema = z.object({
  cleanedPdfDataUri: z
    .string()
    .describe('The PDF document with the background removed, as a data URI.'),
});
export type PdfBackgroundRemoverAiOutput = z.infer<typeof PdfBackgroundRemoverAiOutputSchema>;

export async function pdfBackgroundRemoverAi(input: PdfBackgroundRemoverAiInput): Promise<PdfBackgroundRemoverAiOutput> {
  return pdfBackgroundRemoverAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfBackgroundRemoverAiPrompt',
  input: {schema: PdfBackgroundRemoverAiInputSchema},
  output: {schema: PdfBackgroundRemoverAiOutputSchema},
  prompt: `You are an AI that removes the background from a PDF document.

  The PDF document is provided as a data URI. You will remove the background of the PDF document and return the cleaned PDF document as a data URI.

  Here is the PDF document:
  {{media url=pdfDataUri}}
  `,
});

const pdfBackgroundRemoverAiFlow = ai.defineFlow(
  {
    name: 'pdfBackgroundRemoverAiFlow',
    inputSchema: PdfBackgroundRemoverAiInputSchema,
    outputSchema: PdfBackgroundRemoverAiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
