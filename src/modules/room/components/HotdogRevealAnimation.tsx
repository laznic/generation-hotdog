import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/modules/common/components/Dialog"

export default function HotdogRevealAnimation () {
  return (
    <div className={'fixed w-full h-full top-0 left-0 z-[1000] bg-neutral-950 flex items-center justify-center'}>
      <div className={'absolute z-10 w-4 h-4 rounded-full blur-sm bg-white animate-wormhole-small'} />
      <div className={'absolute z-10 w-8 h-1 rounded-full blur-sm bg-white animate-wormhole-small mix-blend-screen'} />
      <div className={'absolute z-10 w-1 h-1 rounded-full blur-sm bg-white animate-wormhole-small mix-blend-hard-light'} />
      
      <div className={'absolute w-48 h-48 rounded-full animate-wormhole delay-600 opacity-0'}>
        <div className={'absolute w-full h-full rounded-full bg-neutral-950'} />
        <div className={'blur-md absolute -top-20 -left-20 -right-20 -bottom-20 -z-[1] transition-all rounded-full animate-pulse opacity-0 border-2 border-white origin-center'} />
        <div className={'blur-md absolute -top-40 -left-40 -right-40 -bottom-40 -z-[1] transition-all rounded-full animate-pulse delay-900 opacity-0 border-2 border-white origin-center'} />
        <div className={'blur-md absolute -top-60 -left-60 -right-60 -bottom-60 -z-[1] transition-all rounded-full animate-pulse delay-1500 opacity-0 border-2 border-white origin-center'} />
        <div className={'blur-md absolute -top-80 -left-80 -right-80 -bottom-80 -z-[1] transition-all rounded-full animate-pulse delay-1200 opacity-0 border-2 border-white origin-center'} />
        
        <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] transition-all rounded-full animate-spin delay-900 duration-3000 conic-gradient origin-center'} />
        <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] transition-all rounded-full animate-spin duration-4000 conic-gradient origin-center'} />
        <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 transition-all rounded-full animate-spin duration-4000 origin-center mix-blend-color-dodge'} />
        <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 transition-all rounded-full animate-spin delay-600 duration-3000 origin-cente mix-blend-color-dodge'} />
      </div>
    </div>
  )
}



