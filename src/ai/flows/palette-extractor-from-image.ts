'use server';
/**
 * @fileOverview An AI agent that extracts a color palette from an image.
 *
 * - extractPaletteFromImage - A function that handles the palette extraction process.
 * - ExtractPaletteFromImageInput - The input type for the function.
 * - ExtractPaletteFromImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractPaletteFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to extract colors from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractPaletteFromImageInput = z.infer<typeof ExtractPaletteFromImageInputSchema>;

const ExtractPaletteFromImageOutputSchema = z.object({
  palette: z.array(z.string().describe('A hex color code, e.g., #RRGGBB')).describe('An array of 5 hex color codes that form the palette.'),
});
export type ExtractPaletteFromImageOutput = z.infer<typeof ExtractPaletteFromImageOutputSchema>;

export async function extractPaletteFromImage(input: ExtractPaletteFromImageInput): Promise<ExtractPaletteFromImageOutput> {
  return extractPaletteFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractPaletteFromImagePrompt',
  input: {schema: ExtractPaletteFromImageInputSchema},
  output: {schema: ExtractPaletteFromImageOutputSchema},
  prompt: `Analyze the provided image and extract a harmonious color palette of exactly 5 colors. Provide the colors as an array of hex codes.

  Image for analysis: {{media url=photoDataUri}}`,
});

const extractPaletteFromImageFlow = ai.defineFlow(
  {
    name: 'extractPaletteFromImageFlow',
    inputSchema: ExtractPaletteFromImageInputSchema,
    outputSchema: ExtractPaletteFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output?.palette || output.palette.length === 0) {
      throw new Error('Failed to extract a palette from the image.');
    }
    return output;
  }
);
