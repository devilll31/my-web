'use server';

/**
 * @fileOverview Upscales a low-resolution image to a higher resolution using AI.
 *
 * - upscaleImage - A function that handles the image upscaling process.
 * - UpscaleImageInput - The input type for the upscaleImage function.
 * - UpscaleImageOutput - The return type for the upscaleImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpscaleImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A low-resolution photo to upscale, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type UpscaleImageInput = z.infer<typeof UpscaleImageInputSchema>;

const UpscaleImageOutputSchema = z.object({
  upscaledPhotoDataUri: z
    .string()
    .describe('The upscaled high-resolution photo as a data URI.'),
});
export type UpscaleImageOutput = z.infer<typeof UpscaleImageOutputSchema>;

export async function upscaleImage(input: UpscaleImageInput): Promise<UpscaleImageOutput> {
  return upscaleImageFlow(input);
}

const upscaleImagePrompt = ai.definePrompt({
  name: 'upscaleImagePrompt',
  input: {schema: UpscaleImageInputSchema},
  output: {schema: UpscaleImageOutputSchema},
  prompt: `You are an AI expert at upscaling images and improving their quality.

You will take the provided low-resolution image and upscale it, returning the new high-resolution image as a data URI.

Low-resolution image: {{media url=photoDataUri}}
`,
});

const upscaleImageFlow = ai.defineFlow(
  {
    name: 'upscaleImageFlow',
    inputSchema: UpscaleImageInputSchema,
    outputSchema: UpscaleImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: 'Upscale this image, increasing its resolution and improving the detail.'},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Failed to upscale image.');
    }

    return {upscaledPhotoDataUri: media.url};
  }
);
