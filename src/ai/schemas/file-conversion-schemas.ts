import {z} from 'genkit';

export const FileOutputSchema = z.object({
  base64Data: z
    .string()
    .describe('The converted file content, as a Base64 encoded string, without the data URI prefix.')
    .min(1, 'The output file cannot be empty.'),
});
