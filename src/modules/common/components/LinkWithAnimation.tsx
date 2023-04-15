import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface LinkWithAnimationProps {
  children: React.ReactNode;
  className?: string;
  to: string;
}

export default function LinkWithAnimation ({ children, className, to }: LinkWithAnimationProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      variants={buttonVariants}
      whileHover="hover" 
      transition={{ duration: 0.2, ease: "easeInOut" }}>
      <Link to={to} className="block py-2">
        {children}
      </Link>

      <motion.div
        variants={lineVariants}
        className="absolute bottom-0 left-0 h-[2px] bg-white"
        transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
      />
    </motion.div>
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