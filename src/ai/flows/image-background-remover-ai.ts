'use server';
/**
 * @fileOverview An AI agent that removes the background from an image.
 *
 * - imageBackgroundRemoverAi - A function that handles the image background removal process.
 * - ImageBackgroundRemoverAiInput - The input type for the imageBackgroundRemoverAi function.
 * - ImageBackgroundRemoverAiOutput - The return type for the imageBackgroundRemoverAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageBackgroundRemoverAiInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to remove the background from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type ImageBackgroundRemoverAiInput = z.infer<typeof ImageBackgroundRemoverAiInputSchema>;

const ImageBackgroundRemoverAiOutputSchema = z.object({
  processedPhotoDataUri: z
    .string()
    .describe('The photo with the background removed, as a data URI.'),
});
export type ImageBackgroundRemoverAiOutput = z.infer<typeof ImageBackgroundRemoverAiOutputSchema>;

export async function imageBackgroundRemoverAi(input: ImageBackgroundRemoverAiInput): Promise<ImageBackgroundRemoverAiOutput> {
  return imageBackgroundRemoverAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageBackgroundRemoverAiPrompt',
  input: {schema: ImageBackgroundRemoverAiInputSchema},
  output: {schema: ImageBackgroundRemoverAiOutputSchema},
  prompt: `Remove the background from the image provided. Return the image with the background removed, as a data URI.

Image: {{media url=photoDataUri}}`,
});

const imageBackgroundRemoverAiFlow = ai.defineFlow(
  {
    name: 'imageBackgroundRemoverAiFlow',
    inputSchema: ImageBackgroundRemoverAiInputSchema,
    outputSchema: ImageBackgroundRemoverAiOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: "Remove the background from this image."},
      ],
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      processedPhotoDataUri: media!.url,
    };
  }
);
