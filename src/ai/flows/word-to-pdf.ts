
'use server';

import { ai } from '@/ai/genkit';
import {
  WordToPdfInput,
  WordToPdfInputSchema,
  WordToPdfOutput,
  WordToPdfOutputSchema,
} from '@/ai/schemas/word-to-pdf';

const prompt = ai.definePrompt({
  name: 'wordToPdfPrompt',
  input: {schema: WordToPdfInputSchema},
  output: {schema: WordToPdfOutputSchema},
  prompt: `You are a document conversion expert. Convert the following text content into a professional, well-formatted PDF file.

  Preserve the original structure, such as paragraphs and headings, as best as possible.

  Text Content:
  {{{textContent}}}
  
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

export async function wordToPdf(input: WordToPdfInput): Promise<WordToPdfOutput> {
  return await wordToPdfFlow(input);
}
