'use server';
/**
 * @fileOverview An AI agent that converts PowerPoint to PDF.
 *
 * - powerpointToPdf - A function that handles the PowerPoint to PDF conversion process.
 * - PowerpointToPdfInput - The input type for the function.
 * - PowerpointToPdfOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PowerpointToPdfInputSchema = z.object({
  powerpointDataUri: z
    .string()
    .describe(
      "A PowerPoint presentation (.pptx) to be converted to PDF, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type PowerpointToPdfInput = z.infer<typeof PowerpointToPdfInputSchema>;

const PowerpointToPdfOutputSchema = z.object({
  base64Data: z
    .string()
    .describe('The converted PDF document, as a Base64 encoded string, without the data URI prefix.'),
});
export type PowerpointToPdfOutput = z.infer<typeof PowerpointToPdfOutputSchema>;

export async function powerpointToPdf(input: PowerpointToPdfInput): Promise<PowerpointToPdfOutput> {
  return powerpointToPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'powerpointToPdfPrompt',
  input: {schema: PowerpointToPdfInputSchema},
  output: {schema: PowerpointToPdfOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided PowerPoint presentation into a PDF file.

  Ensure that each slide is a separate page in the PDF, and that the layout and content are preserved perfectly.

  PowerPoint for conversion: {{media url=powerpointDataUri}}
  
  Return ONLY the Base64 encoded string of the converted PDF document. Do not include the data URI prefix.`,
});

const powerpointToPdfFlow = ai.defineFlow(
  {
    name: 'powerpointToPdfFlow',
    inputSchema: PowerpointToPdfInputSchema,
    outputSchema: PowerpointToPdfOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;
    if (!output?.base64Data) {
      throw new Error('Conversion failed: The service did not return a valid PDF file.');
    }
    return output;
  }
);
