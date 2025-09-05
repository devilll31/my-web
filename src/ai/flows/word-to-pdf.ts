'use server';

import { ai } from '@/ai/genkit';
import {
  WordToPdfInput,
  WordToPdfInputSchema,
  WordToPdfOutputSchema,
} from '@/ai/schemas/word-to-pdf';

const prompt = ai.definePrompt({
  name: 'wordToPdfPrompt',
  input: {schema: WordToPdfInputSchema},
  output: {schema: WordToPdfOutputSchema},
  prompt: `You are a document conversion expert. Convert the provided Word document into a PDF file.

  Preserve the exact formatting, layout, fonts, and images of the original document.

  Word document for conversion: {{media url=wordDataUri}}
  
  Return the converted PDF document as a data URI.`,
});

const wordToPdfFlow = ai.defineFlow(
  {
    name: 'wordToPdfFlow',
    inputSchema: WordToPdfInputSchema,
    outputSchema: WordToPdfOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;

    if (!output?.pdfDataUri) {
      throw new Error('Conversion failed: The service did not return a valid PDF file.');
    }

    return output;
  }
);

export async function wordToPdf(input: WordToPdfInput) {
  return await wordToPdfFlow(input);
}
