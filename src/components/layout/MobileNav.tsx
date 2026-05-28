"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "courses", label: "Courses", icon: "📚" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "achievements", label: "Achievements", icon: "🏆" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function MobileNav() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#08081a]/95 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className="relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs"
            style={{
              color:
                activeItem === item.id
                  ? "rgb(167, 139, 250)"
                  : "rgb(100, 116, 139)",
            }}
            onClick={() => setActiveItem(item.id)}
            whileTap={{ scale: 0.9 }}
          >
            {activeItem === item.id && (
              <motion.div
                layoutId="mobile-nav-highlight"
                className="absolute inset-0 rounded-xl bg-violet-500/10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-lg">{item.icon}</span>
            <span className="relative z-10 font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
      {/* Safe area for mobile */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
