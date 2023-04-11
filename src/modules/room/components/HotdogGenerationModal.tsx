import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/modules/common/components/Dialog"

export default function HotdogGenerationModal () {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generating hot dog</DialogTitle>
          <DialogDescription>
            Stand by while we generate your hot dog...

            <div className={'flex items-center mt-2 ml-2'}>
              <div className={'w-2 h-2 bg-white rounded-full animate-slide-in-out delay-600 opacity-0'} />
              <div className={'w-2 h-2 bg-white rounded-full animate-slide-in-out delay-300 opacity-0'} />
              <div className={'w-2 h-2 bg-white rounded-full animate-slide-in-out opacity-0'} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}



