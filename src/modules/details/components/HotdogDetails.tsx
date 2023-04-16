import HotdogEx from "@/modules/common/components/HotdogEx"
import supabase from "@/supabase"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import VanillaTilt from "vanilla-tilt"

export default function HotdogDetails () {
  const cardRef = useRef(null)
  const { id } = useParams()
  const [hotdog, setHotdog] = useState(null)
  
  useEffect(function fetchData () {
    async function fetch () {
      const { error, data } = await supabase.functions.invoke('fetch-single-hotdog', { id })

      setHotdog(data?.[0])
    }

    fetch()
  }, [id])

  useEffect(function addTiltHandling () {
    if (hotdog) {
      VanillaTilt.init(cardRef.current, {
        max: 10,
        speed: 750,
        glare: true,
        'max-glare': 0.25,
        scale: 1.15
      })
    }

  }, [hotdog])

  if (!hotdog) return null

  return (
    <div className="container mx-auto">
      <motion.div
        className="mt-[7vw] w-full h-full flex items-center justify-between"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
        <div>
          <HotdogEx
            hotdog={hotdog}
            noBackground
          />
          
          <details className="relative mt-8 text-neutral-400 max-w-lg">
            <summary className={'cursor-pointer'}>
              {'Meta data'}
            </summary>
            <div className={'cursor-pointer absolute mt-3 py-3 px-4 bg-neutral-900 border border-neutral-800 rounded-md'}>
              <ul className="pl-0">
                <li className={'border-b border-dashed border-neutral-700 pb-2 mb-2'}>
                  {`Emojis used: ${hotdog?.emojis.join('')}`}
                </li>
                <li>
                  {`Image prompt: ${hotdog?.image_prompt}`}
                </li>
              </ul>
            </div>
          </details>
        </div>

        <div
          className={'grid shadow-2xl shadow-neutral-700 max-w-lg rounded-md overflow-hidden w-full z-10'} ref={cardRef}>
          <section className={'ring-1 ring-neutral-950 backdrop-blur-md'}>
            <img src={hotdog?.image} className={'mx-auto'}/>
          </section>
        </div> 
      </motion.div>
    </div>
  )
}