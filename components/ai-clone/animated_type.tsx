

"use client";
import { motion } from "framer-motion";
import { useTypewriter } from "./useTypewriter";

interface animationProps {
    response: string[]
}

export default function AnimatedTypewriter({response}:animationProps) {
  const text = useTypewriter(response);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-xl md:text-xl font-bold "
    >
      {text}
      <span className="animate-pulse">|</span>
    </motion.h1>
  );
}
