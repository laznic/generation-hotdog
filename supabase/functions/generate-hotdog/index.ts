// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

// @ts-ignore
const openAI = new OpenAI(Deno.env.get('OPENAI_API_KEY'));

const getPromptGuidelines = (emojis: string[]) => `
Use emojis to generate descriptive words for an image generation prompt.
Avoid literal descriptions and instead use the emojis to evoke atmosphere,
feeling, vibe, emotion, or art style. Include a word to describe the
environment or surroundings of the object in the image. Use lowercase words
separated by commas. Begin the prompt with "A hot dog is in a..." followed
by the environment description. Add additional keywords to describe the
desired art style of the image. Remove duplicate or similar words.
Emojis to use: ${emojis.join('')}
`.trim()

serve(async (req) => {
  const { emojis } = await req.json()

  const generatedPrompt = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt: getPromptGuidelines(emojis),
    temperature: 0.69,
    maxTokens: 500,
    topP: 0.9,
    frequencyPenalty: 0.42
  })

  const response = await fetch(`${Deno.env.get('STABLE_DIFFUSION_HOST')}/v1/engines/list`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Deno.env.get('STABLE_DIFFUSION_API_KEY')}`,
    },
  })

  const payload = (await response.json())
  console.log(payload)

  return new Response(
    JSON.stringify(generatedPrompt),
    { headers: { "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
