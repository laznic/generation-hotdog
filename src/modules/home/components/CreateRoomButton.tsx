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

    if (!localStorage.getItem('creator')) {
      const { error: creatorInsertError, data } = await supabase.from('creators')
        .insert({})
        .select()

      if (creatorInsertError) return console.error(creatorInsertError)

      localStorage.setItem('creator', data?.[0].id)
    }

    const creatorId = localStorage.getItem('creator')

    const { error, data: hotdogData } = await supabase.from('hotdogs')
      .insert({})
      .select()

    await supabase.from('creators_hotdogs')
      .insert({ hotdog_code: hotdogData?.[0].code, creator_id: creatorId })

    if (error) return console.error(error)

    navigate(`/room/${hotdogData?.[0].code}`)
  }

  return (
    <Button onClick={createRoom} disabled={loading}>
      {loading && <UpdateIcon className={'animate-spin mr-2'} />}
      Create Room
    </Button>
  )
}