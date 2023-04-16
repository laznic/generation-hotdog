import supabase from '@/supabase'
import { ArrowTopRightIcon, UpdateIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateRoomButton() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function createRoom() {
    setLoading(true)

    if (!localStorage.getItem('creator')) {
      const { error: creatorInsertError, data } = await supabase.from('creators')
        .insert({})
        .select()

      if (creatorInsertError) return console.error(creatorInsertError)

      localStorage.setItem('creator', data?.[0].id)
    }

    const creatorId = localStorage.getItem('creator')

    const { error, data: hotdogData } = await supabase.from('hotdogs')
      .insert({})
      .select()

    await supabase.from('creators_hotdogs')
      .insert({ hotdog_code: hotdogData?.[0].code, creator_id: creatorId })

    if (error) return console.error(error)

    navigate(`/room/${hotdogData?.[0].code}`)
  }

  return (
    <motion.button
      onClick={createRoom}
      className="relative flex items-center w-fit"
      disabled={loading}
      whileHover="hover"
      transition={{ duration: 0.2, ease: "easeInOut" }}>
      <motion.span variants={buttonVariants} className="relative font-bold text-xl md:text-2xl 2xl:text-4xl pb-2">
        BEGIN

        <motion.div
          variants={lineVariants}
          className="absolute bottom-0 left-0 h-[2px] bg-white"
          transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
        />
      </motion.span>

      <motion.div variants={arrowVariants} transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1  }}>
        {loading
          ? <UpdateIcon className="w-5 h-5 2xl:w-7 2xl:h-7 mb-2 xl:mb-1 animate-spin ml-2" />
          : <ArrowTopRightIcon className="w-7 h-7 2xl:w-11 2xl:h-11 mb-2 2xl:mb-1" />
        }
      </motion.div>
    </motion.button>
  )
}

const buttonVariants = {
  default: {
    y: 0,
  },
  hover: {
    y: -4,
  },
};

const lineVariants = {
  default: {
    width: "0%",
  },
  hover: {
    width: "100%",
  },
};

const arrowVariants = {
  default: {
    y: 0,
    x: 0
  },
  hover: {
    y: -6,
    x: 4
  }
}