'use server';
/**
 * @fileOverview An AI agent that performs OCR on an image to extract text.
 *
 * - imageToText - A function that handles the OCR process.
 * - ImageToTextInput - The input type for the function.
 * - ImageToTextOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageToTextInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "An image to extract text from, as a data URI that must include a MIME type and use Base64 encoding."
    ),
  prompt: z.string().optional().describe('An optional prompt to guide the OCR process, e.g., "Extract only the table content".'),
});
export type ImageToTextInput = z.infer<typeof ImageToTextInputSchema>;

const ImageToTextOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the image.'),
});
export type ImageToTextOutput = z.infer<typeof ImageToTextOutputSchema>;

export async function imageToText(input: ImageToTextInput): Promise<ImageToTextOutput> {
  return imageToTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageToTextPrompt',
  input: {schema: ImageToTextInputSchema},
  output: {schema: ImageToTextOutputSchema},
  prompt: `Perform OCR on the provided image and extract all text.
  {{#if prompt}}
  Follow this additional instruction: {{{prompt}}}
  {{/if}}
  
  Image for OCR: {{media url=photoDataUri}}`,
});

const imageToTextFlow = ai.defineFlow(
  {
    name: 'imageToTextFlow',
    inputSchema: ImageToTextInputSchema,
    outputSchema: ImageToTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to extract text from the image.');
    }
    return output;
  }
);
