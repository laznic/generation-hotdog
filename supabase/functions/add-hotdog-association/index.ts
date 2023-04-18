// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/cors.ts"

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { hotdogCode, creatorId } = await req.json()
    const fetched = await supabaseClient.from('creators_hotdogs')
      .select()
      .eq('hotdog_code', hotdogCode)
      .eq('creator_id', creatorId)

  if (!fetched.data?.length) {
    await supabaseClient.from('creators_hotdogs')
      .insert({ hotdog_code: hotdogCode, creator_id: creatorId })
  }

  return new Response(
    JSON.stringify(fetched),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})