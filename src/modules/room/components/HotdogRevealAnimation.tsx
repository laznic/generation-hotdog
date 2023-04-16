
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface HotdogRevealAnimationProps {
  hotdog: {
    id: string | number,
    generated_prompt: string,
    generated_kanji: string,
    image: string
  }
}

export default function HotdogRevealAnimation ({ hotdog }: HotdogRevealAnimationProps) {
  const [showHotDogImage, setShowHotdogImage] = useState(false)
  const navigate = useNavigate()

  useEffect(function startRevealingHotdog () {
    setTimeout(() => {
      setShowHotdogImage(true)
    }, 9000)
  }, [])

  useEffect(function goToHotdogDetails() {
    setTimeout(() => {
      navigate(`/wall/${hotdog.id}`)
    }, 24000)
  }, [])

  return (
    <>
      <div className={'fixed w-full h-full top-0 left-0 z-[200] flex items-center justify-center text-black animate-fade-in-background'}>
        {showHotDogImage && (
          <div
            className={'grid max-w-lg rounded-md overflow-hidden w-full z-10 animate-hotdog-image opacity-0 scale-0 blur-xl shadow-2xl shadow-neutral-500'}>
            <section className={'ring-1 ring-black backdrop-blur-md'}>1
              <img src={hotdog.image} className={'animate-hotdog-image rounded-md opacity-0 scale-0 blur-xl mx-auto'}/>
            </section>
          </div> 
        )}

        <div className={'absolute z-10 w-4 h-4 rounded-full blur-sm bg-red-700 animate-wormhole-small '} />
        <div className={'absolute z-10 w-8 h-1 rounded-full blur-sm bg-red-700 animate-wormhole-small mix-blend-screen'} />
        <div className={'absolute z-10 w-1 h-1 rounded-full blur-sm bg-red-700 animate-wormhole-small mix-blend-hard-light'} />
        
        <div className={'absolute z-10 w-4 h-4 rounded-full blur-sm bg-pink-400 animate-wormhole-small delay-2500 opacity-0'} />
        <div className={'absolute z-10 w-8 h-1 rounded-full blur-sm bg-pink-400 animate-wormhole-small mix-blend-screen delay-2500 opacity-0'} />
        <div className={'absolute z-10 w-1 h-1 rounded-full blur-sm bg-pink-400 animate-wormhole-small mix-blend-hard-light delay-2500 opacity-0'} />
        
        <div className={'absolute z-10 w-4 h-4 rounded-full blur-sm bg-neutral-100 animate-wormhole-small delay-7500 opacity-0'} />
        <div className={'absolute z-10 w-8 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-screen delay-7500 opacity-0' } />
        <div className={'absolute z-10 w-1 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-hard-light delay-7500 opacity-0'} />

        <div className={'absolute w-48 h-48 rounded-full animate-wormhole opacity-0 duration-2000'}>
          <div className={'absolute w-full h-full rounded-full bg-black'} />
          <div className={'blur-md absolute -top-20 -left-20 -right-20 -bottom-20 -z-[1] rounded-full animate-pulse opacity-0 border-2 border-red-600 origin-center'} />
          <div className={'blur-md absolute -top-40 -left-40 -right-40 -bottom-40 -z-[1] rounded-full animate-pulse delay-900 opacity-0 border-2 border-red-600 origin-center'} />
          <div className={'blur-md absolute -top-60 -left-60 -right-60 -bottom-60 -z-[1] rounded-full animate-pulse delay-1500 opacity-0 border-2 border-red-600 origin-center'} />
          <div className={'blur-md absolute -top-80 -left-80 -right-80 -bottom-80 -z-[1] rounded-full animate-pulse delay-1200 opacity-0 border-2 border-red-600 origin-center'} />
          
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin delay-900 duration-3000 conic-gradient origin-center'} />
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin duration-4000 conic-gradient origin-center'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-red-600 to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin duration-4000 origin-center mix-blend-color-dodge'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-red-600 to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin delay-600 duration-3000 origin-center mix-blend-color-dodge'} />
        </div>

        <div className={'absolute w-48 h-48 rounded-full animate-wormhole delay-2700 opacity-0 duration-4000'}>
          <div className={'absolute w-full h-full rounded-full bg-black'} />
          <div className={'blur-md absolute -top-20 -left-20 -right-20 -bottom-20 -z-[1] rounded-full animate-pulse opacity-0 border-2 border-pink-200 origin-center'} />
          <div className={'blur-md absolute -top-40 -left-40 -right-40 -bottom-40 -z-[1] rounded-full animate-pulse delay-900 opacity-0 border-2 border-pink-200 origin-center'} />
          <div className={'blur-md absolute -top-60 -left-60 -right-60 -bottom-60 -z-[1] rounded-full animate-pulse delay-1500 opacity-0 border-2 border-pink-200 origin-center'} />
          <div className={'blur-md absolute -top-80 -left-80 -right-80 -bottom-80 -z-[1] rounded-full animate-pulse delay-1200 opacity-0 border-2 border-pink-200 origin-center'} />
          
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin delay-900 duration-3000 conic-gradient-pink origin-center'} />
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin duration-4000 conic-gradient-pink origin-center'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-pink-200 to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin duration-4000 origin-center mix-blend-color-dodge'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-pink-200 to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin delay-600 duration-3000 origin-center mix-blend-color-dodge'} />
        </div>

        <div className={'absolute w-48 h-48 rounded-full animate-wormhole delay-7700 opacity-0'}>
          <div className={'absolute w-full h-full rounded-full bg-black'} />
          <div className={'blur-md absolute -top-20 -left-20 -right-20 -bottom-20 -z-[1] rounded-full animate-pulse opacity-0 border-2 border-white origin-center'} />
          <div className={'blur-md absolute -top-40 -left-40 -right-40 -bottom-40 -z-[1] rounded-full animate-pulse delay-900 opacity-0 border-2 border-white origin-center'} />
          <div className={'blur-md absolute -top-60 -left-60 -right-60 -bottom-60 -z-[1] rounded-full animate-pulse delay-1500 opacity-0 border-2 border-white origin-center'} />
          <div className={'blur-md absolute -top-80 -left-80 -right-80 -bottom-80 -z-[1] rounded-full animate-pulse delay-1200 opacity-0 border-2 border-white origin-center'} />
          
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin delay-900 duration-3000 conic-gradient-white origin-center'} />
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin duration-4000 conic-gradient-white origin-center'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin duration-4000 origin-center mix-blend-color-dodge'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin delay-600 duration-3000 origin-center mix-blend-color-dodge'} />
        </div>

      </div>
    </>
  )
}



