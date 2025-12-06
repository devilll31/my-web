'use server';
/**
 * @fileOverview An AI agent that converts PDF to HTML.
 *
 * - pdfToHtml - A function that handles the PDF to HTML conversion process.
 * - PdfToHtmlInput - The input type for the function.
 * - PdfToHtmlOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const PdfToHtmlInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to be converted to HTML, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PdfToHtmlInput = z.infer<typeof PdfToHtmlInputSchema>;
export type PdfToHtmlOutput = z.infer<typeof FileOutputSchema>;

export async function pdfToHtml(input: PdfToHtmlInput): Promise<PdfToHtmlOutput> {
  return pdfToHtmlFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToHtmlPrompt',
  input: {schema: PdfToHtmlInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided PDF file into a single, self-contained HTML file.

  Preserve the original layout, text, and images as closely as possible. Embed images as Base64 data URIs within the HTML.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return ONLY the Base64 encoded string of the converted HTML document. Do not include the data URI prefix.`,
});

const pdfToHtmlFlow = ai.defineFlow(
  {
    name: 'pdfToHtmlFlow',
    inputSchema: PdfToHtmlInputSchema,
    outputSchema: FileOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return a valid HTML file.');
    }
    return output;
  }
);
