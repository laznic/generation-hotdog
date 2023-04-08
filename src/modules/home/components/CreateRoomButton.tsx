import { Button } from "@/modules/common/components/Button"
import supabase from '@/supabase'
import { redirect } from "react-router-dom"

export default function CreateRoomButton() {
  async function createRoom() {
    const { error, data: hotdogData } = await supabase.from('hotdogs')
      .insert({})
      .select()


    if (error) return console.error(error)
    
    if (!localStorage.getItem('creator')) {
      const { error: creatorInsertError, data } = await supabase.from('creators')
        .insert({
          hotdog_id: hotdogData?.[0].id
        })
        .select()

      if (creatorInsertError) return console.error(creatorInsertError)

      localStorage.setItem('creator', data?.[0].uuid)
    }
      
    const creatorId = localStorage.getItem('creator')
    const { error: creatorUpdateError } = await supabase.from('creators')
      .update({
        hotdog_id: hotdogData?.[0].id
      })
      .eq('uuid', creatorId)

    if (creatorUpdateError) return console.error(creatorUpdateError)

    redirect(`/room/${hotdogData?.[0].id}`)
  }

  return (
    <Button onClick={createRoom}>
      Create Room
    </Button>
  )
}