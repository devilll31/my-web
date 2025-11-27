'use server';
/**
 * @fileOverview An AI agent that converts PDF to Excel.
 *
 * - pdfToExcel - A function that handles the PDF to Excel conversion process.
 * - PdfToExcelInput - The input type for the pdfToExcel function.
 * - PdfToExcelOutput - The return type for the pdfToExcel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { FileOutputSchema } from '../schemas/file-conversion-schemas';

const PdfToExcelInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file with tables to be converted to Excel, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'"
    ),
});
export type PdfToExcelInput = z.infer<typeof PdfToExcelInputSchema>;
export type PdfToExcelOutput = z.infer<typeof FileOutputSchema>;

export async function pdfToExcel(input: PdfToExcelInput): Promise<PdfToExcelOutput> {
  return pdfToExcelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToExcelPrompt',
  input: {schema: PdfToExcelInputSchema},
  output: {schema: FileOutputSchema},
  prompt: `You are a data extraction expert. Analyze the provided PDF, identify all tables, and convert them into a single, well-structured Microsoft Excel (.xlsx) spreadsheet.

  Each table from the PDF should be on a separate sheet in the Excel file. Preserve the original table structure, including rows, columns, and cell data.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return ONLY the Base64 encoded string of the converted Excel spreadsheet. Do not include the data URI prefix.`,
});

const pdfToExcelFlow = ai.defineFlow(
  {
    name: 'pdfToExcelFlow',
    inputSchema: PdfToExcelInputSchema,
    outputSchema: FileOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return a valid Excel file.');
    }
    return output;
  }
);
