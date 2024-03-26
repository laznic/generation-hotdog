// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { OpenAI } from "https://deno.land/x/openai/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { base64 } from "https://cdn.jsdelivr.net/gh/hexagon/base64@1/src/base64.js";
import { corsHeaders } from "../_shared/cors.ts";

// @ts-ignore
const openAI = new OpenAI(Deno.env.get('OPENAI_API_KEY'));
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { code } = await req.json()

  const { data: hotdogData } = await supabaseClient.from('hotdogs')
  .select(`
    creators_hotdogs (
      picked_emojis
    )
  `)
  .eq('status', 'GENERATING')
  .eq('code', code)

  if (!hotdogData?.length) {
    return new Response(
      JSON.stringify({ error: 'Sorry, no bonus' }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }

  const pickedEmojis = pickUniqueEmojis(hotdogData?.[0]?.creators_hotdogs, 5)

  const generatedPrompt = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt: getPromptGuidelines(pickedEmojis ?? []),
    temperature: 0.69,
    maxTokens: 500,
    topP: 0.9,
    frequencyPenalty: 0.42
  })

  const promptText = generatedPrompt.choices[0].text.replace(/\n/g, '').replace(/\./g, '').replace('prompt: ', '').toLowerCase()

  const generatedKanjiPrompt = await openAI.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Translate the following text into Japanese kanji: ${promptText}`
      }
    ],
    temperature: 0,
    maxTokens: 500,
    topP: 1,
    frequencyPenalty: 0
  })

  const imageType = getRandomFromList(imageTypes)
  const style = getRandomFromList(styles)
  const generalAdjustment = getRandomFromList(general)
  const color = getRandomFromList(colors)

  const shouldPickRenderingAndCamera = Math.random() < 0.6
  const rendering = shouldPickRenderingAndCamera && getRandomFromList(renders)
  const cameraShot = shouldPickRenderingAndCamera && getRandomFromList(cameraShots)
  const cameraLens = shouldPickRenderingAndCamera && getRandomFromList(cameraLenses)
 
  const promptForImage = [`{${promptText}}`, style, generalAdjustment, color, rendering, cameraShot, cameraLens].filter(Boolean).join(', ')
  
  const response = await fetch(`${Deno.env.get('STABLE_DIFFUSION_HOST')}/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${Deno.env.get('STABLE_DIFFUSION_API_KEY')}`,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: promptForImage
        }
      ],
      height: 512,
      width: 512,
      style_preset: imageType,
      // Randomizing this to provide a bit of variety in results
      cfg_scale: Math.floor(Math.random() * (28 - 10)) + 10,
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
      // Use the explicit URL to the image as sometimes
      // the full path might be missing from file.publicUrl
      image: Deno.env.get('SUPABASE_URL') + `/storage/v1/object/public/hotdogs/public/${code}.png`,
      emojis: pickedEmojis,
      generated_prompt: promptText,
      generated_kanji: generatedKanjiPrompt.choices[0].message.content,
      image_prompt: promptForImage,
      status: 'FINISHED'
    })
    .eq('code', code)

  return new Response(
    JSON.stringify({ generatedFile: file.publicUrl, promptForImage }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})

function getRandomFromList (list: string[]) {
  return list[Math.floor(Math.random() * list.length)]
}

const getPromptGuidelines = (emojis: string[]) => `Use emojis to generate descriptive words for an image generation prompt. Avoid literal descriptions and instead use the emojis to evoke atmosphere, feeling, vibe, emotion, or art style. Include a word to describe the environment or surroundings of the object in the image based on the emojis. Use lowercase words separated by commas. Begin the prompt with "a <description> hot dog in a..." followed by the environment description. Remove duplicate or similar words. Don't use the actual emojis. Emojis to use:  ${emojis.join('')}`.trim()

interface Creator {
  id: string;
  picked_emojis: string[];
}

