'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting related products based on a given product description.
 *
 * - suggestRelatedProducts - A function that takes a product description and returns a list of suggested related products.
 * - SuggestRelatedProductsInput - The input type for the suggestRelatedProducts function.
 * - SuggestRelatedProductsOutput - The return type for the suggestRelatedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedProductsInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the product for which to suggest related products.'),
  userPreferences: z.string().optional().describe('Optional user preferences to tailor suggestions.'),
});
export type SuggestRelatedProductsInput = z.infer<typeof SuggestRelatedProductsInputSchema>;

const SuggestRelatedProductsOutputSchema = z.array(
  z.object({
    productId: z.string().describe('The ID of the suggested related product.'),
    productName: z.string().describe('The name of the suggested related product.'),
    description: z.string().describe('A short description of the suggested related product.'),
  })
);
export type SuggestRelatedProductsOutput = z.infer<typeof SuggestRelatedProductsOutputSchema>;

export async function suggestRelatedProducts(
  input: SuggestRelatedProductsInput
): Promise<SuggestRelatedProductsOutput> {
  return suggestRelatedProductsFlow(input);
}

const suggestRelatedProductsPrompt = ai.definePrompt({
  name: 'suggestRelatedProductsPrompt',
  input: {schema: SuggestRelatedProductsInputSchema},
  output: {schema: SuggestRelatedProductsOutputSchema},
  prompt: `You are an e-commerce product recommendation expert.

  Based on the following product description, suggest a list of related products that the user might be interested in.
  Return a JSON array of product suggestions.

  Product Description: {{{productDescription}}}

  {{#if userPreferences}}
  Also take into account the following user preferences when generating suggestions: {{{userPreferences}}}
  {{/if}}
  `,
});

const suggestRelatedProductsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedProductsFlow',
    inputSchema: SuggestRelatedProductsInputSchema,
    outputSchema: SuggestRelatedProductsOutputSchema,
  },
  async input => {
    const {output} = await suggestRelatedProductsPrompt(input);
    return output!;
  }
);
