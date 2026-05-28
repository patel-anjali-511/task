"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import { Course } from "@/lib/types";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
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
  const { setCourses, setUserName, setError } =
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
        className="flex-1 transition-all duration-300 pb-20 lg:pb-0"
        style={{
          marginLeft: 0, // Handled by flex layout on desktop
        }}
      >
        <BentoGrid
          courses={initialCourses}
          userName={userName}
          error={error}
        />
      </main>
      <MobileNav />
    </div>
  );
}
