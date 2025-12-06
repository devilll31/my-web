'use server';
/**
 * @fileOverview An AI agent that extracts text from a PDF.
 *
 * - pdfToTxt - A function that handles the PDF to TXT conversion process.
 * - PdfToTxtInput - The input type for the function.
 * - PdfToTxtOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const PdfToTxtInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to extract text from, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PdfToTxtInput = z.infer<typeof PdfToTxtInputSchema>;
export type PdfToTxtOutput = z.infer<typeof FileOutputSchema>;

export async function pdfToTxt(input: PdfToTxtInput): Promise<PdfToTxtOutput> {
  return pdfToTxtFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToTxtPrompt',
  input: {schema: PdfToTxtInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a data extraction expert. Extract all plain text content from the provided PDF file.

  PDF for text extraction: {{media url=pdfDataUri}}
  
  Return ONLY the Base64 encoded string of the extracted plain text (.txt) file. Do not include the data URI prefix.`,
});

const pdfToTxtFlow = ai.defineFlow(
  {
    name: 'pdfToTxtFlow',
    inputSchema: PdfToTxtInputSchema,
    outputSchema: FileOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return valid text data.');
    }
    return output;
  }
);
