"use client";

import { motion } from "framer-motion";

interface HeroTileProps {
  userName: string;
}

export default function HeroTile({ userName }: HeroTileProps) {
  const streak = 12; // Mock streak count

  return (
    <motion.article
      className="relative col-span-full overflow-hidden rounded-2xl border border-white/[0.06] p-6 lg:col-span-2"
      style={{
        background:
          "linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(30, 58, 138, 0.3) 100%)",
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-1 text-sm font-medium text-violet-300/80"
        >
          Good to see you again
        </motion.div>

        <motion.h1
          className="mb-4 text-2xl font-bold text-white md:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome back, {userName}! 👋
        </motion.h1>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Streak badge */}
          <div className="flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 backdrop-blur-sm">
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              🔥
            </motion.span>
            <div>
              <motion.span
                className="text-lg font-bold text-orange-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {streak}
              </motion.span>
              <span className="ml-1 text-sm text-slate-400">day streak</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 backdrop-blur-sm">
            <span className="text-lg">⚡</span>
            <span className="text-sm text-slate-300">3 lessons today</span>
          </div>
        </motion.div>
      </div>

      {/* Grain overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]">
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
    </motion.article>
  );
}
