import { z } from 'zod';

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
