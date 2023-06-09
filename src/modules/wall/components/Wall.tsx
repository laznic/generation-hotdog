// @ts-nocheck
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useFetchAllHotdogs from "../hooks/useFetchAllHotdogs";

export default function Wall () {
  const { data } = useFetchAllHotdogs()

  if (!data.length) return null

  return (
    <div className="container mx-auto mt-[7vw] mb-8">
      <ul
        className="grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {data.map((hotdog) => (
          <motion.li
            className="rounded-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            key={hotdog.id}>
            <Link to={`/wall/${hotdog.id}`} className="bg-neutral-950 w-full">
              <img src={hotdog.image} className="aspect-video object-cover w-full h-full" />
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}