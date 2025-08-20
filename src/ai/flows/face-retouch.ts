// Face Retouch Flow
'use server';
/**
 * @fileOverview An AI agent that retouches faces in an image.
 *
 * - faceRetouch - A function that handles the face retouching process.
 * - FaceRetouchInput - The input type for the faceRetouch function.
 * - FaceRetouchOutput - The return type for the faceRetouch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FaceRetouchInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo containing faces, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type FaceRetouchInput = z.infer<typeof FaceRetouchInputSchema>;

const FaceRetouchOutputSchema = z.object({
  retouchedPhotoDataUri: z
    .string()
    .describe('The retouched photo, as a data URI.'),
});
export type FaceRetouchOutput = z.infer<typeof FaceRetouchOutputSchema>;

export async function faceRetouch(input: FaceRetouchInput): Promise<FaceRetouchOutput> {
  return faceRetouchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faceRetouchPrompt',
  input: {schema: FaceRetouchInputSchema},
  output: {schema: FaceRetouchOutputSchema},
  prompt: `You are a professional photo retoucher.

  You will receive a photo as a data URI, and your task is to retouch the faces in the photo to enhance the image quality and make it more appealing. 

  Return the retouched photo as a data URI.

  Here is the photo to retouch: {{media url=photoDataUri}}`,
});

const faceRetouchFlow = ai.defineFlow(
  {
    name: 'faceRetouchFlow',
    inputSchema: FaceRetouchInputSchema,
    outputSchema: FaceRetouchOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: 'Retouch the faces in this photo to enhance the image quality and make it more appealing.'},
      ],
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {retouchedPhotoDataUri: media!.url!};
  }
);
