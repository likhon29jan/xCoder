import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

/**
 * A functional code generator agent that uses the AI SDK to generate code.
 *
 * @param prompt The user's prompt.
 * @returns The generated code snippet.
 */
export async function generateCode(prompt: string): Promise<string> {
  console.log(`Generating code for prompt: ${prompt}`);

  const { text } = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: `Generate a React component for the following prompt: ${prompt}`,
  });

  return text;
}