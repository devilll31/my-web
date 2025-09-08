'use server';
/**
 * @fileOverview An AI agent that extracts contact information from a business card image and creates a VCF file.
 *
 * - businessCardOcr - A function that handles the business card OCR process.
 * - BusinessCardOcrInput - The input type for the function.
 * - BusinessCardOcrOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessCardOcrInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a business card, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type BusinessCardOcrInput = z.infer<typeof BusinessCardOcrInputSchema>;

const VCardSchema = z.object({
    firstName: z.string().describe("The person's first name."),
    lastName: z.string().describe("The person's last name."),
    title: z.string().describe("The person's job title."),
    organization: z.string().describe("The person's company or organization."),
    phone: z.string().describe("The person's phone number."),
    email: z.string().describe("The person's email address."),
    website: z.string().describe("The company or personal website."),
    address: z.string().describe("The full address."),
});

const BusinessCardOcrOutputSchema = z.object({
  vcfData: z.string().describe("The contact information as a VCF (Virtual Contact File) string."),
});
export type BusinessCardOcrOutput = z.infer<typeof BusinessCardOcrOutputSchema>;

export async function businessCardOcr(input: BusinessCardOcrInput): Promise<BusinessCardOcrOutput> {
  return businessCardOcrFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessCardOcrPrompt',
  input: {schema: BusinessCardOcrInputSchema},
  output: {schema: VCardSchema},
  prompt: `Analyze the provided image of a business card and extract the contact information.

  Business Card Image: {{media url=photoDataUri}}`,
});

const businessCardOcrFlow = ai.defineFlow(
  {
    name: 'businessCardOcrFlow',
    inputSchema: BusinessCardOcrInputSchema,
    outputSchema: BusinessCardOcrOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to extract contact information from the business card.');
    }
    const { firstName, lastName, title, organization, phone, email, website, address } = output;

    const vcf = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${firstName} ${lastName}`,
      `ORG:${organization}`,
      `TITLE:${title}`,
      `TEL;TYPE=WORK,VOICE:${phone}`,
      `EMAIL:${email}`,
      `URL:${website}`,
      `ADR;TYPE=WORK:;;${address.replace(/\n/g, ';')}`,
      'END:VCARD'
    ].join('\r\n');

    return { vcfData: vcf };
  }
);
