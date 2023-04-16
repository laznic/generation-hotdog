import HotdogEx from "@/modules/common/components/HotdogEx"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

import VanillaTilt from 'vanilla-tilt'

export default function HotdogRevealAnimation () {
  const cardRef = useRef(null)

  useEffect(function addTiltHandling () {
    VanillaTilt.init(cardRef.current, {
      max: 10,
      speed: 750,
      glare: true,
      'max-glare': 0.25,
      scale: 1.15
    })
  }, [])

  return (
    <>
      <div className={'fixed w-full h-full top-0 left-0 z-[200] flex items-center justify-center text-neutral-950 animate-fade-in-background'}>
        <motion.div>
          <HotdogEx
            hotdog={{
              id: 1,
              generated_prompt: 'a mouth-watering hot dog in a, futuristic, peachy, steamy, drool-worthy atmosphere',
              generated_kanji: '未来的なピーチ色の蒸気が立ち込める、よだれが出るような雰囲気の中で、おいしそうなホットドッグ。'
            }}
            noBackground
          />
          
          <details className="relative mt-8 text-neutral-400 max-w-lg">
            <summary className={'cursor-pointer'}>
              {'Meta data'}
            </summary>
            <div className={'cursor-pointer absolute mt-3 py-3 px-4 bg-neutral-900 border border-neutral-800 rounded-md'}>
              <ul className="pl-0">
                <li className={'border-b border-dashed border-neutral-700 pb-2 mb-2'}>
                  {'Emojis used: 🎉🥵💪😊🙌'}
                </li>
                <li>
                  {'Image prompt: ink illustration, {a suggestive, playful, sultry hot dog in a neon-lit, vibrant alleyway}, cyberpunk, highly detailed, golden ratio, natural light, bright colors'}
                </li>
              </ul>
            </div>
          </details>
        </motion.div>

        <motion.div
          className={'grid shadow-2xl shadow-neutral-700 max-w-lg rounded-md overflow-hidden w-full z-10'} ref={cardRef}>
          <section className={'ring-1 ring-neutral-950 backdrop-blur-md'}>
            <img src="/placeholder-image.png" className={'animate-hotdog-image opacity-0 scale-0 blur-xl mx-auto'}/>
          </section>
        </motion.div> 

        {/* <div className={'absolute z-10 w-4 h-4 rounded-full blur-sm bg-neutral-100 animate-wormhole-small '} />
        <div className={'absolute z-10 w-8 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-screen'} />
        <div className={'absolute z-10 w-1 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-hard-light'} />
        
        <div className={'absolute z-10 w-4 h-4 rounded-full blur-sm bg-neutral-100 animate-wormhole-small delay-1200 opacity-0'} />
        <div className={'absolute z-10 w-8 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-screen delay-1200 opacity-0'} />
        <div className={'absolute z-10 w-1 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-hard-light delay-1200 opacity-0'} />
        
        <div className={'absolute z-10 w-4 h-4 rounded-full blur-sm bg-neutral-100 animate-wormhole-small delay-3000 opacity-0'} />
        <div className={'absolute z-10 w-8 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-screen delay-3000 opacity-0' } />
        <div className={'absolute z-10 w-1 h-1 rounded-full blur-sm bg-neutral-100 animate-wormhole-small mix-blend-hard-light delay-3000 opacity-0'} />

        <div className={'absolute w-48 h-48 rounded-full animate-wormhole opacity-0 duration-2000'}>
          <div className={'absolute w-full h-full rounded-full bg-neutral-950'} />
          <div className={'blur-md absolute -top-20 -left-20 -right-20 -bottom-20 -z-[1] rounded-full animate-pulse opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-40 -left-40 -right-40 -bottom-40 -z-[1] rounded-full animate-pulse delay-900 opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-60 -left-60 -right-60 -bottom-60 -z-[1] rounded-full animate-pulse delay-1500 opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-80 -left-80 -right-80 -bottom-80 -z-[1] rounded-full animate-pulse delay-1200 opacity-0 border-2 border-neutral-100 origin-center'} />
          
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin delay-900 duration-3000 conic-gradient origin-center'} />
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin duration-4000 conic-gradient origin-center'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin duration-4000 origin-center mix-blend-color-dodge'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin delay-600 duration-3000 origin-cente mix-blend-color-dodge'} />
        </div>

        <div className={'absolute w-48 h-48 rounded-full animate-wormhole delay-1200 opacity-0 duration-4000'}>
          <div className={'absolute w-full h-full rounded-full bg-neutral-950'} />
          <div className={'blur-md absolute -top-20 -left-20 -right-20 -bottom-20 -z-[1] rounded-full animate-pulse opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-40 -left-40 -right-40 -bottom-40 -z-[1] rounded-full animate-pulse delay-900 opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-60 -left-60 -right-60 -bottom-60 -z-[1] rounded-full animate-pulse delay-1500 opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-80 -left-80 -right-80 -bottom-80 -z-[1] rounded-full animate-pulse delay-1200 opacity-0 border-2 border-neutral-100 origin-center'} />
          
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin delay-900 duration-3000 conic-gradient origin-center'} />
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin duration-4000 conic-gradient origin-center'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin duration-4000 origin-center mix-blend-color-dodge'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin delay-600 duration-3000 origin-cente mix-blend-color-dodge'} />
        </div>

        <div className={'absolute w-48 h-48 rounded-full animate-wormhole delay-3000 opacity-0'}>
          <div className={'absolute w-full h-full rounded-full bg-neutral-950'} />
          <div className={'blur-md absolute -top-20 -left-20 -right-20 -bottom-20 -z-[1] rounded-full animate-pulse opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-40 -left-40 -right-40 -bottom-40 -z-[1] rounded-full animate-pulse delay-900 opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-60 -left-60 -right-60 -bottom-60 -z-[1] rounded-full animate-pulse delay-1500 opacity-0 border-2 border-neutral-100 origin-center'} />
          <div className={'blur-md absolute -top-80 -left-80 -right-80 -bottom-80 -z-[1] rounded-full animate-pulse delay-1200 opacity-0 border-2 border-neutral-100 origin-center'} />
          
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin delay-900 duration-3000 conic-gradient origin-center'} />
          <div className={'blur-md absolute -top-1 -left-1 -right-1 -bottom-1 -z-[1] rounded-full animate-spin duration-4000 conic-gradient origin-center'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin duration-4000 origin-center mix-blend-color-dodge'} />
          <div className={'blur-md absolute bg-gradient-to-bl from-white to-transparent to-25% -top-4 -left-8 -right-8 -bottom-8 rounded-full animate-spin delay-600 duration-3000 origin-cente mix-blend-color-dodge'} />
        </div> */}

      </div>
    </>
  )
}



