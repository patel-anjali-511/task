"use client";

import { motion, Variants } from "framer-motion";
import { Course } from "@/lib/types";
import HeroTile from "./HeroTile";
import MetricsTile from "./MetricsTile";
import ActivityTile from "./ActivityTile";
import CourseCard from "./CourseCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

interface BentoGridProps {
  courses: Course[];
  userName: string;
  error?: string | null;
}

export default function BentoGrid({ courses, userName, error }: BentoGridProps) {
  return (
    <motion.div
      className="grid auto-rows-[minmax(160px,auto)] gap-4 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Row 1: Hero Tile (spans 2 cols) + 2 Metric tiles */}
      <motion.div
        variants={itemVariants}
        className="col-span-full lg:col-span-2"
      >
        <HeroTile userName={userName} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MetricsTile />
      </motion.div>

      {/* Row 2: Activity Chart (spans 2 cols) + Metrics overflow */}
      <motion.div
        variants={itemVariants}
        className="col-span-full lg:col-span-2"
      >
        <ActivityTile />
      </motion.div>

      {/* Row 3: Course Cards section header */}
      <motion.div
        variants={itemVariants}
        className="col-span-full flex items-center gap-3 py-2"
        style={{ minHeight: "auto" }}
      >
        <h2 className="text-lg font-bold text-white">Your Courses</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <span className="text-xs font-medium text-slate-500">
          {courses.length} courses
        </span>
      </motion.div>

      {/* Error state */}
      {error && (
        <motion.div
          variants={itemVariants}
          className="col-span-full rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center"
        >
          <span className="text-3xl">⚠️</span>
          <h3 className="mt-2 font-semibold text-red-400">
            Unable to load courses
          </h3>
          <p className="mt-1 text-sm text-red-400/60">{error}</p>
          <p className="mt-2 text-xs text-slate-500">
            Showing cached data. Check your Supabase connection.
          </p>
        </motion.div>
      )}

      {/* Course Cards */}
      {courses.map((course, index) => (
        <motion.div key={course.id} variants={itemVariants}>
          <CourseCard course={course} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
