
'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit'; 

export const WordToPdfInputSchema = z.object({
  wordDataUri: z
    .string()
    .min(1, 'wordDataUri is required')
    .refine((s) => s.startsWith('data:'), 'wordDataUri must be a data URI'),
});

export const WordToPdfOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .min(1, 'pdfDataUri is required')
    .refine(
      (s) => /^data:application\/pdf;base64,/.test(s),
      'pdfDataUri must be a PDF data URI'
    ),
});

export type WordToPdfInput = z.infer<typeof WordToPdfInputSchema>;
export type WordToPdfOutput = z.infer<typeof WordToPdfOutputSchema>;

/**
 * Server action: converts a Word document (data URI) to PDF (data URI).
 * This calls your configured Genkit model and instructs it to return ONLY the PDF as a data URI.
 * If the model returns anything else or an empty value, we throw a clear error.
 */
export async function wordToPdf(
  input: WordToPdfInput
): Promise<WordToPdfOutput> {
  const parsed = WordToPdfInputSchema.parse(input);

  const prompt = ai.definePrompt({
    name: 'wordToPdfPrompt',
    input: {schema: WordToPdfInputSchema},
    output: {schema: WordToPdfOutputSchema},
    prompt: `You are a document conversion expert. Convert the provided Word document into a PDF file.

    Preserve the exact formatting, layout, fonts, and images of the original document.

    Word document for conversion: {{media url=wordDataUri}}
    
    Return the converted PDF document as a data URI.`,
  });

  const llmResponse = await prompt(parsed);
  const output = llmResponse.output;

  if (!output?.pdfDataUri) {
    throw new Error('Conversion failed: The service did not return a valid PDF file.');
  }

  return output;
}
