import HotdogEx from "@/modules/common/components/HotdogEx"
import { useEffect, useRef } from "react"
import VanillaTilt from "vanilla-tilt"

export default function HotdogDetails () {
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
    <div className="flex items-center justify-center w-full h-full">
      <div>
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
      </div>

      <div
        className={'grid shadow-2xl shadow-neutral-700 max-w-lg rounded-md overflow-hidden w-full z-10'} ref={cardRef}>
        <section className={'ring-1 ring-neutral-950 backdrop-blur-md'}>
          <img src="/placeholder-image.png" className={'animate-hotdog-image opacity-0 scale-0 blur-xl mx-auto'}/>
        </section>
      </div> 
    </div>
  )
}