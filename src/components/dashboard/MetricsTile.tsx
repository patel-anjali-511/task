"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  gradient: string;
}

const metrics: Metric[] = [
  {
    id: "active-courses",
    label: "Active Courses",
    value: 4,
    suffix: "",
    icon: "📖",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "avg-score",
    label: "Avg Score",
    value: 78,
    suffix: "%",
    icon: "🎯",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "badges-earned",
    label: "Badges Earned",
    value: 12,
    suffix: "",
    icon: "🏅",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-2xl font-bold text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function MetricsTile() {
  return (
    <>
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.id}
          className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br ${metric.gradient} p-5 backdrop-blur-sm`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.03] blur-2xl" />

          <div className="relative z-10">
            <motion.span
              className="text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.2 + index * 0.1,
              }}
            >
              {metric.icon}
            </motion.span>

            <div className="mt-3">
              <AnimatedCounter target={metric.value} suffix={metric.suffix} />
            </div>

            <p className="mt-1 text-xs font-medium text-slate-400">
              {metric.label}
            </p>
          </div>

          {/* Grain texture */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02]">
            <filter id={`grain-${metric.id}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter={`url(#grain-${metric.id})`}
            />
          </svg>
        </motion.article>
      ))}
    </>
  );
}
