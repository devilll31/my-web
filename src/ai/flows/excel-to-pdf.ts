'use server';
/**
 * @fileOverview An AI agent that converts Excel to PDF.
 *
 * - excelToPdf - A function that handles the Excel to PDF conversion process.
 * - ExcelToPdfInput - The input type for the excelToPdf function.
 * - ExcelToPdfOutput - The return type for the excelToPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExcelToPdfInputSchema = z.object({
  excelDataUri: z
    .string()
    .describe(
      "An Excel spreadsheet (.xlsx) to be converted to PDF, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type ExcelToPdfInput = z.infer<typeof ExcelToPdfInputSchema>;

const ExcelToPdfOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe('The converted PDF document, as a data URI.'),
});
export type ExcelToPdfOutput = z.infer<typeof ExcelToPdfOutputSchema>;

export async function excelToPdf(input: ExcelToPdfInput): Promise<ExcelToPdfOutput> {
  return excelToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'excelToPdfPrompt',
  input: {schema: ExcelToPdfInputSchema},
  output: {schema: ExcelToPdfOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided Excel spreadsheet into a PDF file.

  Ensure that each sheet is a separate page or set of pages in the PDF, and that the layout, charts, and tables are preserved perfectly. The resulting PDF should be print-ready.

  Excel spreadsheet for conversion: {{media url=excelDataUri}}
  
  Return the converted PDF document as a data URI.`,
});

const excelToPdfFlow = ai.defineFlow(
  {
    name: 'excelToPdfFlow',
    inputSchema: ExcelToPdfInputSchema,
    outputSchema: ExcelToPdfOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output();
     if (!output) {
      throw new Error('Failed to get a response from the model.');
    }
    return output;
  }
);
