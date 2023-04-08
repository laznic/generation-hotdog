import { Button } from '@/modules/common/components/Button'
import { Toggle } from '@/modules/common/components/Toggle'
import { CheckIcon, Link2Icon } from '@radix-ui/react-icons'

export default function Room () {
  return (
    <div className={'container mx-auto'}>
      <h1>The Room</h1>

      <Button variant={'link'}>
        <Link2Icon style={{ marginRight: 8 }} />
        Copy Room Link
      </Button>

      <Toggle>
        <CheckIcon style={{ marginRight: 8 }} />
        Ready
      </Toggle>
      <span>
        Generation will start once all players have pressed "Ready"
      </span>
    </div>
  )
}

