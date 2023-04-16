// @ts-nocheck
import { Button } from '@/modules/common/components/Button'
import { motion, AnimatePresence } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/modules/common/components/DropdownMenu"

import { CheckCircledIcon, ChevronDownIcon, Cross2Icon, CrossCircledIcon, FaceIcon, Link2Icon, PersonIcon } from '@radix-ui/react-icons'
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
import { useToast } from '@/hooks/useToast'
import { calculateReadingTime } from '@/util'
import PhotosensitivityWarning from './PhotosensitivityWarning';
import RedAnimation from './RedAnimation';
import HotdogEx from '@/modules/common/components/HotdogEx';

export default function Room () {
  const [emojis, setEmojis] = useState<string[]>([])
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const [roomError, setRoomError] = useState(false)
  const allEmojisAdded = emojis.length === 5
  const { roomId } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()
  const channel = useRef(supabase.channel(`room-${roomId}`))
  const [players, setPlayers] = useState<{ creatorId: string, ready: boolean, name: string }[]>([])
  const isSelf = (creatorId: string) => creatorId === localStorage.getItem('creator')
  const [readyInState, setReadyInState] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [beginAnimation, setBeginAnimation] = useState(false)
  const [showLayover, setShowLayover] = useState({})
  const [roomLinkCopied, setRoomLinkCopied] = useState(false)

  useEffect(function addChannelHandlers () {
    channel.current
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        setPlayers((prev) => concat(prev, newPresences))
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        setPlayers(prev => prev.filter((player) => !equals(player, leftPresences[0])))
      })
      .on('broadcast', { event: 'ready' }, ({ payload }) => {
        setPlayers((prev) => prev.map((player) => {
          if (player.creatorId === payload.creatorId) {
            return { ...player, ready: payload.ready }
          }

          return player
        }))
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'hotdogs', filter: `code=eq.${roomId}` }, ({ new: updatedRecord }) => {
        if (updatedRecord.status === 'GENERATING') {
          setIsGenerating(true)
        }

        if (updatedRecord.status === 'FINISHED') {
          setShowLayover(updatedRecord)
        }
      })
  }, [])

  useEffect(function joinRoomChannel () {
    channel.current.subscribe(async (status) => {
      if (!localStorage.getItem('creator')) {
        const { data } = await supabase.functions.invoke('add-creator')
        const { error: creatorInsertError, data: created } = data
        if (creatorInsertError) return console.error(creatorInsertError)

        localStorage.setItem('creator', created?.[0].id)
      }

      const creatorId = localStorage.getItem('creator')

      const { data: associationFetch } = await supabase.functions.invoke('add-hotdog-association', {
        body: {
          hotdogCode: roomId,
          creatorId
        }
      })
      const { data: existingCreatorAssociation } = associationFetch

      if (status === 'SUBSCRIBED') {
        setEmojis(existingCreatorAssociation?.[0].picked_emojis || [])
        setReadyInState(!!existingCreatorAssociation?.[0].ready)

        await channel.current?.track({
          online_at: new Date().toISOString(),
          creatorId: localStorage.getItem('creator'),
          ready: !!existingCreatorAssociation?.[0]?.ready,
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
      const { data } = await supabase.functions.invoke('fetch-room', { body: { roomId } })
      const { error, data: room } = data

      if (error || !room.length) {
        setRoomError(true)
      }

      if (room?.[0].image && room?.[0].status === 'FINISHED') {
        return navigate(`/wall/${room?.[0].id}`)
      }
    }

    fetchRoomData()
  }, [roomId])

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

  function clearEmojis () {
    setEmojis([])
    readyUp(false)
  }

  function copyRoomLink () {
    const roomLink = window.location.href
    navigator.clipboard.writeText(roomLink)
    toast({ title: 'Copied room link to clipboard', description: roomLink, duration: 3000 })
    setRoomLinkCopied(true)
  }

  async function readyUp (ready: boolean) {
    const creatorId = localStorage.getItem('creator')
    setReadyInState(ready)

    const { data } = await supabase.functions.invoke('update-creator', {
      body: {
        ready, 
        emojis,
        creatorId,
        roomId
      }
    })

    const { error } = data

    if (error) return console.error(error)

    channel.current?.send({
      type: 'broadcast',
      event: 'ready',
      payload: {
        creatorId,
        ready
      }
    })
  }

  useEffect(function hideLayoverAfterReading () {
    if (showLayover.status !== 'FINISHED') return

    setTimeout(() => {
      setShowLayover({})
      setBeginAnimation(true)
    }, calculateReadingTime(`Hotdog-ex ${showLayover.generated_prompt}`) * 1000)
  }, [showLayover])

  if (roomError) {
    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">This room doesn't exist</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Please check the join link and try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/')}>
              Back to home
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      className={'mt-[7vw] relative container mx-auto grid grid-cols-2 gap-8'}>
        <PhotosensitivityWarning />

        {!!showLayover.id && <HotdogEx hotdog={showLayover} />}
        {beginAnimation && <RedAnimation hotdog={showLayover} />}

        <section>
          <h1 className="relative">
            <svg className="fill-neutral-100 min-w-[20rem] w-[35vw] max-w-2xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 505.76 130.88">s<path d="M22.35,2.76H0v1.53H.61c3.21,0,5.05,1.53,5.05,5.51V102.87c0,3.83-1.84,5.51-5.05,5.51H0v1.53H18.06v-1.53h-.61c-3.21,0-4.9-1.68-4.9-5.51v-37.35c1.22,1.53,3.98,3.67,9.64,3.67,12.09,0,24.95-8.73,24.95-33.22S34.6,2.91,22.35,2.76Zm-.15,64.9c-5.66,0-8.42-2.14-9.64-3.83V5.66c0-.77,.61-1.38,1.38-1.38h8.27c6.28,0,18.37,4.13,18.37,31.69s-12.09,31.69-18.37,31.69Z"/><path d="M54.04,4.29h.61c3.21,0,5.05,1.53,5.05,5.51V102.87c0,3.83-1.84,5.51-5.05,5.51h-.61v1.53h18.06v-1.53h-.61c-3.21,0-4.9-1.68-4.9-5.51V9.8c0-3.98,1.68-5.51,4.9-5.51h.61v-1.53h-18.06v1.53Z"/><path d="M117.1,92.76c-4.29,9.95-8.88,16.69-14.85,16.69s-16.69-7.65-16.69-53.12S96.13,3.06,102.25,3.06s12.09,6.28,15.77,16.38c1.99,5.51,3.21,8.42,5.05,22.35,.61-.15,.92-.15,1.53-.31L119.55,1.53c-.46,4.59-1.99,6.43-3.67,6.43-.92,0-1.68-.46-2.45-1.22-1.99-2.14-5.97-5.2-11.17-5.2-11.94,0-23.27,14.54-23.27,54.8s11.33,54.8,23.27,54.8c5.2,0,8.42-2.91,10.87-4.59,.92-.61,1.68-.92,2.6-.92,1.99,0,3.83,1.84,4.29,6.89l5.05-46.54c-.46,0-.92,0-1.53-.15-2.14,16.53-3.67,20.67-6.43,26.94Z"/><path d="M173.28,95.83l-20.05-60.77,15.61-25.72c1.38-2.45,3.52-5.05,7.65-5.05h1.22v-1.53h-16.84v1.53h5.97c1.68,0,2.3,1.38,.77,4.29l-23.27,38.42V9.34c0-3.37,1.22-5.05,4.9-5.05h.61v-1.53h-18.06v1.53h.61c3.83,0,4.9,1.68,5.05,5.05V103.17c-.15,3.52-1.22,5.2-5.05,5.2h-.61v1.53h18.06v-1.53h-.61c-3.67,0-4.9-1.68-4.9-5.2V49.6l3.98-6.74,20.51,60.31c1.22,3.67-.46,5.2-3.37,5.2h-.77v1.53h18.06v-1.53h-.92c-5.36,0-6.58-5.97-8.57-12.55Z"/><path d="M275.08,92.76c-4.13,13.16-11.48,15.61-24.49,15.61h-1.38c-3.21,0-4.9-1.68-4.9-5.51V40.87h8.88c7.35,0,12.4,3.06,12.4,9.49v4.44h1.53V25.56h-1.53v4.44c0,6.43-5.05,9.49-12.4,9.49h-8.88V9.64c0-3.83,1.68-5.36,4.9-5.36h1.38c13.01,0,20.36,2.45,24.49,15.46l2.14,6.89,1.38-.46L270.49,0s-.92,2.45-5.36,2.76h-33.37v1.53h.61c3.21,0,5.05,1.53,5.05,5.36V102.87c0,3.83-1.84,5.51-5.05,5.51h-.61v1.53h33.06c4.75,.15,5.66,2.76,5.66,2.76l8.73-27.86-1.53-.46-2.6,8.42Z"/><path d="M318.4,91.69L302.02,2.76h-15.92v1.53h3.37c3.83,0,4.9,1.68,4.9,5.2V103.17c0,3.52-1.07,5.2-4.9,5.2h-3.37v1.53h18.06v-1.53h-3.37c-3.67,0-4.9-1.68-4.9-5.2V12.25l19.29,97.66h1.53l17.45-95.52V102.87c0,3.83-1.68,5.51-4.9,5.51h-.61v1.53h18.06v-1.53h-.61c-3.21,0-4.9-1.68-4.9-5.51V9.8c0-3.98,1.68-5.51,4.9-5.51h.61v-1.53h-12.09l-16.23,88.94Z"/><path d="M376.88,1.53c-11.94,0-23.27,14.54-23.27,54.8s11.02,54.8,23.27,54.8,23.42-14.54,23.42-54.8S389.12,1.53,376.88,1.53Zm0,108.07c-6.12,0-16.69-7.81-16.69-53.27s10.41-53.12,16.69-53.12,16.84,7.65,16.84,53.12-10.56,53.27-16.84,53.27Z"/><path d="M407.03,4.44h.77c3.21,0,5.21,1.68,5.21,5.82V100.57c0,13.32-.92,25.87-10.41,30.31,13.16-2.3,17.76-12.4,17.76-29.24V10.26c0-4.13,1.84-5.82,5.2-5.82h.77v-1.68h-19.29v1.68Z"/><path d="M433.21,4.29h.61c3.21,0,5.05,1.53,5.05,5.51V102.87c0,3.83-1.84,5.51-5.05,5.51h-.61v1.53h18.06v-1.53h-.61c-3.21,0-4.9-1.68-4.9-5.51V9.8c0-3.98,1.68-5.51,4.9-5.51h.61v-1.53h-18.06v1.53Z"/><path d="M466.73,18.52c0-9.49,4.9-15,13.62-15,11.17,0,19.13,16.84,20.82,31.23l1.07-.15L498.57,.15c-.31,3.21-.61,5.51-1.68,6.58-1.07,.92-2.6,1.22-3.83,.15-1.84-1.53-5.05-5.36-14.85-5.36-9.03,0-16.84,7.65-16.84,17.14,0,32.91,37.5,38.88,37.5,72.56,0,10.1-5.36,18.06-13.32,18.06-18.98,0-23.73-29.54-25.72-43.32l-1.68,.15,5.97,46.54c.31-5.2,1.99-7.96,4.13-7.96,.92,0,1.84,.31,2.91,1.22,2.6,1.99,5.82,5.2,14.24,5.2,9.49,0,20.36-6.74,20.36-24.8,0-32.91-39.03-43.78-39.03-67.81Z"/></svg>
            <p className="font-kanji text-4xl md:text-5xl 2xl:text-7xl tracking-tighter text-white">
              絵文字を選ぶ
            </p>
          </h1>

          <section className="flex items-center mt-8 mb-32 flex-wrap">
            {emojis.map((emoji) => (<span className="text-7xl" key={emoji}>{emoji}</span>))}
            {!!emojis.length && (
              <Button
                className="dark:hover:bg-neutral-900 text-lg h-20 rounded-full dark:focus:ring-white"
                variant={'ghost'}
                size={'lg'}
                onClick={clearEmojis}>
                <Cross2Icon />
              </Button>
            )}

            {!allEmojisAdded && (
              <article className={'relative'}>
                <DropdownMenu open={emojiPickerOpen}>
                  <DropdownMenuTrigger onClick={openEmojiPicker} className="dark:hover:bg-neutral-900 text-4xl h-20 flex items-center px-8">
                    <FaceIcon className="w-8 h-8 text-neutral-300" />
                    <ChevronDownIcon className="ml-2" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="dark:bg-neutral-900 dark:border-neutral-800" onInteractOutside={closeEmojiPicker} onEscapeKeyDown={closeEmojiPicker}>
                    <EmojiPicker onEmojiClick={onEmojiClick} theme={'dark'} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </article>
            )}
          </section>

          <section className="mb-12">
            <h2 className="mb-2 text-6xl">
              <svg className="fill-neutral-100 min-w-[15rem] w-[22vw] max-w-2xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 354.47 73.83"><path d="M5.91,14.01c0-5.82,3.02-9.16,8.29-9.16,6.6,0,11.69,9.84,12.81,19.36l.03,.25,1.16-.17L25.61,0l-.24,2.46c-.18,1.87-.36,3.36-.97,3.96-.51,.43-1.36,.72-2.08,.09-.11-.09-.23-.2-.37-.32-1.21-1.08-3.48-3.1-9.11-3.1S2.05,8.14,2.05,14.1c0,10.36,5.96,16.6,11.73,22.64,5.8,6.07,11.79,12.34,11.79,22.86,0,6.42-3.41,11.08-8.1,11.08-11.99,0-14.81-19.58-15.88-26.95l-.03-.23-1.55,.14,3.78,29.44,.5-.02c.17-2.93,1.07-4.76,2.34-4.76,.58,0,1.09,.22,1.67,.72,.15,.11,.3,.23,.46,.36,1.58,1.25,3.74,2.96,8.62,2.96,6,0,13.02-4.14,13.02-15.8s-7.3-18.53-13.75-24.97c-5.52-5.51-10.73-10.72-10.73-17.56Z"/><path d="M54.08,5.33h.63c1.98,0,2.82,.96,2.82,3.21V26.91h-14.95V8.53c0-2.25,.84-3.21,2.82-3.21h.63v-1.46h-11.83v1.46h.63c2.02,0,2.92,.99,2.92,3.21v58.36c0,2.16-.95,3.21-2.92,3.21h-.63v1.46h11.83v-1.46h-.63c-1.93,0-2.82-1.02-2.82-3.21V28.37h14.95v38.53c0,2.19-.9,3.21-2.82,3.21h-.63v1.46h11.83v-1.46h-.73c-1.9,0-2.82-1.05-2.82-3.21V8.53c0-2.19,.9-3.21,2.82-3.21h.73v-1.46h-11.83v1.46Z"/><path d="M103.15,68.48L90.15,2.14h-1.31v.24s-.22,4.58-2.56,4.75l-.28,.02,.71,3.78-11.7,55.91c-.38,1.52-1.11,3.27-3.41,3.27h-1.88v1.46h11.83v-1.46h-2.36c-1.15,0-1.96-.29-2.42-.86-.46-.57-.57-1.44-.31-2.58l3.89-18.52h13.41l3.9,20.06c.18,.75,.15,1.28-.09,1.57-.17,.22-.47,.33-.92,.33h-1.88v1.46h11.73v-1.46h-1.69c-1.06,0-1.49-.41-1.67-1.62Zm-9.57-21.8h-12.83l6.69-31.7,6.14,31.7Z"/><path d="M138.74,63.59c-.26-.41-.52-.83-.77-1.23l-12.76-23.06c9.56-.21,15.96-7.47,15.96-18.2,0-11.32-8.38-17.24-16.67-17.24h-14.17v1.46h.63c2.34,0,2.83,1.03,2.92,2.92v58.83c-.1,2.26-.83,3.02-2.92,3.02h-.63v1.46h11.44v-1.46h-.25c-2.08,0-2.82-.84-2.82-3.21v-29.02l16.92,29.35c.57,.85,1.04,1.8,1.42,2.56,.5,1.1,1.62,1.78,2.92,1.78h5.63v-1.46h-.72c-2.1-.08-4.05-3.2-6.12-6.51ZM118.7,5.85c0-.25,.27-.52,.52-.52h5.28c4.5,0,12.04,2.05,12.04,15.78,0,15.62-9.21,16.84-12.04,16.84-3.54,0-5.14-1.37-5.8-2.23V5.85Z"/><path d="M176.58,60.49c-2.55,8.13-7.09,9.62-15.12,9.62h-.86c-1.93,0-2.82-1.02-2.82-3.21V28.27h5.32c4.78,0,7.53,2.08,7.53,5.7v3.03h1.46V18.17h-1.46v3.03c0,3.62-2.74,5.7-7.53,5.7h-5.32V8.44c0-2.18,.84-3.11,2.82-3.11h.86c8.02,0,12.56,1.47,15.12,9.52l1.42,4.56,1.34-.45-5.37-17.33-.26,.66c-.02,.06-.57,1.39-3.14,1.57h-21.17v1.46h.63c1.99,0,2.92,.99,2.92,3.11v58.46c0,2.16-.95,3.21-2.92,3.21h-.63v1.46h20.98c2.75,.09,3.3,1.5,3.32,1.56l.25,.71,5.7-18.19,.08-.24-1.44-.43-1.7,5.51Z"/><path d="M238.29,63.59c-.26-.41-.52-.83-.77-1.23l-12.76-23.06c9.56-.21,15.96-7.47,15.96-18.2,0-11.32-8.38-17.24-16.67-17.24h-14.17v1.46h.63c2.34,0,2.83,1.03,2.92,2.92v58.83c-.1,2.26-.83,3.02-2.92,3.02h-.63v1.46h11.44v-1.46h-.25c-2.08,0-2.82-.84-2.82-3.21v-29.02l16.92,29.35c.57,.85,1.04,1.8,1.42,2.56,.5,1.1,1.62,1.78,2.92,1.78h5.63v-1.46h-.72c-2.1-.08-4.05-3.2-6.12-6.51ZM218.25,5.85c0-.25,.27-.52,.52-.52h5.28c4.5,0,12.04,2.05,12.04,15.78,0,15.62-9.21,16.84-12.04,16.84-3.54,0-5.14-1.37-5.8-2.23V5.85Z"/><path d="M263.79,3.1c-9.29,0-14.84,12.94-14.84,34.62s5.55,34.62,14.84,34.62c4.49,0,14.94-3.37,14.94-34.62,0-21.67-5.58-34.62-14.94-34.62Zm0,67.77c-2.4,0-10.21-2.39-10.21-33.16s7.14-33.06,10.21-33.06,10.31,3.22,10.31,33.06-7.21,33.16-10.31,33.16Z"/><path d="M297.3,3.1c-9.29,0-14.84,12.94-14.84,34.62s5.55,34.62,14.84,34.62c4.49,0,14.94-3.37,14.94-34.62,0-21.67-5.58-34.62-14.94-34.62Zm0,67.77c-2.4,0-10.21-2.39-10.21-33.16s7.14-33.06,10.21-33.06,10.31,3.22,10.31,33.06-7.21,33.16-10.31,33.16Z"/><path d="M353.84,5.33h.63v-1.46h-8.04l-9.97,54.63-10.02-54.43-.04-.21h-10.44v1.46h2.36c2.11,0,2.82,.76,2.82,3.01v58.75c0,2.25-.71,3.01-2.82,3.01h-2.36v1.46h11.83v-1.46h-2.36c-2.06,0-2.82-.82-2.82-3.01V12.63l11.6,58.74,.04,.2h1.37l10.48-57.39v52.72c0,2.19-.9,3.21-2.82,3.21h-.63v1.46h11.83v-1.46h-.63c-1.93,0-2.82-1.02-2.82-3.21V8.53c0-2.25,.84-3.21,2.82-3.21Z"/></svg>
              <p className="font-kanji text-3xl md:text-2xl 2xl:text-4xl tracking-tighter text-white">
                シェアルーム
              </p>
            </h2>

            <Button variant={'link'} onClick={copyRoomLink} className="text-xl pl-0">
              <Link2Icon className="mr-2" />
              Copy room link
            </Button>
          </section>

          <article className="w-96 py-3 px-8 text-lg border bg-neutral-950 border-neutral-800 rounded-none">
            <ol className="list-decimal grid gap-1">
              <li className="line-through text-neutral-400">
                <span className="flex items-center gap-1">
                  Start by creating a room
                </span>
              </li>

              <li className={roomLinkCopied ? 'line-through text-neutral-400' : ''}>
                Invite your friends to join (optional)
              </li>

              <li className={allEmojisAdded ? 'line-through text-neutral-400' : ''}>
                Pick emojis you'd like to use for generation
              </li>

              <li>
                Once everyone is <span className="font-bold">ready</span>, sit back and enjoy the experience
              </li>
            </ol>
          </article>
        </section>

        <section className="grid mt-10">
          <section className="flex items-start gap-6 justify-end flex-wrap">
            {players?.map((player) => (
              <article key={player.creatorId} className={`relative grid items-center justify-center text-center w-fit ${player.ready || (isSelf(player.creatorId) && readyInState) ? 'text-white' : 'text-neutral-700'}`}>
                {player.ready || (isSelf(player.creatorId) && readyInState) ? (
                  <article className="absolute text-white rounded-full top-4 -left-5">
                    <CheckCircledIcon className="w-6 h-6"/>
                  </article>
                ) : (
                  <article className="absolute text-neutral-500 rounded-full top-4 -left-5">
                    <CrossCircledIcon className="w-6 h-6" />
                  </article>
                )}
                <PersonIcon className="w-12 h-12" />
                {isSelf(player.creatorId) && <span>You</span>}
              </article>
            ))}
          </section>

          <section className="absolute bottom-56 right-0 flex flex-col h-fit items-end justify-end mt-14">
            {isGenerating ? (
              <>
                <motion.div
                  className="relative flex items-center w-fit"
                  animate={'hover'}
                  transition={{ duration: 0.2, ease: "easeInOut" }}>
                  <motion.span variants={buttonVariants} className="inline-flex items-center opacity-50 relative font-bold text-xl md:text-2xl 2xl:text-4xl pb-2">
                    {beginAnimation ? <span className="font-kanji">警告、誤動作?</span> : 'GENERATING'}
                    
                    {!beginAnimation && (
                      <div className={'flex items-center ml-4'}>
                        <div className={'w-2 h-2 bg-neutral-100 rounded-full animate-slide-in-out delay-600 opacity-0'} />
                        <div className={'w-2 h-2 bg-neutral-100 rounded-full animate-slide-in-out delay-300 opacity-0'} />
                        <div className={'w-2 h-2 bg-neutral-100 rounded-full animate-slide-in-out opacity-0'} />
                      </div>
                    )}
    
                    <motion.div
                      variants={lineVariants}
                      className="absolute bottom-0 left-0 h-[2px] bg-neutral-100"
                      transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
                    />
                  </motion.span>
                </motion.div>
                <p className={'text-lg text-neutral-500 mb-2'}>
                  This can take a while, so please be patient.
                </p>
              </>
            ) : (
              <>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                    <motion.button
                        onClick={() => readyUp(!readyInState)}
                        className="relative flex items-center w-fit"
                        disabled={!allEmojisAdded}
                        animate={readyInState ? 'hover' : 'default'}
                        transition={{ duration: 0.2, ease: "easeInOut" }}>
                        <motion.span variants={buttonVariants} className="inline-flex items-center opacity-50 relative font-bold text-xl md:text-2xl 2xl:text-4xl pb-2">
                          READY
                          {readyInState ? <CheckCircledIcon className="w-6 h-6 ml-2 2xl:mt-1" /> : <CrossCircledIcon className="ml-2 w-6 h-6 2xl:mt-1" />}
                          <motion.div
                            variants={lineVariants}
                            className="absolute bottom-0 left-0 h-[2px] bg-neutral-100"
                            transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
                          />
                        </motion.span>
                      </motion.button>
                    </TooltipTrigger>
                    {!allEmojisAdded && (
                    <TooltipContent className="rounded-sm dark:bg-neutral-950">
                      You still need to add {5 - emojis.length} emoji{emojis.length === 4 ? '' : 's'}
                    </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                <p className={'text-lg text-neutral-500 mb-2'}>
                  Generation will start once all players are ready.
                </p>
              </>
            )}
          
          </section>
        </section>
      </motion.div>
    </AnimatePresence>
  )
}

const buttonVariants = {
  default: {
    y: 0,
    opacity: 0.5
  },
  hover: {
    y: -4,
    opacity: 1
  },
};

const lineVariants = {
  default: {
    width: "0%",
  },
  hover: {
    width: "100%",
  },
};
