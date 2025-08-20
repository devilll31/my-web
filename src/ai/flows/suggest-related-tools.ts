'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest related tools based on the current tool being used.
 *
 * @exports suggestRelatedTools - A function that takes a tool name as input and returns a list of suggested related tools.
 * @exports SuggestRelatedToolsInput - The input type for the suggestRelatedTools function, which is the name of the current tool.
 * @exports SuggestRelatedToolsOutput - The output type for the suggestRelatedTools function, which is a list of related tool names.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedToolsInputSchema = z.object({
  currentTool: z.string().describe('The name of the tool the user is currently using.'),
});
export type SuggestRelatedToolsInput = z.infer<typeof SuggestRelatedToolsInputSchema>;

const SuggestRelatedToolsOutputSchema = z.object({
  relatedTools: z
    .array(z.string())
    .describe('A list of suggested tools related to the current tool.'),
});
export type SuggestRelatedToolsOutput = z.infer<typeof SuggestRelatedToolsOutputSchema>;

export async function suggestRelatedTools(input: SuggestRelatedToolsInput): Promise<SuggestRelatedToolsOutput> {
  return suggestRelatedToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedToolsPrompt',
  input: {schema: SuggestRelatedToolsInputSchema},
  output: {schema: SuggestRelatedToolsOutputSchema},
  prompt: `You are an expert in online utility tools. Given the name of a tool, you will suggest other tools that are related and might be useful to the user.

Current Tool: {{{currentTool}}}

Suggest at least 5 related tools.  Return only the names of the tools, nothing else. Format them as a JSON array of strings.`,
});

const suggestRelatedToolsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedToolsFlow',
    inputSchema: SuggestRelatedToolsInputSchema,
    outputSchema: SuggestRelatedToolsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
