import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HotdogRevealAnimation from "./HotdogRevealAnimation";

interface RedAnimationProps {
  hotdog: {
    id: string | number,
    generated_prompt: string,
    generated_kanji: string,
    image: string
  }
}

export default function RedAnimation ({ hotdog }: RedAnimationProps) {
  const [showSecondAnim, setShowSecondAnim] = useState(false)

  useEffect(function triggerSecondAnimLater () {
    setTimeout(() => setShowSecondAnim(true), 13000)
  }, [])

  useEffect(function playAudio () {
    const audio = document.getElementById('audio') as HTMLAudioElement
    audio.volume = 0.8
    audio.play()
  }, [])

  return (
    <>
    {showSecondAnim ? (
      <>
        <HotdogRevealAnimation hotdog={hotdog} />
        <div className={'fixed z-[150] top-0 left-0 right-0 bottom-0 mix-blend-multiply bg-black'} />
      </>
    ) : ( 
      <>
        <div
          className={'fixed z-[2000] top-0 left-0 right-0 bottom-0 mix-blend-color-burn bg-red-500'}
        />
        <div
          className={'fixed z-[2000] top-0 left-0 right-0 bottom-0 opacity-0 mix-blend-color-burn bg-red-500 animate-appear delay-2500 duration-0'}
        />
        <div
          className={'fixed z-[2000] top-0 left-0 right-0 bottom-0  opacity-0 mix-blend-color-burn bg-red-500 delay-5000 animate-appear'}
        />

        <div className="w-full h-2 bg-black absolute left-0 top-32 rotate-6 z-10" />
        <div className="w-full h-2 bg-black absolute left-0 top-12 z-10 animate-appear opacity-0 delay-2500" />
        <div className="w-full h-2 bg-black absolute left-0 top-10 -rotate-3 z-10 opacity-0 delay-2500 animate-appear" />
        <div className="w-full h-2 bg-black absolute left-0 top-10 rotate-3 z-10" />
        <div className="w-full h-2 bg-black absolute left-0 top-48 rotate-12 z-10 opacity-0 delay-5000 animate-appear" />
        <div className="w-full h-2 bg-black absolute left-0 -top-9 -rotate-12 z-10 opacity-0 delay-5000 animate-appear" />
        
        <div className="w-1/2 h-2 bg-black absolute left-0 top-2/3 rotate-6 z-10" />
        <div className="w-1/2 h-2 bg-black absolute left-0 top-[30vw] z-10 animate-appear opacity-0 delay-2500" />
        <div className="w-1/2 h-2 bg-black absolute left-0 top-2/3 -rotate-3 z-10 opacity-0 delay-2500 animate-appear" />
        <div className="w-1/2 h-2 bg-black absolute left-0 top-[32vw] rotate-3 z-10" />
        <div className="w-1/2 h-2 bg-black absolute left-0 top-1/2 rotate-12 z-10 opacity-0 delay-5000 animate-appear" />
        <div className="w-1/2 h-2 bg-black absolute left-0 top-1/2 -rotate-12 z-10 opacity-0 delay-5000 animate-appear" />

        {/* <motion.div
          className={'fixed z-[2100] top-1/2 -translate-y-1/2 scale-0 w-48 h-48 rounded-full blur bg-black backdrop-blur-md'}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 20, opacity: 1 }}
          transition={{ delay: 6, duration: 7}}
        /> */}

        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 20, skewX: 10, skewY: 7, rotate: 175 }}
          transition={{ delay: 5, duration: 10 }}
          className={'fixed z-[2100] top-0 left-0 scale-0 w-48 h-48 rounded-full backdrop-blur-sm border border-red-500 bg-black'}
        />
        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 19.99, skewX: 10, skewY: 7, rotate: 175 }}
          transition={{ delay: 5, duration: 10 }}
          className={'fixed z-[2100] top-0 left-0 scale-0 w-48 h-48 rounded-full backdrop-blur-sm mix-blend-difference bg-black blur'}
        />

        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 20, skewX: 10, skewY: 7, rotate: 175 }}
          transition={{ delay: 7, duration: 10 }}
          className={'fixed z-[2080] top-1/3 left-1/3 scale-0 w-48 h-48 rounded-full backdrop-blur-sm border border-red-500 bg-black'}
        />
        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 19.99, skewX: 10, skewY: 7, rotate: 175 }}
          transition={{ delay: 7, duration: 10 }}
          className={'fixed z-[2080] top-1/3 left-1/3 scale-0 w-48 h-48 rounded-full backdrop-blur-sm mix-blend-difference bg-black blur'}
        />

        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 20, skewX: 5, skewY: 12, rotate: 175 }}
          transition={{ delay: 8, duration: 10 }}
          className={'fixed z-[2105] top-1/2 left-2/3 scale-0 w-48 h-48 rounded-full backdrop-blur-sm border border-red-500 bg-black'}
        />
        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 19.99, skewX: 5, skewY: 12, rotate: 175 }}
          transition={{ delay: 8, duration: 10 }}
          className={'fixed z-[2105] top-1/2 left-2/3 scale-0 w-48 h-48 rounded-full backdrop-blur-sm mix-blend-difference bg-black blur'}
        />

        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 20, skewX: 2, skewY: 2, rotate: 90 }}
          transition={{ delay: 8.5, duration: 10 }}
          className={'fixed z-[2110] top-1/4 right-1/3 scale-0 w-48 h-48 rounded-full backdrop-blur-sm border border-red-500 bg-black'}
        />
        <motion.div
          initial={{ scale: 0, skewX: 0, skewY: 0, rotate: 0 }}
          animate={{ scale: 19.99, skewX: 2, skewY: 2, rotate: 90 }}
          transition={{ delay: 8.5, duration: 10 }}
          className={'fixed z-[2110] top-1/4 right-1/3 scale-0 w-48 h-48 rounded-full backdrop-blur-sm mix-blend-difference bg-black blur'}
        />
      </>
     )}
  </>
  )
}