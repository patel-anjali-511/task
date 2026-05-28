"use client";

import { motion } from "framer-motion";
import AnimatedProgress from "@/components/ui/AnimatedProgress";
import { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

// Rotate through subtle gradient backgrounds
const gradients = [
  "from-violet-500/[0.07] via-transparent to-fuchsia-500/[0.05]",
  "from-cyan-500/[0.07] via-transparent to-blue-500/[0.05]",
  "from-rose-500/[0.07] via-transparent to-pink-500/[0.05]",
  "from-emerald-500/[0.07] via-transparent to-teal-500/[0.05]",
  "from-amber-500/[0.07] via-transparent to-orange-500/[0.05]",
  "from-indigo-500/[0.07] via-transparent to-purple-500/[0.05]",
];

export default function CourseCard({ course, index }: CourseCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${gradient} p-5 backdrop-blur-sm`}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(255,255,255,0.12)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.02] blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

      <div className="relative z-10">
        {/* Icon + Completed badge */}
        <div className="mb-3 flex items-start justify-between">
          <motion.span
            className="text-3xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.1 + index * 0.05,
            }}
          >
            {course.icon_emoji}
          </motion.span>

          {course.is_completed && (
            <motion.div
              className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <span>✓</span>
              <span>Done</span>
            </motion.div>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-sm font-semibold text-white leading-snug">
          {course.title}
        </h3>

        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Progress</span>
            <motion.span
              className="font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {course.progress}%
            </motion.span>
          </div>
          <AnimatedProgress value={course.progress} />
        </div>
      </div>

      {/* Grain texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]">
        <filter id={`course-grain-${course.id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#course-grain-${course.id})`}
        />
      </svg>
    </motion.article>
  );
}
