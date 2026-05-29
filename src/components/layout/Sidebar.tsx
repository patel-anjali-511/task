"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", href: "#" },
  { id: "courses", label: "Courses", icon: "📚", href: "#" },
  { id: "analytics", label: "Analytics", icon: "📊", href: "#" },
  { id: "achievements", label: "Achievements", icon: "🏆", href: "#" },
  { id: "settings", label: "Settings", icon: "⚙️", href: "#" },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileMenuOpen, toggleMobileMenu } = useDashboardStore();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveCollapsed = isTablet ? true : (isMobile ? false : sidebarCollapsed);
  const sidebarWidth = effectiveCollapsed ? 72 : 240;

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
            className="fixed inset-0 z-40 bg-[#06060e]/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/[0.06] bg-[#08081a]/95 backdrop-blur-xl shrink-0 md:relative md:translate-x-0 md:bg-[#08081a]/80 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        animate={{ width: sidebarWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-4">
        <motion.div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white"
          whileHover={{ scale: 1.05 }}
        >
          N
        </motion.div>
        <AnimatePresence>
          {!effectiveCollapsed && (
            <motion.span
              className="text-sm font-semibold text-white whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              NexLearn
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <div className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => (
          <motion.a
            key={item.id}
            href={item.href}
            className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
            style={{
              color:
                activeItem === item.id
                  ? "rgb(255, 255, 255)"
                  : "rgb(148, 163, 184)",
            }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            onClick={(e) => {
              e.preventDefault();
              setActiveItem(item.id);
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shared animated background highlight */}
            {(hoveredItem === item.id || activeItem === item.id) && (
              <motion.div
                layoutId="sidebar-highlight"
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    activeItem === item.id
                      ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(217, 70, 239, 0.1))"
                      : "rgba(255, 255, 255, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}

            {/* Active indicator bar */}
            {activeItem === item.id && (
              <motion.div
                layoutId="sidebar-active-bar"
                className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-400 to-fuchsia-400"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}

            <span className="relative z-10 text-lg">{item.icon}</span>
            <AnimatePresence>
              {!effectiveCollapsed && (
                <motion.span
                  className="relative z-10 whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        ))}
      </div>

      {/* Collapse toggle */}
      {!isTablet && (
        <div className="border-t border-white/[0.06] p-3">
          <motion.button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
            onClick={toggleSidebar}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            whileTap={{ scale: 0.97 }}
            aria-label={effectiveCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.span
              animate={{ rotate: effectiveCollapsed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              ◀
            </motion.span>
            <AnimatePresence>
              {!effectiveCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </motion.nav>
    </>
  );
}
