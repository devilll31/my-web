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

const PdfToExcelInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file with tables to be converted to Excel, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'"
    ),
});
export type PdfToExcelInput = z.infer<typeof PdfToExcelInputSchema>;

const PdfToExcelOutputSchema = z.object({
  excelDataUri: z
    .string()
    .describe('The converted Excel spreadsheet (.xlsx), as a data URI.'),
});
export type PdfToExcelOutput = z.infer<typeof PdfToExcelOutputSchema>;

export async function pdfToExcel(input: PdfToExcelInput): Promise<PdfToExcelOutput> {
  return pdfToExcelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToExcelPrompt',
  input: {schema: PdfToExcelInputSchema},
  output: {schema: PdfToExcelOutputSchema},
  prompt: `You are a data extraction expert. Analyze the provided PDF, identify all tables, and convert them into a single, well-structured Microsoft Excel (.xlsx) spreadsheet.

  Each table from the PDF should be on a separate sheet in the Excel file. Preserve the original table structure, including rows, columns, and cell data.

  PDF for conversion: {{media url=pdfDataUri}}
  
  Return the converted Excel spreadsheet as a data URI.`,
});

const pdfToExcelFlow = ai.defineFlow(
  {
    name: 'pdfToExcelFlow',
    inputSchema: PdfToExcelInputSchema,
    outputSchema: PdfToExcelOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.excelDataUri) {
      throw new Error('Conversion failed: The service did not return a valid Excel file.');
    }
    return output;
  }
);
