"use client";

import { motion } from "framer-motion";

interface AnimatedProgressProps {
  value: number;
  className?: string;
}

export default function AnimatedProgress({
  value,
  className = "",
}: AnimatedProgressProps) {
  // Determine color based on progress
  const getGradient = () => {
    if (value >= 80) return "from-emerald-400 to-cyan-400";
    if (value >= 50) return "from-violet-400 to-fuchsia-400";
    return "from-amber-400 to-orange-400";
  };

  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-white/5 ${className}`}
    >
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getGradient()}`}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.3,
        }}
      />
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getGradient()} blur-sm opacity-50`}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.3,
        }}
      />
    </div>
  );
}
