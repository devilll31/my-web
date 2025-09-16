
'use server';
/**
 * @fileOverview An AI agent that converts PDF to PowerPoint.
 *
 * - pdfToPowerPoint - A function that handles the PDF to PowerPoint conversion process.
 * - PdfToPowerPointInput - The input type for the function.
 * - PdfToPowerPointOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PdfToPowerPointInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to be converted to PowerPoint, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PdfToPowerPointInput = z.infer<typeof PdfToPowerPointInputSchema>;

const PdfToPowerPointOutputSchema = z.object({
  powerpointDataUri: z
    .string()
    .describe('The converted PowerPoint document (.pptx), as a data URI.'),
});
export type PdfToPowerPointOutput = z.infer<typeof PdfToPowerPointOutputSchema>;

export async function pdfToPowerPoint(input: PdfToPowerPointInput): Promise<PdfToPowerPointOutput> {
  return pdfToPowerPointFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToPowerPointPrompt',
  input: {schema: PdfToPowerPointInputSchema},
  output: {schema: PdfToPowerPointOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided PDF file into a Microsoft PowerPoint (.pptx) presentation.

  Each page of the PDF should be converted into a separate slide. Preserve the original layout, text, and images as closely as possible, making them editable in PowerPoint.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return the converted PowerPoint document as a data URI.`,
});

const pdfToPowerPointFlow = ai.defineFlow(
  {
    name: 'pdfToPowerPointFlow',
    inputSchema: PdfToPowerPointInputSchema,
    outputSchema: PdfToPowerPointOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.powerpointDataUri) {
      throw new Error('Conversion failed: The service did not return a valid PowerPoint file.');
    }
    return output;
  }
);
