import { Button } from "@/modules/common/components/Button"
import supabase from '@/supabase'
import { UpdateIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateRoomButton() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function createRoom() {
    setLoading(true)

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

    navigate(`/room/${hotdogData?.[0].code}`)
  }

  return (
    <Button onClick={createRoom} disabled={loading}>
      {loading && <UpdateIcon className={'animate-spin mr-2'} />}
      Create Room
    </Button>
  )
}