// Pick a minimum number of unique emojis from a list of creators
// By courtesy of chatGPT because I'm tired at 12:30am and don't want to think about this anymore
function pickUniqueEmojis(creators: Creator[], minCount: number): string[] {
  // Create an empty object to store unique emojis for each creator
  const uniqueEmojis: {[id: string]: string[]} = {};
  
  // Pick a random emoji from each creator until there are at least the minimum number of unique emojis
  while (Object.values(uniqueEmojis).flat().length < minCount) {
    creators.forEach((creator) => {
      if (!uniqueEmojis[creator.id]) {
        uniqueEmojis[creator.id] = []; // Initialize an empty array for the creator's unique emojis
      }
      
      const availableEmojis = creator.picked_emojis.filter((emoji) => !uniqueEmojis[creator.id].includes(emoji));
      if (availableEmojis.length > 0) {
        const randomEmoji = getRandomFromList(availableEmojis); // Pick a random emoji from the creator's list of available emojis
        
        uniqueEmojis[creator.id].push(randomEmoji); // Add the emoji to the creator's unique emoji list
      }
    });
  }
  
  // Combine the unique emojis for each creator into a single list
  const pickedEmojis = Object.values(uniqueEmojis).flat();
  
  // Ensure the final result contains at least the minimum number of unique emojis
  const uniquePickedEmojis = [...new Set(pickedEmojis)];
  while (uniquePickedEmojis.length < minCount) {
    const randomCreator = getRandomFromList(creators);
    const availableEmojis = randomCreator.picked_emojis.filter((emoji) => !uniquePickedEmojis.includes(emoji));
    if (availableEmojis.length > 0) {
      const randomEmoji = getRandomFromList(availableEmojis);
      
      uniquePickedEmojis.push(randomEmoji);
    }
  }
  
  // Return the final list of picked emojis
  return uniquePickedEmojis;
}

// Courtesy of: https://animationguides.com/great-prompts-for-image-generation
const imageTypes = [
 "3d-model",
  "analog-film",
  "anime", 
  "cinematic",
  "comic-book",
  "digital-art",
  "enhance",
  "fantasy-art",
  "isometric",
  "line-art",
  "low-poly",
  "modeling-compound",
  "neon-punk",
  "origami",
  "photographic",
  "pixel-art",
  "tile-texture"
]

const styles =  [
  "steampunk",
  "clockpunk",
  "cyberpunk",
  "dieselpunk",
  "atompunk",
  "rococopunk",
  "steelpunk",
  "stonepunk",
  "oceanpunk",
  "elfpunk",
  "acidwave",
  "weirdcore",
  "cottagecore",
  "dreamcore",
  "vaporwave",
  "baroque",
  "film noir",
  "boho",
  "dadaism",
  "cubism",
  "expressionism",
  "fauvism",
  "futurism",
  "impressionism",
  "neo-impressionism",
  "post-impressionism",
  "pop art",
  "precisionism",
  "rococo",
  "surrealism",
  "street art",
  "suprematism",
  "art deco",
  "abstract expressionism",
  "classicism",
  "baroque",
  "art nouveau"
]

const general = [
  "4k",
  "8k",
  "64k",
  "detailed",
  "highly detailed",
  "high resolution",
  "hyper detailed",
  "hdr",
  "uhd",
  "professional",
  "golden ratio"
]

const colors = [
  "fantasy vivid colors",
  "vivid colors",
  "bright colors",
  "sepia",
  "dark colors",
  "pastel colors",
  "monochromatic",
  "black & white",
  "color splash"
]

const renders = [
  "octane render",
  "cinematic",
  "low poly",
  "isometric assets",
  "unreal engine",
  "unity engine",
  "quantum wavetracing",
  "polarizing filter"
]

const cameraShots = [
  "long shot",
  "closeup",
  "pov",
  "medium shot",
  "closeup",
  "extreme closeup",
  "panoramic"
]

const cameraLenses = [
  "ee 70mm",
  "35mm",
  "135mm+",
  "300mm+",
  "800 mm",
  "short telephoto",
  "super telephoto",
  "medium telephoto",
  "macro",
  "wide angle",
  "fish-eye",
  "bokeh",
  "sharp focus"
]
