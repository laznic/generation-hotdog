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

export default function Room () {
  const formRef = useRef<HTMLFormElement>(null)
  const [emojis, setEmojis] = useState<string[]>([])
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  function onEmojiClick (emojiData: EmojiClickData) {
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

      {emojis.map((emoji) => <span>{emoji}</span>)}

      <article className={'relative'}>
        <form ref={formRef} onSubmit={onSubmit}>
          <Input />
          <DropdownMenu open={emojiPickerOpen}>
            <DropdownMenuTrigger className={'absolute right-1 top-1/2 -translate-y-1/2'}>
              <Button variant={'ghost'} size={'sm'} onClick={openEmojiPicker}>
                <FaceIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent onInteractOutside={closeEmojiPicker} onEscapeKeyDown={closeEmojiPicker}>
              <EmojiPicker onEmojiClick={onEmojiClick} theme={'dark'} />
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
      </article>

      <Toggle>
        <CheckIcon style={{ marginRight: 8 }} />
        Ready
      </Toggle>

      <p className={'text-xs'}>
        Generation will start once all players have pressed
        <Button variant={'ghost'} size={'sm'} className={"text-xs font-bold ml-1 h-6 rounded-sm bg-slate-700"}>
          Ready
        </Button>
      </p>
    </div>
  )
}

