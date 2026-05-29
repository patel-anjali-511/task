"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import { Course } from "@/lib/types";
import Sidebar from "@/components/layout/Sidebar";
import BentoGrid from "@/components/dashboard/BentoGrid";

interface DashboardClientProps {
  initialCourses: Course[];
  userName: string;
  error: string | null;
}

export default function DashboardClient({
  initialCourses,
  userName,
  error,
}: DashboardClientProps) {
  const { setCourses, setUserName, setError, toggleMobileMenu } =
    useDashboardStore();

  // Initialize store with server-fetched data
  useEffect(() => {
    setCourses(initialCourses);
    setUserName(userName);
    setError(error);
  }, [initialCourses, userName, error, setCourses, setUserName, setError]);

  return (
    <div className="flex min-h-screen w-full bg-[#06060e] text-slate-300">
      <Sidebar />
      <main
        className="flex-1 transition-all duration-300 pb-20 md:pb-0"
        style={{
          marginLeft: 0, // Handled by flex layout on desktop
        }}
      >
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-[#08081a]/95 px-4 backdrop-blur-xl md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] text-slate-400 hover:text-white active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
              N
            </div>
            <span className="text-sm font-semibold text-white">NexLearn</span>
          </div>
        </header>

        <BentoGrid
          courses={initialCourses}
          userName={userName}
          error={error}
        />
      </main>
    </div>
  );
}
