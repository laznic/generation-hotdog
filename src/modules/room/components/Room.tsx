import { Button } from '@/modules/common/components/Button'
import { Input } from '@/modules/common/components/Input'
import { Toggle } from '@/modules/common/components/Toggle'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/modules/common/components/DropdownMenu"

import { CheckIcon, FaceIcon, Link2Icon } from '@radix-ui/react-icons'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import { uniq, concat, equals } from 'remeda'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/components/Tooltip"
import supabase from '@/supabase'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/modules/common/components/AlertDialog'
import CreateRoomButton from '@/modules/home/components/CreateRoomButton'
import { useToast } from '@/hooks/useToast'

export default function Room () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [emojis, setEmojis] = useState<string[]>([])
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const [roomError, setRoomError] = useState(false)
  const allEmojisAdded = emojis.length === 5
  const { roomId } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const channel = useRef(supabase.channel(`room-${roomId}`))
  const [players, setPlayers] = useState([])


  // Realtime subscriptions for the room
  // - when player joins
  // - when player leaves
  // - when player is updated
  // - when player is ready
  // - when hotdog is generated

  useEffect(function addChannelHandlers () {
    channel.current
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('new presences', newPresences)
        setPlayers((prev) => concat(prev, newPresences))
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        setPlayers(prev => prev.filter((player) => !equals(player, leftPresences[0])))
      })
  }, [])

  useEffect(function joinRoomChannel () {
    channel.current.subscribe(async (status) => {
      if (!localStorage.getItem('creator')) {
        const { error: creatorInsertError, data } = await supabase.from('creators')
          .insert({})
          .select()

        if (creatorInsertError) return console.error(creatorInsertError)

        localStorage.setItem('creator', data?.[0].id)
      }

      const creatorId = localStorage.getItem('creator')

      const { data: existingCreatorAssociation } = await supabase.from('creators_hotdogs')
        .select()
        .eq('hotdog_code', roomId)
        .eq('creator_id', creatorId)

      if (!existingCreatorAssociation?.length) {
        await supabase.from('creators_hotdogs')
        .insert({ hotdog_code: roomId, creator_id: creatorId })
      }

      if (status === 'SUBSCRIBED') {
        await channel.current?.track({
          online_at: new Date().toISOString(),
          creatorId: localStorage.getItem('creator')
        })
      }
    })

    return () => {
      channel.current?.untrack()
      channel.current?.unsubscribe()
    }
  }, [])

  useEffect(function checkRoomExistsOnMount() {
    async function fetchRoomData () {
      const { error, data } = await supabase.from('hotdogs')
        .select()
        .eq('code', roomId)

      if (error || !data.length) {
        setRoomError(true)
      }

      if (data?.[0].image && data?.[0].finished) {
        console.log('image exists, navigate to the wall')
      }
    }

    fetchRoomData()
  }, [roomId])

  function onInputChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (allEmojisAdded) {
      inputRef.current.value = ''
      return
    }

    const { value } = e.target
    const emojiRegex = /\p{Emoji}/u

    if (emojiRegex.test(value)) {
      setEmojis(uniq([...emojis, value]))
      inputRef.current.value = ''
    }
  }

  function onEmojiClick (emojiData: EmojiClickData) {
    if (allEmojisAdded) return
    setEmojis(uniq([...emojis, emojiData.emoji]))
  }

  function closeEmojiPicker () {
    setEmojiPickerOpen(false)
  }

  function openEmojiPicker () {
    setEmojiPickerOpen(true)
  }

  function copyRoomLink () {
    const roomLink = window.location.href
    navigator.clipboard.writeText(roomLink)
    toast({ title: 'Copied room link to clipboard', description: roomLink, duration: 3000 })
  }

  if (roomError) {
    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>This room doesn't exist</AlertDialogTitle>
            <AlertDialogDescription>
              Please check the join link, or create a new room.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/')}>
              Back to home
            </AlertDialogCancel>
            <CreateRoomButton />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <div className={'container mx-auto'}>
      <h1>The Room</h1>

      {players?.map((player) => <p key={player.presence_ref}>{player.presence_ref}</p>)}

      <Button variant={'link'} onClick={copyRoomLink}>
        <Link2Icon style={{ marginRight: 8 }} />
        Copy Room Link
      </Button>

      {emojis.map((emoji) => (<span key={emoji}>{emoji}</span>))}

      <article className={'relative'}>
        <Input ref={inputRef} onChange={onInputChange} />
        <DropdownMenu open={emojiPickerOpen}>
          <DropdownMenuTrigger className={'absolute right-1 top-1/2 -translate-y-1/2'}>
            <Button variant={'ghost'} size={'sm'} onClick={openEmojiPicker}>
              <FaceIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent onInteractOutside={closeEmojiPicker} onEscapeKeyDown={closeEmojiPicker}>
            <EmojiPicker lazyLoadEmojis onEmojiClick={onEmojiClick} theme={'dark'} />
          </DropdownMenuContent>
        </DropdownMenu>
      </article>

      <Toggle disabled={!allEmojisAdded}>
        <CheckIcon style={{ marginRight: 8 }} />
        Ready
      </Toggle>

      <p className={'text-xs'}>
        Generation will start once all players have pressed
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button disabled={!allEmojisAdded} variant={'ghost'} size={'sm'} className={"text-xs font-bold ml-2 h-6 rounded-sm bg-slate-700"}>
                Ready
              </Button>
            </TooltipTrigger>
            {!allEmojisAdded && (
            <TooltipContent>
              You still need to add {5 - emojis.length} emoji{emojis.length === 4 ? '' : 's'}
            </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </p>
    </div>
  )
}

