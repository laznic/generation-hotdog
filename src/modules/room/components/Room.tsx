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
import { useRef, useState } from 'react'
import { uniq } from 'remeda'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/components/Tooltip"

export default function Room () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [emojis, setEmojis] = useState<string[]>([])
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const allEmojisAdded = emojis.length === 5

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

  return (
    <div className={'container mx-auto'}>
      <h1>The Room</h1>

      <Button variant={'link'}>
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

