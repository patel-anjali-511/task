"use client";

import { motion } from "framer-motion";

export default function SkeletonLoader() {
  const shimmer =
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent";

  return (
    <div className="flex h-screen w-full bg-[#06060e]">
      {/* Sidebar skeleton */}
      <aside className="hidden w-64 flex-col gap-4 border-r border-white/5 p-4 lg:flex">
        <div className={`h-10 w-32 rounded-lg bg-white/5 ${shimmer}`} />
        <div className="mt-6 flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-10 w-full rounded-lg bg-white/5 ${shimmer}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </aside>

      {/* Main content skeleton */}
      <main className="flex-1 p-6">
        <motion.div
          className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero tile */}
          <div
            className={`col-span-full rounded-2xl bg-white/5 lg:col-span-2 ${shimmer}`}
            style={{ minHeight: "200px" }}
          />

          {/* Metrics */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`metric-${i}`}
              className={`rounded-2xl bg-white/5 ${shimmer}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}

          {/* Activity tile */}
          <div
            className={`col-span-full rounded-2xl bg-white/5 lg:col-span-2 ${shimmer}`}
            style={{ minHeight: "180px" }}
          />

          {/* Course cards */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`course-${i}`}
              className={`rounded-2xl bg-white/5 ${shimmer}`}
              style={{ minHeight: "160px", animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
