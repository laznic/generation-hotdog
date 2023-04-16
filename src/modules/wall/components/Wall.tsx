import supabase from "@/supabase";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetchAllHotdogs from "../hooks/useFetchAllHotdogs";

export default function Wall () {
  const { data } = useFetchAllHotdogs()

  if (!data.length) return null

  return (
    <div className="container mx-auto mt-[7vw]">
      <motion.ul
        initial="hidden"
        variants={list}
        animate="visible"
        className="grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {data.map((hotdog) => (
          <motion.li
            className="rounded-md overflow-hidden"
            variants={item}
            whileHover={{ scale: 1.05 }}
            key={hotdog.id}>
            <Link to={`/wall/${hotdog.id}`} className="bg-neutral-950 w-full">
              <img src={hotdog.image} className="aspect-video object-cover w-full h-full" />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -100 },
}