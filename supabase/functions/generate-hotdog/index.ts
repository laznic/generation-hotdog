// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { OpenAI } from "https://deno.land/x/openai/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { base64 } from "https://cdn.jsdelivr.net/gh/hexagon/base64@1/src/base64.js";

// @ts-ignore
const openAI = new OpenAI(Deno.env.get('OPENAI_API_KEY'));
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  const { code } = await req.json()

  const { data: hotdogData } = await supabaseClient.from('hotdogs')
  .select(`
    creators_hotdogs (
      picked_emojis
    )
  `)
  .eq('status', 'GENERATING')

  if (!hotdogData?.length) {
    return new Response(
      JSON.stringify({ error: 'Sorry, no bonus' }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

  // Let's just ignore the type checking here... It's only a hackathon anyways!
  // TODO: Use recursion to get a random emoji from each creator's picked emojis so that there are at least 5 emojis in the list
  // @ts-ignore
  const pickedEmojis = hotdogData?.[0]?.creators_hotdogs?.map((creator: any) => (
    creator.picked_emojis[Math.floor(Math.random() * creator.picked_emojis.length)]
  ))

  const generatedPrompt = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt: getPromptGuidelines(pickedEmojis ?? []),
    temperature: 0.69,
    maxTokens: 500,
    topP: 0.9,
    frequencyPenalty: 0.42
  })

  const finishingTouch = finishingTouches[Math.floor(Math.random() * finishingTouches.length)]
  const style = styles[Math.floor(Math.random() * styles.length)]
  const promptForImage = [generatedPrompt.choices[0].text.replace(/\n/g, '').replace(/\./g, ''), `${style} style`, finishingTouch].join(', ')

  const response = await fetch(`${Deno.env.get('STABLE_DIFFUSION_HOST')}/v1/generation/stable-diffusion-v1-5/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Deno.env.get('STABLE_DIFFUSION_API_KEY')}`,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: `${promptForImage}, not blurry`
        }
      ],
      // Randomizing this to provide a bit of variety in results
      cfg_scale: Math.floor(Math.random() * (25 - 10)) + 10,
      sampler: 'K_EULER_ANCESTRAL',
    })
  })

  const payload = (await response.json())
  const { artifacts } = payload

  const { data } = await supabaseClient
    .storage
    .from('hotdogs')
    .upload(`public/${code}.png`, base64.toArrayBuffer(artifacts[0].base64), {
      contentType: 'image/png'
    })

  const { data: file } = await supabaseClient
    .storage
    .from('hotdogs')
    .getPublicUrl(data?.path ?? '')

  await supabaseClient.from('hotdogs')
    .update({
      image: file.publicUrl,
      emojis: pickedEmojis,
      generated_prompt: promptForImage,
      status: 'FINISHED'
    })
    .eq('code', code)

  return new Response(
    JSON.stringify({ generatedFile: file.publicUrl, promptForImage }),
    { headers: { "Content-Type": "application/json" } },
  )
})

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

const finishingTouches = [
  'highly-detailed',
  'surrealism',
  'trending on artstation',
  'triadic color scheme',
  'smooth',
  'sharp focus',
  'matte',
  'elegant',
  'illustration',
  'digital paint',
  'dark',
  'gloomy',
  'octane render',
  '8k',
  '4k',
  'washed-out colors',
  'sharp',
  'dramatic lighting',
  'beautiful',
  'post-processing',
  'picture of the day',
  'ambient lighting',
  'epic composition',
  'masterpiece'
]

// Since the SD API doesn't support the style param which is
// available in DreamStudio, we'll just "hack it" here.
// Not sure if it works properly, though. This list also has
// some extras that are not listed in DreamStudio.
const styles = [
  'enhance',
  'anime',
  'photographic',
  'digital art',
  'comic book',
  'fantasy art',
  'analog film',
  'neon punk',
  'isometric',
  'abstract',
  'low poly',
  'pixel art',
  'retro',
  'origami',
  'vector art',
  'watercolor',
  'sketch',
  'line art',
  'craft clay',
  'cinematic',
  '3d model'
]