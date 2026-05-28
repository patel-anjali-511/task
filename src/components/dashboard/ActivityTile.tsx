"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateActivityData } from "@/lib/mock-data";

const intensityColors = [
  "bg-white/[0.03]", // 0: none
  "bg-emerald-500/20", // 1: low
  "bg-emerald-500/40", // 2: medium
  "bg-emerald-500/60", // 3: high
  "bg-emerald-400/80", // 4: max
];

export default function ActivityTile() {
  const [activityData, setActivityData] = useState<number[][]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivityData(generateActivityData());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Only show last 20 weeks on smaller views
  const displayWeeks = activityData.slice(-20);

  return (
    <motion.article
      className="relative col-span-full overflow-hidden rounded-2xl border border-white/[0.06] p-5 lg:col-span-2"
      style={{
        background:
          "linear-gradient(135deg, rgba(6, 78, 59, 0.15) 0%, rgba(15, 23, 42, 0.4) 100%)",
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Learning Activity
            </h2>
            <p className="text-xs text-slate-400">Last 20 weeks</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Less</span>
            {intensityColors.map((color, i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-sm ${color}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-[3px] overflow-x-auto pb-1">
          {displayWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((intensity, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`h-2.5 w-2.5 rounded-sm ${intensityColors[intensity]} transition-colors hover:ring-1 hover:ring-white/20`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: weekIndex * 0.02 + dayIndex * 0.005,
                    duration: 0.2,
                  }}
                  title={`${intensity} activities`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-4 flex gap-4 text-xs">
          <div>
            <span className="font-bold text-emerald-400">847</span>
            <span className="ml-1 text-slate-400">contributions</span>
          </div>
          <div>
            <span className="font-bold text-emerald-400">12</span>
            <span className="ml-1 text-slate-400">day streak</span>
          </div>
          <div>
            <span className="font-bold text-emerald-400">4.2</span>
            <span className="ml-1 text-slate-400">hrs/week avg</span>
          </div>
        </div>
      </div>

      {/* Grain texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02]">
        <filter id="activity-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#activity-grain)" />
      </svg>
    </motion.article>
  );
}
