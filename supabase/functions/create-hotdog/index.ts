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

  const { creatorId } = await req.json()

  const emptyRoom = await supabaseClient.rpc('get_waiting_hotdogs_without_creators')
    .select('code')
    .limit(1)

  let hotdogData = emptyRoom

  if (!hotdogData.data?.[0]) {
    hotdogData = await supabaseClient.from('hotdogs')
      .insert({})
      .select('code')
  }

  await supabaseClient.from('creators_hotdogs')
    .insert({ hotdog_code: hotdogData.data?.[0].code, creator_id: creatorId })

  return new Response(
    JSON.stringify(hotdogData),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})
